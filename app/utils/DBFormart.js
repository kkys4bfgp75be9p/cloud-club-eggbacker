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
        return origin.map((o) => {
            keys.forEach((k) => {
                if (o[k])
                    o[k] = moment(o[k]).format(date_format);
            });
            return o;
        });
    }
    else {
        const o = origin;
        keys.forEach((k) => {
            if (o) {
                if (o[k])
                    o[k] = moment(o[k]).format(date_format);
            }
        });
        return o;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiREJGb3JtYXJ0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiREJGb3JtYXJ0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFakM7Ozs7R0FJRztBQUNVLFFBQUEsY0FBYyxHQUFHLENBQUMsTUFBYyxFQUFFLElBQWMsRUFBRSxTQUFTLEdBQUUsS0FBSyxFQUFFLEVBQUU7SUFFL0UsSUFBSSxXQUFXLEdBQUcsa0JBQWtCLENBQUM7SUFDckMsSUFBSSxTQUFTLEVBQUM7UUFDVixXQUFXLEdBQUcscUJBQXFCLENBQUM7S0FDdkM7SUFFRCxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUM7UUFDdEIsT0FBTyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDcEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNmLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoRCxDQUFDLENBQUMsQ0FBQztZQUNILE9BQU8sQ0FBQyxDQUFDO1FBQ2IsQ0FBQyxDQUFDLENBQUM7S0FDTjtTQUFJO1FBQ0QsTUFBTSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2pCLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtZQUNmLElBQUksQ0FBQyxFQUFFO2dCQUNILElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDSixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsQ0FBQzthQUMvQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxDQUFDLENBQUM7S0FDWjtBQUNMLENBQUMsQ0FBQyJ9