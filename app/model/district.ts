// let moment = require('moment');
/**
 * 地区: 区县模型
 */
export default (app) => {
    const { STRING, INTEGER } = app.Sequelize;

    const District = app.model.define('district', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: STRING,
        name: STRING,
        citycode: STRING
    }, {
            tableName: "district",
            timestamps: false
        });
    return District;
}