/**
 * Access 登录相关的业务逻辑层
 */
import BaseService from './common/base';
const uuidv1 = require('uuid/v1');
import Message, {ErrorType} from '../utils/message';
import Token from '../utils/token';

export default class SchoolService extends BaseService {
    /**
     * 获取附近的学校以及本城市的学校列表
     * @param {*} param0
     */
    public async getNearbyList ({ latitude, longitude }) {
        try {
            // 获取我当前的用户ID
            const nearbySchoolResult = await this.ctx.model.query(
                'CALL proc_query_nearby_school(?,?)',
                { replacements: [latitude, longitude], type: this.ctx.model.QueryTypes.RAW, raw: true },
            );
            const nearbySchool = nearbySchoolResult[0];
            let province_code = '610000'; // 默认省份: 陕西省
            let city_code = '610100'; // 默认城市: 西安
            if (nearbySchool && typeof nearbySchool == 'object') {
                province_code = nearbySchool.province_code;
                city_code = nearbySchool.city_code;
            }
            // 查询该 `城市` 所有学校信息
            const where = { city_code };
            const attributes = ['sid', 'uName'];
            const schools = await this.ctx.model.School.findAll({ where, attributes });

            return new Message(null, { nearby: nearbySchool, city: city_code, province: province_code, schools });
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 新增学校设置申请
     * @param {*} param0
     */
    public async getSchoolListByCity ({ citycode }) {
        try {
            // 新增或更新
            const where = {
                city_code: citycode,
            };
            const attributes = [
                'sid', 'uName',
            ];
            // let fields = ['nickname','avatar_url','gender'];
            const result = await this.ctx.model.School.findAll({ where, attributes, raw: true });
            this.ctx.logger.info('getSchoolListByCity => ', result);
            // 更新方法返回的数组中,存放的是更新影响的行数
            // result = result[0];
            // Message { err: null, list: [ 1 ] }
            return new Message(null, result);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 加载学校设置的最新申请
     * @param {*} param0
     */
    public async loadSchoolApply ({ token }) {
        try {
            const loginToken = new Token();
            const client_id = loginToken.checkToken(token).data.id;
            // 新增或更新
            // let where = {
            //     client_id
            // };
            // let attributes = [
            //     "id", "client_id", "school_id", "profe", "educ_job", "realname", "cert_url", "struts"
            // ];
            // let fields = ['nickname','avatar_url','gender'];
            // let result = await Models.client_role.findOne({ where , attributes, raw: true});
            const result = await this.ctx.model.query(
                'SELECT id,client_id,school_id,profe,educ_job,realname,cert_url,struts,sch.province_code,sch.city_code,cr.checked_fail_reason '
                + 'FROM client_role cr '
                + 'INNER JOIN school sch ON cr.school_id=sch.sid '
                + 'WHERE cr.client_id=? '
                ,
                { replacements: [client_id], type: this.ctx.model.QueryTypes.SELECT, raw: true },
            );
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new Message(null, result);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 新增学校设置申请
     * @param {*} param0
     */
    public async setSchoolApply ({ formId, school_id, profe, educ_job, realname, cert_url, token }) {
        const loginToken = new Token();
        try {
            // 获取我当前的用户ID
            const client_id = loginToken.checkToken(token).data.id;
            // let client_id = '085a15e1-caa6-11e8-a8d2-54bf64582633';
            // 先查询当前用户 client_id 是否存在于 client_role 中,
            // 存在的话, 则更新数据
            // 不存在的话, 则新增 client_role
            // 没有数据则为null, 有数据则返回查找的对象
            const roleList = await this.ctx.model.ClientRole.findOne({ where: { client_id }, raw: true });
            const values = {
                // id: uuidv1(),
                // client_id: client_id,
                school_id, profe, educ_job, realname, cert_url, formId,
            };
            let updateResult = {}, msg = '';
            if (null === roleList) {
                // 如果 role表中没有数据,则新增数据
                values['id'] = uuidv1();
                values['client_id'] = client_id;
                updateResult = this.getJSONObject(await this.ctx.model.ClientRole.create(values, { raw: true }));
                if (updateResult) {
                    msg = '新增数据成功!';
                }
            } else {
                // 如果有数据,则更新数据
                const where = { client_id };
                values['struts'] = 0; // 学校状态变更为待审核
                updateResult = await this.ctx.model.ClientRole.update(values, { where, raw: true });
                msg = '成功更新数据条目: ' + updateResult;
            }

            // 新增或更新
            // let values = {
            //     id: uuidv1(),
            //     client_id: client_id,
            //     school_id, profe, educ_job, realname, cert_url
            // };
            // // let fields = ['nickname','avatar_url','gender'];
            // let result = await Models.client_role.create(values,{raw: true});
            // // 更新方法返回的数组中,存放的是更新影响的行数
            // // Message { err: null, list: [ 1 ] }
            return new Message(null, msg);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }
}