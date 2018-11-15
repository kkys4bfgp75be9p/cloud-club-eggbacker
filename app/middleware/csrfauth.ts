/**
 * 处理跨域的中间件
 */
export default () => {
    return async (ctx, next) => {
        console.log('There is csrf auth...');
        ctx.state.csrf = ctx.csrf;
        await next();
    }
}