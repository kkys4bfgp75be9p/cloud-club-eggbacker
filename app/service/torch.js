"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const base_1 = require("./common/base");
// let uuidv1 = require('uuid/v1');
// let moment = require('moment');
const token_1 = require("../utils/token");
const message_1 = require("../utils/message");
class TorchService extends base_1.default {
    /**
     * 获取今日份的火把
     * @param {*} param0
     */
    async pull({ token }) {
        try {
            // 获取我当前的用户ID
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            let torchResult = await this.ctx.model.query('CALL proc_pull_torch(?)', { replacements: [client_id], type: this.ctx.model.QueryTypes.RAW, raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, torchResult[0]);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 为活动加热( 投票 )
     * @param {*} param0
     */
    async heating({ activity_id, token }) {
        try {
            // 获取我当前的用户ID
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            let torchResult = await this.ctx.model.query('CALL proc_activity_heating(?, ?)', { replacements: [activity_id, client_id], type: this.ctx.model.QueryTypes.RAW, raw: true });
            let resultOnce = torchResult[0];
            if (resultOnce.err === null) {
                // 没有错误, 则进行活动点赞数据量更新
                // 该更新不关注更新结果
                this.addHeat(activity_id);
                return new message_1.default(null, resultOnce);
            }
            else if (resultOnce.err === 3001) {
                return new message_1.default(message_1.ErrorType.PROC_TORCH_HEATING_NOANYTHING, resultOnce);
            }
            else if (resultOnce.err === 3002) {
                return new message_1.default(message_1.ErrorType.PROC_TORCH_HEATING_EXCEPTION, resultOnce);
            }
            else {
                return new message_1.default(message_1.ErrorType.PROC_TORCH_HEATING_UNKNOW_ERROR, resultOnce);
            }
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            // return new Message(null, torchResult[0]);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 对活动 点赞 进行数值变更 ( 不等待其阻塞, 自己玩儿去 )
     * @param {*} param0
     */
    async addHeat(activity_id) {
        try {
            // 启动一个事务
            // let trans = await this.ctx.model.transaction();
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            let torchResult = await this.ctx.model.query('UPDATE club_activity_hot SET heat=heat+1 WHERE activity_id=?', { replacements: [activity_id], type: this.ctx.model.QueryTypes.RAW, raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, torchResult[0]);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
}
exports.default = TorchService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9yY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b3JjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsd0NBQXdDO0FBQ3hDLG1DQUFtQztBQUNuQyxrQ0FBa0M7QUFDbEMsMENBQW1DO0FBQ25DLDhDQUFvRDtBQUVwRCxNQUFxQixZQUFhLFNBQVEsY0FBVztJQUNqRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsS0FBSyxFQUFFO1FBQ3ZCLElBQUk7WUFDQSxhQUFhO1lBQ2IsSUFBSSxVQUFVLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztZQUM3QixJQUFJLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDckQsb0JBQW9CO1lBQ3BCLDJCQUEyQjtZQUMzQixJQUFJLFdBQVcsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDeEMseUJBQXlCLEVBQ3pCLEVBQUUsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUNoRixDQUFDO1lBQ0YseUJBQXlCO1lBQ3pCLHFDQUFxQztZQUNyQyxPQUFPLElBQUksaUJBQU8sQ0FBQyxJQUFJLEVBQUUsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7U0FDNUM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxPQUFPLENB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