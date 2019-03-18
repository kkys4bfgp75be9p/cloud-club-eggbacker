"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动相关业务层
 */
const base_1 = require("./common/base");
const uuidv1 = require('uuid/v1');
const moment = require('moment');
const ClubConf = require("../utils/configs/club-conf");
const message_1 = require("../utils/message");
const token_1 = require("../utils/token");
// 用于缓存活动业务数据
// let memoryCache = {};
/**
 * 活动相关的业务逻辑模型
 */
class ActivityService extends base_1.default {
    /**
     * 获取社团活动的简单信息(展示页面)
     *
     */
    async getSimpleInfo({ activity_id, token }) {
        try {
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            let [activityInfo] = await this.ctx.model.query('CALL proc_query_activity_info(?, ?)', {
                replacements: [activity_id, client_id],
                type: this.ctx.model.QueryTypes.RAW, raw: true,
            });
            activityInfo = this.handleTimezone(activityInfo, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityInfo);
            return new message_1.default(null, activityInfo);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 组装 我参与的社团信息
     * @param {*} param0
     */
    sql_activity_concerned_list({ timing, club_id, pagenum, client_id }) {
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
    async getConcernedList({ timing = 0, club_id = '', pagenum = 1, token }) {
        try {
            // 获取我当前的用户ID
            // const club_type = ClubConf.ACTIVITY_CLUB_TYPE_SELF;
            const loginToken = new token_1.default();
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query(this.sql_activity_concerned_list({ timing, club_id, pagenum, client_id }), {
                type: this.ctx.model.QueryTypes.SELECT, raw: true,
            });
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);
            return new message_1.default(null, activityList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /** *************************************************************************************************
     * 组装 公开的 社团信息列表
     * @param {*} param0
     */
    sql_activity_public_list({ timing, client_id, pagenum }) {
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
    async getPublicList({ timing = 0, pagenum = 1, token }) {
        const loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            // const club_type = ClubConf.ACTIVITY_CLUB_TYPE_PUBLIC;
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query(this.sql_activity_public_list({ timing, client_id, pagenum }), {
                type: this.ctx.model.QueryTypes.SELECT, raw: true,
            });
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);
            return new message_1.default(null, activityList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /** ***********************************************************************************************
     * 组装 我关注的 社团信息列表
     * @param {*} param0
     */
    sql_activity_attention_list({ timing, pagenum, client_id }) {
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
    async getAttentionList({ timing = 0, pagenum = 1, token }) {
        const loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query(this.sql_activity_attention_list({ timing, pagenum, client_id }), {
                type: this.ctx.model.QueryTypes.SELECT, raw: true,
            });
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);
            return new message_1.default(null, activityList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /** *************************************************************************************************
     * 组装 本校的 社团信息列表
     * @param {*} param0
     */
    sql_activity_school_list({ timing, client_id, pagenum }) {
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
    async getSchoolList({ timing = 0, pagenum = 1, token }) {
        const loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            // const club_type = ClubConf.ACTIVITY_CLUB_TYPE_PUBLIC;
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query(this.sql_activity_school_list({ timing, client_id, pagenum }), {
                type: this.ctx.model.QueryTypes.SELECT, raw: true,
            });
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);
            return new message_1.default(null, activityList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /** **********************************************************************************************
     * 获取详细的活动列表数据
     * club_type : self (自己的社团) | public (公开的社团) | care (关心的社团<包含自己的社团>)
     *      - self: 自己的社团活动时, club_id 为空, 则代表自己的所有社团
     *      - public: 公开活动时, 忽略 club_id
     *      - care: 关心的社团活动, club_id 为空, 则代表关心的所有社团列表
     */
    async getActivityFullList({ word = '', club_id = '', club_type = ClubConf.ACTIVITY_CLUB_TYPE_SELF, pagenum = 1, hasRank = 0, token }) {
        const loginToken = new token_1.default();
        try {
            // 获取我当前的用户ID
            const client_id = loginToken.checkToken(token).data.id;
            let activityList = await this.ctx.model.query('CALL proc_query_activity_full_list(?,?,?,?,?,?)', {
                replacements: [word, club_type, club_id, client_id, hasRank, pagenum],
                type: this.ctx.model.QueryTypes.RAW, raw: true,
            });
            // 因此, 时间需进行手动时区转换
            activityList = this.handleTimezone(activityList, ['createdAt', 'brief_start', 'brief_end']);
            // 搜索相关图片?
            await this.loadActivityPic(activityList);
            return new message_1.default(null, activityList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 为活动列表装载图片url数组
     * @param {*} activity
     */
    loadActivityPic(activity) {
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
        }
        else {
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
    async getActivityPics({ activity_id }) {
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
        }
        catch (e) {
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
    async getCommentsList({ activity_id, pagenum = 1 }) {
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
            let commentsList = await this.ctx.model.query(sql, {
                replacements: [activity_id, offset, pagesize],
                type: this.ctx.model.QueryTypes.SELECT, raw: true,
            });
            // 因此, 时间需进行手动时区转换
            commentsList = this.handleTimezone(commentsList, ['createdAt']);
            return new message_1.default(null, commentsList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    /**
     * 添加活动评论
     * @param {*} param0
     */
    async addComment({ formId, activity_id, content, reply_client_id = null, token }) {
        const loginToken = new token_1.default();
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
                struts: 0,
                content,
            };
            // let fields = ['nickname','avatar_url','gender'];
            const result = await this.ctx.model.ClubActivityComment.create(values, { raw: true });
            // 更新方法返回的数组中,存放的是更新影响的行数
            // Message { err: null, list: [ 1 ] }
            return new message_1.default(null, this.getJSONObject(result));
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
    //getAlbum
    /**
     * 获取相册图片内容
     * club_id: 社团id, 空字符串为所有社团
     * pagenum: 页码
     */
    async getAlbum({ club_id, pagenum = 1 }) {
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
            const picsList = await this.ctx.model.query(sql, {
                replacements: [club_id, offset, pagesize],
                type: this.ctx.model.QueryTypes.SELECT, raw: true,
            });
            // 因此, 时间需进行手动时区转换
            // commentsList = this.handleTimezone(commentsList, ['createdAt']);
            return new message_1.default(null, picsList);
        }
        catch (e) {
            this.logger.error(e);
            return new message_1.default(message_1.ErrorType.UNKNOW_ERROR, e);
        }
    }
}
exports.default = ActivityService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWN0aXZpdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJhY3Rpdml0eS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsd0NBQXdDO0FBQ3hDLE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUNsQyxNQUFNLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDakMsdURBQXVEO0FBQ3ZELDhDQUFzRDtBQUN0RCwwQ0FBbUM7QUFFbkMsYUFBYTtBQUNiLHdCQUF3QjtBQUV4Qjs7R0FFRztBQUNILE1BQXFCLGVBQWdCLFNBQVEsY0FBVztJQUNwRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsYUFBYSxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRTtRQUM3QyxJQUFJO1lBQ0EsTUFBTSxVQUFVLEdBQUcsSUFBSSxlQUFLLEVBQUUsQ0FBQztZQUMvQixNQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDdkQsSUFBSSxDQUFDLFlBQVksQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUMzQyxxQ0FBcUMsRUFDckM7Z0JBQ0ksWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLFNBQVMsQ0FBQztnQkFDdEMsSUFBSSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUk7YUFDakQsQ0FDSixDQUFDO1lBQ0YsWUFBWSxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsWUFBWSxFQUFFLENBQUMsV0FBVyxFQUFFLGFBQWEsRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzVGLFVBQVU7WUFDVixNQUFNLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLENBQUM7WUFFekMsT0FBTyxJQUFJLGlC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