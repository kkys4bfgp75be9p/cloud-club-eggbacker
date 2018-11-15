"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用于处理axtoken的中间件
 */
const token_1 = require("../utils/token");
const message_1 = require("../utils/message");
const excludePath = ['/access/login'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieHRva2VuLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsieHRva2VuLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCwwQ0FBbUM7QUFDbkMsOENBQXNEO0FBRXRELE1BQU0sV0FBVyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUM7QUFFdEMsa0JBQWUsR0FBRyxFQUFFO0lBQ2hCLE9BQU8sS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtRQUN2QiwwQ0FBMEM7UUFDMUMsa0JBQWtCO1FBQ2xCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDO1FBQzVCLEtBQUssTUFBTSxLQUFLLElBQUksV0FBVyxFQUFFO1lBQzdCLElBQUksR0FBRyxLQUFLLEtBQUssRUFBRTtnQkFDZixnREFBZ0Q7Z0JBQ2hELE9BQU8sTUFBTSxJQUFJLEVBQUUsQ0FBQzthQUN2QjtTQUNKO1FBQ0Qsb0RBQW9EO1FBQ3BELE1BQU0sTUFBTSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7UUFDcEQsSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNULEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUFDLENBQUM7WUFDckMsR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFPLENBQUMsbUJBQVMsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ3hEO2FBQU07WUFDSCxnQkFBZ0I7WUFDaEIsSUFBRztnQkFDQyxNQUFNLFVBQVUsR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO2dCQUMvQixZQUFZO2dCQUNaLFVBQVUsQ0FBQyxVQUFVLENBQUUsTUFBTSxDQUFFLENBQUM7Z0JBQ2hDLE1BQU0sSUFBSSxFQUFFLENBQUM7YUFDaEI7WUFBQSxPQUFNLENBQUMsRUFBQztnQkFDTCxHQUFHLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2xDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQzdCO1NBQ0o7SUFDTCxDQUFDLENBQUE7QUFDTCxDQUFDLENBQUEifQ==