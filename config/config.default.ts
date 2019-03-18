import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
// let path = require('path');

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;
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
      // dialectOptions: {
      //   connectionTimeout: 0,
      //   requestTimeout: 0,
      // },
  };

  // config for cors
  config.cors = {
    origin: '*',
    allowHeaders: ['x-access-token', 'x-csrf-token'],
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    // credentials: true,
  };
  /**
   * 配置服务器启动项
   */
  config.cluster = {
    listen: {
      port: 7003,
      hostname: '127.0.0.1',
      // path: '/var/run/egg.sock',
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
  return {
    ...config,
    ...bizConfig,
  };
};
