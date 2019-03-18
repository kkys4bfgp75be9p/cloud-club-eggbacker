"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 一个测试用的中间件
 */
exports.default = () => {
    return async (ctx, next) => {
        console.log('【middleware】 There is mw test1...');
        ctx.state.csrf = ctx.csrf;
        await next();
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXd0ZXN0MS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm13dGVzdDEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILGtCQUFlLEdBQUcsRUFBRTtJQUNoQixPQUFPLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFDO1FBQ2pELEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUM7UUFDMUIsTUFBTSxJQUFJLEVBQUUsQ0FBQztJQUNqQixDQUFDLENBQUM7QUFDTixDQUFDLENBQUMifQ==