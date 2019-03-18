/**
 * 用于描述与活动相关的定时任务
 * 兜底方案一：每10分钟刷新活动数据
 */
export const schedule = {
    // interval: '10m',
    cron: '*/20 * * * * *',
    type: 'all', // run in all workers
};

export const task = async () => {
    // await ctx.service.source.update();
    // ctx.app.lastUpdateBy = 'force';
    console.log('执行了一个定时任务.....');
};