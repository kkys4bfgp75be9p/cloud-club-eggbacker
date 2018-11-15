/**
 * 社团: 社团信息表
 */
let moment = require('moment');
// import ClientRole from './client_role';
// import School from './school';

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const Club = app.model.define('club', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true
    },
    school_id: {
      type: INTEGER(11),
      allowNull: false
    },
    client_id: {
      type: CHAR(36),
      allowNull: false
    },
    title: {
      type: STRING(16),
      allowNull: false
    },
    title_updatedAt: {
      type: DATE,
      get title_updatedAt() {
        return moment(Club.getDataValue('title_updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    struts: {
      type: INTEGER(11),
      allowNull: true
    },
    createdAt: {
      type: DATE,
      get createdAt() {
        return moment(Club.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    },
    logo_url: {
      type: STRING(200),
      allowNull: true
    },
    logo_created: {
      type: DATE,
      get logo_created() {
        return moment(Club.getDataValue('logo_created')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    bgimg_url: {
      type: STRING(200),
      allowNull: true
    },
    bgimg_created: {
      type: DATE,
      get bgimg_created() {
        return moment(Club.getDataValue('bgimg_created')).format('YYYY-MM-DD HH:mm:ss');
      }
    },
    intro: {
      type: STRING(200),
      allowNull: true
    },
    modifier: {
      type: STRING(32),
      allowNull: true
    },
    updatedAt: {
      type: DATE,
      get updatedAt() {
        return moment(Club.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
      },
      defaultValue: NOW
    },
    referrer: {
      type: STRING(36),
      allowNull: true
    }
  }, {
      tableName: 'club',
      timestamps: false
    });
  
  // app.logger.info('【Model Club】: ', Club);
  
  Club.associate = function() {
    // app.logger.info('【Model Club associate】: ', models);
    app.model.Club.belongsTo(app.model.School,
      { as: 'school', foreignKey: 'school_id', targetKey: 'sid' });
  };
  // Club.belongsTo(app.model.School, { as: 'school', foreignKey: 'school_id', targetKey: 'sid' });

  // export default Club;
  return Club;
}