/**
 * 
 */
// const uuidv1 = require('uuid/v1');
const moment = require('moment');
import BaseService from './common/base';
import Token from '../utils/token';
import Message, { ErrorType } from '../utils/message';
import * as HttpClient from '../utils/http-client';
import * as WXTemplate from '../utils/wx/TemplateUtils';
// import * as Alioss from '../utils/upload/alioss';
// import * as ClubConf from '../utils/configs/club-conf';
import * as ListConf from '../utils/configs/list-conf';

export default class ValidateService extends BaseService {
    /**
     * 保存 系统审核登录用户
     */
    public async getSchoolSettingList({ struts, pagenum, token }) {
        try {
            // 获取用户id
            let loginToken = new Token();
            loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let sql = 'SELECT cr.`id`, cr.`client_id`,cr.`profe`,cr.`educ_job`,cr.`realname`,cr.`cert_url`,'
                + 'cr.`struts`,cr.`createdAt`,sch.`uName` '
                + 'FROM `client_role` cr '
                + 'INNER JOIN school sch ON cr.`school_id`=sch.`sid` '
                + 'WHERE cr.`struts`=? '
                + 'ORDER BY cr.`createdAt` DESC '
                + 'LIMIT ?, ? ';
            let applyList = await this.ctx.model.query(sql,
                { replacements: [struts, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT }
            );
            // 因此, 时间需进行手动时区转换
            applyList = this.handleTimezone(applyList, ['createdAt']);

            return new Message(null, applyList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
 * 获取用于审核的新的社团列表
 * @param {*} param0 
 */
    public async getClubBuildList({ struts, pagenum, token }) {
        try {
            // 获取用户id
            let loginToken = new Token();
            loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let sql = 'SELECT cba.`id`, cba.`create_client_id`,cba.`title`,cba.`club_check_url`,cba.`struts`,cba.`checked_fail_reason`,'
                + 'cba.`checked_user`,cba.`checkedAt`,cba.`createdAt`,c.`nickname`,c.`avatar_url`,c.`gender`,cr.`realname`,sch.`uName` '
                + 'FROM `club_build_apply` cba '
                + 'INNER JOIN `client` c ON c.`id`=cba.`create_client_id` '
                + 'INNER JOIN `client_role` cr ON cr.`client_id`=c.`id` '
                + 'INNER JOIN school sch ON cba.`school_id`=sch.`sid` '
                + 'WHERE cba.`struts`=? '
                + 'ORDER BY cba.`createdAt` DESC '
                + 'LIMIT ?, ? ';
            let applyList = await this.ctx.model.query(sql,
                { replacements: [struts, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT }
            );
            // 因此, 时间需进行手动时区转换
            applyList = this.handleTimezone(applyList, ['createdAt', 'checkedAt']);

            return new Message(null, applyList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 获取用于审核活动创建的列表
     * @param {*} param0 
     */
    public async getActivityCreateList({ struts, pagenum, token }) {
        try {
            // 获取用户id
            let loginToken = new Token();
            loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let today = moment(new Date()).format('YYYY-MM-DD');
            let sql = 'SELECT cay.id,cay.club_id,cay.title,cay.content,cay.createdAt,cay.timing, cay.brief_start, cay.brief_end, cay.checked_fail_reason, cay.struts,'
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
            let applyList = await this.ctx.model.query(sql,
                { replacements: [struts, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT }
            );
            // 因此, 时间需进行手动时区转换
            applyList = this.handleTimezone(applyList, ['createdAt', 'brief_start', 'brief_end']);

            return new Message(null, applyList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 获取用于审核的活动评论列表
     * @param {*} param0 
     */
    public async getCommentCreateList({ struts, pagenum, token }) {
        try {
            // 获取用户id
            let loginToken = new Token();
            loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let sql = 'SELECT  cac.`id`,cac.`client_id`,cac.`reply_client_id`,cac.`activity_id`,cac.`is_hidden`,cac.`content`,cac.`struts`,cac.`checked_fail_reason`, '
                + "cac.`createdAt`,ca.`title`,c.`avatar_url`,c.`nickname`,c.`gender` "
                // +",cr.`realname`,sch.`uName` AS 'school' "
                + 'FROM `club_activity_comment` cac '
                + 'INNER JOIN club_activity ca ON cac.`activity_id`=ca.`id` '
                + 'INNER JOIN `client` c ON c.`id`=cac.`client_id` '
                // +'INNER JOIN `client_role` cr ON cr.`client_id`=c.`id` '
                // +'INNER JOIN school sch ON sch.`sid`=cr.`school_id` '
                + 'WHERE cac.struts = ? '
                + 'ORDER BY cac.createdAt DESC '
                + 'LIMIT ?, ? ';
            let applyList = await this.ctx.model.query(sql,
                { replacements: [struts, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT }
            );
            // 因此, 时间需进行手动时区转换
            applyList = this.handleTimezone(applyList, ['createdAt']);

            return new Message(null, applyList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /** *******************************************************************************
     * 审核操作
     */

    /**
     * 审核设置学校的申请
     * @param {*} param0 
     */
    public async execSchool({ client_id, struts, checked_fail_reason = '', token }) {
        // 修改权限判定吧
        try {
            let loginToken = new Token();
            // 获取操作者的用户ID
            let executerId = loginToken.checkToken(token).data.id;
            // 修改权限
            let updateResult = await this.ctx.model.query(
                'CALL proc_validate_school(?,?,?,?)',
                {
                    replacements: [client_id, struts, checked_fail_reason, executerId],
                    type: this.ctx.model.QueryTypes.RAW, raw: true
                }
            );
            let updateErr = Number(updateResult[0].err);
            if (updateErr === 0) {
                // 获取formid,发送模板消息
                let currentModel = await this.ctx.model.query(
                    'SELECT cr.formId,c.openid_cloud_club,sch.uName,c.telephone '
                    + 'FROM client_role cr '
                    + 'INNER JOIN `client` c ON c.id=cr.client_id '
                    + 'INNER JOIN `school` sch ON sch.sid=cr.school_id '
                    + 'WHERE cr.client_id=? ',
                    {
                        replacements: [client_id], type: this.ctx.model.QueryTypes.SELECT
                    })
                if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
                    let model = currentModel[0];
                    if (model.formId) {
                        WXTemplate.sendSchoolTemplate(model.formId, model.openid_cloud_club, model.uName, struts, checked_fail_reason);
                    }
                    if (model.telephone && struts == 1) {
                        HttpClient.sendSMSToSchool(model.telephone);
                    }
                    // WXTemplate.sendCommentTemplate(model.formId, model.openid_cloud_club, model.title, model.id, struts, checked_fail_reason);
                }

                return new Message(null);
            } else if (updateErr === 2000)
                return new Message(ErrorType.PROC_EXCEPTION);
            else
                return new Message(ErrorType.UNKNOW_ERROR);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 审核 创建社团 的申请
     * @param {*} param0 
     */
    public async execBuildClub({ client_id, club_apply_id, struts, checked_fail_reason = '', token }) {
        // 修改权限判定吧
        try {
            let loginToken = new Token();
            // 获取操作者的用户ID
            let executerId = loginToken.checkToken(token).data.id;
            // 修改权限
            let updateResult = await this.ctx.model.query(
                'CALL proc_validate_buildClub(?,?,?,?,?)',
                {
                    replacements: [client_id, club_apply_id, struts, checked_fail_reason, executerId],
                    type: this.ctx.model.QueryTypes.RAW, raw: true
                }
            );
            let updateErr = Number(updateResult[0].err);
            if (updateErr === 0) {
                // 获取formid,发送模板消息
                let currentModel = await this.ctx.model.query(
                    'SELECT cba.formId,c.openid_cloud_club,cba.title,sch.uName '
                    + 'FROM club_build_apply cba '
                    + 'INNER JOIN `client` c ON c.id=cba.create_client_id '
                    + 'INNER JOIN `school` sch ON sch.sid=cba.school_id '
                    + 'WHERE cba.id=? ',
                    {
                        replacements: [club_apply_id], type: this.ctx.model.QueryTypes.SELECT
                    })
                if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
                    let model = currentModel[0];
                    if (model.formId) {
                        WXTemplate.sendClubBuildTemplate(model.formId, model.openid_cloud_club, model.uName, model.title, struts, checked_fail_reason);
                    }
                    if (model.telephone && struts == 1) {
                        HttpClient.sendSMSToClub(model.telephone);
                    }
                    // WXTemplate.sendCommentTemplate(model.formId, model.openid_cloud_club, model.title, model.id, struts, checked_fail_reason);
                }

                return new Message(null);
            } else if (updateErr === 2000)
                return new Message(ErrorType.PROC_EXCEPTION);
            else if (updateErr === 4001)
                return new Message(ErrorType.PROC_VALIDATE_STATUS_EXCEPTION);
            else if (updateErr === 4002)
                return new Message(ErrorType.PROC_VALIDATE_NO_ROWCOUNT);
            else
                return new Message(ErrorType.UNKNOW_ERROR);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 审核 创建社团活动活动活动 的申请
     * @param {*} param0 
     */
    public async execBuildActivity({ activity_id, struts, checked_fail_reason = '', token }) {
        // 修改权限判定吧
        try {
            let loginToken = new Token();
            // 获取操作者的用户ID
            let executerId = loginToken.checkToken(token).data.id;
            // 修改权限
            let updateResult = await this.ctx.model.query(
                'CALL proc_validate_buildActivity(?,?,?,?)',
                {
                    replacements: [activity_id, struts, checked_fail_reason, executerId],
                    type: this.ctx.model.QueryTypes.RAW, raw: true
                }
            );
            let updateErr = Number(updateResult[0].err);
            if (updateErr === 0) {
                // 获取formid,发送模板消息
                let currentModel = await this.ctx.model.query(
                    'SELECT ca.formId,c.openid_cloud_club,ca.title '
                    + 'FROM club_activity ca '
                    + 'INNER JOIN `client` c ON c.id=ca.creator_client_id '
                    + 'WHERE ca.id=? ',
                    {
                        replacements: [activity_id], type: this.ctx.model.QueryTypes.SELECT
                    })
                if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
                    let model = currentModel[0];
                    if (model.formId) {
                        WXTemplate.sendActivityTemplate(model.formId, model.openid_cloud_club, model.title, struts, checked_fail_reason);
                    }
                    // WXTemplate.sendCommentTemplate(model.formId, model.openid_cloud_club, model.title, model.id, struts, checked_fail_reason);
                }

                return new Message(null);
            } else if (updateErr === 2000)
                return new Message(ErrorType.PROC_EXCEPTION);
            else if (updateErr === 4001)
                return new Message(ErrorType.PROC_VALIDATE_STATUS_EXCEPTION);
            else if (updateErr === 4002)
                return new Message(ErrorType.PROC_VALIDATE_NO_ROWCOUNT);
            else
                return new Message(ErrorType.UNKNOW_ERROR);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 审核 创建评论 的申请
     * @param {*} param0 
     */
    public async execBuildComment({ comment_id, struts, checked_fail_reason = '', token }) {
        // 修改权限判定吧
        try {
            let loginToken = new Token();
            // 获取操作者的用户ID
            let executerId = loginToken.checkToken(token).data.id;
            // 修改权限
            let updateResult = await this.ctx.model.query(
                'CALL proc_validate_buildComment(?,?,?,?)',
                {
                    replacements: [comment_id, struts, checked_fail_reason, executerId],
                    type: this.ctx.model.QueryTypes.RAW, raw: true
                }
            );
            let updateErr = Number(updateResult[0].err);
            if (updateErr === 0) {
                // 获取formid,发送模板消息
                let currentModel = await this.ctx.model.query(
                    'SELECT cac.formId,c.openid_cloud_club,ca.title,ca.id '
                    + 'FROM club_activity_comment cac '
                    + 'INNER JOIN `client` c ON c.id=cac.client_id '
                    + 'INNER JOIN club_activity ca ON ca.id=cac.activity_id '
                    + 'WHERE cac.id=? ',
                    {
                        replacements: [comment_id], type: this.ctx.model.QueryTypes.SELECT
                    })
                if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
                    let model = currentModel[0];
                    if (model.formId) {
                        WXTemplate.sendCommentTemplate(model.formId, model.openid_cloud_club, model.title, model.id, struts, checked_fail_reason);
                    }
                }

                return new Message(null);
            } else if (updateErr === 2000)
                return new Message(ErrorType.PROC_EXCEPTION);
            else if (updateErr === 4001)
                return new Message(ErrorType.PROC_VALIDATE_STATUS_EXCEPTION);
            else if (updateErr === 4002)
                return new Message(ErrorType.PROC_VALIDATE_NO_ROWCOUNT);
            else
                return new Message(ErrorType.UNKNOW_ERROR);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }
}