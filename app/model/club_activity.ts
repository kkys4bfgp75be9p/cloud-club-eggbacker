/**
 * 社团活动: 活动信息表
 */
const moment = require('moment');
// import ClientRole from './client_role';

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const ClubActivity = app.model.define('club_activity', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    club_id: {
      type: CHAR(36),
      allowNull: false,
    },
    creator_client_id: {
      type: CHAR(36),
      allowNull: false,
    },
    title: {
      type: STRING(32),
      allowNull: true,
    },
    content: {
      type: STRING(1000),
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
    createdAt: {
      type: DATE,
      get createdAt() {
        return moment(ClubActivity.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW,
    },
    timing: {
      type: INTEGER(11),
      allowNull: true,
    },
    period: {
      type: INTEGER(11),
      allowNull: true,
    },
    formId: {
      type: STRING(128),
      allowNull: true,
    },
    brief_start: {
      type: DATE,
      get brief_start() {
        return moment(ClubActivity.getDataValue('brief_start')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    brief_end: {
      type: DATE,
      get brief_end() {
        return moment(ClubActivity.getDataValue('brief_end')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    classify: {
      type: INTEGER(11),
      allowNull: true,
    },

  }, {
      tableName: 'club_activity',
      timestamps: false,
    });

  ClubActivity.associate = function () {
    app.model.ClubActivity.belongsTo(app.model.ClientRole,
      { as: 'crole', foreignKey: 'creator_client_id', targetKey: 'client_id' });
  };

  // ClubActivity.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'creator_client_id', targetKey: 'client_id' });

  // export default ClubActivity;
  return ClubActivity;
};