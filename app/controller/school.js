"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 学校相关接口控制器
 */
const base_1 = require("./common/base");
class SchoolController extends base_1.default {
    /**
     * 根据坐标定位获取学校位置，若无法获取则根据IP定位省市所表示的学校
     * 省份城市,将根据这里获取到的推荐学校定位,来定位
     * 接口: /school/nearby-list
     * 参数:
     *      latitude: 纬度
     *      longitude: 经度
     * 返回数据:
     *
     */
    async get_nearbyList() {
        const { ctx } = this;
        let { latitude, longitude } = ctx.query;
        ctx.body = await ctx.service.school.getNearbyList({ latitude, longitude });
    }
    /**
     * 根据城市code查询所对应的学校列表
     * 接口: /school/city/list
     * 参数:
     *      citycode: 城市编码
     * 返回数据:
     *
     */
    async get_city_list() {
        const { ctx } = this;
        let { citycode } = ctx.query;
        ctx.body = await ctx.service.school.getSchoolListByCity({ citycode });
    }
    /**
     * 新增学校设置申请
     * 接口: /school/setting
     * 参数:
     *      school_id: 学校编号
     *      profe: 专业学科
     *      educ_job: 学历或职务
     *      realname: 真实姓名
     *      cert_url: 手持身份证或学生证照 url
     * 返回数据:
     *
     */
    async post_setting() {
        const { ctx } = this;
        let { formId, school_id, profe, educ_job, realname, cert_url } = ctx.request.body;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.school.setSchoolApply({ formId, school_id, profe, educ_job, realname, cert_url, token });
    }
    /**
     * 根据城市code查询所对应的学校列表
     * 接口: /school/load-apply
     * 参数:
     *
     * 返回数据:
     *
     */
    async get_loadApply() {
        // let {citycode} = ctx.query;
        const { ctx } = this;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.school.loadSchoolApply({ token });
    }
}
exports.default = SchoolController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nob29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nob29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCx3Q0FBMkM7QUFFM0MsTUFBcUIsZ0JBQWlCLFNBQVEsY0FBYztJQUN4RDs7Ozs7Ozs7O09BU0c7SUFDSSxLQUFLLENBQUMsY0FBYztRQUN2QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN4QyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxDQUFDLENBQUM7SUFFL0UsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsYUFBYTtRQUN0QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLElBQUksRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzdCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxtQkFBbUIsQ0FBQyxFQUFFLFFBQVEsRUFBRSxDQUFDLENBQUM7SUFFMUUsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0ksS0FBSyxDQUFDLFlBQVk7UUFDckIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztRQUNsRixJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRTFILENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLGFBQWE7UUFDdEIsOEJBQThCO1FBQzlCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUVuRSxDQUFDO0NBQ0o7QUFwRUQsbUNBb0VDIn0=