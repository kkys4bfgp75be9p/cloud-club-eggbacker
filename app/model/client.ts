/**
 * 用户: 用户基本信息
 */
// import moment from 'moment';
const moment = require('moment');

export default (app) => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;

    const Client = app.model.define('client',
        {
            id: {
                type: STRING,
                primaryKey: true,
            },
            unionid: {
                type: STRING,
                unique: true,
            },
            openid_cloud_club: {
                type: STRING,
                unique: true,
            },
            openid_sheu: {
                type: STRING,
                unique: true,
            },
            nickname: STRING,
            telephone: STRING,
            avatar_url: STRING,
            gender: INTEGER,
            struts: INTEGER,
            createdAt: {
                type: DATE,
                get createdAt() {
                    // return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
                    // console.log('【client:createdAt】 => ', this);
                    return moment(Client.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
                },
                defaultValue: NOW,
            },
            updatedAt: {
                type: DATE,
                get updatedAt() {
                    return moment(Client.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
                },
                defaultValue: NOW,
            },
        },
        {
            // freezeTableName: true, // Model 对应的表名将与model名相同
            tableName: 'client',
            timestamps: false,
        },
    );
    return Client;
};