/**
 * Access 登录相关的业务逻辑层
 */
import * as ListConf from '../utils/configs/list-conf';
import Message, { ErrorType } from '../utils/message';
import Token from '../utils/token';
import BaseService from './common/base';

const uuidv1 = require('uuid/v1');
const moment = require('moment');

export default class ClubService extends BaseService {
    /**
     * 通过用户的 ObjectId 获取我的社团(简单)列表
     * @param {*} param0
     */
    public async getSimpleList({ token }) {
        try {
            // 获取用户id
            const loginToken = new Token();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询简单的 我的社团 列表
            const sql = 'SELECT cb.id,cb.`title` FROM `club` cb '
                + 'INNER JOIN `club_contact` cct ON cct.`club_id`=cb.`id` '
                + 'WHERE cct.`client_id`=? AND cct.`struts`>=0 '
                + 'ORDER BY cct.`role_ability` DESC; ';
            const clubList = await this.ctx.model.query(sql,
                { replacements: [clientId], type: this.ctx.model.QueryTypes.SELECT, raw: true },
            );
            return new Message(null, clubList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 通过用户的 ObjectId 获取我的社团(详细)列表
     * @param {*} param0
     */
    public async getDetailList({ token }) {
        try {
            // 获取用户id
            const loginToken = new Token();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的 列表
            const clubList = await this.ctx.model.query(
                'CALL proc_query_myclub_detail(?)',
                { replacements: [clientId], type: this.ctx.model.QueryTypes.RAW, raw: true },
            );
            return new Message(null, clubList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 获取本校社团(可申请加入的)列表
     * @param {*} param0
     */
    public async getSelfCanapplyList({ pagenum, token }) {
        try {
            // 获取用户id
            const loginToken = new Token();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的 列表
            const clubList = await this.ctx.model.query(
                'CALL proc_query_canplay_club(?,?)',
                { replacements: [clientId, pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true },
            );
            return new Message(null, clubList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 获取申请加入社团的历史列表(仅仅是申请历史咯)
     * @param {*} param0
     */
    public async getSelfApplyList({ pagenum, token }) {
        try {
            // 获取用户id
            const loginToken = new Token();
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
            let applyList = await this.ctx.model.query(sql,
                { replacements: [clientId, clientId, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT },
            );
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

            return new Message(null, applyList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 申请加入社团
     * 同一时间对某社团的申请,可以有多个 -1(被拒绝状态), 但0(申请中) 和 1(已通过)只能有一个
     * @param {*} param0
     */
    public async joinClub({ formId, clubid, token }) {
        const loginToken = new Token();
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
            return new Message(null, this.getJSONObject(result));
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /** ***********************************************************
     * 社团: 面板相关业务
     ***********************************************************  */

    /**
     * 查询社团联系人
     * @param {*} param0
     */
    public async getContactList({ clubid, pagenum }) {
        try {
            // 获取用户id
            // let loginToken = new Token();
            // let clientId = loginToken.checkToken(token).data.id;
            // 查询详细的 我的社团的联系人 列表
            // 存储过程查询的时间, 无法经由模型去进行时间转换
            let contactList = await this.ctx.model.query(
                'CALL proc_query_myclub_contact(?,?)',
                { replacements: [clubid, pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true },
            );
            // 因此, 时间需进行手动时区转换
            contactList = this.handleTimezone(contactList, ['updatedAt'], true);
            // contactList.forEach(element => {
            //     if(element.updatedAt){
            //         element.updatedAt = moment(element.updatedAt).format('YYYY-MM-DD HH:mm:ss');
            //     }
            // });
            return new Message(null, contactList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 查询社团面板提示信息
     * 包含公告提示、申请入社数据提示
     * @param {*} param0
     */
    public async getPanelTips({ clubid, last_read_notice = '2018-01-01 00:00:00', token }) {
        // 格式化时间
        last_read_notice = moment(new Date(last_read_notice)).format('YYYY-MM-DD HH:mm:ss');

        try {
            // 获取用户id
            const loginToken = new Token();
            const clientId = loginToken.checkToken(token).data.id;
            // 查询社团面板提示信息
            const panelTips = await this.ctx.model.query(
                'CALL proc_query_myclub_panelinfo(?,?,?)',
                { replacements: [clubid, clientId, last_read_notice], type: this.ctx.model.QueryTypes.RAW, raw: true },
            );
            return new Message(null, panelTips[0]);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 查看公告列表
     * @param {*} param0
     */
    public async getNoticeList({ clubid, pagenum = 1 }) {

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
            return new Message(null, noticeList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 查看社团资料
     * @param {*} param0
     */
    public async getDetailInfo({ clubid }) {
        try {
            // 获取用户id
            // let loginToken = new Token();
            // let clientId = loginToken.checkToken(token).data.id;
            // 查看当前社团的关注人数, 社团参与人数
            const clubStat = await this.ctx.model.query(
                'SELECT '
                + '(SELECT COUNT(1) FROM client_attention cat WHERE cat.club_id=?) AS fans '
                + ',(SELECT COUNT(1) FROM club_contact cct WHERE cct.club_id=? AND cct.struts=0) AS member ',
                { replacements: [clubid, clubid], type: this.ctx.model.QueryTypes.SELECT },
            );
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
            return new Message(null, clubInfo);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /** **************************************************************
     * 关注相关接口
     */

    /**
     * 查看我的关注(社团)列表
     * @param {*} param0
     */
    public async getAttentionList({ pagenum, token }) {
        try {
            // 获取用户id
            const loginToken = new Token();
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
            let attentionList = await this.ctx.model.query(sql,
                { replacements: [client_id, offset, pageSize], type: this.ctx.model.QueryTypes.SELECT },
            );

            // 因此, 时间需进行手动时区转换
            attentionList = this.handleTimezone(attentionList, ['createdAt']);

            return new Message(null, attentionList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 加入收藏(社团)
     * @param {*} param0
     */
    public async addAttention({ club_id, token }) {
        const loginToken = new Token();
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
            return new Message(null, this.getJSONObject(result));
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.DATA_REPEAT, null);
        }
    }

    /**
     * 取消加入收藏(社团)
     * @param {*} param0
     */
    public async cancelAttention({ club_id, token }) {
        const loginToken = new Token();
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
            return new Message(null, result);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.DATABASE_ERROR, e);
        }
    }

    /**
     * 在用户设置学校的情况下, 推送当前城市关注度高的社团
     * 在未获取地理位置授权的情况下, 推送全国范围
     * @param {*} param0
     */
    public async getRecommendList({ pagenum, token }) {
        try {
            // 获取用户id
            const loginToken = new Token();
            const client_id = loginToken.checkToken(token).data.id;
            // 查询申请加入社团的历史列表
            // let pageSize = ListConf.PAGE_SIZE;
            // let offset = (pagenum - 1) * pageSize;
            const sql = 'CALL proc_query_club_recommend(?,?)';
            const recommendList = await this.ctx.model.query(sql,
                { replacements: [client_id, pagenum], type: this.ctx.model.QueryTypes.RAW, raw: true },
            );

            // 因此, 时间需进行手动时区转换
            // recommendList = this.handleTimezone(recommendList, ['createdAt']);

            return new Message(null, recommendList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    // public checkUpdate4Recommend(){
        
    // }

    // public async updateRecommend(){
    //     try {

    //     } catch (error) {
            
    //     }
    // }
}