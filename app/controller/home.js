"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./common/base");
class HomeController extends base_1.default {
    async index() {
        // const { ctx } = this;
        // ctx.body = await ctx.service.test.sayHi('egg');
        await this.ctx.render('index.tpl');
    }
    async test1() {
        const { ctx, app } = this;
        // console.log('Home Controller => ', ctx.helper.resmessage('a error', 'maybe this is a error!'));
        console.log('Home Controller => ', app['resmessage']('a error', 'maybe this is a error!'));
        ctx.body = `我收到了参数：${Object.assign({}, ctx.query)}`;
    }
}
exports.default = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MsTUFBcUIsY0FBZSxTQUFRLGNBQWM7SUFDeEQsS0FBSyxDQUFDLEtBQUs7UUFDVCx3QkFBd0I7UUFDeEIsa0RBQWtEO1FBQ2xELE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVNLEtBQUssQ0FBQyxLQUFLO1FBQ2hCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDO1FBQzFCLGtHQUFrRztRQUNsRyxPQUFPLENBQUMsR0FBRyxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxTQUFTLEVBQUUsd0JBQXdCLENBQUMsQ0FBQyxDQUFDO1FBQzNGLEdBQUcsQ0FBQyxJQUFJLEdBQUcsVUFBVyxrQkFBSSxHQUFHLENBQUMsS0FBSyxDQUFFLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0NBQ0Y7QUFiRCxpQ0FhQyJ9