import { EggAppConfig, PowerPartial, EggAppInfo } from 'egg';

export default (appInfo: EggAppInfo) => {

  console.log('【ENV】========> prod');

  const config: PowerPartial<EggAppConfig> = {};
  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_20181105';

  // the return config will combines to EggAppConfig
  return {
    ...config,
  };
};
