/**
 * 用户角色表
 */
const moment = require('moment');

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const ClientRole = app.model.define('client_role', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    client_id: {
      type: CHAR(36),
      allowNull: false,
    },
    school_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    profe: {
      type: STRING(32),
      allowNull: true,
    },
    educ_job: {
      type: STRING(16),
      allowNull: true,
    },
    realname: {
      type: STRING(16),
      allowNull: true,
    },
    cert_url: {
      type: STRING(200),
      allowNull: true,
    },
    struts: {
      type: INTEGER(11),
      allowNull: true,
    },
    checked_fail_reason: {
      type: STRING(64),
      allowNull: true,
    },
    formId: {
      type: STRING(128),
      allowNull: true,
    },
    createdAt: {
      type: DATE,
      get createdAt() {
          return moment(ClientRole.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW,
    },
  }, {
    tableName: 'client_role',
    timestamps: false,
  });
  return ClientRole;
};