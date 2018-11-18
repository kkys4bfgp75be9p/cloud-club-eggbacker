"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const crypto = require('crypto');
class WXBizDataCrypt {
    constructor(appId, sessionKey) {
        this.appId = appId;
        this.sessionKey = sessionKey;
    }
    decryptData(encryptedData, iv) {
        // base64 decode
        const sessionKey = new Buffer(this.sessionKey, 'base64');
        encryptedData = new Buffer(encryptedData, 'base64');
        iv = new Buffer(iv, 'base64');
        let decoded;
        try {
            // 解密
            const decipher = crypto.createDecipheriv('aes-128-cbc', sessionKey, iv);
            // 设置自动 padding 为 true，删除填充补位
            decipher.setAutoPadding(true);
            decoded = decipher.update(encryptedData, 'binary', 'utf8');
            decoded += decipher.final('utf8');
            decoded = JSON.parse(decoded);
        }
        catch (err) {
            throw new Error('Illegal Buffer');
        }
        if (decoded.watermark.appid !== this.appId) {
            throw new Error('Illegal Buffer');
        }
        return decoded;
    }
}
exports.default = WXBizDataCrypt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV1hCaXpEYXRhQ3J5cHQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJXWEJpekRhdGFDcnlwdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxNQUFNLGNBQWM7SUFLbEIsWUFBWSxLQUFhLEVBQUUsVUFBa0I7UUFDM0MsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7UUFDbkIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztJQUVELFdBQVcsQ0FBQyxhQUFhLEVBQUUsRUFBRTtRQUMzQixnQkFBZ0I7UUFDaEIsTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUN6RCxhQUFhLEdBQUcsSUFBSSxNQUFNLENBQUMsYUFBYSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1FBQ3BELEVBQUUsR0FBRyxJQUFJLE1BQU0sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFFOUIsSUFBSSxPQUFZLENBQUM7UUFFakIsSUFBSTtZQUNGLEtBQUs7WUFDTCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBYSxFQUFFLFVBQVUsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUN4RSw2QkFBNkI7WUFDN0IsUUFBUSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUM5QixPQUFPLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQzNELE9BQU8sSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRWxDLE9BQU8sR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1NBRS9CO1FBQUMsT0FBTyxHQUFHLEVBQUU7WUFDWixNQUFNLElBQUksS0FBSyxDQUFDLGdCQUFnQixDQUFDLENBQUM7U0FDbkM7UUFFRCxJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxLQUFLLElBQUksQ0FBQyxLQUFLLEVBQUU7WUFDMUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1NBQ25DO1FBRUQsT0FBTyxPQUFPLENBQUM7SUFDakIsQ0FBQztDQUVGO0FBRUQsa0JBQWUsY0FBYyxDQUFDIn0=