"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 区域相关业务层
 */
const message_1 = require("../utils/message");
const base_1 = require("./common/base");
const moment = require('moment');
class GiftService extends base_1.default {
    /**
     * 获取已激活的赛季最新时间
     * 以创建时间作为最新时间的判定, 以struts状态为 1 作为激活判定
     * 有数据时返回: {
        err: null,
        info: { proximalTime: '2018-12-02 10:00:00', diff: 89914436 } }
     * 无数据时返回: {
        err: null,
        info: { proximalTime: undefined, diff: undefined } }
     * @param {*} param0
     */
    async getNextLottery() {
        try {
            // 查询所有省份信息
            const attributes = ['no1_time', 'no2_time', 'no3_time'];
            const where = { struts: 1 };
            const order = [['createdAt', 'DESC']];
            let clientSeason = await this.ctx.model.ClientSeason.findOne({ attributes, where, order, raw: true });
            // 因此, 时间需进行手动时区转换
            clientSeason = this.handleTimezone(clientSeason, ['no1_time', 'no2_time', 'no3_time']);
            let proximalTime;
            let diff;
            if (clientSeason && clientSeason['no1_time'] && clientSeason['no2_time'] && clientSeason['no2_time']) {
                let no1_time = new Date(clientSeason['no1_time']);
                let no2_time = new Date(clientSeason['no2_time']);
                let no3_time = new Date(clientSeason['no3_time']);
                proximalTime = moment(no1_time < no2_time ? (no1_time < no3_time ? no1_time : no3_time) : (no2_time < no3_time ? no2_time : no3_time)).format("YYYY-MM-DD HH:mm:ss");
                const now = (new Date()).getTime();
                diff = (new Date(proximalTime)).getTime() - now;
            }
            // this.ctx.logger.info('clientSeason: ', proximalTime);
            return new message_1.default(null, { proximalTime, diff });
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 获取已激活的赛季详细数据
     * 正常查出数据: {
     id: 'f68c3605-f3e0-11e8-925b-00163e00b07d',
     no1_time: '2018-11-30 10:00',
     no2_time: '2018-11-30 14:00',
     no3_time: '2018-11-30 17:00',
     no1_gift: 'no1_gift',
     no2_gift: 'no2_gift',
     no3_gift: 'no3_gift',
     no1_client: null,
     no2_client: '3957e160-ea3f-11e8-9586-c15b71cb7dd5',
     no3_client: null,
     createdAt: '2018-11-29 22:13',
     c1_avatar: null,
     c1_gender: null,
     c1_tel: null,
     c1_name: null,
     c1_school: null,
     c2_avatar:
      'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eraEeftaBoduBnoU1OcTNuatsjY0jvsibf1x36DsJhslpMenW8bL5wiaILZjDFiact46Q4gY22icF2LxQ/132',
     c2_gender: 1,
     c2_tel: '15929063725',
     c2_name: '白海鸥',
     c2_school: '西安理工大学',
     c3_avatar: null,
     c3_gender: null,
     c3_tel: null,
     c3_name: null,
     c3_school: null }

     无数据时: { err: null, list: [] }
     * @param {*} param0
     */
    async getActiveInfo() {
        try {
            // 查询所有省份信息
            const sql = 'CALL proc_query_gift_active_info()';
            let clientSeason = await this.ctx.model.query(sql, { type: this.ctx.model.QueryTypes.RAW, raw: true });
            if (Array.isArray(clientSeason) && clientSeason.length > 0) {
                clientSeason = clientSeason[0];
            }
            // let clientSeason = await this.ctx.model.ClientSeason.findOne({ attributes, where, order, raw: true });
            // 因此, 时间需进行手动时区转换
            clientSeason = this.handleTimezone(clientSeason, ['no1_time', 'no2_time', 'no3_time', 'createdAt']);
            // 为每一个时间点,拼接剩余时间的毫秒数,用于前端做倒计时
            const now = (new Date()).getTime();
            if (clientSeason['no1_time']) {
                let no1_time = (new Date(clientSeason['no1_time'])).getTime();
                clientSeason['no1_time_diff'] = no1_time - now;
            }
            if (clientSeason['no2_time']) {
                let no2_time = (new Date(clientSeason['no2_time'])).getTime();
                clientSeason['no2_time_diff'] = no2_time - now;
            }
            if (clientSeason['no3_time']) {
                let no3_time = (new Date(clientSeason['no3_time'])).getTime();
                clientSeason['no3_time_diff'] = no3_time - now;
            }
            // 拼接循环轮播的人员数组
            if (!Array.isArray(clientSeason)) {
                // 此时如果clientSeason不是一个数组而是一个对象,则查询正确,获取需要轮播的获奖备选名单
                const sqlLoop = 'CALL proc_torch_loop_list()';
                let clientLoop = await this.ctx.model.query(sqlLoop, { type: this.ctx.model.QueryTypes.RAW, raw: true });
                if (Array.isArray(clientLoop) && clientLoop.length > 0) {
                    clientSeason['clients'] = clientLoop;
                }
            }
            return new message_1.default(null, clientSeason);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 获取历史赛季详细数据
     * 正常数据: {
  err: null,
  list:
   [ TextRow {
       id: 'f68c3605-f3e0-11e8-925b-00163e00b07d',
       struts: 0,
       no1_client: null,
       no2_client: '3957e160-ea3f-11e8-9586-c15b71cb7dd5',
       no3_client: null,
       createdAt: '2018-11-29 22:13',
       c1_avatar: null,
       c1_gender: null,
       c1_tel: null,
       c1_name: null,
       c1_school: null,
       c2_avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eraEeftaBoduBnoU1OcTNuatsjY0jvsibf1x36DsJhslpMenW8bL5wiaILZjDFiact46Q4gY22icF2LxQ/132',
       c2_gender: 1,
       c2_tel: '15929063725',
       c2_name: '白海鸥',
       c2_school: '西安理工大学',
       c3_avatar: null,
       c3_gender: null,
       c3_tel: null,
       c3_name: null,
       c3_school: null } ] }

       空数据: { err: null, list: [] }

     * @param {*} param0
     */
    async getHistoryList(pagenum = 1) {
        try {
            // 查询所有省份信息
            const sql = 'CALL proc_query_gift_history_list(?)';
            let clientSeason = await this.ctx.model.query(sql, { replacements: [pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true });
            // 因此, 时间需进行手动时区转换
            clientSeason = this.handleTimezone(clientSeason, ['createdAt']);
            return new message_1.default(null, clientSeason);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
}
exports.default = GiftService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lmdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILDhDQUFzRDtBQUN0RCx3Q0FBd0M7QUFDeEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE1BQXFCLFdBQVksU0FBUSxjQUFXO0lBQ2hEOzs7Ozs7Ozs7O09BVUc7SUFDSSxLQUFLLENBQUMsY0FBYztRQUN2QixJQUFJO1lBQ0EsV0FBVztZQUNYLE1BQU0sVUFBVSxHQUFHLENBQUMsVUFBVSxFQUFFLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN4RCxNQUFNLEtBQUssR0FBRyxFQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUMsQ0FBQztZQUMxQixNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDdEMsSUFBSSxZQUFZLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUUsVUFBVSxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDdEcsa0JBQWtCO1lBQ2xCLFlBQVksR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFlBQVksRUFBRSxDQUFDLFVBQVUsRUFBRSxVQUFVLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztZQUV2RixJQUFJLFlBQWlCLENBQUM7WUFDdEIsSUFBSSxJQUFTLENBQUM7WUFDZCxJQUFJLFlBQVksSUFBSSxZQUFZLENBQUMsVUFBVSxDQUFDLElBQUksWUFBWSxDQUFDLFVBQVUsQ0FBQyxJQUFJLFlBQVksQ0FBQyxVQUFVLENBQUMsRUFBQztnQkFDakcsSUFBSSxRQUFRLEdBQUcsSUFBSSxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xELElBQUksUUFB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