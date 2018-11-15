/**
 * 社团: 入社申请表
 */
let moment = require('moment');
// import ClientRole from './client_role';
// import Client from './client';

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const ClubApply = app.model.define('club_apply', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    club_id: {
      type: CHAR(36),
      allowNull: false
    },
    apply_client_id: {
      type: CHAR(36),
      allowNull: false
    },
    checker_client_id: {
      type: CHAR(36),
      allowNull: true
    },
    struts: {
      type: INTEGER(11),
      allowNull: true
    },
    checked_fail_reason: {
      type: STRING(64),
      allowNull: true
    },
    formId: {
      type: STRING(128),
      allowNull: true
    },
    createdAt: {
      type: DATE,
      get createdAt() {
        return moment(ClubApply.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    },
    checked_date: {
      type: DATE,
      get checked_date() {
        return moment(ClubApply.getDataValue('checked_date')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
      tableName: 'club_apply',
      timestamps: false
    });

  ClubApply.associate = () => {
    app.model.ClubApply.belongsTo(app.model.ClientRole,
      { as: 'crole', foreignKey: 'apply_client_id', targetKey: 'client_id' });

      app.model.ClubApply.belongsTo(app.model.Client,
      { as: 'c', foreignKey: 'apply_client_id', targetKey: 'id' });
  };
  // ClientRole
  // ClubApply.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'apply_client_id', targetKey: 'client_id' });
  // ClubApply.belongsTo(app.model.Client, { as: 'c', foreignKey: 'apply_client_id', targetKey: 'id' });

  // export default ClubApply;
  return ClubApply;
}