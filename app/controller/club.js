"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 登录相关接口控制器
 */
const base_1 = require("./common/base");
class ClubController extends base_1.default {
    /**
     * 通过用户的 ObjectId 获取我的社团(简单)列表
     * 接口: /club/simple-list
     * 参数:
     *
     * 返回数据:
     *
     */
    async get_simpleList() {
        // let {pagenum} = ctx.query;
        const { ctx } = this;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.getSimpleList({ token });
    }
    /**
     * 通过用户的 ObjectId 获取我的社团(详细)列表
     * 接口: /club/detail-list
     * 参数:
     *
     * 返回数据:
     *
     */
    async get_detailList() {
        // let {pagenum} = ctx.query;
        const { ctx } = this;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.getDetailList({ token });
    }
    /**
     * 获取本校社团(可申请加入的)列表
     * 接口: /club/self/canapply-list
     * 参数:
     *      pagenum: 页码
     * 返回数据:
     *
     */
    async get_self_canapplyList() {
        // let {pagenum} = ctx.query;
        const { ctx } = this;
        const { pagenum } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.getSelfCanapplyList({ pagenum, token });
    }
    /**
     * 获取申请加入社团的历史列表(仅仅是申请历史咯)
     * 接口: /club/self/apply-list
     * 参数:
     *      pagenum: 页码
     * 返回数据:
     *
     */
    async get_self_applyList() {
        // let {pagenum} = ctx.query;
        const { ctx } = this;
        const { pagenum } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.getSelfApplyList({ pagenum, token });
    }
    /**
     * 申请加入社团
     * 同一时间对某社团的申请,可以有多个 -1(被拒绝状态), 但0(申请中) 和 1(已通过)只能有一个
     * 接口: /club/self/join
     * 参数:
     *      token: 用户登录凭证
     *      clubid: 社团id
     * 返回数据:
     *      Message {
            err: null,
            info:
            { createdAt: '2018-10-08 10:43:37',
                checked_date: '2018-10-08 10:43:37',
                id: 'f5169ce0-caa3-11e8-b0fd-5db0598f423d',
                club_id: 'ea9e88ca-ca1d-11e8-a8d2-54bf64582633',
                apply_client_id: '7b2ae580-c922-11e8-b035-35dbdc0da7bf' } }
     *
     */
    async post_self_join() {
        const { ctx } = this;
        const { formId, clubid } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.joinClub({ formId, clubid, token });
    }
    /** ***********************************************************
     * 社团: 面板相关业务
     ***********************************************************  */
    /**
     * 查询社团联系人
     * 根据用户在当前社团的权限,分配操作权限
     * 接口: /club/contact-list
     * 参数:
     *      clubid: 社团id
     *      pagenum: 页码
     * 返回数据:
     *
     */
    async get_contactList() {
        const { ctx } = this;
        const { clubid, pagenum } = ctx.query;
        ctx.body = await ctx.service.club.getContactList({ clubid, pagenum });
    }
    /**
     * 查询社团面板提示信息
     * 包含公告提示、申请入社数据提示
     * 设置缓存, 不经历后台
     * 接口: /club/panel-tips
     * 参数:
     *      clubid: 社团id
     *      last_read_notice: 最后阅读时间(缓存里拿)
     * 返回数据:
     *      Message {
            err: null,
            info: TextRow { notice_count: 0, newjoin_count: 3 } }
     */
    async get_panelTips() {
        const { ctx } = this;
        const { clubid, last_read_notice } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.getPanelTips({ clubid, last_read_notice, token });
    }
    /**
     * 查看公告列表
     * 接口: /club/notice-list
     * 参数:
     *      clubid: 社团id
     *      pagenum: 最后阅读时间(缓存里拿)
     * 返回数据:
     *      Message {
      err: null,
      list:
       [ { id: 'a800536e-cb62-11e8-a8d2-54bf64582633',
           title: '解熠萱明滕润穆轩灵吕峻慕千韩',
           content: '彤冷湛若经云康朗祝湛席琴乾郑磊丹波蔡彭包弘昱青菱刁曼良邢菡磊谷真香柯鹏戚江明云弘乐宛薛柳平宇槐超瑾泽嘉豪绍阮鑫孤如',
           createdAt: '2018-01-23 18:31:16',
           'crole.realname': '白海鸥' }]
     */
    async get_noticeList() {
        const { ctx } = this;
        const { clubid, pagenum } = ctx.query;
        ctx.body = await ctx.service.club.getNoticeList({ clubid, pagenum });
    }
    /**
     * 查看社团资料
     * 接口: /club/detail-info
     * 参数:
     *      clubid: 社团id
     * 返回数据:
     *      Message {
            err: null,
            info:
            { id: 'ea9cf07a-ca1d-11e8-a8d2-54bf64582633',
                title: '黎缪郎社',
                struts: 1,
                createdAt: '2018-10-07 18:43:54',
                logo_url: null,
                bgimg_url: null,
                intro: null } }
     */
    async get_detailInfo() {
        const { ctx } = this;
        const { clubid } = ctx.query;
        ctx.body = await ctx.service.club.getDetailInfo({ clubid });
    }
    /**
     * 查看我的关注(社团)列表
     * 接口: /club/attention-list
     * 参数:
     *      pagenum: 页码
     * 返回数据:
     */
    async get_attentionList() {
        const { ctx } = this;
        const { pagenum } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.getAttentionList({ pagenum, token });
    }
    /**
     * 加入收藏(社团)
     * 接口: /club/add-attention
     * 参数:
     *      token: 用户登录凭证
     *      club_id: 社团id
     * 返回数据:
     *
     */
    async post_addAttention() {
        const { ctx } = this;
        const { club_id } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.addAttention({ club_id, token });
    }
    /**
     * 取消关注(社团)
     * 接口: /club/cancel-attention
     * 参数:
     *      token: 用户登录凭证
     *      club_id: 社团id
     * 返回数据:
     *      Message { err: null, info: 1 }
     */
    async post_cancelAttention() {
        const { ctx } = this;
        const { club_id } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.cancelAttention({ club_id, token });
    }
    /**
     * 查看 推荐的社团 列表
     * 接口: /club/recommend-list
     * 参数:
     *      pagenum: 页码
     * 返回数据:
     */
    async get_recommendList() {
        const { ctx } = this;
        const { pagenum } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.getRecommendList({ pagenum, token });
    }
}
exports.default = ClubController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUEyQztBQUUzQyxNQUFxQixjQUFlLFNBQVEsY0FBYztJQUN0RDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLGNBQWM7UUFDdkIsNkJBQTZCO1FBQzdCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztJQUUvRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxjQUFjO1FBQ3ZCLDZCQUE2QjtRQUM3QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFFL0QsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMscUJBQXFCO1FBQzlCLDZCQUE2QjtRQUM3QixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1FBQzlCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFD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