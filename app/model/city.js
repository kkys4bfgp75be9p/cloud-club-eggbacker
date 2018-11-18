"use strict";
// let moment = require('moment');
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 地区: 城市模型
 */
exports.default = (app) => {
    const { STRING, INTEGER, } = app.Sequelize;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2l0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGtDQUFrQzs7QUFFbEM7O0dBRUc7QUFDSCxrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ25CLE1BQU0sRUFDRixNQUFNLEVBQ04sT0FBTyxHQUNWLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUVsQixNQUFNLElBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7UUFDbEMsRUFBRSxFQUFFO1lBQ0EsSUFBSSxFQUFFLE9BQU87WUFDYixhQUFhLEVBQUUsSUFBSTtZQUNuQixVQUFVLEVBQUUsSUFBSTtTQUNuQjtRQUNELElBQUksRUFBRSxNQUFNO1FBQ1osSUFBSSxFQUFFLE1BQU07UUFDWixZQUFZLEVBQUUsTUFBTTtLQUN2QixFQUFFO1FBQ0ssU0FBUyxFQUFFLE1BQU07UUFDakIsVUFBVSxFQUFFLEtBQUs7S0FDcEIsQ0FBQyxDQUFDO0lBQ1AsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyxDQUFDIn0=