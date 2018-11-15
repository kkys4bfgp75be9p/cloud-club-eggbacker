"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const uuidv1 = require('uuid/v1');
const base_1 = require("./common/base");
const token_1 = require("../utils/token");
const message_1 = require("../utils/message");
const ProConf = require("../utils/configs/project-config");
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
        let where = { openid };
        // 写入数据的条件
        let newClient = {
            id: uuidv1(),
            username: '未知',
            the_power: 0
        };
        try {
            let originData = await this.ctx.model.CheckerRole.findOrCreate({ where, defaults: newClient, raw: true });
            this.logger.debug('【saveLogin4SystemRole => originData】: ', originData);
            let result = originData[0];
            this.logger.debug('系统审核登录交换后的 result:: ', result);
            // 创建并生成token,然后返回
            let token = new token_1.default();
            return new message_1.default(null, {
                token: token.createToken({ id: result.id }),
                username: result.username
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
        let where = {};
        // 写入数据的条件
        let newClient = {
            id: uuidv1()
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
            let originData = await this.ctx.model.Client.findOrCreate({ where, defaults: newClient, raw: true });
            let result = originData[0];
            this.logger.debug('登录交换后的 result:: ', result);
            // 创建并生成token,然后返回
            let token = new token_1.default();
            return new message_1.default(null, {
                token: token.createToken({ id: result.id }),
                nickname: result.nickname,
                telephone: result.telephone,
                avatar_url: result.avatar_url,
                gender: result.gender
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjZXNzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWNjZXNzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsd0NBQXdDO0FBQ3hDLDBDQUFtQztBQUNuQyw4Q0FBc0Q7QUFDdEQsMkRBQTJEO0FBRTNELDBDQUEwQztBQUUxQzs7R0FFRztBQUNILE1BQXFCLGFBQWMsU0FBUSxjQUFXO0lBRWxEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxNQUFjO1FBQzVDLDhCQUE4QjtRQUM5QixJQUFJLEtBQUssR0FBRyxFQUFFLE1BQU0sRUFBRSxDQUFDO1FBQ3ZCLFVBQVU7UUFDVixJQUFJLFNBQVMsR0FBRztZQUNaLEVBQUUsRUFBRSxNQUFNLEVBQUU7WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLFNBQVMsRUFBRSxDQUFDO1NBQ2YsQ0FBQztRQUVGLElBQUk7WUFDQSxJQUFJLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUMxRyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyx3Q0FBd0MsRUFBRSxVQUFVLENBQUMsQ0FBQztZQUN4RSxJQUFJLE1BQU0sR0FBRyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsc0JBQXNCLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbEQsa0JBQWtCO1lBQ2xCLElBQUksS0FBSyxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7WUFDeEIsT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFO2dCQUNyQixLQUFLLEVBQUUsS0FBSyxDQUFD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