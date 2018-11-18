"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const egg_1 = require("egg");
const moment = require('moment');
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
    }
    getJSONObject(obj = {}) {
        if (null == obj || typeof obj != 'object')
            return null;
        return JSON.parse(JSON.stringify(obj));
    }
}
exports.default = BaseService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw2QkFBdUM7QUFDdkMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDOztHQUVHO0FBQ0gsTUFBcUIsV0FBWSxTQUFRLGFBQU87SUFFNUMsWUFBWSxHQUFZO1FBQ3BCLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNmLENBQUM7SUFDRDs7Ozs7T0FLRztJQUNILGNBQWMsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLFNBQVMsR0FBRyxLQUFLO1FBQzFDLElBQUksV0FBVyxHQUFHLGtCQUFrQixDQUFDO1FBQ3JDLElBQUksU0FBUyxFQUFFO1lBQ1gsV0FBVyxHQUFHLHFCQUFxQixDQUFDO1NBQ3ZDO1FBRUQsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxFQUFFO1lBQ3ZCLE9BQU8sTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNwQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7b0JBQ2YsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNKLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLENBQUMsQ0FBQztZQUNiLENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILE1BQU0sQ0FBQyxHQUFHLE1BQU0sQ0FBQztZQUNqQixJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ2YsSUFBSSxDQUFDLEVBQUU7b0JBQ0gsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNKLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO2lCQUMvQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBQ0gsT0FBTyxDQUFDLENBQUM7U0FDWjtJQUNMLENBQUM7SUFFRCxhQUFhLENBQUMsR0FBRyxHQUFFLEVBQUU7UUFDakIsSUFBSSxJQUFJLElBQUksR0FBRyxJQUFJLE9BQU8sR0FBRyxJQUFJLFFBQVE7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2RCxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO0lBQzNDLENBQUM7Q0FDSjtBQXpDRCw4QkF5Q0MifQ==