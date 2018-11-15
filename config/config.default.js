"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
    config.cluster = {
        listen: {
            port: 7003,
            hostname: '127.0.0.1',
        }
    };
    // the return config will combines to EggAppConfig
    return Object.assign({}, config, bizConfig);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmRlZmF1bHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcuZGVmYXVsdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsT0FBbUIsRUFBRSxFQUFFO0lBQ3JDLE1BQU0sTUFBTSxHQUFHLEVBQWdDLENBQUM7SUFFaEQsMENBQTBDO0lBQzFDLHVFQUF1RTtJQUN2RSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0lBRXpDLDhCQUE4QjtJQUM5QixNQUFNLENBQUMsVUFBVSxHQUFHLENBQUMsUUFBUSxFQUFFLFVBQVUsQ0FBQyxDQUFDO0lBRTNDLGtDQUFrQztJQUNsQyxNQUFNLFNBQVMsR0FBRztRQUNoQixTQUFTLEVBQUUsaURBQWlELE9BQU8sQ0FBQyxJQUFJLEVBQUU7S0FDM0UsQ0FBQztJQUVGLE1BQU0sQ0FBQyxRQUFRLEdBQUc7UUFDaEIsSUFBSSxFQUFFO1lBQ0osdUVBQXVFO1lBQ3ZFLG9FQUFvRTtZQUNwRSxNQUFNLEVBQUUsS0FBSztZQUNiLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO0tBQ0YsQ0FBQztJQUVGLDZDQUE2QztJQUM3QyxNQUFNLENBQUMsU0FBUyxHQUFHO1FBQ2YsT0FBTyxFQUFFLE9BQU87UUFDaEIsSUFBSSxFQUFFLGVBQWU7UUFDckIsSUFBSSxFQUFFLEtBQUs7UUFDWCxRQUFRLEVBQUUsWUFBWTtRQUN0QixRQUFRLEVBQUUsV0FBVztRQUNyQixRQUFRLEVBQUUsdUJBQXVCO1FBQ2pDLFFBQVEsRUFBRSxRQUFRO1FBQ2xCLElBQUksRUFBRTtZQUNKLEdBQUcsRUFBRSxFQUFFO1lBQ1AsR0FBRyxFQUFFLENBQUM7WUFDTixJQUFJLEVBQUUsS0FBSztTQUNaO1FBQ0QsS0FBSyxFQUFFLEVBQUUsR0FBRyxFQUFFLENBQUMsRUFBRTtLQUtwQixDQUFBO0lBRUQsa0JBQWtCO0lBQ2xCLE1BQU0sQ0FBQyxJQUFJLEdBQUc7UUFDWixNQUFNLEVBQUUsR0FBRztRQUNYLFlBQVksRUFBRSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQztRQUNoRCxZQUFZLEVBQUUsd0NBQXdDO0tBRXZELENBQUM7SUFFRixNQUFNLENBQUMsT0FBTyxHQUFHO1FBQ2YsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLElBQUk7WUFDVixRQUFRLEVBQUUsV0FBVztTQUV0QjtLQUNGLENBQUE7SUFFRCxrREFBa0Q7SUFDbEQseUJBQ0ssTUFBTSxFQUNOLFNBQVMsRUFDWjtBQUNKLENBQUMsQ0FBQyJ9