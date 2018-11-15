"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
const message_error_1 = require("./message-error");
// import { stringify } from 'querystring';
/**
 * JWToken Object
 */
class JWToken {
    constructor(data, timeout = 10) {
        this.data = data;
        this.exp = ~~(timeout); // token有效期
        this.created = ~~(Date.now() / 1000 / 60);
    }
}
/**
 * JWT create a login token
 */
class TokenUtil {
    /**
     * create a token object
     */
    constructor() {
        this.secret = 'For.the.Horde';
        //if(!id) throw new Error('Has not any id in token!');
        // this.secret = 'For.the.Horde';
        // this.header = {
        //     typ: 'JWT',
        //     alg: 'HS256',
        //     id: id
        // };
        // this.header = encodeData;
    }
    createToken(encodeData, timeout = (24 * 60)) {
        // console.log(parseInt(timeout) || 0);
        // var payload = {
        //     data: this.header, //payload
        //     created: ~~(Date.now() / 1000 / 60), //token生成的时间的，单位分钟
        //     exp: ~~(timeout) || 10 //token有效期
        // };
        this.header = new JWToken(encodeData, timeout);
        // payload信息
        var base64Str = Buffer.from(JSON.stringify(this.header), 'utf8').toString('base64');
        // 添加签名，防篡改
        var hash = crypto.createHmac('sha256', this.secret);
        hash.update(base64Str);
        var signature = hash.digest('base64');
        return base64Str + '.' + signature;
    }
    decodeToken(token) {
        if (typeof token !== 'string' || token.indexOf('.') === -1) {
            // token不合法
            return false;
        }
        var decArr = token.split('.');
        if (decArr.length < 2) {
            // token不合法
            return false;
        }
        var payload = {};
        // 将payload json字符串 解析为对象
        try {
            payload = JSON.parse(Buffer.from(decArr[0], 'base64').toString('utf8'));
        }
        catch (e) {
            return false;
        }
        //检验签名
        var hash = crypto.createHmac('sha256', this.secret);
        hash.update(decArr[0]);
        var checkSignature = hash.digest('base64');
        return {
            payload,
            signature: decArr[1],
            checkSignature,
        };
    }
    checkToken(token) {
        var resDecode = this.decodeToken(token);
        if (!resDecode) {
            // token不合法
            throw message_error_1.default.WX_TOKEN_INVALID;
        }
        // 是否过期
        let steptime = ~~(Date.now() / 1000 / 60) - ~~(resDecode.payload['created']);
        var expState = steptime > ~~(resDecode.payload['exp']) ? false : true;
        if (resDecode.signature === resDecode.checkSignature && expState) {
            // token 有效
            // return true;
            return resDecode.payload;
        }
        // token 失效
        throw message_error_1.default.WX_TOKEN_TIMEOUT;
    }
}
exports.default = TokenUtil;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidG9rZW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0b2tlbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxtREFBd0M7QUFDeEMsMkNBQTJDO0FBRTNDOztHQUVHO0FBQ0gsTUFBTSxPQUFPO0lBS1QsWUFBWSxJQUFTLEVBQUUsVUFBa0IsRUFBRTtRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsV0FBVztRQUNuQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDOUMsQ0FBQztDQUNKO0FBRUQ7O0dBRUc7QUFDSCxNQUFNLFNBQVM7SUFJWDs7T0FFRztJQUNIO1FBTFEsV0FBTSxHQUFHLGVBQWUsQ0FBQztRQU03QixzREFBc0Q7UUFDdEQsaUNBQWlDO1FBQ2pDLGtCQUFrQjtRQUNsQixrQkFBa0I7UUFDbEIsb0JBQW9CO1FBQ3BCLGFBQWE7UUFDYixLQUFLO1FBQ0wsNEJBQTRCO0lBQ2hDLENBQUM7SUFFRCxXQUFXLENBQUMsVUFBZSxFQUFFLFVBQWtCLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQztRQUNwRCx1Q0FBdUM7UUFDdkMsa0JBQWtCO1FBQ2xCLG1DQUFtQztRQUNuQyw4REFBOEQ7UUFDOUQsd0NBQXdDO1FBQ3hDLEtBQUs7UUFDTCxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksT0FBTyxDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsQ0FBQztRQUUvQyxZQUFZO1FBQ1osSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFB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