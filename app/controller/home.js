"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./common/base");
class HomeController extends base_1.default {
    async index() {
        // const { ctx } = this;
        // ctx.body = await ctx.service.test.sayHi('egg');
        await this.ctx.render('index.tpl');
    }
}
exports.default = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MsTUFBcUIsY0FBZSxTQUFRLGNBQWM7SUFDeEQsS0FBSyxDQUFDLEtBQUs7UUFDVCx3QkFBd0I7UUFDeEIsa0RBQWtEO1FBQ2xELE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7SUFDckMsQ0FBQztDQUNGO0FBTkQsaUNBTUMifQ==