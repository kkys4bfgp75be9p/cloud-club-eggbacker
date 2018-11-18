"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const uuidv1 = require('uuid/v1');
const ProConf = require("../utils/configs/project-config");
const message_1 = require("../utils/message");
const token_1 = require("../utils/token");
const base_1 = require("./common/base");
// console.log('uuidv1 ======> ', uuidv1);
/**
 * Test Service
 */
class AccessService extends base_1.default {
    /**
     * 保存 系统审核登录用户
     * @param name - your name
     */
    async saveLogin4SystemRole(openid) {
        // return `openid: ${openid}`;
        const where = { openid };
        // 写入数据的条件
        const newClient = {
            id: uuidv1(),
            username: '未知',
            the_power: 0,
        };
        try {
            const originData = await this.ctx.model.CheckerRole.findOrCreate({ where, defaults: newClient, raw: true });
            this.logger.debug('【saveLogin4SystemRole => originData】: ', originData);
            const result = originData[0];
            this.logger.debug('系统审核登录交换后的 result:: ', result);
            // 创建并生成token,然后返回
            const token = new token_1.default();
            return new message_1.default(null, {
                token: token.createToken({ id: result.id }),
                username: result.username,
            });
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.WX_LOGIN_FAIL, 'saveLogin4SystemRole exception!');
        }
    }
    /**
     * 保存 云社团登录用户
     * @param name - your name
     */
    async saveLogin4CloudClub({ appid, unionid, xcx_openid }) {
        // 之后替换成 unionid
        const where = {};
        // 写入数据的条件
        const newClient = {
            id: uuidv1(),
        };
        //
        if (unionid) {
            where['unionid'] = unionid;
            newClient['unionid'] = unionid;
            if (appid === ProConf.APP_CLOUD_CLUB) {
                newClient['openid_cloud_club'] = xcx_openid;
            }
            else {
                newClient['openid_sheu'] = xcx_openid;
            }
        }
        else if (appid === ProConf.APP_CLOUD_CLUB) {
            // 这里是不应该走的, 但为了测试...
            // 如果没有获取到 unionid 时
            where['openid_cloud_club'] = xcx_openid;
            newClient['openid_cloud_club'] = xcx_openid;
        }
        else {
            // 如果是服务号,则走这里
            where['openid_sheu'] = xcx_openid;
            newClient['openid_sheu'] = xcx_openid;
        }
        try {
            const originData = await this.ctx.model.Client.findOrCreate({ where, defaults: newClient, raw: true });
            const result = originData[0];
            this.logger.debug('登录交换后的 result:: ', result);
            // 创建并生成token,然后返回
            const token = new token_1.default();
            return new message_1.default(null, {
                token: token.createToken({ id: result.id }),
                nickname: result.nickname,
                telephone: result.telephone,
                avatar_url: result.avatar_url,
                gender: result.gender,
            });
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.WX_LOGIN_FAIL, 'saveLogin4CloudClub exception!');
        }
    }
}
exports.default = AccessService;
/**
 * 转换 Sequelize 原始返回值
 */
// export const getJSONObject = (obj = {}) => {
//     if (null == obj || typeof obj != 'object') return null;
//     return JSON.parse(JSON.stringify(obj));
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsMkRBQTJEO0FBQzNELDhDQUFzRDtBQUN0RCwwQ0FBbUM7QUFDbkMsd0NBQXdDO0FBRXhDLDBDQUEwQztBQUUxQzs7R0FFRztBQUNILE1BQXFCLGFBQWMsU0FBUSxjQUFXO0lBRWxEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxNQUFjO1FBQzVDLDhCQUE4QjtRQUM5QixNQUFNLEtBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ3pCLFVBQVU7UUFDVixNQUFNLFNBQVMsR0FBRztZQUNkLEVBQUUsRUFBRSxNQUFNLEVBQUU7WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRSxDQUFDO1NBQ2YsQ0FBQztRQUVGLElBQUk7WUFDQSxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUM1RyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN4RSxNQUFNLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbEQsa0JBQWtCO1lBQ2xCLE1BQU0sS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7WUFDMUIsT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFO2dCQUNyQixLQUFLLEVBQUUsS0FBSyxDQUFD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