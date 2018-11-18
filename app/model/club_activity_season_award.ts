/**
 * 社团活动: 赛季奖品表
 */
const moment = require('moment');

export default (app) => {
  const { CHAR, STRING, DATE, NOW } = app.Sequelize;

  const ClubActivitySeasonAward = app.model.define('club_activity_season_award', {
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
    club_no1: {
      type: STRING(200),
      allowNull: true,
    },
    club_no2: {
      type: STRING(200),
      allowNull: true,
    },
    club_no3: {
      type: STRING(200),
      allowNull: true,
    },
    role_no1: {
      type: STRING(200),
      allowNull: true,
    },
    role_no2: {
      type: STRING(200),
      allowNull: true,
    },
    role_no3: {
      type: STRING(200),
      allowNull: true,
    },
    remark: {
      type: STRING(200),
      allowNull: true,
    },
    updatedAt: {
      type: DATE,
      get updatedAt() {
          return moment(ClubActivitySeasonAward.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW,
    },
    createdAt: {
      type: DATE,
      get createdAt() {
          return moment(ClubActivitySeasonAward.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW,
    },
  }, {
    tableName: 'club_activity_season_award',
    timestamps: false,
  });
  return ClubActivitySeasonAward;
};