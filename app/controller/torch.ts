/**
 * 火把控制层
 */
import BaseController from './common/base';

export default class TorchController extends BaseController {
    /**
     * 获取今日份的火把
     * /torch/pull
     * 返回数据:
     *      Message { err: null, list: [ 1 ] }
     */
    public async post_pull(){
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
    public async post_heating(){
        const { ctx } = this;
        const { activity_id } = ctx.request.body;
        const token = ctx.request.header['x-access-token'];
        ctx.body = await ctx.service.torch.heating({ activity_id, token });
    }
}