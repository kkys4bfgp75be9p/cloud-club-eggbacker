/**
 * 社团活动: 活动热度表
 */
let moment = require('moment');

export default (app) => {
  const { CHAR, INTEGER, DATE, NOW } = app.Sequelize;

  const ClubActivityHot = app.model.define('club_activity_hot', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    activity_id: {
      type: CHAR(36),
      allowNull: false
    },
    heat: {
      type: INTEGER(11),
      allowNull: true
    },
    updatedAt: {
      type: DATE,
      get updatedAt() {
          return moment(ClubActivityHot.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    },
    createdAt: {
      type: DATE,
      get createdAt() {
          return moment(ClubActivityHot.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    }
  }, {
    tableName: 'club_activity_hot',
    timestamps: false
  });
  return ClubActivityHot;
}