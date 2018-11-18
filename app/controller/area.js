"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 区域相关接口设计
 */
const base_1 = require("./common/base");
class AreaController extends base_1.default {
    /**
     * 获取省份列表
     * 接口: /area/province-list
     * 参数:
     *
     * 返回数据:
     *
     */
    async get_provinceList() {
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
    async get_cityList() {
        const { ctx } = this;
        const { provincecode } = ctx.query;
        ctx.body = await ctx.service.area.getCityList({ provincecode });
    }
}
exports.default = AreaController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUEyQztBQUUzQyxNQUFxQixjQUFlLFNBQVEsY0FBYztJQUN0RDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLGdCQUFnQjtRQUN6QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN4RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxZQUFZO1FBQ3JCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxFQUFFLFlBQVksRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDbkMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLFlBQVksRUFBRSxDQUFDLENBQUM7SUFDcEUsQ0FBQztDQUNKO0FBM0JELGlDQTJCQyJ9