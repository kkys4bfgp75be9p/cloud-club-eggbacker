"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const base_1 = require("./common/base");
let uuidv1 = require('uuid/v1');
let moment = require('moment');
const token_1 = require("../utils/token");
const message_1 = require("../utils/message");
const Alioss = require("../utils/upload/alioss");
const WXTemplate = require("../utils/wx/TemplateUtils");
const ClubConf = require("../utils/configs/club-conf");
const ListConf = require("../utils/configs/list-conf");
class ClubmasterService extends base_1.default {
    /**
     * 社团联系人: 升降权
     * 多对一的升降权有可能会造成脏数据, 但并非敏感位置, 也不会有大量并发
     * @param {*} param0
     */
    async setContactPower({ diff, target_client, club_id, updatedAt, token }) {
        // 修改权限判定吧
        if (typeof diff !== 'number' || Number.isNaN(diff))
            return new message_1.default(message_1.ErrorType.TYPE_ERROR, '[diff: ' + diff + '] mast is a number!');
        if (diff != 1 && diff != -1)
            return new message_1.default(message_1.ErrorType.VALUE_SCOPE_ERROR, '[diff: ' + diff + '] value scope mast is -1 or 1!');
        try {
            let loginToken = new token_1.default();
            // 获取我当前的用户ID
            let clientId = loginToken.checkToken(token).data.id;
            // 修改权限
            let updateResult = await this.ctx.model.query('CALL proc_set_club_power(?,?,?,?,?)', {
                replacements: [clientId, target_client, club_id, diff, updatedAt],
                type: this.ctx.model.QueryTypes.RAW, raw: true
            });
            let updateErr = Number(updateResult[0].err);
            if (updateErr === 0)
                return new message_1.default(null);
            else if (updateErr === 2000)
                return new message_1.default(message_1.ErrorType.PROC_EXCEPTION);
            else if (updateErr === 2011)
                return new message_1.default(message_1.ErrorType.PROC_POWER_CHANGE_DIFF_INVALID);
            else if (updateErr === 2012)
                return new message_1.default(message_1.ErrorType.PROC_POWER_CHANGE_GT_2);
            else if (updateErr === 2013)
                return new message_1.default(message_1.ErrorType.PROC_POWER_CHANGE_LT_1);
            else if (updateErr === 2014)
                return new message_1.default(message_1.ErrorType.PROC_POWER_CHANGE_UPDATE_FAIL);
            else
                return new message_1.default(message_1.ErrorType.UNKNOW_ERROR);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 用户查看自己创建社团的申请列表
     * - struts: 状态, 申请中和历史 (0 和 1)
     * @param {*} param0
     */
    async getBuildApplyList({ struts, pagenum, token }) {
        if (struts === '1') {
            struts = { $or: [{ struts: -1 }, { struts: 1 }] };
        }
        else if (struts === '0') {
            struts = { struts: 0 };
        }
        try {
            // 获取用户id
            let loginToken = new token_1.default();
            let clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            let where = Object.assign({ create_client_id: clientId }, struts);
            let attributes = ['id', 'title', 'struts', 'checked_fail_reason', 'createdAt'];
            let order = [['createdAt', 'DESC']];
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let buildApplyList = await this.ctx.model.ClubBuildApply.findAll({
                where, attributes, order,
                limit: pageSize,
                offset: offset,
                raw: true
            });
            // 因此, 时间需进行手动时区转换
            buildApplyList = this.handleTimezone(buildApplyList, ['createdAt']);
            return new message_1.default(null, buildApplyList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 新增/创建社团
     * 建立社团时需验证:
     * - 创建社团数量(不得大于5,正在申请数量, 及作为团长的数量)
     * - 在申请中/审核通过的状态中, 是否在当前学校有重复名字的社团
     * @param {*} param0
     */
    async createClubApply({ formId, school_id, title, club_url, referrer, token }) {
        try {
            // 获取我当前的用户ID
            let loginToken = new token_1.default();
            let clientId = loginToken.checkToken(token).data.id;
            // 验证: 在申请中/审核通过的状态中, 是否在当前学校有重复名字的社团
            let repeat_title_count = await this.ctx.model.ClubBuildApply.count({
                where: { title, school_id, struts: { $between: [0, 1] } }
            });
            if (repeat_title_count > 0) {
                // 申请单中,当前学校存在重复的社团名称
                return new message_1.default(message_1.ErrorType.DATA_REPEAT, repeat_title_count);
            }
            // 验证: 创建社团数量(不得大于5,正在申请数量, 及作为团长的数量)
            // 正在申请的社团数量
            let applying_count = await this.ctx.model.ClubBuildApply.count({
                where: { struts: 0 }
            });
            let leader_count = await this.ctx.model.ClubContact.count({
                where: { client_id: clientId, role_ability: ClubConf.POWER_LEADER, struts: 0 }
            });
            // 校验申请权限: 担任社团团长, 及申请建立社团数量之和不能大于 5
            if (applying_count + leader_count > 5) {
                return new message_1.default(message_1.ErrorType.VALUE_OUT_OF_BOUNDS, (applying_count + leader_count));
            }
            // 新增社团申请单
            let values = {
                id: uuidv1(),
                create_client_id: clientId,
                school_id: school_id,
                title: title,
                club_check_url: club_url,
                formId,
                referrer
            };
            let apply_result = await this.ctx.model.ClubBuildApply.create(values, { raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, apply_result.dataValues);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 新增公告 (不允许删除)
     * @param {*} param0
     */
    async addNotice({ club_id, title, content, token }) {
        try {
            // 获取我当前的用户ID
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            let role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new message_1.default(message_1.ErrorType.LOW_POWER, role);
            }
            // 发布公告
            let values = {
                id: uuidv1(),
                club_id, client_id, title, content,
                struts: 1
            };
            let notice_result = await this.ctx.model.ClubNotice.create(values, { raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, notice_result.dataValues);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 撤销公告 (不允许删除)
     * @param {*} param0
     */
    async repealNotice({ club_id, notice_id, token }) {
        try {
            // 获取我当前的用户ID
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            let role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new message_1.default(message_1.ErrorType.LOW_POWER, role);
            }
            // 撤销公告
            let values = {
                repeal_date: Date.now(),
                struts: 0
            };
            let where = {
                id: notice_id
            };
            let notice_result = await this.ctx.model.ClubNotice.update(values, { where, raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, notice_result.dataValues);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 查询申请入社列表
     * @param {*} param0
     */
    async getClubJoinList({ club_id, struts, pagenum }) {
        try {
            // 获取用户id
            // let loginToken = new Token();
            // let client_id = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的联系人 列表
            let where = { club_id, struts, };
            let attributes = ['id', 'apply_client_id', 'struts', 'checked_fail_reason', 'createdAt'];
            let order = [['createdAt', 'DESC']];
            let include = [{
                    model: this.ctx.model.ClientRole,
                    required: true,
                    attributes: ['realname', 'profe', 'educ_job'],
                    as: 'crole'
                }, {
                    model: this.ctx.model.Client,
                    required: true,
                    attributes: ['gender', 'avatar_url'],
                    as: 'c'
                }
            ];
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let applyList = await this.ctx.model.ClubApply.findAll({
                where, attributes, order, include,
                limit: pageSize,
                offset: offset,
                raw: true
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
     * 社团申请: 批准
     * 当审核通过时, 更改club_apply表的申请状态, 及添加用户至club_contcat中
     * @param {*} param0
     */
    async joinClubRatify({ apply_id, club_id, apply_client_id, token }) {
        try {
            // 获取我当前的用户ID
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            let role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new message_1.default(message_1.ErrorType.LOW_POWER, role);
            }
            // 启动一个事务
            let trans = await this.ctx.model.transaction();
            // 审核通过入社申请
            let values = {
                checker_client_id: client_id,
                checked_date: Date.now(),
                struts: 1
            };
            let where = { id: apply_id, struts: 0 };
            // 更新: club_apply 申请表
            let apply_update_result = await this.ctx.model.ClubApply.update(values, { where, raw: true, transaction: trans });
            if (apply_update_result[0] !== 1) {
                // 更新操作错误, 事务回滚
                await trans.rollback();
                return new message_1.default(message_1.ErrorType.TRANS_ROLLBACK, apply_update_result);
            }
            //console.log('apply_update_result: ', apply_update_result);
            // 为 club_contact 添加联系人数据
            let contactValues = {
                id: uuidv1(),
                club_id,
                client_id: apply_client_id,
                role_ability: 0, struts: 0
            };
            let add_contact_result = await this.ctx.model.ClubContact.create(contactValues, { transaction: trans, raw: true });
            // 执行结果
            // let exec_result: void | object;
            try {
                // 提交执行结果
                await trans.commit();
                // 统一发送 "加入社团" 的模板消息,不等待不阻塞
                this.sendJoinClubTemplate(apply_id, 1);
                return new message_1.default(null, { apply_update_result, add_contact_result });
            }
            catch (e) {
                // 事务回滚
                await trans.rollback();
                return new message_1.default(message_1.ErrorType.TRANS_ROLLBACK, { apply_update_result, add_contact_result });
            }
            // Message { err: null, list: [ 1 ] }
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 社团申请: 拒绝 ( 无需涉及事务 )
     * @param {*} param0
     */
    async joinClubReject({ apply_id, club_id, reason, token }) {
        try {
            // 获取我当前的用户ID
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            let role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new message_1.default(message_1.ErrorType.LOW_POWER, role);
            }
            // 拒绝入社申请
            let values = {
                checker_client_id: client_id,
                checked_date: Date.now(),
                reason,
                struts: -1
            };
            let where = { id: apply_id };
            // 更新: club_apply 申请表
            let apply_update_result = await this.ctx.model.ClubApply.update(values, { where, raw: true });
            //console.log('apply_update_result: ', apply_update_result);
            // 统一发送 "加入社团" 的模板消息,不等待不阻塞
            this.sendJoinClubTemplate(apply_id, -1, reason);
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, { affect: apply_update_result[0] });
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 统一发送 "加入社团" 的模板消息
     */
    async sendJoinClubTemplate(apply_id, struts, reason = '') {
        // WXTemplate
        // 1. 查询数据: 通过单号查询 formId, 申请人的openid, 申请学校, 申请社团
        let currentModel = await this.ctx.model.query('SELECT ca.formId,c.openid_cloud_club,sch.uName,cb.title '
            + 'FROM club_apply ca '
            + 'INNER JOIN `client` c ON c.id=ca.apply_client_id '
            + 'INNER JOIN `club` cb ON cb.id=ca.club_id '
            + 'INNER JOIN `school` sch ON sch.sid=cb.school_id '
            + 'WHERE ca.id=? ', {
            replacements: [apply_id], type: this.ctx.model.QueryTypes.SELECT
        });
        // 2. 装载模板消息,发送
        if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
            let model = currentModel[0];
            WXTemplate.sendClubJoinTemplate(model.formId, model.openid_cloud_club, model.uName, model.title, struts, reason);
            // WXTemplate.sendCommentTemplate(model.formId, model.openid_cloud_club, model.title, model.id, struts, checked_fail_reason);
        }
    }
    /** *********************************************************************************
     *
     * 社团活动相关
     *
     ********************************************************************************* */
    /**
     * 查询可管理的活动
     *  已发布: 查询结果与活动列表中的社团活动查询结果一致
        审核中/待发布: 查询简单结果
     * @param {*} param0
     */
    async getActivitySimpleList({ club_id, struts, pagenum }) {
        if (struts === '-1') {
            struts = { struts: { $between: [-2, -1] } }; //必须从小往大的顺序
        }
        else if (struts === '0') {
            struts = { struts: 0 };
        }
        // 是否验证权限考虑下
        try {
            // 获取用户id
            // let loginToken = new Token();
            // let client_id = loginToken.checkToken(token).data.id;
            // 查询简单的活动 列表
            let where = Object.assign({ club_id }, struts);
            let attributes = ['id', 'title', 'struts', 'checked_fail_reason', 'createdAt'];
            let order = [['createdAt', 'DESC']];
            let include = [{
                    model: this.ctx.model.ClientRole,
                    required: true,
                    attributes: [['realname', 'author'], 'client_id'],
                    as: 'crole'
                }
            ];
            let pageSize = ListConf.PAGE_SIZE;
            let offset = (pagenum - 1) * pageSize;
            let activityList = await this.ctx.model.ClubActivity.findAll({
                where, attributes, order, include,
                limit: pageSize,
                offset: offset,
                raw: true
            });
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt']);
            return new message_1.default(null, activityList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 管理活动: 保存
     * 进入社团面板时,缓存当前所在的社团名称和id,此处获取
     * 离开页面,则删除oss中上传的配图
     * 保存之后还需要发布
     * @param {*} param0
     */
    async saveActivity({ activity_id, club_id, title, content, imgs, timing = 0, brief_start, brief_end, token }) {
        // 没有传入 活动id, 就新建
        activity_id = activity_id || uuidv1();
        try {
            // 获取我当前的用户ID
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 启动一个事务
            let trans = await this.ctx.model.transaction();
            // 执行结果
            // let exec_result = null;
            // 创建社团活动
            let values = {
                id: activity_id,
                club_id,
                creator_client_id: client_id,
                title, content, timing, brief_start, brief_end,
                struts: 0
            };
            // 创建社团活动
            let activity_update_result = await this.ctx.model.ClubActivity.upsert(values, { raw: true, transaction: trans });
            console.log('activity_update_result => ', activity_update_result);
            // if(apply_update_result[0] !== 1){
            //     // 更新操作错误, 事务回滚
            //     await trans.rollback();
            //     return new Message(ErrorType.TRANS_ROLLBACK, apply_update_result);
            // }
            // //console.log('apply_update_result: ', apply_update_result);
            // if(activity_update_result === false){
            //     // 事务回滚
            //     exec_result = await trans.rollback();
            //     return new Message(ErrorType.TRANS_ROLLBACK, {exec_result,activity_update_result});
            // }
            // 添加活动配图
            // 如果不存在配图,则直接提交
            if (!Array.isArray(imgs) || !imgs || imgs.length == 0) {
                // 提交执行结果
                await trans.commit();
                return new message_1.default(null, { activity_update_result });
            }
            // 存在配图, 则全部新增
            imgs = imgs.map(o => {
                console.log('|===> 活动写入图片: ', o);
                return {
                    id: uuidv1(),
                    activity_id,
                    pic_url: o
                };
            });
            let add_pics_result = await this.ctx.model.ClubActivityPic.bulkCreate(imgs, { transaction: trans, raw: true });
            try {
                // 提交执行结果
                await trans.commit();
                return new message_1.default(null, { activity_id, activity_update_result, add_pics_result });
            }
            catch (e) {
                // 事务回滚
                await trans.rollback();
                return new message_1.default(message_1.ErrorType.TRANS_ROLLBACK, { activity_update_result, add_pics_result });
            }
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 管理活动: 发布
     * 待发布阶段,若修改,则需要重新保存, 发布按钮变灰
     * @param {*} param0
     */
    async publishActivity({ formId, activity_id }) {
        try {
            // 获取我当前的用户ID
            // let loginToken = new Token();
            // let client_id = loginToken.checkToken(token).data.id;
            // 管理活动: 待发布
            let values = { struts: -1, formId }; // 活动审核中的状态 
            let where = { id: activity_id };
            let activity_result = await this.ctx.model.ClubActivity.update(values, { where, raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, { affect: activity_result[0] });
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 管理活动: 撤销
     * 撤销后,变为待审核0状态
     * @param {*} param0
     */
    async repealActivity({ activity_id }) {
        try {
            // 获取我当前的用户ID
            // let loginToken = new Token();
            // let client_id = loginToken.checkToken(token).data.id;
            // 管理活动: 待发布
            let values = { struts: 0 }; // 活动审核中的状态 
            let where = { id: activity_id };
            let activity_result = await this.ctx.model.ClubActivity.update(values, { where, raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, { affect: activity_result[0] });
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 管理活动: 删除活动照片
     * @param {*} param0
     */
    async deleteActivityPics({ activity_id, imgs }) {
        try {
            // 获取我当前的用户ID
            // let loginToken = new Token();
            // let client_id = loginToken.checkToken(token).data.id;
            // 删除 OSS
            let delete_oss_result = null;
            if (Array.isArray(imgs) && imgs.length > 0) {
                delete_oss_result = await Alioss.deleteMulti(imgs);
            }
            let delete_activityPic_result = null;
            if (activity_id) {
                // 删除数据表中记录的图片
                let where = {
                    activity_id
                };
                console.log('待删除的图片数组: ', imgs);
                if (Array.isArray(imgs) && imgs.length > 0) {
                    // 过滤一下删除哪些图片
                    where['$or'] = imgs.map(img => { return { 'pic_url': img }; });
                }
                console.log('待删除的图片条件: ', where);
                delete_activityPic_result = await this.ctx.model.ClubActivityPic.destroy({ where, raw: true });
            }
            if (Array.isArray(delete_activityPic_result)) {
                delete_activityPic_result = delete_activityPic_result[0];
            }
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, { oss_status: delete_oss_result, affect: delete_activityPic_result });
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 更新社团资料
     * 未对操作者的权限进行验证
     * @param {*} param0
     */
    async modifyClubInfo({ club_id, title, logo_url, bgimg_url, intro, token }) {
        if (!title && !logo_url && !bgimg_url && !intro) {
            return new message_1.default(null, '未进行任何更新!');
        }
        try {
            // 获取我当前的用户ID
            let loginToken = new token_1.default();
            let client_id = loginToken.checkToken(token).data.id;
            // 更新条件
            let where = { id: club_id };
            // 当前时间
            let today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            // 更新内容
            let values = {
                updatedAt: today,
                modifier: client_id
            };
            if (title) {
                values['title'] = title;
                values['title_updatedAt'] = today;
            }
            if (logo_url) {
                values['logo_url'] = logo_url;
                values['logo_created'] = today;
            }
            ;
            if (bgimg_url) {
                values['bgimg_url'] = bgimg_url;
                values['bgimg_created'] = today;
            }
            if (intro)
                values['intro'] = intro;
            // let fields = ['nickname','avatar_url','gender'];
            let result = await this.ctx.model.Club.update(values, { where, raw: true });
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
     * 获取相册图片内容
     * club_id: 社团id, 空字符串为所有社团
     * pagenum: 页码
     */
    async editInfo({ activity_id }) {
        try {
            // 获取我当前的用户ID
            // let loginToken = new Token();
            // let client_id = loginToken.checkToken(token).data.id;
            let sql = 'SELECT  cay.id,cay.club_id,cay.title,cay.content,cay.createdAt, '
                + 'cay.timing, cay.brief_start, cay.brief_end, '
                + `c.title AS 'club_title', c.logo_url, `
                + `sch.uName AS 'school', `
                + '(SELECT GROUP_CONCAT(cap.pic_url) FROM club_activity_pic cap WHERE cap.activity_id=cay.id) AS imgslist, '
                + 'cr.`client_id`,cr.`realname` '
                + 'FROM club_activity cay '
                + 'INNER JOIN club c ON c.id=cay.club_id '
                + 'INNER JOIN client_role cr ON cr.`client_id`=cay.`creator_client_id` '
                + 'INNER JOIN school sch ON sch.sid=c.school_id '
                + 'WHERE cay.id=? '
                + 'ORDER BY cay.createdAt DESC '
                + `LIMIT 1 `;
            let editInfo = await this.ctx.model.query(sql, { replacements: [activity_id], type: this.ctx.model.QueryTypes.SELECT, raw: true });
            if (editInfo && Array.isArray(editInfo)) {
                editInfo = editInfo[0];
            }
            // 因此, 时间需进行手动时区转换
            editInfo = this.handleTimezone(editInfo, ['createdAt', 'brief_start', 'brief_end']);
            // 转换图片成为数组
            if (editInfo['imgslist']) {
                // console.log('imgslist: ', editInfo['imgslist']);
                editInfo['imgs'] = editInfo['imgslist'].split(',');
                delete editInfo['imgslist'];
            }
            return new message_1.default(null, editInfo);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
}
exports.default = ClubmasterService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Ym1hc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWJtYXN0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUF3QztBQUN4QyxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDaEMsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLDBDQUFtQztBQUNuQyw4Q0FBc0Q7QUFDdEQsaURBQWlEO0FBQ2pELHdEQUF3RDtBQUN4RCx1REFBdUQ7QUFDdkQsdURBQXVEO0FBRXZELE1BQXFCLGlCQUFrQixTQUFRLGNBQVc7SUFDdEQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO1FBQzNFLFVBQVU7UUFDVixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsR0FBRyxJQUFJLEdBQUcscUJBQXFCLENBQUMsQ0FBQztRQUN2SSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU8sSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxHQUFHLElBQUksR0FBRyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2xJLElBQUk7WUFDQSxJQUFJLFVBQVUsR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO1lBQzdCLGFBQWE7WUFDYixJQUFJLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDcEQsT0FBTztZQUNQLElBQUksWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFD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