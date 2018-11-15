"use strict";
// app.js
// import https from 'https';
// import fs from 'fs';
// let enforceHttps = require('koa-sslify');
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    // Force HTTPS on all page
    // app.use(enforceHttps());
    // let ssl_option = {
    //     key: fs.readFileSync('./cert/cert-1540222230559_she-u.cn.key'),
    //     cert: fs.readFileSync('./cert/cert-1540222230559_she-u.cn.crt')
    // };
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxTQUFTO0FBQ1QsNkJBQTZCO0FBQzdCLHVCQUF1QjtBQUN2Qiw0Q0FBNEM7O0FBRTVDLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFFbkIsMEJBQTBCO0lBQzFCLDJCQUEyQjtJQUUzQixxQkFBcUI7SUFDckIsc0VBQXNFO0lBQ3RFLHNFQUFzRTtJQUN0RSxLQUFLO0lBRUwsR0FBRyxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN2QixtQkFBbUI7UUFDbkIsZ0VBQWdFO1FBQ2hFLHFCQUFxQjtRQUNyQix3QkFBd0I7UUFDeEIsTUFBTTtRQUVOLHVDQUF1QztRQUV2Qyx1QkFBdUI7UUFDdkIsNENBQTRDO1FBQzVDLGdEQUFnRDtJQUNwRCxDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMsQ0FBQyJ9