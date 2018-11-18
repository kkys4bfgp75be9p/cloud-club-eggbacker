/**
 * 社团活动: 赛季获奖名单表
 */
const moment = require('moment');

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const ClubActivitySeasonWiner = app.model.define('club_activity_season_winer', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    creator_id: {
      type: CHAR(36),
      allowNull: false,
    },
    season_id: {
      type: CHAR(36),
      allowNull: false,
    },
    club_no1_id: {
      type: CHAR(36),
      allowNull: true,
    },
    club_no2_id: {
      type: CHAR(36),
      allowNull: true,
    },
    club_no3_id: {
      type: CHAR(36),
      allowNull: true,
    },
    role_no1_id: {
      type: CHAR(36),
      allowNull: true,
    },
    role_no2_id: {
      type: CHAR(36),
      allowNull: true,
    },
    role_no3_id: {
      type: CHAR(36),
      allowNull: true,
    },
    remark: {
      type: STRING(200),
      allowNull: true,
    },
    struts: {
      type: INTEGER(11),
      allowNull: true,
      defaultValue: '0',
    },
    updatedAt: {
      type: DATE,
      get updatedAt() {
          return moment(ClubActivitySeasonWiner.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW,
    },
    createdAt: {
      type: DATE,
      get createdAt() {
          return moment(ClubActivitySeasonWiner.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW,
    },
  }, {
    tableName: 'club_activity_season_winer',
    timestamps: false,
  });
  return ClubActivitySeasonWiner;
};