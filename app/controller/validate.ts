/**
 * 审核相关控制器
 */
import BaseController from './common/base';

export default class ValidateController extends BaseController {
    /**
     * 获取用于审核的学校列表
     * 接口: /validate/school-setting-list
     * 参数:
     *      struts: 状态 (0 审核中 1 审核通过 -1 审核未通过)
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    public async getSchoolSettingList() {
        const { ctx } = this;
        // 参数部分
        const { struts, pagenum } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.validate.getSchoolSettingList({ struts, pagenum, token });
    }

    /**
     * 获取用于审核的社团创建列表
     * 接口: /validate/club-build-list
     * 参数:
     *      struts: 状态 （0 审核中 1 审核通过 -1 审核未通过）
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    public async getClubBuildList() {
        const { ctx } = this;
        const { struts, pagenum } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.validate.getClubBuildList({ struts, pagenum, token });

    }
    /**
     * 获取用于审核活动创建的列表
     * 接口: /validate/activity-create-list
     * 参数:
     *      struts: 状态 （0 待审核 -1 审核中 -2 已拒绝 1 已发布）
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    public async getActivityCreateList() {
        const { ctx } = this;
        const { struts, pagenum } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.validate.getActivityCreateList({ struts, pagenum, token });

    }
    /**
     * 获取用于审核的活动评论列表
     * 接口: /validate/comment-create-list
     * 参数:
     *      struts: 状态 (0 审核中 1 审核通过 -1 审核未通过)
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    public async getCommentCreateList() {
        const { ctx } = this;
        const { struts, pagenum } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.validate.getCommentCreateList({ struts, pagenum, token });

    }

    /** *******************************************************************************
     * 审核操作
     */

    /**
     * 审核设置学校的申请
     * 接口: /validate/exec-school
     * 参数:
     *      token: 用户登录凭证
     *      client_id: 用户id
     *      struts: 状态变更(0 审核中 1 审核通过 -1 审核未通过)
     *      checked_fail_reason: 未通过理由
     * 返回数据:
     *      Message {
            err: null,
            info: { }
     *
     */
    public async execSchool() {
        const { ctx } = this;
        const { client_id, struts, checked_fail_reason } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.validate.execSchool({ client_id, struts, checked_fail_reason, token });

    }

    /**
     * 审核社团建立申请
     * 接口: /validate/exec-build-club
     * 参数:
     *      token: 用户登录凭证
     *      client_id: 用户id
     *      club_apply_id: 社团申请单id
     *      struts: 状态变更(0 审核中 1 审核通过 -1 审核未通过)
     *      checked_fail_reason: 未通过理由
     * 返回数据:
     *      Message {
            err: null,
            info: { }
     *
     */
    public async execBuildClub() {
        const { ctx } = this;
        const { client_id, club_apply_id, struts, checked_fail_reason } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.validate.execBuildClub({ client_id, club_apply_id, struts, checked_fail_reason, token });

    }

    /**
     * 审核 创建社团活动 的申请
     * 接口: /validate/exec-activity
     * 参数:
     *      token: 用户登录凭证
     *      activity_id: 活动id
     *      struts: 状态变更（0 待审核 -1 审核中 -2 已拒绝 1 已发布）
     *      checked_fail_reason: 未通过理由
     * 返回数据:
     *      Message {
            err: null,
            info: { }
     *
     */
    public async execActivity() {
        const { ctx } = this;
        const { activity_id, struts, checked_fail_reason } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.validate.execBuildActivity({ activity_id, struts, checked_fail_reason, token });

    }

    /**
     * 审核 创建社团活动 的申请
     * 接口: /validate/exec-comment
     * 参数:
     *      token: 用户登录凭证
     *      comment_id: 用户id
     *      struts: 状态变更 (0 审核中, 1 审核通过, -1 审核未通过)
     *      checked_fail_reason: 未通过理由
     * 返回数据:
     *      Message {
            err: null,
            info: { }
     *
     */
    public async execComment() {
        const { ctx } = this;
        const { comment_id, struts, checked_fail_reason } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.validate.execBuildComment({ comment_id, struts, checked_fail_reason, token });

    }
}