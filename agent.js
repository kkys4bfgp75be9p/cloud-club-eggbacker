"use strict";
/**
 * Agent Worker
 * 用于执行 多进程中需要统一处理的事务
 * 启动优先级优于 Worker
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (agent) => {
    // 在这里写你的初始化逻辑
    console.log('Agent Worker ready: ', agent);
    // 也可以通过 messenger 对象发送消息给 App Worker
    // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
    // agent.messenger.on('egg-ready', () => {
    //     const data = { ... };
    //     agent.messenger.sendToApp('xxx_action', data);
    // });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWdlbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhZ2VudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUE7Ozs7R0FJRzs7QUFFSCxrQkFBZSxDQUFDLEtBQUssRUFBRSxFQUFFO0lBQ3JCLGNBQWM7SUFDZCxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRTNDLHFDQUFxQztJQUNyQyxxQ0FBcUM7SUFDckMsMENBQTBDO0lBQzFDLDRCQUE0QjtJQUM1QixxREFBcUQ7SUFDckQsTUFBTTtBQUNWLENBQUMsQ0FBQSJ9