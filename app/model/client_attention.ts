/**
 * 用户关注关系
 */
let moment = require('moment');

export default (app) => {
  const { CHAR, DATE, NOW } = app.Sequelize;

  const ClientAttention = app.model.define('client_attention', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    client_id: {
      type: CHAR(36),
      allowNull: false
    },
    club_id: {
      type: CHAR(36),
      allowNull: false
    },
    createdAt: {
      type: DATE,
      get createdAt() {
        return moment(ClientAttention.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    }
  }, {
      tableName: 'client_attention',
      timestamps: false
    });
  return ClientAttention;
}