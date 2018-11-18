/**
 * sys用户角色表
 */
const moment = require('moment');

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const CheckerRole = app.model.define('checker_role', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    openid: {
      type: CHAR(128),
      allowNull: false,
    },
    username: {
      type: STRING(16),
      allowNull: false,
    },
    the_power: {
      type: INTEGER(11),
      allowNull: true,
    },
    createdAt: {
      type: DATE,
      get createdAt() {
        // app.logger.info('【Moment CreatedAt】: ',this['createdAt']);
        return moment(CheckerRole.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW,
    },
  }, {
      tableName: 'checker_role',
      timestamps: false,
    });
  return CheckerRole;
};