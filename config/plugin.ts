import { EggPlugin } from 'egg';
// const path = require('path');

const plugin: EggPlugin = {

  // 启用插件: sequelize
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },
  // 启用插件: cors
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  // resmessage: {
  //   enable: true,
  //   path: path.join(__dirname, '../lib/plugin/egg-resmessage'),
  // },
  
  // 启用插件 egg-view-assets, 做静态资源模板
  // assets: {
  //   enable: true,
  //   package: 'egg-view-assets',
  // },

  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

  // view: {
  //   enable: true,
  //   package: 'egg-view',
  // },
};

export default plugin;
