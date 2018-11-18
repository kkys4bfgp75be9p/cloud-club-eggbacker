import { EggPlugin } from 'egg';

const plugin: EggPlugin = {
  // static: true,
  // nunjucks: {
  //   enable: true,
  //   package: 'egg-view-nunjucks',
  // },

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
  // 启用插件 egg-view-assets, 做静态资源模板
  // assets: {
  //   enable: true,
  //   package: 'egg-view-assets',
  // },

  nunjucks: {
    enable: true,
    package: 'egg-view-nunjucks',
  },

  // view: {
  //   enable: true,
  //   package: 'egg-view',
  // },
};

export default plugin;
