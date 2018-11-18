"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const base_1 = require("./common/base");
const uuidv1 = require('uuid/v1');
const message_1 = require("../utils/message");
const token_1 = require("../utils/token");
class SchoolService extends base_1.default {
    /**
     * 获取附近的学校以及本城市的学校列表
     * @param {*} param0
     */
    async getNearbyList({ latitude, longitude }) {
        try {
            // 获取我当前的用户ID
            const nearbySchoolResult = await this.ctx.model.query('CALL proc_query_nearby_school(?,?)', { replacements: [latitude, longitude], type: this.ctx.model.QueryTypes.RAW, raw: true });
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
            return new message_1.default(null, { nearby: nearbySchool, city: city_code, province: province_code, schools });
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 新增学校设置申请
     * @param {*} param0
     */
    async getSchoolListByCity({ citycode }) {
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
            // 更新方法返回的数组中,存放的是更新影响的行数
            // result = result[0];
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, result);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 加载学校设置的最新申请
     * @param {*} param0
     */
    async loadSchoolApply({ token }) {
        try {
            const loginToken = new token_1.default();
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
            const result = await this.ctx.model.query('SELECT id,client_id,school_id,profe,educ_job,realname,cert_url,struts,sch.province_code,sch.city_code,cr.checked_fail_reason '
                + 'FROM client_role cr '
                + 'INNER JOIN school sch ON cr.school_id=sch.sid '
                + 'WHERE cr.client_id=? ', { replacements: [client_id], type: this.ctx.model.QueryTypes.SELECT, raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, result);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 新增学校设置申请
     * @param {*} param0
     */
    async setSchoolApply({ formId, school_id, profe, educ_job, realname, cert_url, token }) {
        const loginToken = new token_1.default();
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
            }
            else {
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
            return new message_1.default(null, msg);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
}
exports.default = SchoolService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nob29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nob29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCx3Q0FBd0M7QUFDeEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLDhDQUFvRDtBQUNwRCwwQ0FBbUM7QUFFbkMsTUFBcUIsYUFBYyxTQUFRLGNBQVc7SUFDbEQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7UUFDL0MsSUFBSTtZQUNBLGFBQWE7WUFDYixNQUFNLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUNqRCxvQ0FBb0MsRUFDcEMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUMxRixDQUFDO1lBQ0YsTUFBTSxZQUFZLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsWUFBWTtZQUMxQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxXQUFXO1lBQ3JDLElBQUksWUFBWSxJQUFJLE9BQU8sWUFBWSxJQUFJLFFBQVEsRUFBRTtnQkFDakQsYUFBYSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBQzNDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO2FBQ3RDO1lBQ0Qsa0JBQWtCO1lBQ2xCLE1BQU0sS0FBSyxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7WUFDNUIsTUFBTSxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDcEMsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUM7WUFFM0UsT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUN6RztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxJQUFJLGlCQUFPLENBQUMsbUJBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLG1CQUFtQixDQUFFLEVBQUUsUUFBUSxFQUFFO1FBQzFDLElBQUk7WUFDQSxRQUFRO1lBQ1IsTUFBTSxLQUFLLEdBQUc7Z0JBQ1YsU0FBUyxFQUFFLFFBQVE7YUFDdEIsQ0FBQztZQUNGLE1BQU0sVUFBVSxHQUFHO2dCQUNmLEtBQUssRUFBRSxPQUFPO2FBQ2pCLENBQUM7WUFDRixtREFBbUQ7WUFDbkQsTUFBTSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNyRix5QkFBeUI7WUFDekIsc0JBQXNCO1lBQ3RCLHFDQUFxQztZQUNyQyxPQUFPLElBQUksaUJBQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxlQUFlLENBQUUsRUFBRSxLQUFLLEVBQUU7UUFDbkMsSUFBSTtZQUNBLE1BQU0sVUFBVSxHQUFHLElBQUksZUFBSyxFQUFFLENBQUM7WUFDL0IsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3ZELFFBQVE7WUFDUixnQkFBZ0I7WUFDaEIsZ0JBQWdCO1lBQ2hCLEtBQUs7WUFDTCxxQkFBcUI7WUFDckIsNEZBQTRGO1lBQzVGLEtBQUs7WUFDTCxtREFBbUQ7WUFDbkQsbUZBQW1GO1lBQ25GLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUNyQywrSEFBK0g7a0JBQzdILHNCQUFzQjtrQkFDdEIsZ0RBQWdEO2tCQUNoRCx1QkFBdUIsRUFFekIsRUFBRSxZQUFZLEVBQUUsQ0FBQyxTQUFTLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQ25GLENBQUM7WUFDRix5QkFBeUI7WUFDekIscUNBQXFDO1lBQ3JDLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQztTQUNwQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxJQUFJLGlCQUFPLENBQUMsbUJBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLGNBQWMsQ0FBRSxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRTtRQUMxRixNQUFNLFVBQVUsR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO1FBQy9CLElBQUk7WUFDQSxhQUFhO1lBQ2IsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ3ZELDBEQUEwRDtZQUMxRCx5Q0FBeUM7WUFDekMsY0FBYztZQUNkLHlCQUF5QjtZQUN6QiwwQkFBMEI7WUFDMUIsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLEVBQUUsU0FBUyxFQUFFLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7WUFDOUYsTUFBTSxNQUFNLEdBQUc7Z0JBQ1gsZ0JBQWdCO2dCQUNoQix3QkFBd0I7Z0JBQ3hCLFNBQVMsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTTthQUN6RCxDQUFDO1lBQ0YsSUFBSSxZQUFZLEdBQUcsRUFBRSxFQUFFLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDaEMsSUFBSSxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUNuQixzQkFBc0I7Z0JBQ3RCLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLEVBQUUsQ0FBQztnQkFDeEIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztnQkFDaEMsWUFBWSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pHLElBQUksWUFBWSxFQUFFO29CQUNkLEdBQUcsR0FBRyxTQUFTLENBQUM7aUJBQ25CO2FBQ0o7aUJBQU07Z0JBQ0gsY0FBYztnQkFDZCxNQUFNLEtBQUssR0FBRyxFQUFFLFNBQVMsRUFBRSxDQUFDO2dCQUM1QixNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsYUFBYTtnQkFDbkMsWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxLQUFLLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUM7Z0JBQ3BGLEdBQUcsR0FBRyxZQUFZLEdBQUcsWUFBWSxDQUFDO2FBQ3JDO1lBRUQsUUFBUTtZQUNSLGlCQUFpQjtZQUNqQixvQkFBb0I7WUFDcEIsNEJBQTRCO1lBQzVCLHFEQUFxRDtZQUNyRCxLQUFLO1lBQ0wsc0RBQXNEO1lBQ3RELG9FQUFvRTtZQUNwRSw0QkFBNEI7WUFDNUIsd0NBQXdDO1lBQ3hDLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztTQUNqQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxJQUFJLGlCQUFPLENBQUMsbUJBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDO0NBQ0o7QUEvSUQsZ0NBK0lDIn0=