"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const base_1 = require("./common/base");
class HomeController extends base_1.default {
    async index() {
        const { ctx } = this;
        ctx.body = await ctx.service.test.sayHi('egg');
    }
}
exports.default = HomeController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhvbWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx3Q0FBMkM7QUFFM0MsTUFBcUIsY0FBZSxTQUFRLGNBQWM7SUFDakQsS0FBSyxDQUFDLEtBQUs7UUFDaEIsTUFBTSxFQUFFLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNyQixHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ2pELENBQUM7Q0FDRjtBQUxELGlDQUtDIn0=