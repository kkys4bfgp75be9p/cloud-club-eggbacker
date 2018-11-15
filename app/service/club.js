"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const base_1 = require("./common/base");
const token_1 = require("../utils/token");
const message_1 = require("../utils/message");
const ListConf = require("../utils/configs/list-conf");
let uuidv1 = require('uuid/v1');
let moment = require('moment');
class ClubService extends base_1.default {
    /**
     * 通过用户的 ObjectId 获取我的社团(简单)列表
     * @param {*} param0
     */
    async getSimpleList({ token }) {
        try {
            // 获取用户id
            let loginToken = new token_1.default();
            let clientId = loginToken.checkToken(token).data.id;
            // 查询简单的 我的社团 列表
            let sql = 'SELECT cb.id,cb.`title` FROM `club` cb '
                + 'INNER JOIN `club_contact` cct ON cct.`club_id`=cb.`id` '
                + 'WHERE cct.`client_id`=? AND cct.`struts`>=0 '
                + 'ORDER BY cct.`role_ability` DESC; ';
            let clubList = await this.ctx.model.query(sql, { replacements: [clientId], type: this.ctx.model.QueryTypes.SELECT, raw: true });
            return new message_1.default(null, clubList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 通过用户的 ObjectId 获取我的社团(详细)列表
     * @param {*} param0
     */
    async getDetailList({ token }) {
        try {
            // 获取用户id
            let loginToken = new token_1.default();
            let clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的 列表
            let clubList = await this.ctx.model.query('CALL proc_query_myclub_detail(?)', { replacements: [clientId], type: this.ctx.model.QueryTypes.RAW, raw: true });
            return new message_1.default(null, clubList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 获取本校社团(可申请加入的)列表
     * @param {*} param0
     */
    async getSelfCanapplyList({ pagenum, token }) {
        try {
            // 获取用户id
            let loginToken = new token_1.default();
            let clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的 列表
            let clubList = await this.ctx.model.query('CALL proc_query_canplay_club(?,?)', { replacements: [clientId, pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true });
            return new message_1.default(null, clubList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 获取申请加入社团的历史列表(仅仅是申请历史咯)
     * @param {*} param0
     */
    async getSelfApplyList({ pagenum, token }) {
        try {
            // 获取用户id
            let loginToken = new token_1.default();
            let clientId = loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let sql = 'SELECT cap.`id`,cap.`club_id`,cap.`struts`,cap.`checked_fail_reason`,cap.`createdAt`,'
                + 'c.`title`,c.`logo_url` '
                + `,(SELECT COUNT(1) FROM client_attention clat WHERE clat.client_id=? AND clat.club_id=c.id) AS 'isAttention' `
                + 'FROM `cloud_club`.`club_apply` cap '
                + 'INNER JOIN `club` c ON c.`id`=cap.`club_id` '
                + 'WHERE  cap.`apply_client_id`=? '
                + 'ORDER BY createdAt DESC '
                + 'LIMIT ?, ? ';
            let applyList = await this.ctx.model.query(sql, { replacements: [clientId, clientId, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT });
            applyList = applyList.map(o => {
                let club = {
                    id: o.club_id, title: o.title, logo_url: o.logo_url
                };
                delete o.club_id;
                delete o.title;
                delete o.logo_url;
                o.club = club;
                return o;
            });
            // 因此, 时间需进行手动时区转换
            applyList = this.handleTimezone(applyList, ['createdAt']);
            return new message_1.default(null, applyList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 申请加入社团
     * 同一时间对某社团的申请,可以有多个 -1(被拒绝状态), 但0(申请中) 和 1(已通过)只能有一个
     * @param {*} param0
     */
    async joinClub({ formId, clubid, token }) {
        let loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            let clientId = loginToken.checkToken(token).data.id;
            // 新增或更新
            let values = {
                id: uuidv1(),
                club_id: clubid,
                formId,
                apply_client_id: clientId
            };
            // let fields = ['nickname','avatar_url','gender'];
            let result = await this.ctx.model.ClubApply.create(values, { raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, this.getJSONObject(result));
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /** ***********************************************************
     * 社团: 面板相关业务
     ***********************************************************  */
    /**
     * 查询社团联系人
     * @param {*} param0
     */
    async getContactList({ clubid, pagenum }) {
        try {
            // 获取用户id
            // let loginToken = new Token();
            // let clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            let contactList = await this.ctx.model.query('CALL proc_query_myclub_contact(?,?)', { replacements: [clubid, pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true });
            // 因此, 时间需进行手动时区转换
            contactList = this.handleTimezone(contactList, ['updatedAt'], true);
            // contactList.forEach(element => {
            //     if(element.updatedAt){
            //         element.updatedAt = moment(element.updatedAt).format('YYYY-MM-DD HH:mm:ss');
            //     }
            // });
            return new message_1.default(null, contactList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 查询社团面板提示信息
     * 包含公告提示、申请入社数据提示
     * @param {*} param0
     */
    async getPanelTips({ clubid, last_read_notice = '2018-01-01 00:00:00', token }) {
        // 格式化时间
        last_read_notice = moment(new Date(last_read_notice)).format('YYYY-MM-DD HH:mm:ss');
        try {
            // 获取用户id
            let loginToken = new token_1.default();
            let clientId = loginToken.checkToken(token).data.id;
            // 查询社团面板提示信息
            let panelTips = await this.ctx.model.query('CALL proc_query_myclub_panelinfo(?,?,?)', { replacements: [clubid, clientId, last_read_notice], type: this.ctx.model.QueryTypes.RAW, raw: true });
            return new message_1.default(null, panelTips[0]);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 查看公告列表
     * @param {*} param0
     */
    async getNoticeList({ clubid, pagenum = 1 }) {
        try {
            // 获取用户id
            // let loginToken = new Token();
            // let clientId = loginToken.checkToken(token).data.id;
            // 查询社团面板提示信息
            let where = { club_id: clubid, struts: 1 };
            let attributes = ['id', 'title', 'content', 'createdAt'];
            let order = [['createdAt', 'DESC']];
            let include = [
                {
                    model: this.ctx.model.ClientRole,
                    required: true,
                    attributes: [['realname', 'author']],
                    as: 'crole'
                }
            ];
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let noticeList = await this.ctx.model.ClubNotice.findAll({
                where, attributes, order, include,
                limit: pageSize,
                offset,
                raw: true
            });
            noticeList = this.handleTimezone(noticeList, ['createdAt']);
            return new message_1.default(null, noticeList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 查看社团资料
     * @param {*} param0
     */
    async getDetailInfo({ clubid }) {
        try {
            // 获取用户id
            // let loginToken = new Token();
            // let clientId = loginToken.checkToken(token).data.id;
            // 查看当前社团的关注人数, 社团参与人数
            let clubStat = await this.ctx.model.query('SELECT '
                + '(SELECT COUNT(1) FROM client_attention cat WHERE cat.club_id=?) AS fans '
                + ',(SELECT COUNT(1) FROM club_contact cct WHERE cct.club_id=? AND cct.struts=0) AS member ', { replacements: [clubid, clubid], type: this.ctx.model.QueryTypes.SELECT });
            // 查看社团资料
            let attributes = ['id', 'title', 'struts', 'createdAt', 'updatedAt', 'title_updatedAt', 'logo_url', 'logo_created', 'bgimg_url', 'bgimg_created', 'intro'];
            let include = [
                {
                    model: this.ctx.model.School,
                    required: true,
                    attributes: [['uName', 'school_name']],
                    as: 'school'
                }
            ];
            let clubInfo = await this.ctx.model.Club.findById(clubid, { attributes, include, raw: true });
            if (clubInfo) {
                clubInfo = this.handleTimezone(clubInfo, ['createdAt', 'updatedAt', 'title_updatedAt', 'logo_created', 'bgimg_created']);
                // 查询社团负责人数据
                let clubLeader = await this.ctx.model.ClubContact.findOne({
                    attributes: [],
                    where: { role_ability: 4, club_id: clubid },
                    include: [
                        {
                            model: this.ctx.model.ClientRole,
                            required: true,
                            attributes: [['realname', 'leader']],
                            as: 'crole'
                        }
                    ],
                    raw: true
                });
                // 合并数据
                clubInfo.member = clubLeader;
            }
            if (clubStat && Array.isArray(clubStat)) {
                clubInfo.stat = clubStat[0];
            }
            return new message_1.default(null, clubInfo);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /** **************************************************************
     * 关注相关接口
     */
    /**
     * 查看我的关注(社团)列表
     * @param {*} param0
     */
    async getAttentionList({ pagenum, token }) {
        try {
            // 获取用户id
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let sql = "SELECT catt.id,catt.club_id,c.title,c.`logo_url`,sch.`uName`, 1 as 'isAttention' "
                + ",(SELECT COUNT(1) FROM client_attention cat WHERE cat.club_id=c.`id`) AS 'fans' "
                + ",(SELECT COUNT(1) FROM club_contact cct WHERE cct.club_id=c.`id` AND cct.struts=0) AS 'member' "
                + 'FROM client_attention catt '
                + 'INNER JOIN club c ON c.id=catt.`club_id` '
                + 'INNER JOIN school sch ON sch.sid=c.school_id '
                + 'WHERE catt.client_id=? '
                + 'ORDER BY catt.createdAt DESC '
                + 'LIMIT ?, ? ';
            let attentionList = await this.ctx.model.query(sql, { replacements: [client_id, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT });
            // 因此, 时间需进行手动时区转换
            attentionList = this.handleTimezone(attentionList, ['createdAt']);
            return new message_1.default(null, attentionList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 加入收藏(社团)
     * @param {*} param0
     */
    async addAttention({ club_id, token }) {
        let loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            let client_id = loginToken.checkToken(token).data.id;
            // 新增或更新
            let values = {
                id: uuidv1(),
                club_id: club_id,
                client_id: client_id
            };
            // let fields = ['nickname','avatar_url','gender'];
            let result = await this.ctx.model.ClientAttention.create(values, { raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, this.getJSONObject(result));
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.DATA_REPEAT, null);
        }
    }
    /**
     * 取消加入收藏(社团)
     * @param {*} param0
     */
    async cancelAttention({ club_id, token }) {
        let loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            let client_id = loginToken.checkToken(token).data.id;
            // 新增或更新
            let where = {
                club_id: club_id,
                client_id: client_id
            };
            // let fields = ['nickname','avatar_url','gender'];
            let result = await this.ctx.model.ClientAttention.destroy({ where });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, result);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.DATABASE_ERROR, e);
        }
    }
    /**
     * 在用户设置学校的情况下, 推送当前城市关注度高的社团
     * 在未获取地理位置授权的情况下, 推送全国范围
     * @param {*} param0
     */
    async getRecommendList({ pagenum, token }) {
        try {
            // 获取用户id
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            // let pageSize = ListConf.PAGE_SIZE;
            // let offset = (pagenum - 1) * pageSize;
            let sql = 'CALL proc_query_club_recommend(?,?)';
            let recommendList = await this.ctx.model.query(sql, { replacements: [client_id, pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true });
            // 因此, 时间需进行手动时区转换
            // recommendList = this.handleTimezone(recommendList, ['createdAt']);
            return new message_1.default(null, recommendList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
}
exports.default = ClubService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUF3QztBQUN4QywwQ0FBbUM7QUFDbkMsOENBQXNEO0FBQ3RELHVEQUF1RDtBQUV2RCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9CLE1BQXFCLFdBQVksU0FBUSxjQUFXO0lBQ2hEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUU7UUFDaEMsSUFBSTtZQUNBLFNBQVM7WUFDVCxJQUFJLFVBQVUsR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO1lBQzdCLElBQUksUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNwRCxnQkFBZ0I7WUFDaEIsSUFBSSxHQUFHLEdBQUcseUNBQXlDO2tCQUM3Qyx5REFBeUQ7a0JBQ3pELDhDQUE4QztrQkFDOUMsb0NBQW9DLENBQUM7WUFDM0MsSUFBSSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUN6QyxFQUFFLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FDbEYsQ0FBQztZQUNGLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN0QztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxJQUFJLGlC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