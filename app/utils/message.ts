import ErrType, {ProjectError} from './message-error';
/**
 * 关于返回数据的统一定义
 */
class Message{

    public err: ProjectError | void;

    constructor(err, data?: any){
        this.err = err || ErrType.SUCCESS;
        if (data !== undefined){
            this[ Array.isArray(data) ? 'list' : 'info' ] = data;
        }
    }
}

export default Message;

export const ErrorType = ErrType;