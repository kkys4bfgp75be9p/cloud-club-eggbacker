/**
 * 登录相关接口控制器
 */
import BaseController from './common/base';

export default class UserController extends BaseController {
    /**
     * 获取面板所需数据
     * /user/panel-info
     */
    public async get_panelInfo ( ) {
        const { ctx } = this;
        // let { hasWxinfo } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.user.getPanelInfo({ token });

    }

    /**
     * 保存用户基本数据
     * /user/save
     * 返回数据:
     *      Message { err: null, list: [ 1 ] }
     */
    public async post_save ( ) {
        const { ctx } = this;
        const { nickname, avatar_url, gender } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.user.saveInfo({ nickname, avatar_url, gender, token });

    }

    /**
     * 发送短信验证码
     * /user/phone-sms
     * 返回数据:
     *      {
            err: null,
            info: 'eyJkYXRhIjp7InNtc2NvZGUiOiIyMDYyNzQifSwiY3JlYXRlZCI6MjU2NDgzNzAsImV4cCI6NX0=.w80Wefl3aoX3sdNjJcLHlGbd5jkCxBtkZctpctqNK0I='
            }
     */
    public async post_phoneSms ( ) {
        const { ctx } = this;
        const { telephone } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.user.sendPhoneSms({ telephone, token });

    }

    /**
     * 新增/修改手机号码
     * /user/phone/save
     * 参数:
     *      telephone:
     *      code:
     *      smsToken:
     * 返回数据:
     *      Message { err: null, list: [ 1 ] }
     */
    public async post_phone_save ( ) {
        const { ctx } = this;
        const { telephone, code, smsToken } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.user.savePhone({ telephone, code, smsToken, token });

    }
}