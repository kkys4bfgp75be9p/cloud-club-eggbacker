"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const base_1 = require("./common/base");
const randomstring = require('randomstring');
const HttpClient = require("../utils/http-client");
const message_1 = require("../utils/message");
const token_1 = require("../utils/token");
class UserService extends base_1.default {
    /**
     * 获取面板信息 (待缓存信息)
     * @param {*} param0
     */
    async getPanelInfo({ token }) {
        // console.log("p => ", req.query);
        const t = new token_1.default();
        try {
            // 获取我当前的用户ID
            const clientId = t.checkToken(token).data.id;
            const panelInfo = await this.ctx.model.query('CALL proc_query_user_panel(?)', { replacements: [clientId], type: this.ctx.model.QueryTypes.RAW, raw: true });
            return new message_1.default(null, panelInfo[0]);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 保存用户基本数据
     * @param {*} param0
     */
    async saveInfo({ nickname, avatar_url, gender, token }) {
        const t = new token_1.default();
        try {
            // 获取我当前的用户ID
            const clientId = t.checkToken(token).data.id;
            // 新增或更新
            const values = {
                nickname, avatar_url, gender,
            };
            const where = {
                id: clientId,
            };
            const fields = ['nickname', 'avatar_url', 'gender'];
            const result = await this.ctx.model.Client.update(values, { where, fields });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, result);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 发送短信验证码
     * @param {*} param0
     */
    async sendPhoneSms({ telephone, token }) {
        // console.log("p => ", req.query);
        const t = new token_1.default();
        try {
            // 获取我当前的用户ID
            t.checkToken(token).data.id;
            // 生成 6 位验证码
            const code = randomstring.generate({
                length: 6,
                charset: 'numeric',
            });
            // 发送验证码至手机
            const sms_result = await HttpClient.sendSMS(telephone, code);
            console.log('sms_result:: ', sms_result);
            // 将验证码生成 token
            const phoneToken = new token_1.default();
            // 返回验证码所表示的token
            return new message_1.default(null, phoneToken.createToken({ smscode: code }, 5));
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 新增/修改手机号码
     * @param {*} param0
     */
    async savePhone({ telephone, code, smsToken, token }) {
        try {
            // 验证手机验证码的正确性
            const phoneCheckToken = new token_1.default();
            const smscode = phoneCheckToken.checkToken(smsToken).data.smscode;
            if (code !== smscode) {
                // 验证码输入的不正确
                return new message_1.default(message_1.ErrorType.PHONE_CODE_FAIL);
            }
        }
        catch (error) {
            // 验证码过期或者无效
            return new message_1.default(message_1.ErrorType.PHONE_CODE_TIMEOUT);
        }
        // 更新手机号码流程
        try {
            const loginToken = new token_1.default();
            // 获取我当前的用户ID
            const clientId = loginToken.checkToken(token).data.id;
            // 新增或更新
            const values = {
                telephone,
            };
            const where = {
                id: clientId,
            };
            const fields = ['telephone'];
            const result = await this.ctx.model.Client.update(values, { where, fields });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, result);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
}
exports.default = UserService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUF3QztBQUN4QyxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDN0MsbURBQW1EO0FBQ25ELDhDQUFzRDtBQUN0RCwwQ0FBbUM7QUFFbkMsTUFBcUIsV0FBWSxTQUFRLGNBQVc7SUFDaEQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRTtRQUMvQixtQ0FBbUM7UUFDbkMsTUFBTSxDQUFDLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztRQUN0QixJQUFJO1lBQ0EsYUFBYTtZQUNiLE1BQU0sUUFBUSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUM3QyxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDeEMsK0JBQStCLEVBQy9CLEVBQUUsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUMvRSxDQUFDO1lBQ0YsT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLElBQUksaUJBQU8sQ0FBQyxtQkFBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUs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