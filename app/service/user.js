"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const base_1 = require("./common/base");
let randomstring = require('randomstring');
const token_1 = require("../utils/token");
const message_1 = require("../utils/message");
const HttpClient = require("../utils/http-client");
class UserService extends base_1.default {
    /**
     * 获取面板信息 (待缓存信息)
     * @param {*} param0
     */
    async getPanelInfo({ token }) {
        // console.log("p => ", req.query);
        let t = new token_1.default();
        try {
            // 获取我当前的用户ID
            let clientId = t.checkToken(token).data.id;
            let panelInfo = await this.ctx.model.query('CALL proc_query_user_panel(?)', { replacements: [clientId], type: this.ctx.model.QueryTypes.RAW, raw: true });
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
        let t = new token_1.default();
        try {
            // 获取我当前的用户ID
            let clientId = t.checkToken(token).data.id;
            // 新增或更新
            let values = {
                nickname, avatar_url, gender
            };
            let where = {
                id: clientId
            };
            let fields = ['nickname', 'avatar_url', 'gender'];
            let result = await this.ctx.model.Client.update(values, { where, fields });
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
        let t = new token_1.default();
        try {
            // 获取我当前的用户ID
            t.checkToken(token).data.id;
            // 生成 6 位验证码
            let code = randomstring.generate({
                length: 6,
                charset: 'numeric'
            });
            // 发送验证码至手机
            let sms_result = await HttpClient.sendSMS(telephone, code);
            console.log('sms_result:: ', sms_result);
            // 将验证码生成 token
            let phoneToken = new token_1.default();
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
            let phoneCheckToken = new token_1.default();
            let smscode = phoneCheckToken.checkToken(smsToken).data.smscode;
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
            let loginToken = new token_1.default();
            // 获取我当前的用户ID
            let clientId = loginToken.checkToken(token).data.id;
            // 新增或更新
            let values = {
                telephone
            };
            let where = {
                id: clientId
            };
            let fields = ['telephone'];
            let result = await this.ctx.model.Client.update(values, { where, fields });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInVzZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUF3QztBQUN4QyxJQUFJLFlBQVksR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDM0MsMENBQW1DO0FBQ25DLDhDQUFzRDtBQUN0RCxtREFBbUQ7QUFFbkQsTUFBcUIsV0FBWSxTQUFRLGNBQVc7SUFDaEQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFLEtBQUssRUFBRTtRQUMvQixtQ0FBbUM7UUFDbkMsSUFBSSxDQUFDLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztRQUNwQixJQUFJO1lBQ0EsYUFBYTtZQUNiLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUMzQyxJQUFJLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDdEMsK0JBQStCLEVBQy9CLEVBQUUsWUFBWSxFQUFFLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUMvRSxDQUFDO1lBQ0YsT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzFDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLElBQUksaUJBQU8sQ0FBQyxtQkFBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsUUFBUSxDQUFDLEVBQUUs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