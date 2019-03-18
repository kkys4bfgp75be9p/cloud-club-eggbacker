"use strict";
// app.js
// import https from 'https';
// import fs from 'fs';
// let enforceHttps = require('koa-sslify');
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 框架提供了统一的入口文件（app.js）进行启动过程自定义，这个文件只返回一个函数。
 * 注意：在 beforeStart 中不建议做太耗时的操作，框架会有启动的超时检测。
 */
exports.default = (app) => {
    // console.log('【create plugin resmessage】 config => ', app.config.resmessage);
    // app.addSingleton('resmessage', createResMessage);
    /**
     * 自定义初始化方式
     */
    app.beforeStart(async () => {
        // 应用会等待这个函数执行完成才启动
        // app.cities = await app.curl('http://example.com/city.json', {
        //     method: 'GET',
        //     dataType: 'json',
        // });
        // console.log('【app】=> ', app.config);
        // 也可以通过以下方式来调用 Service
        // const ctx = app.createAnonymousContext();
        // ctx.resmessage = {
        //     name: 'I am a res message!'
        // };
        console.log('egg-resmessage ready!');
        // app.cities = await ctx.service.cities.load();
    });
};
// function createResMessage(config){
//     console.log('【create plugin resmessage】 config => ', config);
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTO0FBQ1QsNkJBQTZCO0FBQzdCLHVCQUF1QjtBQUN2Qiw0Q0FBNEM7O0FBRTVDOzs7R0FHRztBQUNILGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFFbkIsK0VBQStFO0lBQy9FLG9EQUFvRDtJQUVwRDs7T0FFRztJQUNILEdBQUcsQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUU7UUFDdkIsbUJBQW1CO1FBQ25CLGdFQUFnRTtRQUNoRSxxQkFBcUI7UUFDckIsd0JBQXdCO1FBQ3hCLE1BQU07UUFFTix1Q0FBdUM7UUFFdkMsdUJBQXVCO1FBQ3ZCLDRDQUE0QztRQUM1QyxxQkFBcUI7UUFDckIsa0NBQWtDO1FBQ2xDLEtBQUs7UUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDLENBQUM7UUFDckMsZ0RBQWdEO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0FBRVAsQ0FBQyxDQUFDO0FBRUYscUNBQXFDO0FBQ3JDLG9FQUFvRTtBQUNwRSxJQUFJIn0=