"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用于处理axtoken的中间件
 */
const message_1 = require("../utils/message");
const token_1 = require("../utils/token");
const excludePath = ['/access/login', '/index'];
exports.default = () => {
    return async (ctx, next) => {
        // console.log('cors middleware...', ctx);
        // 排除登录路径, 其他路径一律需
        const { url } = ctx.request;
        for (const epath of excludePath) {
            if (url === epath) {
                // console.log(`路径【${url}】是排除列表的内容，不验证token。。`);
                return await next();
            }
        }
        // console.log(`必须验证【${url}】中的header是否包含xtoken...`);
        console.log('【请求中的header】: ', ctx.request.header);
        const xtoken = ctx.request.header['x-access-token'];
        if (!xtoken) {
            ctx.logger.error('请求中的 token 不存在! ');
            ctx.body = new message_1.default(message_1.ErrorType.WX_TOKEN_NOT_FOUND);
        }
        else {
            // 判断 token 是否有效
            try {
                const checkToken = new token_1.default();
                // 验证有误则发生异常
                checkToken.checkToken(xtoken);
                await next();
            }
            catch (e) {
                ctx.logger.debug('token 状态: ', e);
                ctx.body = new message_1.default(e);
            }
        }
    };
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsieHRva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCw4Q0FBc0Q7QUFDdEQsMENBQW1DO0FBRW5DLE1BQU0sV0FBVyxHQUFHLENBQUMsZUFBZSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBRWhELGtCQUFlLEdBQUcsRUFBRTtJQUNoQixPQUFPLEtBQUssRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLEVBQUU7UUFDdkIsMENBQTBDO1FBQzFDLGtCQUFrQjtRQUNsQixNQUFNLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQztRQUM1QixLQUFLLE1BQU0sS0FBSyxJQUFJLFdBQVcsRUFBRTtZQUM3QixJQUFJLEdBQUcsS0FBSyxLQUFLLEVBQUU7Z0JBQ2YsZ0RBQWdEO2dCQUNoRCxPQUFPLE1BQU0sSUFBSSxFQUFFLENBQUM7YUFDdkI7U0FDSjtRQUNELG9EQUFvRDtRQUNwRCxPQUFPLENBQUMsR0FBRyxDQUFDLGdCQUFnQixFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDbEQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsTUFBTSxFQUFFO1lBQ1QsR0FBRyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUNyQyxHQUFHLENBQUMsSUFBSSxHQUFHLElBQUksaUJBQU8sQ0FBQyxtQkFBUyxDQUFDLGtCQUFrQixDQUFDLENBQUM7U0FDeEQ7YUFBTTtZQUNILGdCQUFnQjtZQUNoQixJQUFHO2dCQUNDLE1BQU0sVUFBVSxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7Z0JBQy9CLFlBQVk7Z0JBQ1osVUFBVSxDQUFDLFVBQVUsQ0FBRSxNQUFNLENBQUUsQ0FBQztnQkFDaEMsTUFBTSxJQUFJLEVBQUUsQ0FBQzthQUNoQjtZQUFBLE9BQU8sQ0FBQyxFQUFDO2dCQUNOLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDN0I7U0FDSjtJQUNMLENBQUMsQ0FBQztBQUNOLENBQUMsQ0FBQyJ9