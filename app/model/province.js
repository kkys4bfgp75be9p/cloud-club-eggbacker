"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let moment = require('moment');
/**
 * 地区: 省份模型
 */
exports.default = (app) => {
    const { STRING, INTEGER } = app.Sequelize;
    const Province = app.model.define('province', {
        id: {
            type: INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        code: STRING,
        name: STRING,
    }, {
        tableName: 'province',
        timestamps: false,
    });
    return Province;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmluY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwcm92aW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLGtDQUFrQztBQUNsQzs7R0FFRztBQUNILGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDbkIsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRTFDLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtRQUMxQyxFQUFFLEVBQUU7WUFDQSxJQUFJLEVBQUUsT0FBTztZQUNiLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1NBQ25CO1FBQ0QsSUFBSSxFQUFFLE1BQU07UUFDWixJQUFJLEVBQUUsTUFBTTtLQUNmLEVBQUU7UUFDSyxTQUFTLEVBQUUsVUFBVTtRQUNyQixVQUFVLEVBQUUsS0FBSztLQUNwQixDQUFDLENBQUM7SUFDUCxPQUFPLFFBQVEsQ0FBQztBQUNwQixDQUFDLENBQUMifQ==