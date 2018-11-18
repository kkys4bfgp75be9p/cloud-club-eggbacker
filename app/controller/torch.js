"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 火把控制层
 */
const base_1 = require("./common/base");
class TorchController extends base_1.default {
    /**
     * 获取今日份的火把
     * /torch/pull
     * 返回数据:
     *      Message { err: null, list: [ 1 ] }
     */
    async post_pull() {
        // let {nickname, avatar_url, gender} = req.body;
        const { ctx } = this;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.torch.pull({ token });
    }
    /**
     * 为活动加热( 投票 )
     * /torch/heating
     * 返回数据:
     *      Message { err: null, list: [ 1 ] }
     */
    async post_heating() {
        const { ctx } = this;
        const { activity_id } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.torch.heating({ activity_id, token });
    }
}
exports.default = TorchController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9yY2guanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b3JjaC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsd0NBQTJDO0FBRTNDLE1BQXFCLGVBQWdCLFNBQVEsY0FBYztJQUN2RDs7Ozs7T0FLRztJQUNJLEtBQUssQ0FBQyxTQUFTO1FBQ2xCLGlEQUFpRDtRQUNqRCxNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQ3JCLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDbkQsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ksS0FBSyxDQUFDLFlBQVk7UUFDckIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixNQUFNLEVBQUUsV0FBVyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7UUFDekMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNuRCxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUM7SUFDdkUsQ0FBQztDQUNKO0FBMUJELGtDQTBCQyJ9