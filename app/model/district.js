"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let moment = require('moment');
/**
 * 地区: 区县模型
 */
exports.default = (app) => {
    const { STRING, INTEGER } = app.Sequelize;
    const District = app.model.define('district', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: STRING,
        name: STRING,
        citycode: STRING,
    }, {
        tableName: 'district',
        timestamps: false,
    });
    return District;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGlzdHJpY3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkaXN0cmljdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFrQztBQUNsQzs7R0FFRztBQUNILGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDbkIsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRTFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtRQUMxQyxFQUFFLEVBQUU7WUFDQSxJQUFJLEVBQUUsT0FBTztZQUNiLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1NBQ25CO1FBQ0QsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsTUFBTTtRQUNaLFFBQVEsRUFBRSxNQUFNO0tBQ25CLEVBQUU7UUFDSyxTQUFTLEVBQUUsVUFBVTtRQUNyQixVQUFVLEVBQUUsS0FBSztLQUNwQixDQUFDLENBQUM7SUFDUCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==