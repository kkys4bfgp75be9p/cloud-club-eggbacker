"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 登录相关接口控制器
 */
const base_1 = require("./common/base");
class UserController extends base_1.default {
    /**
     * 获取面板所需数据
     * /user/panel-info
     */
    async get_panelInfo() {
        const { ctx } = this;
        // let { hasWxinfo } = ctx.query;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.user.getPanelInfo({ token });
    }
    /**
     * 保存用户基本数据
     * /user/save
     * 返回数据:
     *      Message { err: null, list: [ 1 ] }
     */
    async post_save() {
        const { ctx } = this;
        let { nickname, avatar_url, gender } = ctx.request.body;
        let token = ctx.request.header['x-access-token'];
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
    async post_phoneSms() {
        const { ctx } = this;
        let { telephone } = ctx.request.body;
        let token = ctx.request.header['x-access-token'];
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
    async post_phone_save() {
        const { ctx } = this;
        let { telephone, code, smsToken } = ctx.request.body;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.user.savePhone({ telephone, code, smsToken, token });
    }
}
exports.default = UserController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUEyQztBQUUzQyxNQUFxQixjQUFlLFNBQVEsY0FBYztJQUN0RDs7O09BR0c7SUFDSSxLQUFLLENBQUMsYUFBYTtRQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLGlDQUFpQztRQUNqQyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRTlELENBQUM7SUFFRDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxTQUFTO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDeEQsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUV4RixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSSxLQUFLLENBQUMsYUFBYTtRQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksRUFBRSxTQUFTLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNyQyxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUV6RSxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0ksS0FBSyxDQUFDLGVBQWU7UUFDeEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNyRCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRXRGLENBQUM7Q0FDSjtBQTdERCxpQ0E2REMifQ==