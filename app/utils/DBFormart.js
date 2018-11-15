"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 数据库相关的格式化工具
 */
const moment = require('moment');
/**
 * 用于处理 Sequelize 中的时区问题
 * @param {*} origin Object|Array  需要处理的对象(或者数组)
 * @param {*} keys Array 需要处理的时间属性
 */
exports.handleTimezone = (origin, keys, hasSecond = false) => {
    let date_format = 'YYYY-MM-DD HH:mm';
    if (hasSecond) {
        date_format = 'YYYY-MM-DD HH:mm:ss';
    }
    if (Array.isArray(origin)) {
        return origin.map(o => {
            keys.forEach(k => {
                if (o[k])
                    o[k] = moment(o[k]).format(date_format);
            });
            return o;
        });
    }
    else {
        let o = origin;
        keys.forEach(k => {
            if (o) {
                if (o[k])
                    o[k] = moment(o[k]).format(date_format);
            }
        });
        return o;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREJGb3JtYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiREJGb3JtYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakM7Ozs7R0FJRztBQUNVLFFBQUEsY0FBYyxHQUFHLENBQUMsTUFBYyxFQUFFLElBQW1CLEVBQUUsU0FBUyxHQUFDLEtBQUssRUFBRSxFQUFFO0lBRW5GLElBQUksV0FBVyxHQUFHLGtCQUFrQixDQUFDO0lBQ3JDLElBQUcsU0FBUyxFQUFDO1FBQ1QsV0FBVyxHQUFHLHFCQUFxQixDQUFDO0tBQ3ZDO0lBRUQsSUFBRyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFDO1FBQ3JCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNsQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUNiLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7S0FDTjtTQUFJO1FBQ0QsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNiLElBQUcsQ0FBQyxFQUFFO2dCQUNGLElBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMvQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLENBQUM7S0FDWjtBQUNMLENBQUMsQ0FBQSJ9