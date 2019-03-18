// let moment = require('moment');

/**
 * 地区: 城市模型
 */
export default (app) => {
    const {
        STRING,
        INTEGER,
    } = app.Sequelize;

    const City = app.model.define('city', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: STRING,
        name: STRING,
        provincecode: STRING,
    }, {
        tableName: 'city',
        timestamps: false,
    });
    return City;
};