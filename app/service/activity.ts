/**
 * 社团活动相关业务层
 */
import BaseService from './common/base';
const uuidv1 = require('uuid/v1');
const moment = require('moment');
import * as ClubConf from '../utils/configs/club-conf';
import Message, { ErrorType } from '../utils/message';
import Token from '../utils/token';

export default class ActivityService extends BaseService {
    /**
     * 获取社团活动的简单信息(展示页面)
     *
     */
    public async getSimpleInfo({ activity_id, token }) {
        try {
            const loginToken = new Token();
            const client_id = loginToken.checkToken(token).data.id;
            let [activityInfo] = await this.ctx.model.query(
                'CALL proc_query_activity_info(?, ?)',
                {
                    replacements: [activity_id, client_id],
                    type: this.ctx.model.QueryTypes.RAW, raw: true,
                },
            );
            activityInfo = this.handleTimezone(activityInfo, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityInfo);

            return new Message(null, activityInfo);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 获取我 `自己参与的` 社团活动的列表信息
     * timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     * club_id: 社团id, 空字符串为所有社团
     * pagenum: 页码
     */
    // public async getConcernedList({timing=0, club_id='', pagenum=1, token}) {
    //     let loginToken = new Token();
    //     try{
    //         // 获取我当前的用户ID
    //         const club_type = ClubConf.ACTIVITY_CLUB_TYPE_SELF;
    //         let client_id = loginToken.checkToken(token).data.id;
    //         let activityList = await this.ctx.model.query(
    //             'CALL proc_query_activity_full_list(?,?,?,?,?,?)',
    //             { replacements: ['', club_type, club_id, client_id, 0, pagenum],
    //                 type: this.ctx.model.QueryTypes.RAW, raw: true }
    //         );
    //         // 因此, 时间需进行手动时区转换
    //         activityList = this.handleTimezone(activityList, ['createdAt','brief_start','brief_end']);
    //         // 搜索相关图片?
    //         await loadActivityPic(activityList);

    //         return new Message(null, activityList);
    //     }catch(e){
    //         this.logger.error(e);
    //         return new Message(ErrorType.UNKNOW_ERROR, e);
    //     }
    // }
    /**
     * 组装 我参与的社团信息
     * @param {*} param0
     */
    public sql_activity_concerned_list({ timing, club_id, pagenum, client_id }) {
        const pagesize = 10;
        const offset = (pagenum - 1) * pagesize;
        const today = moment(new Date()).format('YYYY-MM-DD');
        // console.log('today is ============>', today);

        let timing_text = '';
        switch (Number(timing)) {
            case 4:
                timing_text = `AND cay.timing=1`;
                break;
            case 3:
                timing_text = `AND cay.timing=0 AND cay.brief_end < '${today}'`;
                break;
            case 2:
                timing_text = `AND cay.timing=0 AND '${today}' BETWEEN cay.brief_start AND cay.brief_end`;
                break;
            case 1:
                timing_text = `AND cay.timing=0 AND cay.brief_start > '${today}'`;
                break;
        }

        return `
    SELECT cay.id,cay.club_id,cay.title,cay.content,cay.createdAt,
			cay.timing, cay.brief_start, cay.brief_end,
			CASE 
			WHEN cay.timing=1 THEN '活动总结'
			WHEN cay.brief_start > '${today}' THEN '活动即将开始'
			WHEN '${today}' BETWEEN cay.brief_start AND cay.brief_end THEN '活动进行中'
			ELSE '已结束' END 'timing_text'
			,
			c.title AS 'club_title', c.logo_url,
            sch.uName AS 'school',
            (SELECT GROUP_CONCAT(cap.pic_url) FROM club_activity_pic cap WHERE cap.activity_id=cay.id) AS imgslist,
            (SELECT COUNT(1) FROM client_attention clat WHERE clat.client_id='${client_id}' AND clat.club_id=c.id) AS 'isAttention',
            (SELECT COUNT(1) FROM club_activity_pic WHERE activity_id=cay.id) AS 'pic_count',
            (SELECT COUNT(1) FROM club_activity_comment WHERE activity_id=cay.id AND struts=1) AS 'comment_count',
			cahot.heat
		FROM club_activity cay
		INNER JOIN club c ON c.id=cay.club_id ${club_id !== '' ? ` AND c.id='${club_id}'` : ''}
        INNER JOIN school sch ON sch.sid=c.school_id
        ${club_id === '' ? `INNER JOIN club_contact cct ON cct.club_id=c.id AND cct.struts>=0 AND cct.client_id='${client_id}'` : ''}
		INNER JOIN club_activity_hot cahot ON cahot.activity_id=cay.id
        WHERE cay.struts = 1
        ${timing_text} 
		ORDER BY cay.createdAt DESC
		LIMIT ${offset},${pagesize}
    `;
    }
    /**
     * 获取我 `自己参与的` 社团活动的列表信息
     * timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     * club_id: 社团id, 空字符串为所有社团
     * pagenum: 页码
     */
    public async getConcernedList({ timing = 0, club_id = '', pagenum = 1, token }) {

        try {
            // 获取我当前的用户ID
            // const club_type = ClubConf.ACTIVITY_CLUB_TYPE_SELF;
            const loginToken = new Token();
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query(
                this.sql_activity_concerned_list({ timing, club_id, pagenum, client_id }),
                {
                    type: this.ctx.model.QueryTypes.SELECT, raw: true,
                },
            );
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);

            return new Message(null, activityList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /** *************************************************************************************************
     * 组装 公开的 社团信息列表
     * @param {*} param0
     */
    public sql_activity_public_list({ timing, client_id, pagenum }) {
        const pagesize = 10;
        const offset = (pagenum - 1) * pagesize;
        const today = moment(new Date()).format('YYYY-MM-DD');
        // console.log('today is ============>', today);

        let timing_text = '';
        switch (Number(timing)) {
            case 4:
                timing_text = `AND cay.timing=1`;
                break;
            case 3:
                timing_text = `AND cay.timing=0 AND cay.brief_end < '${today}'`;
                break;
            case 2:
                timing_text = `AND cay.timing=0 AND '${today}' BETWEEN cay.brief_start AND cay.brief_end`;
                break;
            case 1:
                timing_text = `AND cay.timing=0 AND cay.brief_start > '${today}'`;
                break;
        }

        return `
    SELECT cay.id,cay.club_id,cay.title,cay.content,cay.createdAt,
			cay.timing, cay.brief_start, cay.brief_end,
			CASE 
			WHEN cay.timing=1 THEN '活动总结'
			WHEN cay.brief_start > '${today}' THEN '活动即将开始'
			WHEN '${today}' BETWEEN cay.brief_start AND cay.brief_end THEN '活动进行中'
			ELSE '已结束' END 'timing_text'
			,
			c.title AS 'club_title', c.logo_url,
            sch.uName AS 'school',
            (SELECT GROUP_CONCAT(cap.pic_url) FROM club_activity_pic cap WHERE cap.activity_id=cay.id) AS imgslist,
            (SELECT COUNT(1) FROM client_attention clat WHERE clat.client_id='${client_id}' AND clat.club_id=c.id) AS 'isAttention',
            (SELECT COUNT(1) FROM club_activity_pic WHERE activity_id=cay.id) AS 'pic_count',
            (SELECT COUNT(1) FROM club_activity_comment WHERE activity_id=cay.id AND struts=1) AS 'comment_count',
			cahot.heat
		FROM club_activity cay
		INNER JOIN club c ON c.id=cay.club_id 
        INNER JOIN school sch ON sch.sid=c.school_id
		INNER JOIN club_activity_hot cahot ON cahot.activity_id=cay.id
        WHERE cay.struts = 1
        ${timing_text} 
		ORDER BY cay.createdAt DESC
		LIMIT ${offset},${pagesize}
    `;
    }
    /**
     * 获取我 `公开的` 社团活动的列表信息
     * timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     * club_id: 社团id, 空字符串为所有社团
     * pagenum: 页码
     */
    public async getPublicList({ timing = 0, pagenum = 1, token }) {
        const loginToken = new Token();
        try {
            // 获取我当前的用户ID
            // const club_type = ClubConf.ACTIVITY_CLUB_TYPE_PUBLIC;
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query(
                this.sql_activity_public_list({ timing, client_id, pagenum }),
                {
                    type: this.ctx.model.QueryTypes.SELECT, raw: true,
                },
            );
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);

            return new Message(null, activityList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /** ***********************************************************************************************
     * 组装 我关注的 社团信息列表
     * @param {*} param0
     */
    public sql_activity_attention_list({ timing, pagenum, client_id }) {
        const pagesize = 10;
        const offset = (pagenum - 1) * pagesize;
        const today = moment(new Date()).format('YYYY-MM-DD');
        // console.log('today is ============>', today);

        let timing_text = '';
        switch (Number(timing)) {
            case 4:
                timing_text = `AND cay.timing=1`;
                break;
            case 3:
                timing_text = `AND cay.timing=0 AND cay.brief_end < '${today}'`;
                break;
            case 2:
                timing_text = `AND cay.timing=0 AND '${today}' BETWEEN cay.brief_start AND cay.brief_end`;
                break;
            case 1:
                timing_text = `AND cay.timing=0 AND cay.brief_start > '${today}'`;
                break;
        }

        return `
    SELECT cay.id,cay.club_id,cay.title,cay.content,cay.createdAt,
			cay.timing, cay.brief_start, cay.brief_end,
			CASE 
			WHEN cay.timing=1 THEN '活动总结'
			WHEN cay.brief_start > '${today}' THEN '活动即将开始'
			WHEN '${today}' BETWEEN cay.brief_start AND cay.brief_end THEN '活动进行中'
			ELSE '已结束' END 'timing_text'
			,
			c.title AS 'club_title', c.logo_url,
            sch.uName AS 'school',
            (SELECT GROUP_CONCAT(cap.pic_url) FROM club_activity_pic cap WHERE cap.activity_id=cay.id) AS imgslist,
            (SELECT COUNT(1) FROM client_attention clat WHERE clat.client_id='${client_id}' AND clat.club_id=c.id) AS 'isAttention',
            (SELECT COUNT(1) FROM club_activity_pic WHERE activity_id=cay.id) AS 'pic_count',
            (SELECT COUNT(1) FROM club_activity_comment WHERE activity_id=cay.id AND struts=1) AS 'comment_count',
			cahot.heat
        FROM club_activity cay
        INNER JOIN client_attention catt ON catt.client_id='${client_id}'
		INNER JOIN club c ON c.id=cay.club_id AND c.id=catt.club_id
        INNER JOIN school sch ON sch.sid=c.school_id
		INNER JOIN club_activity_hot cahot ON cahot.activity_id=cay.id
        WHERE cay.struts = 1
        ${timing_text} 
		ORDER BY cay.createdAt DESC
		LIMIT ${offset},${pagesize}
    `;
    }
    /**
     * 获取我 `自己参与的` 社团活动的列表信息
     * timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     * club_id: 社团id, 空字符串为所有社团
     * pagenum: 页码
     */
    public async getAttentionList({ timing = 0, pagenum = 1, token }) {
        const loginToken = new Token();
        try {
            // 获取我当前的用户ID
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query(
                this.sql_activity_attention_list({ timing, pagenum, client_id }),
                {
                    type: this.ctx.model.QueryTypes.SELECT, raw: true,
                },
            );
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);

            return new Message(null, activityList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /** *************************************************************************************************
     * 组装 本校的 社团信息列表
     * @param {*} param0
     */
    public sql_activity_school_list({ timing, client_id, pagenum }) {
        const pagesize = 10;
        const offset = (pagenum - 1) * pagesize;
        const today = moment(new Date()).format('YYYY-MM-DD');
        // console.log('today is ============>', today);

        let timing_text = '';
        switch (Number(timing)) {
            case 4:
                timing_text = `AND cay.timing=1`;
                break;
            case 3:
                timing_text = `AND cay.timing=0 AND cay.brief_end < '${today}'`;
                break;
            case 2:
                timing_text = `AND cay.timing=0 AND '${today}' BETWEEN cay.brief_start AND cay.brief_end`;
                break;
            case 1:
                timing_text = `AND cay.timing=0 AND cay.brief_start > '${today}'`;
                break;
        }

        return `
    SELECT cay.id,cay.club_id,cay.title,cay.content,cay.createdAt,
			cay.timing, cay.brief_start, cay.brief_end,
			CASE 
			WHEN cay.timing=1 THEN '活动总结'
			WHEN cay.brief_start > '${today}' THEN '活动即将开始'
			WHEN '${today}' BETWEEN cay.brief_start AND cay.brief_end THEN '活动进行中'
			ELSE '已结束' END 'timing_text'
			,
			c.title AS 'club_title', c.logo_url,
            sch.uName AS 'school',
            (SELECT GROUP_CONCAT(cap.pic_url) FROM club_activity_pic cap WHERE cap.activity_id=cay.id) AS imgslist,
            (SELECT COUNT(1) FROM client_attention clat WHERE clat.client_id='${client_id}' AND clat.club_id=c.id) AS 'isAttention',
            (SELECT COUNT(1) FROM club_activity_pic WHERE activity_id=cay.id) AS 'pic_count',
            (SELECT COUNT(1) FROM club_activity_comment WHERE activity_id=cay.id AND struts=1) AS 'comment_count',
			cahot.heat
		FROM club_activity cay
        INNER JOIN club c ON c.id=cay.club_id 
        INNER JOIN client_role crole ON crole.client_id='${client_id}'
        INNER JOIN school sch ON sch.sid=c.school_id AND sch.sid=crole.school_id 
		INNER JOIN club_activity_hot cahot ON cahot.activity_id=cay.id
        WHERE cay.struts = 1
        ${timing_text} 
		ORDER BY cay.createdAt DESC
		LIMIT ${offset},${pagesize}
    `;
    }
    /**
     * 获取我 `本校的` 社团活动的列表信息
     * timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     * pagenum: 页码
     */
    public async getSchoolList({ timing = 0, pagenum = 1, token }) {
        const loginToken = new Token();
        try {
            // 获取我当前的用户ID
            // const club_type = ClubConf.ACTIVITY_CLUB_TYPE_PUBLIC;
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query(
                this.sql_activity_school_list({ timing, client_id, pagenum }),
                {
                    type: this.ctx.model.QueryTypes.SELECT, raw: true,
                },
            );
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);

            return new Message(null, activityList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /** **********************************************************************************************
     * 获取详细的活动列表数据
     * club_type : self (自己的社团) | public (公开的社团) | care (关心的社团<包含自己的社团>)
     *      - self: 自己的社团活动时, club_id 为空, 则代表自己的所有社团
     *      - public: 公开活动时, 忽略 club_id
     *      - care: 关心的社团活动, club_id 为空, 则代表关心的所有社团列表
     */
    public async getActivityFullList(
        { word = '', club_id = '', club_type = ClubConf.ACTIVITY_CLUB_TYPE_SELF, pagenum = 1, hasRank = 0, token }
        : {word?, club_type?, hasRank?, club_id: string, pagenum: number, token: string},
        ) {
        const loginToken = new Token();
        try {
            // 获取我当前的用户ID
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query(
                'CALL proc_query_activity_full_list(?,?,?,?,?,?)',
                {
                    replacements: [word, club_type, club_id, client_id, hasRank, pagenum],
                    type: this.ctx.model.QueryTypes.RAW, raw: true,
                },
            );
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);

            return new Message(null, activityList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 为活动列表装载图片url数组
     * @param {*} activity
     */
    public loadActivityPic(activity) {
        // if(!Array.isArray(activity)){
        //     if(typeof activity === 'object' && activity != null){
        //         activity['imgs'] = await getActivityPics({activity_id: activity.id});
        //     }
        // }else{
        //     for(let act of activity){
        //         if(act.id){
        //             console.log('活动id: ', act.id);
        //             let picList = await getActivityPics({activity_id: act.id});
        //             act['imgs'] = picList;
        //         }
        //     }
        // }

        // imgslist
        if (!Array.isArray(activity)) {
            if (typeof activity === 'object' && activity != null && activity['imgslist']) {
                activity['imgs'] = activity['imgslist'].split(',');
                delete activity['imgslist'];
            }
        } else {
            for (const act of activity) {
                if (act.id && act['imgslist']) {
                    // console.log('活动id: ', act.id);
                    // let picList = await getActivityPics({activity_id: act.id});
                    act['imgs'] = act['imgslist'].split(',');
                    delete act['imgslist'];
                }
            }
        }
    }

    /**
     * 获取当前活动的配图列表
     * 接口: /activity/pics
     * 参数:
     *      activity_id: 活动id
     * 返回数据:
     *      Message
     */
    public async getActivityPics({ activity_id }) {
        // let loginToken = new Token();
        try {
            // 获取我当前的用户ID
            // let client_id = loginToken.checkToken(token).data.id;
            const where = { activity_id };
            const attributes = ['pic_url'];
            const picList = await this.ctx.model.ClubActivityPic.findAll({
                where, attributes,
                raw: true,
            });
            return picList;
        } catch (e) {
            this.logger.error(e);
            return e;
        }
    }

    /**
     * 评论: 列表
     * timing: 活动时机, 默认为0(一切活动),可选参数有[1:即将开始, 2:进行中, 3: 已结束, 4: 活动总结]
     * club_id: 社团id, 空字符串为所有社团
     * pagenum: 页码
     */
    public async getCommentsList({ activity_id, pagenum = 1 }) {
        const pagesize = 20;
        const offset = (pagenum - 1) * pagesize;

        try {
            // let loginToken = new Token();
            // 获取我当前的用户ID
            // let client_id = loginToken.checkToken(token).data.id;
            const sql = 'SELECT cac.`id`,c.`avatar_url`,c.`nickname`,cac.`createdAt`,cac.`content` '
                + 'FROM club_activity_comment cac '
                + 'INNER JOIN `client` c ON c.`id`=cac.`client_id` '
                + 'WHERE cac.`activity_id`=? AND cac.`struts`=1 '
                + 'ORDER BY cac.`createdAt` DESC '
                + `LIMIT ?, ?`;
            let commentsList = await this.ctx.model.query(sql,
                {
                    replacements: [activity_id, offset, pagesize],
                    type: this.ctx.model.QueryTypes.SELECT, raw: true,
                },
            );
            // 因此, 时间需进行手动时区转换
            commentsList = this.handleTimezone(commentsList, ['createdAt']);

            return new Message(null, commentsList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    /**
     * 添加活动评论
     * @param {*} param0
     */
    public async addComment({ formId, activity_id, content, reply_client_id = null, token }) {
        const loginToken = new Token();
        try {
            // 获取我当前的用户ID
            const clientId = loginToken.checkToken(token).data.id;
            // 新增或更新
            const values = {
                id: uuidv1(),
                client_id: clientId,
                reply_client_id,
                activity_id,
                formId,
                // is_hidden: ,
                struts: 0, // 测试阶段, 发的评论都立即显示
                content,
            };
            // let fields = ['nickname','avatar_url','gender'];
            const result = await this.ctx.model.ClubActivityComment.create(values, { raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new Message(null, this.getJSONObject(result));
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }

    //getAlbum
    /**
     * 获取相册图片内容
     * club_id: 社团id, 空字符串为所有社团
     * pagenum: 页码
     */
    public async getAlbum({ club_id, pagenum = 1 }) {
        const pagesize = 20;
        const offset = (pagenum - 1) * pagesize;

        try {
            // 获取我当前的用户ID
            // let loginToken = new Token();
            // let client_id = loginToken.checkToken(token).data.id;
            const sql = 'SELECT  cap.`id`, cap.`pic_url` '
                + 'FROM `club_activity_pic` cap '
                + 'INNER JOIN club_activity ca ON ca.id=cap.`activity_id` AND ca.club_id=? '
                + 'ORDER BY cap.createdAt DESC '
                + `LIMIT ?, ?`;
            const picsList = await this.ctx.model.query(sql,
                {
                    replacements: [club_id, offset, pagesize],
                    type: this.ctx.model.QueryTypes.SELECT, raw: true,
                },
            );
            // 因此, 时间需进行手动时区转换
            // commentsList = this.handleTimezone(commentsList, ['createdAt']);

            return new Message(null, picsList);
        } catch (e) {
            this.logger.error(e);
            return new Message(ErrorType.UNKNOW_ERROR, e);
        }
    }
}