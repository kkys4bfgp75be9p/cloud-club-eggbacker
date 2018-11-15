"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动相关控制器
 */
const base_1 = require("./common/base");
class ActivityController extends base_1.default {
    /**
     * 获取我 `自己参与的` 社团活动的列表信息
     * 接口: /activity/simple-info
     * 参数:
     *      activity_id: 社团 id
     * 返回数据:
     *      Message
     */
    async get_simpleInfo() {
        const { ctx } = this;
        let { activity_id } = ctx.query;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.getSimpleInfo({ activity_id, token });
    }
    /**
     * 获取我 `自己参与的` 社团活动的列表信息
     * 接口: /activity/concerned-list
     * 参数:
     *      club_id: 社团 id
     *      timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    async get_concernedList() {
        const { ctx } = this;
        let { timing, club_id, pagenum } = ctx.query;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.getConcernedList({ timing, club_id, pagenum, token });
    }
    /**
     * 获取当前活动的配图列表
     * 接口: /activity/pics
     * 参数:
     *      activity_id: 活动id
     * 返回数据:
     *      Message
     */
    async get_pics() {
        const { ctx } = this;
        let { activity_id } = ctx.query;
        // let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.getActivityPics({ activity_id });
    }
    /**
     * 评论: 列表
     * 接口: /activity/comments-list
     * 参数:
     *      activity_id: 活动 id
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    async get_commentsList() {
        const { ctx } = this;
        let { activity_id, pagenum } = ctx.query;
        // let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.getCommentsList({ activity_id, pagenum });
    }
    /**
     * 评论: 添加
     * 2 分钟内不能再次评论
     * 接口: /activity/addComment
     * 参数:
     *      reply_client_id: 回复者的id (选填)
     *      activity_id: 活动id
     *      content: 评论内容
     * 返回数据:
     *
     *
     */
    async post_addComment() {
        const { ctx } = this;
        let { formId, activity_id, content, reply_client_id } = ctx.request.body;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.addComment({ formId, activity_id, content, reply_client_id, token });
    }
    /**
     * 获取 `公开的` 社团活动的列表信息
     * 接口: /activity/public-list
     * 参数:
     *      club_id: 社团 id
     *      timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    async get_publicList() {
        const { ctx } = this;
        let { timing, pagenum } = ctx.query;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.getPublicList({ timing, pagenum, token });
    }
    /**
     * 获取 `自己关注的` 社团活动的列表信息
     * 接口: /activity/attention-list
     * 参数:
     *      timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    async get_attentionList() {
        const { ctx } = this;
        let { timing, pagenum } = ctx.query;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.getAttentionList({ timing, pagenum, token });
    }
    /**
     * 获取 `自己学校的` 社团活动的列表信息
     * 接口: /activity/school-list
     * 参数:
     *      timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    async get_schoolList() {
        const { ctx } = this;
        let { timing, pagenum } = ctx.query;
        let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.getSchoolList({ timing, pagenum, token });
    }
    /**
     * 获取 `自己学校的` 社团活动的列表信息
     * 接口: /activity/album
     * 参数:
     *      club_id: 社团 id
     *      pagenum: 页码
     * 返回数据:
     *      Message
     */
    async get_album() {
        const { ctx } = this;
        let { club_id, pagenum } = ctx.query;
        // let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.getAlbum({ club_id, pagenum });
    }
}
exports.default = ActivityController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rpdml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsd0NBQTJDO0FBRTNDLE1BQXFCLGtCQUFtQixTQUFRLGNBQWM7SUFDMUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxjQUFjO1FBQ3ZCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSSxFQUFFLFdBQVcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDaEMsSUFBSSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNqRCxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFaEYsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNJLEtBQUssQ0FBQyxpQkFBaUI7UUFDMUIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzdDLElBQUksS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDakQsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUVoRyxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxRQUFRO1FBQ2pCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENB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