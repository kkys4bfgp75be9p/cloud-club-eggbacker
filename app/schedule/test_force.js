"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subscription = require('egg').Subscription;
class UpdateCache extends Subscription {
    // 通过 schedule 属性来设置定时任务的执行间隔等配置
    static get schedule() {
        return {
            // interval: '1m', // 1 分钟间隔
            cron: '*/15 * * * * *',
            type: 'all',
        };
    }
    // subscribe 是真正定时任务执行时被运行的函数
    async subscribe() {
        // const res = await this.ctx.curl('http://www.api.com/cache', {
        //     dataType: 'json',
        // });
        // this.ctx.app.cache = res.data;
        console.log('订阅了一个定时任务....');
    }
}
exports.default = UpdateCache;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdF9mb3JjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3RfZm9yY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxNQUFNLFlBQVksR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsWUFBWSxDQUFDO0FBRWpELE1BQU0sV0FBWSxTQUFRLFlBQVk7SUFDbEMsZ0NBQWdDO0lBQ2hDLE1BQU0sS0FBSyxRQUFRO1FBQ2YsT0FBTztZQUNILDRCQUE0QjtZQUM1QixJQUFJLEVBQUUsZ0JBQWdCO1lBQ3RCLElBQUksRUFBRSxLQUFLO1NBQ2QsQ0FBQztJQUNOLENBQUM7SUFFRCw2QkFBNkI7SUFDN0IsS0FBSyxDQUFDLFNBQVM7UUFDWCxnRUFBZ0U7UUFDaEUsd0JBQXdCO1FBQ3hCLE1BQU07UUFDTixpQ0FBaUM7UUFDakMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxXQUFXLENBQUMifQ==