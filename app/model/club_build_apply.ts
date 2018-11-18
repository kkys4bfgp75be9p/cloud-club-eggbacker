/**
 * 社团: 社团建立申请表
 */
const moment = require('moment');

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const ClubBuildApply = app.model.define('club_build_apply', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    create_client_id: {
      type: CHAR(36),
      allowNull: false,
    },
    school_id: {
      type: INTEGER(11),
      allowNull: false,
    },
    title: {
        type: STRING(16),
        allowNull: false,
    },
    club_check_url: {
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
    checked_user: {
        type: CHAR(36),
        allowNull: true,
    },
    checkedAt: {
      type: DATE,
      get checkedAt() {
          return moment(ClubBuildApply.getDataValue('checkedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
    },
    createdAt: {
        type: DATE,
        get createdAt() {
            return moment(ClubBuildApply.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
        },
        defaultValue: NOW,
    },
    formId: {
      type: STRING(128),
      allowNull: true,
    },
    referrer: {
      type: STRING(36),
      allowNull: true,
    },
  }, {
    tableName: 'club_build_apply',
    timestamps: false,
  });
  return ClubBuildApply;
};