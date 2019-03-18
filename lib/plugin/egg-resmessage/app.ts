// app.js
// import https from 'https';
// import fs from 'fs';
// let enforceHttps = require('koa-sslify');

/**
 * 框架提供了统一的入口文件（app.js）进行启动过程自定义，这个文件只返回一个函数。
 * 注意：在 beforeStart 中不建议做太耗时的操作，框架会有启动的超时检测。
 */
export default (app) => {

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