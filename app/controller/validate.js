"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 审核相关控制器
 */
const base_1 = require("./common/base");
class ValidateController extends base_1.default {
    /**
     * 获取用于审核的学校列表
     * 接口: /validate/school-setting-list
     * 参数:
     *      struts: 状态 (0 审核中 1 审核通过 -1 审核未通过)
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    async getSchoolSettingList() {
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
    async getClubBuildList() {
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
    async getActivityCreateList() {
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
    async getCommentCreateList() {
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
    async execSchool() {
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
    async execBuildClub() {
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
    async execActivity() {
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
    async execComment() {
        const { ctx } = this;
        const { comment_id, struts, checked_fail_reason } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.validate.execBuildComment({ comment_id, struts, checked_fail_reason, token });
    }
}
exports.default = ValidateController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsd0NBQTJDO0FBRTNDLE1BQXFCLGtCQUFtQixTQUFRLGNBQWM7SUFDMUQ7Ozs7Ozs7O09BUUc7SUFDSSxLQUFLLENBQUMsb0JBQW9CO1FBQzdCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTztRQUNQLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUN0QyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1FBQ25ELEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUMzRixDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSSxLQUFLLENBQUMsZ0JBQWdCO1FBQ3pCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQ3RDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBRXZGLENBQUM7SUFDRDs7Ozs7Ozs7T0FRRztJQUNJLEtBQUssQ0FBQyxxQkFBcUI7UUFDOUIsTUFBTSxFQUFFLEdBQUcs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