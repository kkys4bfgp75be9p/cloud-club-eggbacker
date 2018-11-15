/**
 * 社团: 社团联系人(关联)表
 */
let moment = require('moment');
// import ClientRole from './client_role';

export default (app) => {
  const { CHAR, INTEGER, DATE, NOW } = app.Sequelize;

  const ClubContact = app.model.define('club_contact', {
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
    role_ability: {
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
        return moment(ClubContact.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    },
    updatedAt: {
      type: DATE,
      get updatedAt() {
        return moment(ClubContact.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    }
  }, {
      tableName: 'club_contact',
      timestamps: false
    });

  ClubContact.associate = () => {
    app.model.ClubContact.belongsTo(app.model.ClientRole,
      { as: 'crole', foreignKey: 'client_id', targetKey: 'client_id' });
  };
  // ClubContact.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'client_id', targetKey: 'client_id' });

  // export default ClubContact;
  return ClubContact;
}