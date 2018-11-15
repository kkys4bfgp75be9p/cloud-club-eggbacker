/**
 * 用户投掷火把的记录表
 */
let moment = require('moment');

export default (app) => {
  const { CHAR, INTEGER, DATE, NOW } = app.Sequelize;

  const ClientTorchRecord = app.model.define('client_torch_record', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    client_id: {
      type: CHAR(36),
      allowNull: false
    },
    torch_count_current: {
      type: INTEGER(11),
      allowNull: true
    },
    torch_count_history: {
      type: INTEGER(11),
      allowNull: true
    },
    updatedAt: {
      type: DATE,
      get updatedAt() {
          return moment(ClientTorchRecord.getDataValue('updatedAt')).format('YYYY-MM-DD');
      },
      allowNull: true
    },
    createdAt: { 
      type: DATE,
      get createdAt() {
          return moment(ClientTorchRecord.getDataValue('createdAt')).format('YYYY-MM-DD');
      },
      defaultValue: NOW
    }
  }, {
    tableName: 'client_torch_record',
    timestamps: false
  });
  return ClientTorchRecord;
}