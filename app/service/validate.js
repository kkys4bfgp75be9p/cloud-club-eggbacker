"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 *
 */
// const uuidv1 = require('uuid/v1');
const moment = require('moment');
// import * as Alioss from '../utils/upload/alioss';
// import * as ClubConf from '../utils/configs/club-conf';
const ListConf = require("../utils/configs/list-conf");
const HttpClient = require("../utils/http-client");
const message_1 = require("../utils/message");
const token_1 = require("../utils/token");
const WXTemplate = require("../utils/wx/TemplateUtils");
const base_1 = require("./common/base");
class ValidateService extends base_1.default {
    /**
     * 保存 系统审核登录用户
     */
    async getSchoolSettingList({ struts, pagenum, token }) {
        try {
            // 获取用户id
            const loginToken = new token_1.default();
            loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            const sql = 'SELECT cr.`id`, cr.`client_id`,cr.`profe`,cr.`educ_job`,cr.`realname`,cr.`cert_url`,'
                + 'cr.`struts`,cr.`createdAt`,sch.`uName` '
                + 'FROM `client_role` cr '
                + 'INNER JOIN school sch ON cr.`school_id`=sch.`sid` '
                + 'WHERE cr.`struts`=? '
                + 'ORDER BY cr.`createdAt` DESC '
                + 'LIMIT ?, ? ';
            let applyList = await this.ctx.model.query(sql, { replacements: [struts, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT });
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
 * 获取用于审核的新的社团列表
 * @param {*} param0
 */
    async getClubBuildList({ struts, pagenum, token }) {
        try {
            // 获取用户id
            const loginToken = new token_1.default();
            loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            const sql = 'SELECT cba.`id`, cba.`create_client_id`,cba.`title`,cba.`club_check_url`,cba.`struts`,cba.`checked_fail_reason`,'
                + 'cba.`checked_user`,cba.`checkedAt`,cba.`createdAt`,c.`nickname`,c.`avatar_url`,c.`gender`,cr.`realname`,sch.`uName` '
                + 'FROM `club_build_apply` cba '
                + 'INNER JOIN `client` c ON c.`id`=cba.`create_client_id` '
                + 'INNER JOIN `client_role` cr ON cr.`client_id`=c.`id` '
                + 'INNER JOIN school sch ON cba.`school_id`=sch.`sid` '
                + 'WHERE cba.`struts`=? '
                + 'ORDER BY cba.`createdAt` DESC '
                + 'LIMIT ?, ? ';
            let applyList = await this.ctx.model.query(sql, { replacements: [struts, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT });
            // 因此, 时间需进行手动时区转换
            applyList = this.handleTimezone(applyList, ['createdAt', 'checkedAt']);
            return new message_1.default(null, applyList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 获取用于审核活动创建的列表
     * @param {*} param0
     */
    async getActivityCreateList({ struts, pagenum, token }) {
        try {
            // 获取用户id
            const loginToken = new token_1.default();
            loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            const today = moment(new Date()).format('YYYY-MM-DD');
            const sql = 'SELECT cay.id,cay.club_id,cay.title,cay.content,cay.createdAt,cay.timing, cay.brief_start, cay.brief_end, cay.checked_fail_reason, cay.struts,'
                + `CASE 
			WHEN cay.timing=1 THEN '活动总结'
			WHEN cay.brief_start > '${today}' THEN '活动即将开始'
			WHEN '${today}' BETWEEN cay.brief_start AND cay.brief_end THEN '活动进行中'
			ELSE '已结束' END 'timing_text'
			,`
                + `c.title AS 'club_title', c.logo_url,sch.uName AS 'school', `
                + `(SELECT GROUP_CONCAT(cap.pic_url) FROM club_activity_pic cap WHERE cap.activity_id=cay.id) AS imgslist `
                + 'FROM club_activity cay '
                + 'INNER JOIN club c ON c.id=cay.club_id '
                + 'INNER JOIN school sch ON sch.sid=c.school_id '
                + 'WHERE cay.struts = ? '
                + 'ORDER BY cay.createdAt DESC '
                + 'LIMIT ?, ? ';
            let applyList = await this.ctx.model.query(sql, { replacements: [struts, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT });
            // 因此, 时间需进行手动时区转换
            applyList = this.handleTimezone(applyList, ['createdAt', 'brief_start', 'brief_end']);
            return new message_1.default(null, applyList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 获取用于审核的活动评论列表
     * @param {*} param0
     */
    async getCommentCreateList({ struts, pagenum, token }) {
        try {
            // 获取用户id
            const loginToken = new token_1.default();
            loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            const sql = 'SELECT  cac.`id`,cac.`client_id`,cac.`reply_client_id`,cac.`activity_id`,cac.`is_hidden`,cac.`content`,cac.`struts`,cac.`checked_fail_reason`, '
                + 'cac.`createdAt`,ca.`title`,c.`avatar_url`,c.`nickname`,c.`gender` '
                // +",cr.`realname`,sch.`uName` AS 'school' "
                + 'FROM `club_activity_comment` cac '
                + 'INNER JOIN club_activity ca ON cac.`activity_id`=ca.`id` '
                + 'INNER JOIN `client` c ON c.`id`=cac.`client_id` '
                // +'INNER JOIN `client_role` cr ON cr.`client_id`=c.`id` '
                // +'INNER JOIN school sch ON sch.`sid`=cr.`school_id` '
                + 'WHERE cac.struts = ? '
                + 'ORDER BY cac.createdAt DESC '
                + 'LIMIT ?, ? ';
            let applyList = await this.ctx.model.query(sql, { replacements: [struts, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT });
            // 因此, 时间需进行手动时区转换
            applyList = this.handleTimezone(applyList, ['createdAt']);
            return new message_1.default(null, applyList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /** *******************************************************************************
     * 审核操作
     */
    /**
     * 审核设置学校的申请
     * @param {*} param0
     */
    async execSchool({ client_id, struts, checked_fail_reason = '', token }) {
        // 修改权限判定吧
        try {
            const loginToken = new token_1.default();
            // 获取操作者的用户ID
            const executerId = loginToken.checkToken(token).data.id;
            // 修改权限
            const updateResult = await this.ctx.model.query('CALL proc_validate_school(?,?,?,?)', {
                replacements: [client_id, struts, checked_fail_reason, executerId],
                type: this.ctx.model.QueryTypes.RAW, raw: true,
            });
            const updateErr = Number(updateResult[0].err);
            if (updateErr === 0) {
                // 获取formid,发送模板消息
                const currentModel = await this.ctx.model.query('SELECT cr.formId,c.openid_cloud_club,sch.uName,c.telephone '
                    + 'FROM client_role cr '
                    + 'INNER JOIN `client` c ON c.id=cr.client_id '
                    + 'INNER JOIN `school` sch ON sch.sid=cr.school_id '
                    + 'WHERE cr.client_id=? ', {
                    replacements: [client_id], type: this.ctx.model.QueryTypes.SELECT,
                });
                if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
                    const model = currentModel[0];
                    if (model.formId) {
                        WXTemplate.sendSchoolTemplate(model.formId, model.openid_cloud_club, model.uName, struts, checked_fail_reason);
                    }
                    if (model.telephone && struts == 1) {
                        HttpClient.sendSMSToSchool(model.telephone);
                    }
                    // WXTemplate.sendCommentTemplate(model.formId, model.openid_cloud_club, model.title, model.id, struts, checked_fail_reason);
                }
                return new message_1.default(null);
            }
            else if (updateErr === 2000)
                return new message_1.default(message_1.ErrorType.PROC_EXCEPTION);
            else
                return new message_1.default(message_1.ErrorType.UNKNOW_ERROR);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 审核 创建社团 的申请
     * @param {*} param0
     */
    async execBuildClub({ client_id, club_apply_id, struts, checked_fail_reason = '', token }) {
        // 修改权限判定吧
        try {
            const loginToken = new token_1.default();
            // 获取操作者的用户ID
            const executerId = loginToken.checkToken(token).data.id;
            // 修改权限
            const updateResult = await this.ctx.model.query('CALL proc_validate_buildClub(?,?,?,?,?)', {
                replacements: [client_id, club_apply_id, struts, checked_fail_reason, executerId],
                type: this.ctx.model.QueryTypes.RAW, raw: true,
            });
            const updateErr = Number(updateResult[0].err);
            if (updateErr === 0) {
                // 获取formid,发送模板消息
                const currentModel = await this.ctx.model.query('SELECT cba.formId,c.openid_cloud_club,cba.title,sch.uName '
                    + 'FROM club_build_apply cba '
                    + 'INNER JOIN `client` c ON c.id=cba.create_client_id '
                    + 'INNER JOIN `school` sch ON sch.sid=cba.school_id '
                    + 'WHERE cba.id=? ', {
                    replacements: [club_apply_id], type: this.ctx.model.QueryTypes.SELECT,
                });
                if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
                    const model = currentModel[0];
                    if (model.formId) {
                        WXTemplate.sendClubBuildTemplate(model.formId, model.openid_cloud_club, model.uName, model.title, struts, checked_fail_reason);
                    }
                    if (model.telephone && struts == 1) {
                        HttpClient.sendSMSToClub(model.telephone);
                    }
                    // WXTemplate.sendCommentTemplate(model.formId, model.openid_cloud_club, model.title, model.id, struts, checked_fail_reason);
                }
                return new message_1.default(null);
            }
            else if (updateErr === 2000)
                return new message_1.default(message_1.ErrorType.PROC_EXCEPTION);
            else if (updateErr === 4001)
                return new message_1.default(message_1.ErrorType.PROC_VALIDATE_STATUS_EXCEPTION);
            else if (updateErr === 4002)
                return new message_1.default(message_1.ErrorType.PROC_VALIDATE_NO_ROWCOUNT);
            else
                return new message_1.default(message_1.ErrorType.UNKNOW_ERROR);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 审核 创建社团活动活动活动 的申请
     * @param {*} param0
     */
    async execBuildActivity({ activity_id, struts, checked_fail_reason = '', token }) {
        // 修改权限判定吧
        try {
            const loginToken = new token_1.default();
            // 获取操作者的用户ID
            const executerId = loginToken.checkToken(token).data.id;
            // 修改权限
            const updateResult = await this.ctx.model.query('CALL proc_validate_buildActivity(?,?,?,?)', {
                replacements: [activity_id, struts, checked_fail_reason, executerId],
                type: this.ctx.model.QueryTypes.RAW, raw: true,
            });
            const updateErr = Number(updateResult[0].err);
            if (updateErr === 0) {
                // 获取formid,发送模板消息
                const currentModel = await this.ctx.model.query('SELECT ca.formId,c.openid_cloud_club,ca.title '
                    + 'FROM club_activity ca '
                    + 'INNER JOIN `client` c ON c.id=ca.creator_client_id '
                    + 'WHERE ca.id=? ', {
                    replacements: [activity_id], type: this.ctx.model.QueryTypes.SELECT,
                });
                if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
                    const model = currentModel[0];
                    if (model.formId) {
                        WXTemplate.sendActivityTemplate(model.formId, model.openid_cloud_club, model.title, struts, checked_fail_reason);
                    }
                    // WXTemplate.sendCommentTemplate(model.formId, model.openid_cloud_club, model.title, model.id, struts, checked_fail_reason);
                }
                return new message_1.default(null);
            }
            else if (updateErr === 2000)
                return new message_1.default(message_1.ErrorType.PROC_EXCEPTION);
            else if (updateErr === 4001)
                return new message_1.default(message_1.ErrorType.PROC_VALIDATE_STATUS_EXCEPTION);
            else if (updateErr === 4002)
                return new message_1.default(message_1.ErrorType.PROC_VALIDATE_NO_ROWCOUNT);
            else
                return new message_1.default(message_1.ErrorType.UNKNOW_ERROR);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 审核 创建评论 的申请
     * @param {*} param0
     */
    async execBuildComment({ comment_id, struts, checked_fail_reason = '', token }) {
        // 修改权限判定吧
        try {
            const loginToken = new token_1.default();
            // 获取操作者的用户ID
            const executerId = loginToken.checkToken(token).data.id;
            // 修改权限
            const updateResult = await this.ctx.model.query('CALL proc_validate_buildComment(?,?,?,?)', {
                replacements: [comment_id, struts, checked_fail_reason, executerId],
                type: this.ctx.model.QueryTypes.RAW, raw: true,
            });
            const updateErr = Number(updateResult[0].err);
            if (updateErr === 0) {
                // 获取formid,发送模板消息
                const currentModel = await this.ctx.model.query('SELECT cac.formId,c.openid_cloud_club,ca.title,ca.id '
                    + 'FROM club_activity_comment cac '
                    + 'INNER JOIN `client` c ON c.id=cac.client_id '
                    + 'INNER JOIN club_activity ca ON ca.id=cac.activity_id '
                    + 'WHERE cac.id=? ', {
                    replacements: [comment_id], type: this.ctx.model.QueryTypes.SELECT,
                });
                if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
                    const model = currentModel[0];
                    if (model.formId) {
                        WXTemplate.sendCommentTemplate(model.formId, model.openid_cloud_club, model.title, model.id, struts, checked_fail_reason);
                    }
                }
                return new message_1.default(null);
            }
            else if (updateErr === 2000)
                return new message_1.default(message_1.ErrorType.PROC_EXCEPTION);
            else if (updateErr === 4001)
                return new message_1.default(message_1.ErrorType.PROC_VALIDATE_STATUS_EXCEPTION);
            else if (updateErr === 4002)
                return new message_1.default(message_1.ErrorType.PROC_VALIDATE_NO_ROWCOUNT);
            else
                return new message_1.default(message_1.ErrorType.UNKNOW_ERROR);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
}
exports.default = ValidateService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ2YWxpZGF0ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gscUNBQXFDO0FBQ3JDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQyxvREFBb0Q7QUFDcEQsMERBQTBEO0FBQzFELHVEQUF1RDtBQUN2RCxtREFBbUQ7QUFDbkQsOENBQXNEO0FBQ3RELDBDQUFtQztBQUNuQyx3REFBd0Q7QUFDeEQsd0NBQXdDO0FBRXhDLE1BQXFCLGVBQWdCLFNBQVEsY0FBVztJQUNwRDs7T0FFRztJQUNJLEtBQUssQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFO1FBQ3hELElBQUk7WUFDQSxTQUFTO1lBQ1QsTUFBTSxVQUFVLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztZQUMvQixVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDckMsZ0JBQWdCO1lBQ2hCLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxTQUFTLENBQUM7WUFDcEMsTUFBTSxNQUFNLEdBQUcsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxDQUFDLEdBQUcsUUFBUSxDQUFDO1lBQ3hDLE1BQU0sR0FBRyxHQUFHLHNGQUFzRjtrQkFDNUYseUNBQXlDO2tCQUN6Qyx3QkFBd0I7a0JBQ3hCLG9EQUFvRDtrQkFDcEQsc0JBQXNCO2tCQUN0QiwrQkFBK0I7a0JBQy9CLGFBQWEsQ0FBQztZQUNwQixJQUFJLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLEVBQzFDLEVBQUUsWUFBWSxFQUFFLENBQUMsTUFBTSxFQUFFLE1BQU0sRUFBRSxRQUFRLENBQUMsRUFBRSxJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMs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