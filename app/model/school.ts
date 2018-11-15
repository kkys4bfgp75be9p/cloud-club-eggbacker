// let moment = require('moment');
/**
 * 地区: 学校信息
 */
export default (app) => {
    const { STRING, INTEGER } = app.Sequelize;

    const School = app.model.define('school', {
        sid: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        uName: STRING,
        level: STRING,
        lat: STRING,
        lng: STRING,
        province: STRING,
        city: STRING,
        district: STRING,
        province_code: STRING,
        city_code: STRING,
        district_code: STRING
    }, {
            tableName: "school",
            timestamps: false
        });
    return School;
}