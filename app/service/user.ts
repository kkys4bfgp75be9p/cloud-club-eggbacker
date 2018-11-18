/**
 * Access 登录相关的业务逻辑层
 */
import BaseService from './common/base';
const randomstring = require('randomstring');
import * as HttpClient from '../utils/http-client';
import Message, { ErrorType } from '../utils/message';
import Token from '../utils/token';

export default class UserService extends BaseService {
    /**
     * 获取面板信息 (待缓存信息)
     * @param {*} param0
     */
    public async getPanelInfo({ token }) {
        // console.log("p => ", req.query);
        const t = new Token();
        try {
            // 获取我当前的用户ID
            const clientId = t.checkToken(token).data.id;
            const panelInfo = await this.ctx.model.query(
                'CALL proc_query_user_panel(?)',
                { replacements: [clientId], type: this.ctx.model.QueryTypes.RAW, raw: true },
            );
            return new Message(null, panelInfo[0]);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 保存用户基本数据
     * @param {*} param0
     */
    public async saveInfo({ nickname, avatar_url, gender, token }) {
        const t = new Token();
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
            return new Message(null, result);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 发送短信验证码
     * @param {*} param0
     */
    public async sendPhoneSms({ telephone, token }) {
        // console.log("p => ", req.query);
        const t = new Token();
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
            const phoneToken = new Token();
            // 返回验证码所表示的token
            return new Message(null, phoneToken.createToken({ smscode: code }, 5));
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 新增/修改手机号码
     * @param {*} param0
     */
    public async savePhone({ telephone, code, smsToken, token }) {

        try {
            // 验证手机验证码的正确性
            const phoneCheckToken = new Token();
            const smscode = phoneCheckToken.checkToken(smsToken).data.smscode;
            if (code !== smscode) {
                // 验证码输入的不正确
                return new Message(ErrorType.PHONE_CODE_FAIL);
            }
        } catch (error) {
            // 验证码过期或者无效
            return new Message(ErrorType.PHONE_CODE_TIMEOUT);
        }
        // 更新手机号码流程
        try {
            const loginToken = new Token();
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
            return new Message(null, result);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }
}