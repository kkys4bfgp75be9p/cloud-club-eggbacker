/**
 * 社团活动相关控制器
 */
import BaseController from './common/base';

export default class ActivityController extends BaseController {
    /**
     * 获取我 `自己参与的` 社团活动的列表信息
     * 接口: /activity/simple-info
     * 参数: 
     *      activity_id: 社团 id
     * 返回数据: 
     *      Message 
     */
    public async get_simpleInfo() {
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
    public async get_concernedList() {
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
    public async get_pics() {
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
    public async get_commentsList() {
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
    public async post_addComment() {
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
    public async get_publicList() {
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
    public async get_attentionList() {
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
    public async get_schoolList() {
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
    public async get_album() {
        const { ctx } = this;
        let { club_id, pagenum } = ctx.query;
        // let token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.activity.getAlbum({ club_id, pagenum});
        
    }
}