"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let path = require('path');
exports.default = (appInfo) => {
    const config = {};
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_20181105';
    // add your egg config in here
    config.middleware = ['xtoken', 'csrfauth'];
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
            port: 7003,
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
    config.view = {
        // root: path.join(appInfo.baseDir, 'app/assets'),
        defaultViewEngine: 'nunjucks',
        mapping: {
            '.tpl': 'nunjucks',
        },
    };
    // config.assets = {
    //   templatePath: path.join(appInfo.baseDir, 'app/view/template.html'),
    //   templateViewEngine: 'nunjucks',
    // };
    // the return config will combines to EggAppConfig
    return Object.assign({}, config, bizConfig);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUNBLDhCQUE4QjtBQUU5QixrQkFBZSxDQUFDLE9BQW1CLEVBQUUsRUFBRTtJQUNyQyxNQUFNLE1BQU0sR0FBRyxFQUFnQyxDQUFDO0lBRWhELDBDQUEwQztJQUMxQyx1RUFBdUU7SUFDdkUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztJQUV6Qyw4QkFBOEI7SUFDOUIsTUFBTSxDQUFDLFVBQVUsR0FBRyxDQUFDLFFBQVEsRUFBRSxVQUFVLENBQUMsQ0FBQztJQUUzQyxrQ0FBa0M7SUFDbEMsTUFBTSxTQUFTLEdBQUc7UUFDaEIsU0FBUyxFQUFFLGlEQUFpRCxPQUFPLENBQUMsSUFBSSxFQUFFO0tBQzNFLENBQUM7SUFFRixNQUFNLENBQUMsUUFBUSxHQUFHO1FBQ2hCLElBQUksRUFBRTtZQUNKLHVFQUF1RTtZQUN2RSxvRUFBb0U7WUFDcEUsTUFBTSxFQUFFLEtBQUs7WUFDYixVQUFVLEVBQUUsSUFBSTtTQUNqQjtLQUNGLENBQUM7SUFFRiw2Q0FBNkM7SUFDN0MsTUFBTSxDQUFDLFNBQVMsR0FBRztRQUNmLE9BQU8sRUFBRSxPQUFPO1FBQ2hCLElBQUksRUFBRSxlQUFlO1FBQ3JCLElBQUksRUFBRSxLQUFLO1FBQ1gsUUFBUSxFQUFFLFlBQVk7UUFDdEIsUUFBUSxFQUFFLFdBQVc7UUFDckIsUUFBUSxFQUFFLHVCQUF1QjtRQUNqQyxRQUFRLEVBQUUsUUFBUTtRQUNsQixJQUFJLEVBQUU7WUFDSixHQUFHLEVBQUUsRUFBRTtZQUNQLEdBQUcsRUFBRSxDQUFDO1lBQ04sSUFBSSxFQUFFLEtBQUs7U0FDWjtRQUNELEtBQUssRUFBRSxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUU7S0FLcEIsQ0FBQztJQUVGLGtCQUFrQjtJQUNsQixNQUFNLENBQUMsSUFBSSxHQUFHO1FBQ1osTUFBTSxFQUFFLEdBQUc7UUFDWCxZQUFZLEVBQUUsQ0FBQyxnQkFBZ0IsRUFBRSxjQUFjLENBQUM7UUFDaEQsWUFBWSxFQUFFLHdDQUF3QztLQUV2RCxDQUFDO0lBQ0Y7O09BRUc7SUFDSCxNQUFNLENBQUMsT0FBTyxHQUFHO1FBQ2YsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsV0FBVztTQUV0QjtLQUNGLENBQUM7SUFDRjs7T0FFRztJQUNILE1BQU0sQ0FBQyxNQUFNLEdBQUc7UUFDZCxvQkFBb0I7UUFDcEIsR0FBRyxFQUFFLFlBQVk7S0FDbEIsQ0FBQztJQUNGOztPQUVHO0lBQ0gsTUFBTSxDQUFDLElBQUksR0FBRztRQUNaLGtEQUFrRDtRQUNsRCxpQkFBaUIsRUFBRSxVQUFVO1FBQzdCLE9BQU8sRUFBRTtZQUNMLE1BQU0sRUFBRSxVQUFVO1NBQ3JCO0tBQ0YsQ0FBQztJQUVGLG9CQUFvQjtJQUNwQix3RUFBd0U7SUFDeEUsb0NBQW9DO0lBQ3BDLEtBQUs7SUFFTCxrREFBa0Q7SUFDbEQseUJBQ0ssTUFBTSxFQUNOLFNBQVMsRUFDWjtBQUNKLENBQUMsQ0FBQyJ9