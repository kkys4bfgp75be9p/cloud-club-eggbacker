"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 处理跨域的中间件
 */
exports.default = () => {
    return async (ctx, next) => {
        console.log('【middleware】 There is csrf auth...');
        ctx.state.csrf = ctx.csrf;
        await next();
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3NyZmF1dGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjc3JmYXV0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsa0JBQWUsR0FBRyxFQUFFO0lBQ2hCLE9BQU8sS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN2QixPQUFPLENBQUMsR0FBRyxDQUFDLG9DQUFvQyxDQUFDLENBQUM7UUFDbEQsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQztRQUMxQixNQUFNLElBQUksRUFBRSxDQUFDO0lBQ2pCLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyJ9