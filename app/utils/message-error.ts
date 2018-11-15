/**
 * 关于错误的定义
 */
export class ProjectError {

    public errCode: number | void;
    public msg: any;

    constructor(errCode, msg) {
        //super();
        this.errCode = errCode;
        this.msg = msg;
    }
}
/**
 * ErrorType
 */
export default {
    // 成功的回调函数
    SUCCESS: null, // new ProjectError(null, 'ok!'),
    UNKNOW_ERROR: new ProjectError(10, 'unknow this error!'),

    // 常见类型错误: 100 - 200
    SERVER_BUSY: new ProjectError(100, 'server busy!'),
    TYPE_ERROR: new ProjectError(101, 'args type error!'),
    VALUE_SCOPE_ERROR: new ProjectError(102, 'args value scope error!'),
    DATA_REPEAT: new ProjectError(103, 'data is not allowed to repeat!'),
    VALUE_OUT_OF_BOUNDS: new ProjectError(104, 'value is not allowed to out of bounds!'),
    LOW_POWER: new ProjectError(105, 'Too low permission!'),
    TRANS_ROLLBACK: new ProjectError(106, 'transaction is rollback!'),
    DATABASE_ERROR: new ProjectError(107, 'database is error!'),

    // 应用内其他相关错误: 600+
    PHONE_CODE_TIMEOUT: new ProjectError(601, 'phone sms code timeout!'),
    PHONE_CODE_FAIL: new ProjectError(602, 'phone sms code fail!'),

    // 微信相关错误: 1000 - 1100
    /**
     * 微信登录失败
     */
    WX_LOGIN_FAIL: new ProjectError(1001, 'wechat login fail!'),
    WX_TOKEN_INVALID: new ProjectError(1002, 'login token invalid!'),
    WX_TOKEN_TIMEOUT: new ProjectError(1003, 'login token timeout!'),
    WX_TOKEN_NOT_FOUND: new ProjectError(1001, 'token not found!'),

    /**
     * 微信登录失败
     */
    UPLOAD_NO_FILE: new ProjectError(1200, 'upload filepath is null!'),
    UPLOAD_FAIL: new ProjectError(1201, 'upload fail!'),

    // 存储过程执行错误代码
    PROC_EXCEPTION: new ProjectError(2000, 'proc push you a exception!'),
    // 社团升降权相关
    PROC_POWER_CHANGE_DIFF_INVALID: new ProjectError(2011, 'diff mast be 1 or -1!'),// 差值不符
    PROC_POWER_CHANGE_GT_2: new ProjectError(2012, 'You must have 2 levels of authority over the target!'),// 权限提升时,权限差值不符
    PROC_POWER_CHANGE_LT_1: new ProjectError(2013, 'Your permissions must be 1 level below the targets permissions!'),// 权限降级时,权限差值不符 
    PROC_POWER_CHANGE_UPDATE_FAIL: new ProjectError(2014, 'update fail!'),// 修改未成功

    // 点赞相关
    PROC_TORCH_HEATING_NOANYTHING: new ProjectError(3001, '米有任何的火把了你!'),
    PROC_TORCH_HEATING_EXCEPTION: new ProjectError(3002, '点赞时遇到其他异常!'),
    PROC_TORCH_HEATING_UNKNOW_ERROR: new ProjectError(3003, '点赞点到了外太空!'),

    // 审核相关
    PROC_VALIDATE_STATUS_EXCEPTION: new ProjectError(4001, '该审核条目的状态异常!'),
    PROC_VALIDATE_NO_ROWCOUNT: new ProjectError(4002, '审核时更新状态未变化!')
}