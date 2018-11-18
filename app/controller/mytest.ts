import * as DBFormart from '../utils/DBFormart';
import BaseController from './common/base';

export default class MytestController extends BaseController {
    public async testGet() {
        const { ctx } = this;
        console.log('Get Query:::', ctx.query);
        // console.log('Get Request Body:::', ctx.request.body);
        // ctx.body = await ctx.service.test.sayHi('mytest egg');
        // const _ctx = this.ctx;
        const pagesize = 10;
        const offset = 0;
        let clientList = await ctx.model.Client.findAll({
            // where: {},
            order: [['createdAt', 'DESC']],
            limit: pagesize,
            offset,
            raw: true,
        });

        clientList = DBFormart.handleTimezone(clientList, ['createdAt']);
        ctx.body = clientList;
    }

    public async testPost() {
        console.log('Post ............................');
        const { ctx } = this;
        // console.log('Post Query:::', ctx.query);
        console.log('Post Request Body:::', ctx.request.body);
        // ctx.body = await ctx.service.test.sayHi('mytest egg');
        // const _ctx = this.ctx;
        const pagesize = 10;
        const offset = 0;
        let clientList = await ctx.model.Client.findAll({
            where: {
                unionid: { $not: 'test' },
            },
            order: [['createdAt', 'DESC']],
            limit: pagesize,
            offset,
            raw: true,
        });

        clientList = DBFormart.handleTimezone(clientList, ['createdAt']);
        ctx.body = clientList;
    }
}