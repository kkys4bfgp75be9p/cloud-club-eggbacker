/**
 * Access 登录相关的业务逻辑层
 */
const uuidv1 = require('uuid/v1');
import BaseService from './common/base';
import Token from '../utils/token';
import Message, { ErrorType } from '../utils/message';
import * as ProConf from '../utils/configs/project-config';

// console.log('uuidv1 ======> ', uuidv1);

/**
 * Test Service
 */
export default class AccessService extends BaseService {

    /**
     * 保存 系统审核登录用户
     * @param name - your name
     */
    public async saveLogin4SystemRole(openid: string) {
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
            let token = new Token();
            return new Message(null, {
                token: token.createToken({ id: result.id }),
                username: result.username
            });
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.WX_LOGIN_FAIL, 'saveLogin4SystemRole exception!');
        }
    }

    /**
     * 保存 云社团登录用户
     * @param name - your name
     */
    public async saveLogin4CloudClub({ appid, unionid, xcx_openid }) {
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
            } else {
                newClient['openid_sheu'] = xcx_openid;
            }
        } else if (appid === ProConf.APP_CLOUD_CLUB) {
            // 这里是不应该走的, 但为了测试...
            // 如果没有获取到 unionid 时
            where['openid_cloud_club'] = xcx_openid;
            newClient['openid_cloud_club'] = xcx_openid;
        } else {
            // 如果是服务号,则走这里
            where['openid_sheu'] = xcx_openid;
            newClient['openid_sheu'] = xcx_openid;
        }

        try {
            let originData = await this.ctx.model.Client.findOrCreate({ where, defaults: newClient, raw: true });
            let result = originData[0];
            this.logger.debug('登录交换后的 result:: ', result);
            // 创建并生成token,然后返回
            let token = new Token();
            return new Message(null, {
                token: token.createToken({ id: result.id }),
                nickname: result.nickname,
                telephone: result.telephone,
                avatar_url: result.avatar_url,
                gender: result.gender
            });
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.WX_LOGIN_FAIL, 'saveLogin4CloudClub exception!');
        }
    }
}

/**
 * 转换 Sequelize 原始返回值
 */
// export const getJSONObject = (obj = {}) => {
//     if (null == obj || typeof obj != 'object') return null;
//     return JSON.parse(JSON.stringify(obj));
// }