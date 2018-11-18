"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const project_config_1 = require("../utils/configs/project-config");
const message_1 = require("../utils/message");
const WXBizDataCrypt_1 = require("../utils/wx/WXBizDataCrypt");
const base_1 = require("./common/base");
/**
 * 登录相关接口控制器
 */
class AccessController extends base_1.default {
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
    async login() {
        const { ctx } = this;
        // 参数部分
        const { appid, loginCode, encryptedData, iv } = ctx.request.body;
        // let openid = '';
        ctx.logger.debug('Access Login: ', { appid, loginCode, encryptedData, iv });
        ctx.logger.debug('egg curl:: ', ctx.curl);
        // 首先通过 loginCode 换取 session_key (mmp)
        const wxurl = 'https://api.weixin.qq.com/sns/jscode2session?appid=' + appid + '&secret=' + project_config_1.default.get(appid) +
            '&js_code=' + loginCode + '&grant_type=authorization_code';
        // 换取的结果中包含 openid 及 session_key
        const wx_result = (await ctx.curl(wxurl, { dataType: 'json' })).data;
        ctx.logger.info('wx_result => ', wx_result);
        // 如果是审核数据流 (临时)
        if (appid === project_config_1.APP_TEST_ABU && wx_result.openid) {
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
                unionid: wx_result.unionid,
                xcx_openid: wx_result.openid,
            });
            ctx.body = msg;
        }
        else {
            const { session_key } = wx_result;
            if (!session_key) {
                return ctx.body = new message_1.default(message_1.ErrorType.WX_LOGIN_FAIL, 'session_key不存在!');
            }
            // wx_result不包含unionid, 需要在 encryptedData 中通过 iv 解析出 unionid
            try {
                const pc = new WXBizDataCrypt_1.default(appid, session_key);
                const data = pc.decryptData(encryptedData, iv);
                if (!data.unionId) {
                    return ctx.body = new message_1.default(message_1.ErrorType.WX_LOGIN_FAIL, 'unionId 解析之后依然不存在:' + data);
                }
                // 保存并获取token
                const msg = await ctx.service.access.saveLogin4CloudClub({
                    appid,
                    unionid: data.unionId,
                    xcx_openid: wx_result.openid,
                });
                ctx.body = msg;
            }
            catch (error) {
                ctx.logger.error(error);
                return ctx.body = new message_1.default(message_1.ErrorType.WX_LOGIN_FAIL, '解析 unionId 异常: ' + error);
            }
        }
    } // end: login
}
exports.default = AccessController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0VBQXdFO0FBQ3hFLDhDQUFzRDtBQUN0RCwrREFBd0Q7QUFDeEQsd0NBQTJDO0FBQzNDOztHQUVHO0FBQ0gsTUFBcUIsZ0JBQWlCLFNBQVEsY0FBYztJQUMxRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSSxLQUFLLENBQUMsS0FBSztRQUNoQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE9BQU87UUFDUCxNQUFNLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDakUsbUJBQW1CO1FBQ25CLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxhQUFhLEVBQUUsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1RSxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxhQUFhLEVBQUUsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzFDLHNDQUFzQztRQUN0QyxNQUFNLEtBQUssR0FBRyxxREFBcUQsR0FBRyxLQUFLLEdBQUcsVUFBVSxHQUFHLHdCQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUMzRyxXQUFXLEdBQUcsU0FBUyxHQUFHLGdDQUFnQyxDQUFDO1FBQzdELGdDQUFnQztRQUNoQyxNQUFNLFNBQVMsR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNyRSxHQUFHLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDNUMsZ0JBQWdCO1FBQ2hCLElBQUksS0FBSyxLQUFLLDZCQUFZLElBQUksU0FBUyxDQUFDLE1BQU0sRUFBRTtZQUM5QyxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ2pELEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDM0UsT0FBTztTQUNSO1FBQ0Qsb0VBQW9FO1FBRXBFLHNDQUFzQztRQUN0Qyx5Q0FBeUM7UUFDekMsSUFBSSxTQUFTLElBQUksU0FBUyxDQUFDLE9BQU8sRUFBRTtZQUNsQyxhQUFhO1lBQ2IsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztnQkFDdkQsS0FBSztnQkFDTCxPQUFPLEVBQUUsU0FBUyxDQUFDLE9BQU87Z0JBQ3hCLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTTthQUMvQixDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQztTQUNoQjthQUFNO1lBQ0wsTUFBTSxFQUFFLFdBQVcsRUFBRSxHQUFHLFNBQVMsQ0FBQztZQUNsQyxJQUFJLENBQUMsV0FBVyxFQUFFO2dCQUNoQixPQUFPLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsYUFBYSxFQUFFLGlCQUFpQixDQUFDLENBQUM7YUFDM0U7WUFDRCw0REFBNEQ7WUFDNUQsSUFBSTtnQkFDRixNQUFNLEVBQUUsR0FBRyxJQUFJLHdCQUFjLENBQUMsS0FBSyxFQUFFLFdBQVcsQ0FBQyxDQUFDO2dCQUNsRCxNQUFNLElBQUksR0FBRyxFQUFFLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUU7b0JBQ2pCLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFPLENBQUMsbUJBQVMsQ0FBQyxhQUFhLEVBQUUsb0JBQW9CLEdBQUcsSUFBSSxDQUFDLENBQUM7aUJBQ3JGO2dCQUNELGFBQWE7Z0JBQ2IsTUFBTSxHQUFHLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQztvQkFDdkQsS0FBSztvQkFDTCxPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87b0JBQ25CLFVBQVUsRUFBRSxTQUFTLENBQUMsTUFBTTtpQkFDL0IsQ0FBQyxDQUFDO2dCQUNILEdBQUcsQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDO2FBQ2hCO1lBQUMsT0FBTyxLQUFLLEVBQUU7Z0JBQ2QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ3hCLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFPLENBQUMsbUJBQVMsQ0FBQyxhQUFhLEVBQUUsaUJBQWlCLEdBQUcsS0FBSyxDQUFDLENBQUM7YUFDbkY7U0FDRjtJQUNILENBQUMsQ0FBQSxhQUFhO0NBQ2Y7QUF6RUQsbUNBeUVDIn0=