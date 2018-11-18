/**
 * 社团活动: 投票记录表
 */
const moment = require('moment');

export default (app) => {
  const { CHAR, DATE, NOW } = app.Sequelize;

  const ClubActivityVoteRecord = app.model.define('club_activity_vote_record', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    activity_id: {
      type: CHAR(36),
      allowNull: false,
    },
    client_id: {
      type: CHAR(36),
      allowNull: false,
    },
    createdAt: {
      type: DATE,
      get createdAt() {
          return moment(ClubActivityVoteRecord.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW,
    },
  }, {
    tableName: 'club_activity_vote_record',
    timestamps: false,
  });
  return ClubActivityVoteRecord;
};