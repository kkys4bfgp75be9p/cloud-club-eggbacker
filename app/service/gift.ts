/**
 * 区域相关业务层
 */
import Message, { ErrorType } from '../utils/message';
import BaseService from './common/base';
const moment = require('moment');

export default class GiftService extends BaseService {
    /**
     * 获取已激活的赛季最新时间
     * 以创建时间作为最新时间的判定, 以struts状态为 1 作为激活判定
     * 有数据时返回: { err: null, info: '2018-11-30 10:00:00' }
     * 无数据时返回: { err: null }
     * @param {*} param0
     */
    public async getNextLottery() {
        try {
            // 查询所有省份信息
            const attributes = ['no1_time', 'no2_time', 'no3_time'];
            const where = {struts: 1};
            const order = [['createdAt', 'DESC']];
            let clientSeason = await this.ctx.model.ClientSeason.findOne({ attributes, where, order, raw: true });
            // 因此, 时间需进行手动时区转换
            clientSeason = this.handleTimezone(clientSeason, ['no1_time', 'no2_time', 'no3_time']);

            let proximalTime: any;
            if (clientSeason && clientSeason['no1_time'] && clientSeason['no2_time'] && clientSeason['no2_time']){
                let no1_time = new Date(clientSeason['no1_time']);
                let no2_time = new Date(clientSeason['no2_time']);
                let no3_time = new Date(clientSeason['no3_time']);
                proximalTime = moment(no1_time < no2_time? (no1_time<no3_time?no1_time:no3_time):(no2_time<no3_time?no2_time:no3_time)).format("YYYY-MM-DD HH:mm:ss");
            }
            // this.ctx.logger.info('clientSeason: ', proximalTime);
            return new Message(null, proximalTime);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
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
    public async getActiveInfo() {
        try {
            // 查询所有省份信息
            const sql = 'CALL proc_query_gift_active_info()';
            let clientSeason = await this.ctx.model.query(sql,
                { type: this.ctx.model.QueryTypes.RAW, raw: true },
            );
            if (Array.isArray(clientSeason) && clientSeason.length > 0){
                clientSeason = clientSeason[0];
            }
            // let clientSeason = await this.ctx.model.ClientSeason.findOne({ attributes, where, order, raw: true });
            // 因此, 时间需进行手动时区转换
            clientSeason = this.handleTimezone(clientSeason, ['no1_time', 'no2_time', 'no3_time', 'createdAt']);
            return new Message(null, clientSeason);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
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
    public async getHistoryList(pagenum: Number=1) {
        try {
            // 查询所有省份信息
            const sql = 'CALL proc_query_gift_history_list(?)';
            let clientSeason = await this.ctx.model.query(sql,
                { replacements: [pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true },
            );
            // 因此, 时间需进行手动时区转换
            clientSeason = this.handleTimezone(clientSeason, ['createdAt']);
            return new Message(null, clientSeason);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }
}