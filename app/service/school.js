"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const base_1 = require("./common/base");
let uuidv1 = require('uuid/v1');
const token_1 = require("../utils/token");
const message_1 = require("../utils/message");
class SchoolService extends base_1.default {
    /**
     * 获取附近的学校以及本城市的学校列表
     * @param {*} param0
     */
    async getNearbyList({ latitude, longitude }) {
        try {
            // 获取我当前的用户ID
            let nearbySchoolResult = await this.ctx.model.query('CALL proc_query_nearby_school(?,?)', { replacements: [latitude, longitude], type: this.ctx.model.QueryTypes.RAW, raw: true });
            let nearbySchool = nearbySchoolResult[0];
            let province_code = '610000'; // 默认省份: 陕西省
            let city_code = '610100'; // 默认城市: 西安
            if (nearbySchool && typeof nearbySchool == 'object') {
                province_code = nearbySchool.province_code;
                city_code = nearbySchool.city_code;
            }
            // 查询该 `城市` 所有学校信息
            let where = { city_code };
            let attributes = ['sid', 'uName'];
            let schools = await this.ctx.model.School.findAll({ where, attributes });
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
            let where = {
                city_code: citycode
            };
            let attributes = [
                "sid", "uName"
            ];
            // let fields = ['nickname','avatar_url','gender'];
            let result = await this.ctx.model.School.findAll({ where, attributes, raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            result = result[0];
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
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 新增或更新
            // let where = {
            //     client_id
            // };
            // let attributes = [
            //     "id", "client_id", "school_id", "profe", "educ_job", "realname", "cert_url", "struts"
            // ];
            // let fields = ['nickname','avatar_url','gender'];
            // let result = await Models.client_role.findOne({ where , attributes, raw: true});
            let result = await this.ctx.model.query('SELECT id,client_id,school_id,profe,educ_job,realname,cert_url,struts,sch.province_code,sch.city_code,cr.checked_fail_reason '
                + 'FROM client_role cr '
                + 'INNER JOIN school sch ON cr.school_id=sch.sid '
                + "WHERE cr.client_id=? ", { replacements: [client_id], type: this.ctx.model.QueryTypes.SELECT, raw: true });
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
        let loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            let client_id = loginToken.checkToken(token).data.id;
            // let client_id = '085a15e1-caa6-11e8-a8d2-54bf64582633';
            // 先查询当前用户 client_id 是否存在于 client_role 中, 
            // 存在的话, 则更新数据 
            // 不存在的话, 则新增 client_role
            // 没有数据则为null, 有数据则返回查找的对象
            let roleList = await this.ctx.model.ClientRole.findOne({ where: { client_id }, raw: true });
            let values = {
                // id: uuidv1(),
                // client_id: client_id,
                school_id, profe, educ_job, realname, cert_url, formId
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
                let where = { client_id };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2Nob29sLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsic2Nob29sLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCx3Q0FBd0M7QUFDeEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2hDLDBDQUFtQztBQUNuQyw4Q0FBb0Q7QUFFcEQsTUFBcUIsYUFBYyxTQUFRLGNBQVc7SUFDbEQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLGFBQWEsQ0FBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUU7UUFDL0MsSUFBSTtZQUNBLGFBQWE7WUFDYixJQUFJLGtCQUFrQixHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUMvQyxvQ0FBb0MsRUFDcEMsRUFBRSxZQUFZLEVBQUUsQ0FBQyxRQUFRLEVBQUUsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUMxRixDQUFDO1lBQ0YsSUFBSSxZQUFZLEdBQUcsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsSUFBSSxhQUFhLEdBQUcsUUFBUSxDQUFDLENBQUMsWUFBWTtZQUMxQyxJQUFJLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxXQUFXO1lBQ3JDLElBQUksWUFBWSxJQUFJLE9BQU8sWUFBWSxJQUFJLFFBQVEsRUFBRTtnQkFDakQsYUFBYSxHQUFHLFlBQVksQ0FBQyxhQUFhLENBQUM7Z0JBQzNDLFNBQVMsR0FBRyxZQUFZLENBQUMsU0FBUyxDQUFDO2FBQ3RDO1lBQ0Qsa0JBQWtCO1lBQ2xCLElBQUksS0FBSyxHQUFHLEVBQUUsU0FBUyxFQUFFLENBQUM7WUFDMUIsSUFBSSxVQUFVLEdBQUcsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDbEMsSUFBSSxPQUFPLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxDQUFDLENBQUE7WUFFeEUsT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxJQUFJLEVBQUUsU0FBUyxFQUFFLFFBQVEsRUFBRSxhQUFhLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQztTQUN6RztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxJQUFJLGlCQUFPLENBQUMsbUJBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLG1CQUFtQixDQUFFLEVBQUUsUUFBUSxFQUFFO1FBQzFDLElBQUk7WUFDQSxRQUFRO1lBQ1IsSUFBSSxLQUFLLEdBQUc7Z0JBQ1IsU0FBUyxFQUFFLFFBQVE7YUFDdEIsQ0FBQztZQUNGLElBQUksVUFBVSxHQUFHO2dCQUNiLEtBQUssRUFBRSxPQUFPO2FBQ2pCLENBQUM7WUFDRixtREFBbUQ7WUFDbkQsSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztZQUNuRix5QkFBeUI7WUFDekIsTUFBTSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixxQ0FBcUM7WUFDckMsT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1NBQ3BDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLElBQUksaUJBQU8sQ0FBQyxtQkFBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsZUFBZSxDQUFFLEVBQUUsS0FBSyxFQUFFO1FBQ25DLElBQUk7WUFDQSxJQUFJLFVBQVUsR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO1lBQzdCLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyRCxRQUFRO1lBQ1IsZ0JBQWdCO1lBQ2hCLGdCQUFnQjtZQUNoQixLQUFLO1lBQ0wscUJBQXFCO1lBQ3JCLDRGQUE0RjtZQUM1RixLQUFLO1lBQ0wsbURBQW1EO1lBQ25ELG1GQUFtRjtZQUNuRixJQUFJLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FDbkMsK0hBQStIO2tCQUM3SCxzQkFBc0I7a0JBQ3RCLGdEQUFnRDtrQkFDaEQsdUJBQXVCLEVBRXpCLEVBQUUsWUFBWSxFQUFFLENBQUMsU0FBUyxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUNuRixDQUFDO1lBQ0YseUJBQXlCO1lBQ3pCLHFDQUFxQztZQUNyQyxPQUFPLElBQUksaUJBQU8sQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUM7U0FDcEM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxjQUFjLENBQUUsRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUU7UUFDMUYsSUFBSSxVQUFVLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztRQUM3QixJQUFJO1lBQ0EsYUFBYTtZQUNiLElBQUksU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNyRCwwREFBMEQ7WUFDMUQsMENBQTBDO1lBQzFDLGVBQWU7WUFDZix5QkFBeUI7WUFDekIsMEJBQTBCO1lBQzFCLElBQUksUUFBUSxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1lBQzVGLElBQUksTUFBTSxHQUFHO2dCQUNULGdCQUFnQjtnQkFDaEIsd0JBQXdCO2dCQUN4QixTQUFTLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU07YUFDekQsQ0FBQztZQUNGLElBQUksWUFBWSxHQUFHLEVBQUUsRUFBRSxHQUFHLEdBQUcsRUFBRSxDQUFDO1lBQ2hDLElBQUksSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDbkIsc0JBQXNCO2dCQUN0QixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxFQUFFLENBQUM7Z0JBQ3hCLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxTQUFTLENBQUM7Z0JBQ2hDLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNqRyxJQUFJLFlBQVksRUFBRTtvQkFDZCxHQUFHLEdBQUcsU0FBUyxDQUFDO2lCQUNuQjthQUNKO2lCQUFNO2dCQUNILGNBQWM7Z0JBQ2QsSUFBSSxLQUFLLEdBQUcsRUFBRSxTQUFTLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLGFBQWE7Z0JBQ25DLFlBQVksR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFDO2dCQUNwRixHQUFHLEdBQUcsWUFBWSxHQUFHLFlBQVksQ0FBQzthQUNyQztZQUVELFFBQVE7WUFDUixpQkFBaUI7WUFDakIsb0JBQW9CO1lBQ3BCLDRCQUE0QjtZQUM1QixxREFBcUQ7WUFDckQsS0FBSztZQUNMLHNEQUFzRDtZQUN0RCxvRUFBb0U7WUFDcEUsNEJBQTRCO1lBQzVCLHdDQUF3QztZQUN4QyxPQUFPLElBQUksaUJBQU8sQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDakM7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNSLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3JCLE9BQU8sSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxDQUFDO1NBQ2pEO0lBQ0wsQ0FBQztDQUNKO0FBL0lELGdDQStJQyJ9