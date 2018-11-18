/**
 * 社团活动评论
 */
const moment = require('moment');

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const ClubActivityComment = app.model.define('club_activity_comment', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    client_id: {
      type: CHAR(36),
      allowNull: false,
    },
    reply_client_id: {
      type: CHAR(36),
      allowNull: true,
    },
    activity_id: {
      type: CHAR(36),
      allowNull: true,
    },
    is_hidden: {
      type: INTEGER(11),
      allowNull: true,
      defaultValue: '0',
    },
    content: {
      type: STRING(500),
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
        return moment(ClubActivityComment.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW,
    },
  }, {
      tableName: 'club_activity_comment',
      timestamps: false,
    });
  return ClubActivityComment;
};