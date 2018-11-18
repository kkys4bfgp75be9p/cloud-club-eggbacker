/**
 * 用于处理axtoken的中间件
 */
import Message, { ErrorType } from '../utils/message';
import Token from '../utils/token';

const excludePath = ['/access/login', '/index'];

export default () => {
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
            ctx.body = new Message(ErrorType.WX_TOKEN_NOT_FOUND);
        } else {
            // 判断 token 是否有效
            try{
                const checkToken = new Token();
                // 验证有误则发生异常
                checkToken.checkToken( xtoken );
                await next();
            }catch (e){
                ctx.logger.debug('token 状态: ', e);
                ctx.body = new Message(e);
            }
        }
    };
};