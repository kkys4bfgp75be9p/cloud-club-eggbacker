/**
 * 社团活动相关控制器
 */
import Message, { ErrorType } from '../utils/message';
import { getSignature } from '../utils/upload/alioss';
import BaseController from './common/base';

export default class UploadController extends BaseController {
    /**
     * 上传社友用户头像
     */
    public async common_sign(dir){
        const { ctx } = this;
        try {
            const { filepath } = ctx.query;
            if (!filepath) return ctx.body = new Message(ErrorType.UPLOAD_NO_FILE);
            // const dir = '/union/headpic/';
            const formData = await getSignature(filepath, dir);
            ctx.body = { formData };
        } catch (error) {
            ctx.body = new Message(ErrorType.UPLOAD_FAIL, { error });
        }
    }

    /**
     * 上传 app 统一unionid指向的头像到 union/headpic/
     * get("/upload/sheu/headpic")
     */
    public async get_sheu_headpic() {
        const dir = 'union/headpic/';
        this.common_sign( dir );
    }

    /**
     * 上传 云社团 openid指向的头像到 cloudclub/headpic/
     * get("/upload/cloudclub/headpic")
     */
    public async get_cloudclub_headpic() {
        const dir = 'cloudclub/headpic/';
        this.common_sign( dir );
    }

    /**
     * 上传 外卖用户端 openid指向的头像到 wm/client/headpic/
     * get("/upload/wm/client/headpic")
     */
    public async get_wm_client_headpic() {
        const dir = 'wm/client/headpic/';
        this.common_sign( dir );
    }

    /**
     * 上传 外卖骑士端 openid指向的头像到 wm/knight/headpic/
     * get("/upload/wm/knight/headpic")
     */
    public async get_wm_knight_headpic() {
        const dir = 'wm/knight/headpic/';
        this.common_sign( dir );
    }

    /**
     * 上传 外卖商家端 openid指向的头像到 wm/seller/headpic/
     * get("/upload/wm/seller/headpic")
     */
    public async get_wm_seller_headpic() {
        const dir = 'wm/seller/headpic/';
        this.common_sign( dir );
    }

    /**
     * 上传 外卖校园合伙人端 openid指向的头像到 wm/partner/headpic/
     * get("/upload/wm/partner/headpic")
     */
    public async get_wm_partner_headpic() {
        const dir = 'wm/partner/headpic/';
        this.common_sign( dir );
    }

    /**
     * 上传 云社团手持学生证或身份证 openid指向的头像到 cloudclub/pid/
     * get("/upload/cloudclub/pid")
     */
    public async get_cloudclub_pid() {
        const dir = 'cloudclub/pid/';
        this.common_sign( dir );
    }

    /**
     * 上传 云社团：社团合影 指向的头像到 cloudclub/clubapply/
     * get("/upload/cloudclub/clubapply")
     */
    public async get_cloudclub_clubapply() {
        const dir = 'cloudclub/clubapply/';
        this.common_sign( dir );
    }

    /**
     * 上传 云社团：社团logo 指向的头像到 cloudclub/{clubid}/logo_xxx.jpg
     * get("/upload/cloudclub/:clubid/logo")
     */
    public async get_cloudclub_clubid_logo(clubid) {
        const dir = 'cloudclub/' + clubid + '/';
        this.common_sign( dir );
    }

    /**
     * 上传 云社团：社团背景图 指向的头像到 cloudclub/{clubid}/bgimg_xxx.jpg
     * get("/upload/cloudclub/:clubid/bgimg")
     */
    public async get_cloudclub_clubid_bgimg(clubid) {
        const dir = 'cloudclub/' + clubid + '/';
        this.common_sign( dir );
    }

    /**
     * 上传 云社团：社团活动图 指向的头像到 cloudclub/activity/{yyyyMM}/xxx.jpg
     * get("/upload/cloudclub/activity")
     */
    public async get_cloudclub_activity() {
        const date = new Date();
        const year = date.getFullYear();
        let month = String(date.getMonth() + 1);
        month = ('' + month)[1] ? month : '0' + month;
        const dir = 'cloudclub/activity/' + (year + '' + month) + '/';
        this.common_sign( dir );
    }

    /**
     * 上传 外卖合伙人端：上传商家营业执照 到 wm/seller/apply/
     * get("/upload/wm/seller/apply")
     */
    public async get_wm_seller_apply() {
        const dir = 'wm/seller/apply/';
        this.common_sign( dir );
    }

    /**
     * 上传 外卖商家端：上传商家logo 到 wm/seller/{sellerid}/logo
     * get("/upload/wm/seller/:sellerid/logo")
     */
    public async get_wm_seller_sellerid_logo(sellerid) {
        const dir = 'wm/seller/' + sellerid + '/';
        this.common_sign( dir );
    }

    /**
     * 上传 外卖商家端：上传商家背景图 到 wm/seller/{sellerid}/logo
     * get("/upload/wm/seller/:sellerid/bgimg")
     */
    public async get_wm_seller_sellerid_bgimg(sellerid) {
        const dir = 'wm/seller/' + sellerid + '/';
        this.common_sign( dir );
    }

    /**
     * 上传 外卖商家端：上传商家商品配图 到 wm/seller/{sellerid}/goods/
     * get("/upload/wm/seller/:sellerid/goods")
     */
    public async get_wm_seller_sellerid_goods(sellerid) {
        const dir = 'wm/seller/' + sellerid + '/goods/';
        this.common_sign( dir );
    }

    /**
     * 上传 外卖骑士端：上传骑士手持学生证配图 到 wm/knight/apply/
     * get("/upload/wm/knight/apply")
     */
    public async get_wm_knight_apply() {
        const dir = 'wm/knight/apply/';
        this.common_sign( dir );
    }
}