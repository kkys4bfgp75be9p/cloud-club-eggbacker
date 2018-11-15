/**
 * 社团: 社团联系人(关联)表
 */
let moment = require('moment');

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const ClubContactRecord = app.model.define('club_contact_record', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    club_id: {
      type: CHAR(36),
      allowNull: false
    },
    operator_client_id: {
      type: CHAR(36),
      allowNull: false
    },
    operator_name: {
        type: STRING(16),
        allowNull: true
    },
    target_client_id: {
        type: CHAR(36),
        allowNull: false
    },
    target_name: {
        type: STRING(16),
        allowNull: true
    },
    origin_power: {
      type: INTEGER(11),
      allowNull: true
    },
    new_power: {
        type: INTEGER(11),
        allowNull: true
    },
    struts: {
      type: INTEGER(11),
      allowNull: true
    },
    createdAt: { 
      type: DATE,
      get createdAt() {
          return moment(ClubContactRecord.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    }
  }, {
    tableName: 'club_contact_record',
    timestamps: false
  });
  return ClubContactRecord;
}