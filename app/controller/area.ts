/**
 * 区域相关接口设计
 */
import BaseController from './common/base';

export default class AreaController extends BaseController {
    /**
     * 获取省份列表
     * 接口: /area/province-list
     * 参数:
     *
     * 返回数据:
     *
     */
    public async get_provinceList() {
        const { ctx } = this;
        ctx.body = await ctx.service.area.getProvinceList();
    }

    /**
     * 获取城市列表
     * 接口: /area/city-list
     * 参数:
     *      provincecode: 省份编号
     * 返回数据:
     *
     */
    public async get_cityList() {
        const { ctx } = this;
        const { provincecode } = ctx.query;
        ctx.body = await ctx.service.area.getCityList({ provincecode });
    }
}