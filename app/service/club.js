"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const ListConf = require("../utils/configs/list-conf");
const message_1 = require("../utils/message");
const token_1 = require("../utils/token");
const base_1 = require("./common/base");
const uuidv1 = require('uuid/v1');
const moment = require('moment');
class ClubService extends base_1.default {
    /**
     * 通过用户的 ObjectId 获取我的社团(简单)列表
     * @param {*} param0
     */
    async getSimpleList({ token }) {
        try {
            // 获取用户id
            const loginToken = new token_1.default();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询简单的 我的社团 列表
            const sql = 'SELECT cb.id,cb.`title` FROM `club` cb '
                + 'INNER JOIN `club_contact` cct ON cct.`club_id`=cb.`id` '
                + 'WHERE cct.`client_id`=? AND cct.`struts`>=0 '
                + 'ORDER BY cct.`role_ability` DESC; ';
            const clubList = await this.ctx.model.query(sql, { replacements: [clientId], type: this.ctx.model.QueryTypes.SELECT, raw: true });
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
            const loginToken = new token_1.default();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的 列表
            const clubList = await this.ctx.model.query('CALL proc_query_myclub_detail(?)', { replacements: [clientId], type: this.ctx.model.QueryTypes.RAW, raw: true });
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
            const loginToken = new token_1.default();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的 列表
            const clubList = await this.ctx.model.query('CALL proc_query_canplay_club(?,?)', { replacements: [clientId, pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true });
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
            const loginToken = new token_1.default();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            const sql = 'SELECT cap.`id`,cap.`club_id`,cap.`struts`,cap.`checked_fail_reason`,cap.`createdAt`,'
                + 'c.`title`,c.`logo_url` '
                + `,(SELECT COUNT(1) FROM client_attention clat WHERE clat.client_id=? AND clat.club_id=c.id) AS 'isAttention' `
                + 'FROM `cloud_club`.`club_apply` cap '
                + 'INNER JOIN `club` c ON c.`id`=cap.`club_id` '
                + 'WHERE  cap.`apply_client_id`=? '
                + 'ORDER BY createdAt DESC '
                + 'LIMIT ?, ? ';
            let applyList = await this.ctx.model.query(sql, { replacements: [clientId, clientId, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT });
            applyList = applyList.map((o) => {
                const club = {
                    id: o.club_id, title: o.title, logo_url: o.logo_url,
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
        const loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            const clientId = loginToken.checkToken(token).data.id;
            // 新增或更新
            const values = {
                id: uuidv1(),
                club_id: clubid,
                formId,
                apply_client_id: clientId,
            };
            // let fields = ['nickname','avatar_url','gender'];
            const result = await this.ctx.model.ClubApply.create(values, { raw: true });
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
            const loginToken = new token_1.default();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询社团面板提示信息
            const panelTips = await this.ctx.model.query('CALL proc_query_myclub_panelinfo(?,?,?)', { replacements: [clubid, clientId, last_read_notice], type: this.ctx.model.QueryTypes.RAW, raw: true });
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
            const where = { club_id: clubid, struts: 1 };
            const attributes = ['id', 'title', 'content', 'createdAt'];
            const order = [['createdAt', 'DESC']];
            const include = [
                {
                    model: this.ctx.model.ClientRole,
                    required: true,
                    attributes: [['realname', 'author']],
                    as: 'crole',
                },
            ];
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            let noticeList = await this.ctx.model.ClubNotice.findAll({
                where, attributes, order, include,
                limit: pageSize,
                offset,
                raw: true,
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
            const clubStat = await this.ctx.model.query('SELECT '
                + '(SELECT COUNT(1) FROM client_attention cat WHERE cat.club_id=?) AS fans '
                + ',(SELECT COUNT(1) FROM club_contact cct WHERE cct.club_id=? AND cct.struts=0) AS member ', { replacements: [clubid, clubid], type: this.ctx.model.QueryTypes.SELECT });
            // 查看社团资料
            const attributes = ['id', 'title', 'struts', 'createdAt', 'updatedAt', 'title_updatedAt', 'logo_url', 'logo_created', 'bgimg_url', 'bgimg_created', 'intro'];
            const include = [
                {
                    model: this.ctx.model.School,
                    required: true,
                    attributes: [['uName', 'school_name']],
                    as: 'school',
                },
            ];
            let clubInfo = await this.ctx.model.Club.findById(clubid, { attributes, include, raw: true });
            if (clubInfo) {
                clubInfo = this.handleTimezone(clubInfo, ['createdAt', 'updatedAt', 'title_updatedAt', 'logo_created', 'bgimg_created']);
                // 查询社团负责人数据
                const clubLeader = await this.ctx.model.ClubContact.findOne({
                    attributes: [],
                    where: { role_ability: 4, club_id: clubid },
                    include: [
                        {
                            model: this.ctx.model.ClientRole,
                            required: true,
                            attributes: [['realname', 'leader']],
                            as: 'crole',
                        },
                    ],
                    raw: true,
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
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            const sql = 'SELECT catt.id,catt.club_id,c.title,c.`logo_url`,sch.`uName`, 1 as \'isAttention\' '
                + ',(SELECT COUNT(1) FROM client_attention cat WHERE cat.club_id=c.`id`) AS \'fans\' '
                + ',(SELECT COUNT(1) FROM club_contact cct WHERE cct.club_id=c.`id` AND cct.struts=0) AS \'member\' '
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
        const loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            const client_id = loginToken.checkToken(token).data.id;
            // 新增或更新
            const values = {
                id: uuidv1(),
                club_id,
                client_id,
            };
            // let fields = ['nickname','avatar_url','gender'];
            const result = await this.ctx.model.ClientAttention.create(values, { raw: true });
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
        const loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            const client_id = loginToken.checkToken(token).data.id;
            // 新增或更新
            const where = {
                club_id,
                client_id,
            };
            // let fields = ['nickname','avatar_url','gender'];
            const result = await this.ctx.model.ClientAttention.destroy({ where });
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
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            // let pageSize = ListConf.PAGE_SIZE;
            // let offset = (pagenum - 1) * pageSize;
            const sql = 'CALL proc_query_club_recommend(?,?)';
            const recommendList = await this.ctx.model.query(sql, { replacements: [client_id, pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHVEQUF1RDtBQUN2RCw4Q0FBc0Q7QUFDdEQsMENBQW1DO0FBQ25DLHdDQUF3QztBQUV4QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLE1BQXFCLFdBQVksU0FBUSxjQUFXO0lBQ2hEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxhQUFhLENBQUMsRUFBRSxLQUFLLEVBQUU7UUFDaEMsSUFBSTtZQUNBLFNBQVM7WUFDVCxNQUFNLFVBQVUsR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO1lBQy9CLE1BQU0sUUFBUSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUN0RCxnQkFBZ0I7WUFDaEIsTUFBTSxHQUFHLEdBQUcseUNBQXlDO2tCQUMvQyx5REFBeUQ7a0JBQ3pELDhDQUE4QztrQkFDOUMsb0NBQW9DLENBQUM7WUFDM0MsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUMzQyxFQUFFLFlBQVksRUFBRSxDQUFDLFFBQVEsQ0FBQyxFQUFFLElBQUksRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsQ0FDbEYsQ0FBQztZQUNGLE9BQU8sSUFBSSxpQkFBTyxDQUFDLElBQUksRUFBRSxRQUFRLENBQUMsQ0FBQztTQUN0QztRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1IsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckIsT0FBTyxJQUFJLGlC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