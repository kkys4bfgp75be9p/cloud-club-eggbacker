"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// let moment = require('moment');
/**
 * 地区: 学校信息
 */
exports.default = (app) => {
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
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nob29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nob29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0NBQWtDO0FBQ2xDOztHQUVHO0FBQ0gsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNuQixNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFMUMsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFO1FBQ3RDLEdBQUcsRUFBRTtZQUNELElBQUksRUFBRSxPQUFPO1lBQ2IsYUFBYSxFQUFFLElBQUk7WUFDbkIsVUFBVSxFQUFFLElBQUk7U0FDbkI7UUFDRCxLQUFLLEVBQUUsTUFBTTtRQUNiLEtBQUssRUFBRSxNQUFNO1FBQ2IsR0FBRyxFQUFFLE1BQU07UUFDWCxHQUFHLEVBQUUsTUFBTTtRQUNYLFFBQVEsRUFBRSxNQUFNO1FBQ2hCLElBQUksRUFBRSxNQUFNO1FBQ1osUUFBUSxFQUFFLE1BQU07UUFDaEIsYUFBYSxFQUFFLE1BQU07UUFDckIsU0FBUyxFQUFFLE1BQU07UUFDakIsYUFBYSxFQUFFLE1BQU07S0FDeEIsRUFBRTtRQUNLLFNBQVMsRUFBRSxRQUFRO1FBQ25CLFVBQVUsRUFBRSxLQUFLO0tBQ3BCLENBQUMsQ0FBQztJQUNQLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMsQ0FBQSJ9