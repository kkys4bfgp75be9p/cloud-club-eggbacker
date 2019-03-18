/**
 * Agent Worker
 * 用于执行 多进程中需要统一处理的事务
 * 启动优先级优于 Worker
 */

export default (agent) => {
    // 在这里写你的初始化逻辑
    console.log('Agent Worker ready: ', agent);

    // 也可以通过 messenger 对象发送消息给 App Worker
    // 但需要等待 App Worker 启动成功后才能发送，不然很可能丢失
    // agent.messenger.on('egg-ready', () => {
    //     const data = { ... };
    //     agent.messenger.sendToApp('xxx_action', data);
    // });
}