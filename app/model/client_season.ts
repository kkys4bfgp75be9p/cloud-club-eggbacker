/**
 * 个人抽奖记录
 */
const moment = require('moment');

export default (app) => {
  const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;

  const ClientSeason = app.model.define('client_season', {
    id: {
      type: CHAR(36),
      allowNull: false,
      primaryKey: true,
    },
    struts: {
        type: INTEGER(11),
        allowNull: true,
    },
    no1_time: {
        type: DATE,
        // set no1_time(no1_time) {
        //     console.log('[no1_time SET] =========>', no1_time);
        //     ClientSeason.no1_time = moment(no1_time).format('YYYY-MM-DD HH:mm:ss');
        // },
        get no1_time() {
            // console.log('[no1_time GET] =========>', ClientSeason.getDataValue('no1_time'));
            return moment(ClientSeason.getDataValue('no1_time')).format('YYYY-MM-DD HH:mm:ss');
        },
        allowNull: true,
    },
    no2_time: {
        type: DATE,
        get no2_time() {
            return moment(ClientSeason.getDataValue('no2_time')).format('YYYY-MM-DD HH:mm:ss');
        },
        allowNull: true,
    },
    no3_time: {
        type: DATE,
        get no3_time() {
            return moment(ClientSeason.getDataValue('no3_time')).format('YYYY-MM-DD HH:mm:ss');
        },
        allowNull: true,
    },
    no1_gift: {
      type: STRING(200),
      allowNull: false,
    },
    no2_gift: {
        type: STRING(200),
        allowNull: false,
    },
    no3_gift: {
        type: STRING(200),
        allowNull: false,
    },
    no1_client: {
      type: CHAR(36),
      allowNull: true,
    },
    no2_client: {
        type: CHAR(36),
        allowNull: true,
    },
    no3_client: {
        type: CHAR(36),
        allowNull: true,
    },
    createdAt: {
      type: DATE,
      get createdAt() {
          return moment(ClientSeason.getDataValue('createdAt')).format('YYYY-MM-DD');
      },
      defaultValue: NOW,
    },
  }, {
    tableName: 'client_season',
    timestamps: false,
  });

//   ClientSeason.associate = () => {
//     app.model.ClientSeason.belongsTo(app.model.ClientRole,
//         { as: 'crole', foreignKey: 'no1_client', targetKey: 'client_id' });
//     app.model.ClientSeason.belongsTo(app.model.ClientRole,
//         { as: 'crole', foreignKey: 'no2_client', targetKey: 'client_id' });
//     app.model.ClientSeason.belongsTo(app.model.ClientRole,
//         { as: 'crole', foreignKey: 'no3_client', targetKey: 'client_id' });

//     app.model.ClientSeason.belongsTo(app.model.Client,
//             { as: 'client', foreignKey: 'no1_client', targetKey: 'id' });
//     app.model.ClientSeason.belongsTo(app.model.Client,
//             { as: 'client', foreignKey: 'no2_client', targetKey: 'id' });
//     app.model.ClientSeason.belongsTo(app.model.Client,
//             { as: 'client', foreignKey: 'no3_client', targetKey: 'id' });
//   };

  return ClientSeason;
};