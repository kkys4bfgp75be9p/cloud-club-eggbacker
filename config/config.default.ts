import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

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
        min: 5,
        idle: 10000,
      },
      retry: { max: 3 },
      // dialectOptions: {
      //   connectionTimeout: 0,
      //   requestTimeout: 0,
      // },
  }

  // config for cors
  config.cors = {
    origin: '*',
    allowHeaders: ['x-access-token', 'x-csrf-token'],
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
    // credentials: true,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
