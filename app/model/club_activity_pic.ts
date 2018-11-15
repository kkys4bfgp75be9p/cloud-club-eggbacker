/**
 * 社团活动: 活动配图表
 */
let moment = require('moment');

export default (app) => {
  const { CHAR, STRING, DATE, NOW } = app.Sequelize;

  const ClubActivityPic = app.model.define('club_activity_pic', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    activity_id: {
      type: CHAR(36),
      allowNull: false
    },
    pic_url: {
      type: STRING(32),
      allowNull: true
    },
    createdAt: { 
      type: DATE,
      get createdAt() {
          return moment(ClubActivityPic.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    }
  }, {
    tableName: 'club_activity_pic',
    timestamps: false
  });
  return ClubActivityPic;
}