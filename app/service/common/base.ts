import { Context, Service } from 'egg';
const moment = require('moment');

/**
 * Base Service
 */
export default class BaseService extends Service {

    constructor(ctx: Context) {
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
        } else {
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

    getJSONObject(obj= {}) {
        if (null == obj || typeof obj != 'object') return null;
        return JSON.parse(JSON.stringify(obj));
    }
}