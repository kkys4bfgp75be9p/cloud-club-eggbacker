// app.js
// import https from 'https';
// import fs from 'fs';
// let enforceHttps = require('koa-sslify');

/**
 * 框架提供了统一的入口文件（app.js）进行启动过程自定义，这个文件只返回一个函数。
 * 注意：在 beforeStart 中不建议做太耗时的操作，框架会有启动的超时检测。
 */
export default (app) => {

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