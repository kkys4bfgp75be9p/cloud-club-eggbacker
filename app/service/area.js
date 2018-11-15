"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 区域相关业务层
 */
const base_1 = require("./common/base");
const message_1 = require("../utils/message");
class AreaService extends base_1.default {
    /**
     * 获取省份列表
     * @param {*} param0
     */
    async getProvinceList() {
        try {
            // 查询所有省份信息
            let attributes = ['code', 'name'];
            let province = await this.ctx.model.Province.findAll({ attributes, raw: true });
            return new message_1.default(null, province);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 获取城市列表
     * @param {*} param0
     */
    async getCityList({ provincecode }) {
        try {
            // 查询 `provincecode`所表示的所有 `城市` 信息
            let where = { provincecode };
            let attributes = ['code', 'name'];
            let citys = await this.ctx.model.City.findAll({ where, attributes, raw: true });
            return new message_1.default(null, citys);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
}
exports.default = AreaService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXJlYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFyZWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUF3QztBQUN4Qyw4Q0FBc0Q7QUFFdEQsTUFBcUIsV0FBWSxTQUFRLGNBQVc7SUFDaEQ7OztPQUdHO0lBQ0ksS0FBSyxDQUFDLGVBQWU7UUFDeEIsSUFBSTtZQUNBLFdBQVc7WUFDWCxJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsQyxJQUFJLFFBQVEsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxVQUFVLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7WUFDL0UsT0FBTyxJQUFJLGlCQUFPLENBQUMsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1NBQ3RDO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNyQixPQUFPLElBQUksaUJBQU8sQ0FBQyxtQkFBUyxDQUFDLFlBQVksRUFBRSxDQUFDLENBQUMsQ0FBQztTQUNqRDtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsV0FBVyxDQUFDLEVBQUUsWUFBWSxFQUFFO1FBQ3JDLElBQUk7WUFDQSxrQ0FBa0M7WUFDbEMsSUFBSSxLQUFLLEdBQUcsRUFBRSxZQUFZLEVBQUUsQ0FBQztZQUM3QixJQUFJLFVBQVUsR0FBRyxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUMsQ0FBQztZQUNsQyxJQUFJLEtBQUssR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1lBQy9FLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxJQUFJLGlCQUFPLENBQUMsbUJBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDLENBQUM7U0FDakQ7SUFDTCxDQUFDO0NBQ0o7QUFqQ0QsOEJBaUNDIn0=