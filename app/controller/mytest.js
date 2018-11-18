"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DBFormart = require("../utils/DBFormart");
const base_1 = require("./common/base");
class MytestController extends base_1.default {
    async testGet() {
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
    async testPost() {
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
exports.default = MytestController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXl0ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibXl0ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsZ0RBQWdEO0FBQ2hELHdDQUEyQztBQUUzQyxNQUFxQixnQkFBaUIsU0FBUSxjQUFjO0lBQ2pELEtBQUssQ0FBQyxPQUFPO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxjQUFjLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3ZDLHdEQUF3RDtRQUN4RCx5REFBeUQ7UUFDekQseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxVQUFVLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDNUMsYUFBYTtZQUNiLEtBQUssRUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzlCLEtBQUssRUFBRSxRQUFRO1lBQ2YsTUFBTTtZQUNOLEdBQUcsRUFBRSxJQUFJO1NBQ1osQ0FBQyxDQUFDO1FBRUgsVUFBVSxHQUFHLFNBQVMsQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztRQUNqRSxHQUFHLENBQUMsSUFBSSxHQUFHLFVBQVUsQ0FBQztJQUMxQixDQUFDO0lBRU0sS0FBSyxDQUFDLFFBQVE7UUFDakIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pELE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsMkNBQTJDO1FBQzNDLE9BQU8sQ0FBQyxHQUFHLENBQUMsc0JBQXNCLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0RCx5REFBeUQ7UUFDekQseUJBQXlCO1FBQ3pCLE1BQU0sUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUNwQixNQUFNLE1BQU0sR0FBRyxDQUFDLENBQUM7UUFDakIsSUFBSSxVQUFVLEdBQUcsTUFBTSxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUM7WUFDNUMsS0FBSyxFQUFFO2dCQUNILE9BQU8sRUFBRSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUU7YUFDNUI7WUFDRCxLQUFLLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxNQUFNLENBQUMsQ0FBQztZQUM5QixLQUFLLEVBQUUsUUFBUTtZQUNmLE1BQU07WUFDTixHQUFHLEVBQUUsSUFBSTtTQUNaLENBQUMsQ0FBQztRQUVILFVBQVUsR0FBRyxTQUFTLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7UUFDakUsR0FBRyxDQUFDLElBQUksR0FBRyxVQUFVLENBQUM7SUFDMUIsQ0FBQztDQUNKO0FBM0NELG1DQTJDQyJ9