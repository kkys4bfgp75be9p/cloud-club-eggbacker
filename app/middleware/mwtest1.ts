/**
 * 一个测试用的中间件
 */
export default () => {
    return async (ctx, next) => {
        console.log('【middleware】 There is mw test1...');
        ctx.state.csrf = ctx.csrf;
        await next();
    };
};