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
    // Force HTTPS on all page
    // app.use(enforceHttps());
    // let ssl_option = {
    //     key: fs.readFileSync('./cert/cert-1540222230559_she-u.cn.key'),
    //     cert: fs.readFileSync('./cert/cert-1540222230559_she-u.cn.crt')
    // };
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
        // app.cities = await ctx.service.cities.load();
    });
    app.on('error', (err, ctx) => {
        // report error
        ctx.logger.error('【onError】 => ', err);
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTO0FBQ1QsNkJBQTZCO0FBQzdCLHVCQUF1QjtBQUN2Qiw0Q0FBNEM7O0FBRTVDOzs7R0FHRztBQUNILGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFFbkIsMEJBQTBCO0lBQzFCLDJCQUEyQjtJQUUzQixxQkFBcUI7SUFDckIsc0VBQXNFO0lBQ3RFLHNFQUFzRTtJQUN0RSxLQUFLO0lBRUw7O09BRUc7SUFDSCxHQUFHLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3ZCLG1CQUFtQjtRQUNuQixnRUFBZ0U7UUFDaEUscUJBQXFCO1FBQ3JCLHdCQUF3QjtRQUN4QixNQUFNO1FBRU4sdUNBQXVDO1FBRXZDLHVCQUF1QjtRQUN2Qiw0Q0FBNEM7UUFDNUMsZ0RBQWdEO0lBQ3BELENBQUMsQ0FBQyxDQUFDO0lBRUgsR0FBRyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLEVBQUU7UUFDekIsZUFBZTtRQUNmLEdBQUcsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUMzQyxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9