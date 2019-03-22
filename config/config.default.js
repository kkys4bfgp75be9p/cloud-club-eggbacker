"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let path = require('path');
exports.default = (appInfo) => {
    const config = {};
    console.log('【ENV】========> default');
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_20181105';
    // add your egg config in here
    config.middleware = ['xtoken', 'csrfauth', 'mwtest1'];
    config.xtoken = {
        ignore: ['/index', '/access/login'],
    };
    // config.resmessage = {
    //   f1: 'f1_value',
    //   f2: 'f2_value'
    // };
    // add your special config in here
    const bizConfig = {
        sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
    };
    config.security = {
        csrf: {
            // headerName: 'x-access-token', // 通过 query 传递 CSRF token 的默认字段为 _csrf
            // bodyName: 'x-access-token', // 通过 body 传递 CSRF token 的默认字段为 _csrf
            enable: false,
            ignoreJSON: true,
        },
    };
    // add sesquelize database connections config
    config.sequelize = {
        dialect: 'mysql',
        host: '39.104.190.35',
        port: 53306,
        database: 'cloud_club',
        username: 'baihaiou9',
        password: 'sHeuN.DaTAbasE201.810',
        timezone: '+08:00',
        pool: {
            max: 10,
            min: 1,
            idle: 10000,
        },
        retry: { max: 3 },
    };
    // config for cors
    config.cors = {
        origin: '*',
        allowHeaders: ['x-access-token', 'x-csrf-token'],
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    };
    /**
     * 配置服务器启动项
     */
    config.cluster = {
        listen: {
            port: 18000,
            hostname: '127.0.0.1',
        },
    };
    /**
     * 配置日志位置
     */
    config.logger = {
        // 相对config文件夹的上一级目录
        dir: '../egglogs',
    };
    /**
     * 配置 视图引擎
     */
    // config.view = {
    //   // root: path.join(appInfo.baseDir, 'app/assets'),
    //   defaultViewEngine: 'nunjucks',
    //   mapping: {
    //       '.tpl': 'nunjucks',
    //   },
    // };
    // config.assets = {
    //   templatePath: path.join(appInfo.baseDir, 'app/view/template.html'),
    //   templateViewEngine: 'nunjucks',
    // };
    // the return config will combines to EggAppConfig
    return Object.assign({}, config, bizConfig);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhCQUE4QjtBQUU5QixrQkFBZSxDQUFDLE9BQW1CLEVBQUUsRUFBRTtJQUNyQyxNQUFNLE1BQU0sR0FBRyxFQUFnQyxDQUFDO0lBQ2hELE9BQU8sQ0FBQyxHQUFHLENBQUMsd0JBQXdCLENBQUMsQ0FBQztJQUV0QywwQ0FBMEM7SUFDMUMsdUVBQXVFO0lBQ3ZFLE1BQU0sQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDLElBQUksR0FBRyxXQUFXLENBQUM7SUFFekMsOEJBQThCO0lBQzlCLE1BQU0sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBRXRELE1BQU0sQ0FBQyxNQUFNLEdBQUc7UUFDZCxNQUFNLEVBQUUsQ0FBQyxRQUFRLEVBQUUsZUFBZSxDQUFDO0tBQ3BDLENBQUM7SUFFRix3QkFBd0I7SUFDeEIsb0JBQW9CO0lBQ3BCLG1CQUFtQjtJQUNuQixLQUFLO0lBRUwsa0NBQWtDO0lBQ2xDLE1BQU0sU0FBUyxHQUFHO1FBQ2hCLFNBQVMsRUFBRSxpREFBaUQsT0FBTyxDQUFDLElBQUksRUFBRTtLQUMzRSxDQUFDO0lBRUYsTUFBTSxDQUFDLFFBQVEsR0FBRztRQUNoQixJQUFJLEVBQUU7WUFDSix1RUFBdUU7WUFDdkUsb0VBQW9FO1lBQ3BFLE1BQU0sRUFBRSxLQUFLO1lBQ2IsVUFBVSxFQUFFLElBQUk7U0FDakI7S0FDRixDQUFDO0lBRUYsNkNBQTZDO0lBQzdDLE1BQU0sQ0FBQyxTQUFTLEdBQUc7UUFDZixPQUFPLEVBQUUsT0FBTztRQUNoQixJQUFJLEVBQUUsZUFBZTtRQUNyQixJQUFJLEVBQUUsS0FBSztRQUNYLFFBQVEsRUFBRSxZQUFZO1FBQ3RCLFFBQVEsRUFBRSxXQUFXO1FBQ3JCLFFBQVEsRUFBRSx1QkFBdUI7UUFDakMsUUFBUSxFQUFFLFFBQVE7UUFDbEIsSUFBSSxFQUFFO1lBQ0osR0FBRyxFQUFFLEVBQUU7WUFDUCxHQUFHLEVBQUUsQ0FBQztZQUNOLElBQUksRUFBRSxLQUFLO1NBQ1o7UUFDRCxLQUFLLEVBQUUsRUFBRSxHQUFHLEVBQUUsQ0FBQyxFQUFFO0tBS3BCLENBQUM7SUFFRixrQkFBa0I7SUFDbEIsTUFBTSxDQUFDLElBQUksR0FBRztRQUNaLE1BQU0sRUFBRSxHQUFHO1FBQ1gsWUFBWSxFQUFFLENBQUMsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDO1FBQ2hELFlBQVksRUFBRSx3Q0FBd0M7S0FFdkQsQ0FBQztJQUNGOztPQUVHO0lBQ0gsTUFBTSxDQUFDLE9BQU8sR0FBRztRQUNmLE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxLQUFLO1lBQ1gsUUFBUSxFQUFFLFdBQVc7U0FFdEI7S0FDRixDQUFDO0lBQ0Y7O09BRUc7SUFDSCxNQUFNLENBQUMsTUFBTSxHQUFHO1FBQ2Qsb0JBQW9CO1FBQ3BCLEdBQUcsRUFBRSxZQUFZO0tBQ2xCLENBQUM7SUFDRjs7T0FFRztJQUNILGtCQUFrQjtJQUNsQix1REFBdUQ7SUFDdkQsbUNBQW1DO0lBQ25DLGVBQWU7SUFDZiw0QkFBNEI7SUFDNUIsT0FBTztJQUNQLEtBQUs7SUFFTCxvQkFBb0I7SUFDcEIsd0VBQXdFO0lBQ3hFLG9DQUFvQztJQUNwQyxLQUFLO0lBRUwsa0RBQWtEO0lBQ2xELHlCQUNLLE1BQU0sRUFDTixTQUFTLEVBQ1o7QUFDSixDQUFDLENBQUMifQ==