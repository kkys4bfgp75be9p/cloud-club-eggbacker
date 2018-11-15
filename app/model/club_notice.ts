/**
 * 社团:公告表
 */
let moment = require('moment');
// import Client from './client';
// import ClientRole from './client_role';

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const ClubNotice = app.model.define('club_notice', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    club_id: {
      type: CHAR(36),
      allowNull: false
    },
    client_id: {
      type: CHAR(36),
      allowNull: false
    },
    title: {
      type: STRING(32),
      allowNull: true
    },
    content: {
      type: STRING(200),
      allowNull: true
    },
    is_sms_inform: {
      type: INTEGER(11),
      allowNull: true,
      defaultValue: '0'
    },
    struts: {
      type: INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DATE,
      get createdAt() {
        return moment(ClubNotice.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    },
    repeal_date: {
      type: DATE,
      get repeal_date() {
        return moment(ClubNotice.getDataValue('repeal_date')).format('YYYY-MM-DD HH:mm:ss');
      }
    }
  }, {
      tableName: 'club_notice',
      timestamps: false
    });

  ClubNotice.associate = () => {
    app.model.ClubNotice.belongsTo(app.model.ClientRole,
      { as: 'crole', foreignKey: 'client_id', targetKey: 'client_id' });

    app.model.ClubNotice.belongsTo(app.model.Client,
      { as: 'client', foreignKey: 'client_id' });
  };
  // ClubNotice.belongsTo(app.model.Client, { as: 'client', foreignKey: 'client_id' });
  // 多学校的情况下会有问题
  // ClubNotice.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'client_id', targetKey: 'client_id' });

  // export default  ClubNotice;
  return ClubNotice;
}