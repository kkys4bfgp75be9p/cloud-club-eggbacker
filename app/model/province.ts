// let moment = require('moment');
/**
 * 地区: 省份模型
 */
export default (app) => {
    const { STRING, INTEGER } = app.Sequelize;

    const Province = app.model.define('province', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: STRING,
        name: STRING
    }, {
            tableName: "province",
            timestamps: false
        });
    return Province;
}