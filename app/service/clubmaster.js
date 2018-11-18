"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Access 登录相关的业务逻辑层
 */
const base_1 = require("./common/base");
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const ClubConf = require("../utils/configs/club-conf");
const ListConf = require("../utils/configs/list-conf");
const message_1 = require("../utils/message");
const token_1 = require("../utils/token");
const Alioss = require("../utils/upload/alioss");
const WXTemplate = require("../utils/wx/TemplateUtils");
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
            const loginToken = new token_1.default();
            // 获取我当前的用户ID
            const clientId = loginToken.checkToken(token).data.id;
            // 修改权限
            const updateResult = await this.ctx.model.query('CALL proc_set_club_power(?,?,?,?,?)', {
                replacements: [clientId, target_client, club_id, diff, updatedAt],
                type: this.ctx.model.QueryTypes.RAW, raw: true,
            });
            const updateErr = Number(updateResult[0].err);
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
            const loginToken = new token_1.default();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            const where = Object.assign({ create_client_id: clientId }, struts);
            const attributes = ['id', 'title', 'struts', 'checked_fail_reason', 'createdAt'];
            const order = [['createdAt', 'DESC']];
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            let buildApplyList = await this.ctx.model.ClubBuildApply.findAll({
                where, attributes, order,
                limit: pageSize,
                offset,
                raw: true,
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
            const loginToken = new token_1.default();
            const clientId = loginToken.checkToken(token).data.id;
            // 验证: 在申请中/审核通过的状态中, 是否在当前学校有重复名字的社团
            const repeat_title_count = await this.ctx.model.ClubBuildApply.count({
                where: { title, school_id, struts: { $between: [0, 1] } },
            });
            if (repeat_title_count > 0) {
                // 申请单中,当前学校存在重复的社团名称
                return new message_1.default(message_1.ErrorType.DATA_REPEAT, repeat_title_count);
            }
            // 验证: 创建社团数量(不得大于5,正在申请数量, 及作为团长的数量)
            // 正在申请的社团数量
            const applying_count = await this.ctx.model.ClubBuildApply.count({
                where: { struts: 0 },
            });
            const leader_count = await this.ctx.model.ClubContact.count({
                where: { client_id: clientId, role_ability: ClubConf.POWER_LEADER, struts: 0 },
            });
            // 校验申请权限: 担任社团团长, 及申请建立社团数量之和不能大于 5
            if (applying_count + leader_count > 5) {
                return new message_1.default(message_1.ErrorType.VALUE_OUT_OF_BOUNDS, (applying_count + leader_count));
            }
            // 新增社团申请单
            const values = {
                id: uuidv1(),
                create_client_id: clientId,
                school_id,
                title,
                club_check_url: club_url,
                formId,
                referrer,
            };
            const apply_result = await this.ctx.model.ClubBuildApply.create(values, { raw: true });
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
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            const role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true,
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new message_1.default(message_1.ErrorType.LOW_POWER, role);
            }
            // 发布公告
            const values = {
                id: uuidv1(),
                club_id, client_id, title, content,
                struts: 1,
            };
            const notice_result = await this.ctx.model.ClubNotice.create(values, { raw: true });
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
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            const role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true,
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new message_1.default(message_1.ErrorType.LOW_POWER, role);
            }
            // 撤销公告
            const values = {
                repeal_date: Date.now(),
                struts: 0,
            };
            const where = {
                id: notice_id,
            };
            const notice_result = await this.ctx.model.ClubNotice.update(values, { where, raw: true });
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
            const where = { club_id, struts };
            const attributes = ['id', 'apply_client_id', 'struts', 'checked_fail_reason', 'createdAt'];
            const order = [['createdAt', 'DESC']];
            const include = [{
                    model: this.ctx.model.ClientRole,
                    required: true,
                    attributes: ['realname', 'profe', 'educ_job'],
                    as: 'crole',
                }, {
                    model: this.ctx.model.Client,
                    required: true,
                    attributes: ['gender', 'avatar_url'],
                    as: 'c',
                },
            ];
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            let applyList = await this.ctx.model.ClubApply.findAll({
                where, attributes, order, include,
                limit: pageSize,
                offset,
                raw: true,
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
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            const role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true,
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new message_1.default(message_1.ErrorType.LOW_POWER, role);
            }
            // 启动一个事务
            const trans = await this.ctx.model.transaction();
            // 审核通过入社申请
            const values = {
                checker_client_id: client_id,
                checked_date: Date.now(),
                struts: 1,
            };
            const where = { id: apply_id, struts: 0 };
            // 更新: club_apply 申请表
            const apply_update_result = await this.ctx.model.ClubApply.update(values, { where, raw: true, transaction: trans });
            if (apply_update_result[0] !== 1) {
                // 更新操作错误, 事务回滚
                await trans.rollback();
                return new message_1.default(message_1.ErrorType.TRANS_ROLLBACK, apply_update_result);
            }
            //console.log('apply_update_result: ', apply_update_result);
            // 为 club_contact 添加联系人数据
            const contactValues = {
                id: uuidv1(),
                club_id,
                client_id: apply_client_id,
                role_ability: 0, struts: 0,
            };
            const add_contact_result = await this.ctx.model.ClubContact.create(contactValues, { transaction: trans, raw: true });
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
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            const role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true,
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new message_1.default(message_1.ErrorType.LOW_POWER, role);
            }
            // 拒绝入社申请
            const values = {
                checker_client_id: client_id,
                checked_date: Date.now(),
                reason,
                struts: -1,
            };
            const where = { id: apply_id };
            // 更新: club_apply 申请表
            const apply_update_result = await this.ctx.model.ClubApply.update(values, { where, raw: true });
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
        const currentModel = await this.ctx.model.query('SELECT ca.formId,c.openid_cloud_club,sch.uName,cb.title '
            + 'FROM club_apply ca '
            + 'INNER JOIN `client` c ON c.id=ca.apply_client_id '
            + 'INNER JOIN `club` cb ON cb.id=ca.club_id '
            + 'INNER JOIN `school` sch ON sch.sid=cb.school_id '
            + 'WHERE ca.id=? ', {
            replacements: [apply_id], type: this.ctx.model.QueryTypes.SELECT,
        });
        // 2. 装载模板消息,发送
        if (currentModel && Array.isArray(currentModel) && currentModel.length > 0) {
            const model = currentModel[0];
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
            const where = Object.assign({ club_id }, struts);
            const attributes = ['id', 'title', 'struts', 'checked_fail_reason', 'createdAt'];
            const order = [['createdAt', 'DESC']];
            const include = [{
                    model: this.ctx.model.ClientRole,
                    required: true,
                    attributes: [['realname', 'author'], 'client_id'],
                    as: 'crole',
                },
            ];
            const pageSize = ListConf.PAGE_SIZE;
            const offset = (pagenum - 1) * pageSize;
            let activityList = await this.ctx.model.ClubActivity.findAll({
                where, attributes, order, include,
                limit: pageSize,
                offset,
                raw: true,
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
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            // 启动一个事务
            const trans = await this.ctx.model.transaction();
            // 执行结果
            // let exec_result = null;
            // 创建社团活动
            const values = {
                id: activity_id,
                club_id,
                creator_client_id: client_id,
                title, content, timing, brief_start, brief_end,
                struts: 0,
            };
            // 创建社团活动
            const activity_update_result = await this.ctx.model.ClubActivity.upsert(values, { raw: true, transaction: trans });
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
            imgs = imgs.map((o) => {
                console.log('|===> 活动写入图片: ', o);
                return {
                    id: uuidv1(),
                    activity_id,
                    pic_url: o,
                };
            });
            const add_pics_result = await this.ctx.model.ClubActivityPic.bulkCreate(imgs, { transaction: trans, raw: true });
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
            const values = { struts: -1, formId }; // 活动审核中的状态
            const where = { id: activity_id };
            const activity_result = await this.ctx.model.ClubActivity.update(values, { where, raw: true });
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
            const values = { struts: 0 }; // 活动审核中的状态
            const where = { id: activity_id };
            const activity_result = await this.ctx.model.ClubActivity.update(values, { where, raw: true });
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
                const where = {
                    activity_id,
                };
                console.log('待删除的图片数组: ', imgs);
                if (Array.isArray(imgs) && imgs.length > 0) {
                    // 过滤一下删除哪些图片
                    where['$or'] = imgs.map((img) => ({ pic_url: img }));
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
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            // 更新条件
            const where = { id: club_id };
            // 当前时间
            const today = moment(new Date()).format('YYYY-MM-DD HH:mm:ss');
            // 更新内容
            const values = {
                updatedAt: today,
                modifier: client_id,
            };
            if (title) {
                values['title'] = title;
                values['title_updatedAt'] = today;
            }
            if (logo_url) {
                values['logo_url'] = logo_url;
                values['logo_created'] = today;
            }
            if (bgimg_url) {
                values['bgimg_url'] = bgimg_url;
                values['bgimg_created'] = today;
            }
            if (intro)
                values['intro'] = intro;
            // let fields = ['nickname','avatar_url','gender'];
            const result = await this.ctx.model.Club.update(values, { where, raw: true });
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
            const sql = 'SELECT  cay.id,cay.club_id,cay.title,cay.content,cay.createdAt, '
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Ym1hc3Rlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWJtYXN0ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILHdDQUF3QztBQUN4QyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7QUFDbEMsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQ2pDLHVEQUF1RDtBQUN2RCx1REFBdUQ7QUFDdkQsOENBQXNEO0FBQ3RELDBDQUFtQztBQUNuQyxpREFBaUQ7QUFDakQsd0RBQXdEO0FBRXhELE1BQXFCLGlCQUFrQixTQUFRLGNBQVc7SUFDdEQ7Ozs7T0FJRztJQUNJLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRSxJQUFJLEVBQUUsYUFBYSxFQUFFLE9BQU8sRUFBRSxTQUFTLEVBQUUsS0FBSyxFQUFFO1FBQzNFLFVBQVU7UUFDVixJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztZQUFFLE9BQU8sSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsVUFBVSxFQUFFLFNBQVMsR0FBRyxJQUFJLEdBQUcscUJBQXFCLENBQUMsQ0FBQztRQUN2SSxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsQ0FBQztZQUFFLE9BQU8sSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsaUJBQWlCLEVBQUUsU0FBUyxHQUFHLElBQUksR0FBRyxnQ0FBZ0MsQ0FBQyxDQUFDO1FBQ2xJLElBQUk7WUFDQSxNQUFNLFVBQVUsR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFDO1lBQy9CLGFBQWE7WUFDYixNQUFNLFFBQVEsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdEQsT0FBTztZQUNQLE1BQU0sWUFBWSxHQUFHLE1BQU0sSUFBSSxDQUFD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