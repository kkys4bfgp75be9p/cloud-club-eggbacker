/**
 * 个人奖项赛季相关接口设计
 */
import BaseController from './common/base';

export default class GiftController extends BaseController {
    /**
     * 获取已激活的赛季最新时间
     * 接口: /gift/next-lottery
     * 参数:
     *
     * 返回数据:
     *
     */
    public async nextLottery() {
        const { ctx } = this;
        ctx.body = await ctx.service.gift.getNextLottery();
    }

    /**
     * 获取已激活的赛季详细数据
     * 接口: /gift/active-info
     * 参数:
     *      
     * 返回数据:
     *
     */
    public async activeInfo() {
        const { ctx } = this;
        ctx.body = await ctx.service.gift.getActiveInfo();
    }

    /**
     * 获取历史赛季详细数据
     * 接口: /gift/history-list
     * 参数:
     *      
     * 返回数据:
     *
     */
    public async historyList() {
        const { ctx } = this;
        ctx.body = await ctx.service.gift.getHistoryList();
    }
}