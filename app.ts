// app.js
// import https from 'https';
// import fs from 'fs';
// let enforceHttps = require('koa-sslify');

export default (app) => {

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