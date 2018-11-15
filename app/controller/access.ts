import BaseController from './common/base';
import ProConf, { APP_TEST_ABU } from '../utils/configs/project-config';
import Message, { ErrorType } from '../utils/message';
import WXBizDataCrypt from '../utils/wx/WXBizDataCrypt';
/**
 * 登录相关接口控制器
 */
export default class AccessController extends BaseController {
  /**
   * 使用 unionid 的登录方法
   * 通过 code 换取登录的 openid 和 unionid, 记录数据库
   * 创建用于登录的token,并返回
   * 
   * 接口: /access/login
   * Method: post
   * 参数: 
   *      appid: 应用标识
   *      loginCode: wx.login的res中获取的code
   *      encryptedData: 敏感数据加密字符串, getUserInfo的res中获取
   *      iv: 加密用到的iv, getUserInfo的res中获取
   * 返回数据: 
   *      Message 
   * 
   */
  public async login() {
    const { ctx } = this;
    // 参数部分
    const { appid, loginCode, encryptedData, iv } = ctx.request.body;
    // let openid = '';
    ctx.logger.debug('Access Login: ', { appid, loginCode, encryptedData, iv });
    ctx.logger.debug('egg curl:: ', ctx.curl);
    // 首先通过 loginCode 换取 session_key (mmp)
    let wxurl = "https://api.weixin.qq.com/sns/jscode2session?appid=" + appid + "&secret=" + ProConf.get(appid) +
      "&js_code=" + loginCode + "&grant_type=authorization_code";
    // 换取的结果中包含 openid 及 session_key
    const wx_result = (await ctx.curl(wxurl, { dataType: 'json' })).data;
    ctx.logger.info('wx_result => ', wx_result);
    // 如果是审核数据流 (临时)
    if (appid === APP_TEST_ABU && wx_result.openid) {
      ctx.logger.debug('系统审核用户登录: ', wx_result.openid);
      ctx.body = await ctx.service.access.saveLogin4SystemRole(wx_result.openid);
      return;
    }
    // ctx.body = await ctx.service.access.saveLogin4SystemRole(openid);

    // 如果用户已经关注了 公众号, 则直接result包含有 unionid
    // 否则需要在 encryptedData 中通过 iv 解析出 unionid
    if (wx_result && wx_result.unionid) {
      // 保存并获取token
      const msg = await ctx.service.access.saveLogin4CloudClub({
        appid,
        unionid: wx_result.unionid
        , xcx_openid: wx_result.openid
      });
      ctx.body = msg;
    } else {
      const { session_key } = wx_result;
      if (!session_key) {
        return ctx.body = new Message(ErrorType.WX_LOGIN_FAIL, 'session_key不存在!');
      }
      // wx_result不包含unionid, 需要在 encryptedData 中通过 iv 解析出 unionid
      try {
        let pc = new WXBizDataCrypt(appid, session_key);
        let data = pc.decryptData(encryptedData, iv);
        if (!data.unionId) {
          return ctx.body = new Message(ErrorType.WX_LOGIN_FAIL, 'unionId 解析之后依然不存在:' + data);
        }
        // 保存并获取token
        const msg = await ctx.service.access.saveLogin4CloudClub({
          appid,
          unionid: data.unionId
          , xcx_openid: wx_result.openid
        });
        ctx.body = msg;
      } catch (error) {
        ctx.logger.error(error);
        return ctx.body = new Message(ErrorType.WX_LOGIN_FAIL, '解析 unionId 异常: ' + error);
      }
    }
  }// end: login
}