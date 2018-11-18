/**
 * 学校相关接口控制器
 */
import BaseController from './common/base';

export default class SchoolController extends BaseController {
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
    public async get_nearbyList(){
        const { ctx } = this;
        const { latitude, longitude } = ctx.query;
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
    public async get_city_list(){
        const { ctx } = this;
        const { citycode } = ctx.query;
        const result = await ctx.service.school.getSchoolListByCity({ citycode });
        ctx.logger.info('[根据城市code查询所对应的学校列表 get_city_list] : ', result);
        ctx.body = result;
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
    public async post_setting(){
        const { ctx } = this;
        const { formId, school_id, profe, educ_job, realname, cert_url } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
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
    public async get_loadApply(){
        // let {citycode} = ctx.query;
        const { ctx } = this;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.school.loadSchoolApply({ token });

    }
}