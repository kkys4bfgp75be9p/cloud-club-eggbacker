"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
let moment = require('moment');
/**
 * Base Service
 */
class BaseService extends egg_1.Service {
    constructor(ctx) {
        super(ctx);
    }
    /**
     * 用于处理 Sequelize 中的时区问题, 通常出现于查询数据
     * @param origin
     * @param keys
     * @param hasSecond
     */
    handleTimezone(origin, keys, hasSecond = false) {
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
    }
    getJSONObject(obj = {}) {
        if (null == obj || typeof obj != 'object')
            return null;
        return JSON.parse(JSON.stringify(obj));
    }
}
exports.default = BaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBdUM7QUFDdkMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9COztHQUVHO0FBQ0gsTUFBcUIsV0FBWSxTQUFRLGFBQU87SUFFNUMsWUFBWSxHQUFZO1FBQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNILGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRyxLQUFLO1FBQzFDLElBQUksV0FBVyxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLElBQUksU0FBUyxFQUFFO1lBQ1gsV0FBVyxHQUFHLHFCQUFxQixDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDbEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDYixJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ2hELENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sQ0FBQyxDQUFDO1lBQ2IsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1lBQ2YsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDYixJQUFJLENBQUMsRUFBRTtvQkFDSCxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ0osQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7aUJBQy9DO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFDSCxPQUFPLENBQUMsQ0FBQztTQUNaO0lBQ0wsQ0FBQztJQUVELGFBQWEsQ0FBQyxHQUFHLEdBQUMsRUFBRTtRQUNoQixJQUFHLElBQUksSUFBSSxHQUFHLElBQUksT0FBTyxHQUFHLElBQUksUUFBUTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3RELE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDM0MsQ0FBQztDQUNKO0FBekNELDhCQXlDQyJ9