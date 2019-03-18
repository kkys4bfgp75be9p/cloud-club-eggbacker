/**
 * 用于格式化日期: yyyy-MM-dd HH:mm:ss
 * 如果某一位(日期或时间)是一个数字,则在之前补 0
 */
export const formartDateTime = (originDate: string | Date = new Date(), hasTime: boolean = true) => {
    if (typeof originDate === 'string') {
        originDate = new Date(originDate);
    }
    // get originDate's yyyy-MM-dd
    const fDate = [
        originDate.getFullYear(), originDate.getMonth() + 1, originDate.getDate()
    ];
    // 如果需要对时间进行格式化, 则获取时间部分
    const fTime = hasTime ? [ originDate.getHours(), originDate.getMinutes(), originDate.getSeconds() ] : [];
    // 如果某一位(日期或时间)是一个数字,则在之前补 0
    const formatText = (e) => ('' + e)[1] ? '' + e : '0' + e ;
    const dateText = fDate.map( formatText ).join('-');
    const timeText = fTime.map( formatText ).join(':');
    // 拼接并返回结果
    return dateText.concat(hasTime ? ' ' + timeText : '');
}