/**
 * 数据库相关的格式化工具
 */
const moment = require('moment');

/**
 * 用于处理 Sequelize 中的时区问题
 * @param {*} origin Object|Array  需要处理的对象(或者数组)
 * @param {*} keys Array 需要处理的时间属性
 */
export const handleTimezone = (origin: Object, keys: string[], hasSecond= false) => {

    let date_format = 'YYYY-MM-DD HH:mm';
    if (hasSecond){
        date_format = 'YYYY-MM-DD HH:mm:ss';
    }

    if (Array.isArray(origin)){
        return origin.map((o) => {
            keys.forEach((k) => {
                if (o[k])
                    o[k] = moment(o[k]).format(date_format);
            });
            return o;
        });
    }else{
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