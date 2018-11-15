/**
 * 社团活动: 赛季信息表
 */
let moment = require('moment');

export default (app) => {
  const { CHAR, STRING, DATEONLY, DATE, NOW } = app.Sequelize;

  const ClubActivitySeasonInfo = app.model.define('club_activity_season_info', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    creator_id: {
      type: CHAR(36),
      allowNull: false
    },
    title: {
      type: STRING(32),
      allowNull: true
    },
    start_date: {
      type: DATEONLY,
      allowNull: true
    },
    stop_date: {
      type: DATEONLY,
      allowNull: true
    },
    updatedAt: { 
      type: DATE,
      get updatedAt() {
          return moment(ClubActivitySeasonInfo.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    },
    createdAt: { 
      type: DATE,
      get createdAt() {
          return moment(ClubActivitySeasonInfo.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    }
  }, {
    tableName: 'club_activity_season_info',
    timestamps: false
  });
  return ClubActivitySeasonInfo;
}