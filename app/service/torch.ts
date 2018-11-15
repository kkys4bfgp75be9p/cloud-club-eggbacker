/**
 * Access 登录相关的业务逻辑层
 */
import BaseService from './common/base';
// let uuidv1 = require('uuid/v1');
// let moment = require('moment');
import Token from '../utils/token';
import Message, {ErrorType} from '../utils/message';

export default class TorchService extends BaseService {
    /**
     * 获取今日份的火把
     * @param {*} param0 
     */
    public async pull({ token }) {
        try {
            // 获取我当前的用户ID
            let loginToken = new Token();
            let client_id = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            let torchResult = await this.ctx.model.query(
                'CALL proc_pull_torch(?)',
                { replacements: [client_id], type: this.ctx.model.QueryTypes.RAW, raw: true }
            );
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new Message(null, torchResult[0]);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 为活动加热( 投票 )
     * @param {*} param0 
     */
    public async heating({ activity_id, token }) {
        try {
            // 获取我当前的用户ID
            let loginToken = new Token();
            let client_id = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            let torchResult = await this.ctx.model.query(
                'CALL proc_activity_heating(?, ?)',
                { replacements: [activity_id, client_id], type: this.ctx.model.QueryTypes.RAW, raw: true }
            );
            let resultOnce = torchResult[0];
            if (resultOnce.err === null) {
                // 没有错误, 则进行活动点赞数据量更新
                // 该更新不关注更新结果
                this.addHeat(activity_id);
                return new Message(null, resultOnce);
            } else if (resultOnce.err === 3001) {
                return new Message(ErrorType.PROC_TORCH_HEATING_NOANYTHING, resultOnce);
            } else if (resultOnce.err === 3002) {
                return new Message(ErrorType.PROC_TORCH_HEATING_EXCEPTION, resultOnce);
            } else {
                return new Message(ErrorType.PROC_TORCH_HEATING_UNKNOW_ERROR, resultOnce);
            }
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            // return new Message(null, torchResult[0]);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 对活动 点赞 进行数值变更 ( 不等待其阻塞, 自己玩儿去 )
     * @param {*} param0 
     */
    public async addHeat(activity_id) {
        try {
            // 启动一个事务
            // let trans = await this.ctx.model.transaction();
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            let torchResult = await this.ctx.model.query(
                'UPDATE club_activity_hot SET heat=heat+1 WHERE activity_id=?',
                { replacements: [activity_id], type: this.ctx.model.QueryTypes.RAW, raw: true }
            );
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new Message(null, torchResult[0]);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }
}