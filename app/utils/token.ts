const crypto = require('crypto');
import ErrorType from './message-error';
// import { stringify } from 'querystring';

/**
 * JWToken Object
 */
class JWToken {
    public data: any;
    public created: number;
    public exp: number;

    constructor(data: any, timeout: number = 10) {
        this.data = data;
        this.exp = ~~(timeout); // token有效期
        this.created = ~~(Date.now() / 1000 / 60);
    }
}

/**
 * JWT create a login token
 */
class TokenUtil {

    private secret = 'For.the.Horde';
    private header: JWToken;
    /**
     * create a token object
     */
    constructor() {
        //if(!id) throw new Error('Has not any id in token!');
        // this.secret = 'For.the.Horde';
        // this.header = {
        //     typ: 'JWT',
        //     alg: 'HS256',
        //     id: id
        // };
        // this.header = encodeData;
    }

    createToken(encodeData: any, timeout: number = (24 * 60)) {
        // console.log(parseInt(timeout) || 0);
        // var payload = {
        //     data: this.header, //payload
        //     created: ~~(Date.now() / 1000 / 60), //token生成的时间的，单位分钟
        //     exp: ~~(timeout) || 10 //token有效期
        // };
        this.header = new JWToken(encodeData, timeout);

        // payload信息
        const base64Str = Buffer.from(JSON.stringify(this.header), 'utf8').toString('base64');

        // 添加签名，防篡改
        const hash = crypto.createHmac('sha256', this.secret);
        hash.update(base64Str);
        const signature = hash.digest('base64');

        return base64Str + '.' + signature;
    }

    decodeToken(token) {
        if (typeof token !== 'string' || token.indexOf('.') === -1) {
            // token不合法
            return false;
        }
        const decArr = token.split('.');
        if (decArr.length < 2) {
            // token不合法
            return false;
        }

        let payload = {};
        // 将payload json字符串 解析为对象
        try {
            payload = JSON.parse(Buffer.from(decArr[0], 'base64').toString('utf8'));
        } catch (e) {
            return false;
        }

        //检验签名
        const hash = crypto.createHmac('sha256', this.secret);
        hash.update(decArr[0]);
        const checkSignature = hash.digest('base64');

        return {
            payload,
            signature: decArr[1],
            checkSignature,
        };
    }

    checkToken(token): JWToken {
        const resDecode = this.decodeToken(token);
        if (!resDecode) {
            // token不合法
            throw ErrorType.WX_TOKEN_INVALID;
        }

        // 是否过期
        const steptime = ~~(Date.now() / 1000 / 60) - ~~(resDecode.payload['created']);
        const expState = steptime > ~~(resDecode.payload['exp']) ? false : true;
        if (resDecode.signature === resDecode.checkSignature && expState) {
            // token 有效
            // return true;
            return resDecode.payload as JWToken;
        }
        // token 失效
        throw ErrorType.WX_TOKEN_TIMEOUT;
    }
}

export default TokenUtil;