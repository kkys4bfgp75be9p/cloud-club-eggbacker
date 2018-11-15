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
  }
};

export default plugin;
