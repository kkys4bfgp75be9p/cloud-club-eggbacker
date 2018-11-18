/**
 * 登录相关接口控制器
 */
import BaseController from './common/base';

export default class ClubController extends BaseController {
    /**
     * 通过用户的 ObjectId 获取我的社团(简单)列表
     * 接口: /club/simple-list
     * 参数:
     *
     * 返回数据:
     *
     */
    public async get_simpleList(){
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
    public async get_detailList(){
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
    public async get_self_canapplyList(){
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
    public async get_self_applyList(){
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
    public async post_self_join(){
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
    public async get_contactList(){
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
    public async get_panelTips(){
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
    public async get_noticeList(){
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
    public async get_detailInfo(){
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
    public async get_attentionList(){
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
    public async post_addAttention(){
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
    public async post_cancelAttention(){
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
    public async get_recommendList(){
        const { ctx } = this;
        const { pagenum } = ctx.query;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.club.getRecommendList({ pagenum, token });

    }
}