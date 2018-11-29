"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 个人奖项赛季相关接口设计
 */
const base_1 = require("./common/base");
class GiftController extends base_1.default {
    /**
     * 获取已激活的赛季最新时间
     * 接口: /gift/next-lottery
     * 参数:
     *
     * 返回数据:
     *
     */
    async nextLottery() {
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
    async activeInfo() {
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
    async historyList() {
        const { ctx } = this;
        ctx.body = await ctx.service.gift.getHistoryList();
    }
}
exports.default = GiftController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2lmdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdpZnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUEyQztBQUUzQyxNQUFxQixjQUFlLFNBQVEsY0FBYztJQUN0RDs7Ozs7OztPQU9HO0lBQ0ksS0FBSyxDQUFDLFdBQVc7UUFDcEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSSxLQUFLLENBQUMsVUFBVTtRQUNuQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN0RCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNJLEtBQUssQ0FBQyxXQUFXO1FBQ3BCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3ZELENBQUM7Q0FDSjtBQXZDRCxpQ0F1Q0MifQ==