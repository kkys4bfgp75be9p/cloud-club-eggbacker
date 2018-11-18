/**
 * 区域相关业务层
 */
import Message, { ErrorType } from '../utils/message';
import BaseService from './common/base';

export default class AreaService extends BaseService {
    /**
     * 获取省份列表
     * @param {*} param0
     */
    public async getProvinceList() {
        try {
            // 查询所有省份信息
            const attributes = ['code', 'name'];
            const province = await this.ctx.model.Province.findAll({ attributes, raw: true });
            return new Message(null, province);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 获取城市列表
     * @param {*} param0
     */
    public async getCityList({ provincecode }) {
        try {
            // 查询 `provincecode`所表示的所有 `城市` 信息
            const where = { provincecode };
            const attributes = ['code', 'name'];
            const citys = await this.ctx.model.City.findAll({ where, attributes, raw: true });
            return new Message(null, citys);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }
}