/**
 * Access 登录相关的业务逻辑层
 */
import BaseService from './common/base';
const uuidv1 = require('uuid/v1');
const moment = require('moment');
import * as ClubConf from '../utils/configs/club-conf';
import * as ListConf from '../utils/configs/list-conf';
import Message, { ErrorType } from '../utils/message';
import Token from '../utils/token';
import * as Alioss from '../utils/upload/alioss';
import * as WXTemplate from '../utils/wx/TemplateUtils';

export default class ClubmasterService extends BaseService {
    /**
     * 社团联系人: 升降权
     * 多对一的升降权有可能会造成脏数据, 但并非敏感位置, 也不会有大量并发
     * @param {*} param0
     */
    public async setContactPower({ diff, target_client, club_id, updatedAt, token }) {
        // 修改权限判定吧
        if (typeof diff !== 'number' || Number.isNaN(diff)) return new Message(ErrorType.TYPE_ERROR, '[diff: ' + diff + '] mast is a number!');
        if (diff != 1 && diff != -1) return new Message(ErrorType.VALUE_SCOPE_ERROR, '[diff: ' + diff + '] value scope mast is -1 or 1!');
        try {
            const loginToken = new Token();
            // 获取我当前的用户ID
            const clientId = loginToken.checkToken(token).data.id;
            // 修改权限
            const updateResult = await this.ctx.model.query(
                'CALL proc_set_club_power(?,?,?,?,?)',
                {
                    replacements: [clientId, target_client, club_id, diff, updatedAt],
                    type: this.ctx.model.QueryTypes.RAW, raw: true,
                },
            );
            const updateErr = Number(updateResult[0].err);
            if (updateErr === 0)
                return new Message(null);
            else if (updateErr === 2000)
                return new Message(ErrorType.PROC_EXCEPTION);
            else if (updateErr === 2011)
                return new Message(ErrorType.PROC_POWER_CHANGE_DIFF_INVALID);
            else if (updateErr === 2012)
                return new Message(ErrorType.PROC_POWER_CHANGE_GT_2);
            else if (updateErr === 2013)
                return new Message(ErrorType.PROC_POWER_CHANGE_LT_1);
            else if (updateErr === 2014)
                return new Message(ErrorType.PROC_POWER_CHANGE_UPDATE_FAIL);
            else
                return new Message(ErrorType.UNKNOW_ERROR);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 用户查看自己创建社团的申请列表
     * - struts: 状态, 申请中和历史 (0 和 1)
     * @param {*} param0
     */
    public async getBuildApplyList({ struts, pagenum, token }) {
        if (struts === '1') {
            struts = { $or: [{ struts: -1 }, { struts: 1 }] };
        } else if (struts === '0') {
            struts = { struts: 0 };
        }

        try {
            // 获取用户id
            const loginToken = new Token();
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
            return new Message(null, buildApplyList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 新增/创建社团
     * 建立社团时需验证:
     * - 创建社团数量(不得大于5,正在申请数量, 及作为团长的数量)
     * - 在申请中/审核通过的状态中, 是否在当前学校有重复名字的社团
     * @param {*} param0
     */
    public async createClubApply({ formId, school_id, title, club_url, referrer, token }) {

        try {
            // 获取我当前的用户ID
            const loginToken = new Token();
            const clientId = loginToken.checkToken(token).data.id;
            // 验证: 在申请中/审核通过的状态中, 是否在当前学校有重复名字的社团
            const repeat_title_count = await this.ctx.model.ClubBuildApply.count({
                where: { title, school_id, struts: { $between: [0, 1] } },
            });
            if (repeat_title_count > 0) {
                // 申请单中,当前学校存在重复的社团名称
                return new Message(ErrorType.DATA_REPEAT, repeat_title_count);
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
                return new Message(ErrorType.VALUE_OUT_OF_BOUNDS, (applying_count + leader_count));
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
            return new Message(null, apply_result.dataValues);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 新增公告 (不允许删除)
     * @param {*} param0
     */
    public async addNotice({ club_id, title, content, token }) {

        try {
            // 获取我当前的用户ID
            const loginToken = new Token();
            const client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            const role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true,
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new Message(ErrorType.LOW_POWER, role);
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
            return new Message(null, notice_result.dataValues);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 撤销公告 (不允许删除)
     * @param {*} param0
     */
    public async repealNotice({ club_id, notice_id, token }) {

        try {
            // 获取我当前的用户ID
            const loginToken = new Token();
            const client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            const role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true,
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new Message(ErrorType.LOW_POWER, role);
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
            return new Message(null, notice_result.dataValues);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 查询申请入社列表
     * @param {*} param0
     */
    public async getClubJoinList({ club_id, struts, pagenum }) {

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
            return new Message(null, applyList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 社团申请: 批准
     * 当审核通过时, 更改club_apply表的申请状态, 及添加用户至club_contcat中
     * @param {*} param0
     */
    public async joinClubRatify({ apply_id, club_id, apply_client_id, token }) {

        try {
            // 获取我当前的用户ID
            const loginToken = new Token();
            const client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            const role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true,
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new Message(ErrorType.LOW_POWER, role);
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
                return new Message(ErrorType.TRANS_ROLLBACK, apply_update_result);
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
                return new Message(null, { apply_update_result, add_contact_result });
            } catch (e) {
                // 事务回滚
                await trans.rollback();
                return new Message(ErrorType.TRANS_ROLLBACK, { apply_update_result, add_contact_result });
            }
            // Message { err: null, list: [ 1 ] }

        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 社团申请: 拒绝 ( 无需涉及事务 )
     * @param {*} param0
     */
    public async joinClubReject({ apply_id, club_id, reason, token }) {

        try {
            // 获取我当前的用户ID
            const loginToken = new Token();
            const client_id = loginToken.checkToken(token).data.id;
            // 验证: 用户是否有权限发布公告
            const role = await this.ctx.model.ClubContact.findOne({
                attributes: ['role_ability'],
                where: { club_id, client_id },
                raw: true,
            });
            if (!role || role.role_ability < ClubConf.POWER_SCOUT_LEADER) {
                // 操作权限不够
                return new Message(ErrorType.LOW_POWER, role);
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
            return new Message(null, { affect: apply_update_result[0] });
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 统一发送 "加入社团" 的模板消息
     */
    public async sendJoinClubTemplate(apply_id, struts, reason: string= '') {
        // WXTemplate
        // 1. 查询数据: 通过单号查询 formId, 申请人的openid, 申请学校, 申请社团
        const currentModel = await this.ctx.model.query(
            'SELECT ca.formId,c.openid_cloud_club,sch.uName,cb.title '
            + 'FROM club_apply ca '
            + 'INNER JOIN `client` c ON c.id=ca.apply_client_id '
            + 'INNER JOIN `club` cb ON cb.id=ca.club_id '
            + 'INNER JOIN `school` sch ON sch.sid=cb.school_id '
            + 'WHERE ca.id=? ',
            {
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
    public async getActivitySimpleList({ club_id, struts, pagenum }) {
        if (struts === '-1') {
            struts = { struts: { $between: [-2, -1] } }; //必须从小往大的顺序
        } else if (struts === '0') {
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
            return new Message(null, activityList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 管理活动: 保存
     * 进入社团面板时,缓存当前所在的社团名称和id,此处获取
     * 离开页面,则删除oss中上传的配图
     * 保存之后还需要发布
     * @param {*} param0
     */
    public async saveActivity({ activity_id, club_id, title, content, imgs, timing = 0, brief_start, brief_end, token }) {
        // 没有传入 活动id, 就新建
        activity_id = activity_id || uuidv1();
        try {
            // 获取我当前的用户ID
            const loginToken = new Token();
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
                return new Message(null, { activity_update_result });
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
                return new Message(null, { activity_id, activity_update_result, add_pics_result });
            } catch (e) {
                // 事务回滚
                await trans.rollback();
                return new Message(ErrorType.TRANS_ROLLBACK, { activity_update_result, add_pics_result });
            }
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 管理活动: 发布
     * 待发布阶段,若修改,则需要重新保存, 发布按钮变灰
     * @param {*} param0
     */
    public async publishActivity({ formId, activity_id }) {

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
            return new Message(null, { affect: activity_result[0] });
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 管理活动: 撤销
     * 撤销后,变为待审核0状态
     * @param {*} param0
     */
    public async repealActivity({ activity_id }) {

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
            return new Message(null, { affect: activity_result[0] });
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 管理活动: 删除活动照片
     * @param {*} param0
     */
    public async deleteActivityPics({ activity_id, imgs }) {

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
            return new Message(null, { oss_status: delete_oss_result, affect: delete_activityPic_result });
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 更新社团资料
     * 未对操作者的权限进行验证
     * @param {*} param0
     */
    public async modifyClubInfo({ club_id, title, logo_url, bgimg_url, intro, token }) {
        if (!title && !logo_url && !bgimg_url && !intro) {
            return new Message(null, '未进行任何更新!');
        }
        try{
            // 获取我当前的用户ID
            const loginToken = new Token();
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
            if (intro) values['intro'] = intro;
            // let fields = ['nickname','avatar_url','gender'];
            const result = await this.ctx.model.Club.update(values, { where, raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new Message(null, this.getJSONObject(result));
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.DATA_REPEAT, null);
        }
    }

    /**
     * 获取相册图片内容
     * club_id: 社团id, 空字符串为所有社团
     * pagenum: 页码
     */
    public async editInfo({ activity_id }) {

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
            let editInfo = await this.ctx.model.query(sql,
                { replacements: [activity_id], type: this.ctx.model.QueryTypes.SELECT, raw: true },
            );
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

            return new Message(null, editInfo);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }
}