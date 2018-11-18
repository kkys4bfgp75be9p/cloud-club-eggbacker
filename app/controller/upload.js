"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动相关控制器
 */
const message_1 = require("../utils/message");
const alioss_1 = require("../utils/upload/alioss");
const base_1 = require("./common/base");
class UploadController extends base_1.default {
    /**
     * 上传社友用户头像
     */
    async common_sign(dir) {
        const { ctx } = this;
        try {
            const { filepath } = ctx.query;
            if (!filepath)
                return ctx.body = new message_1.default(message_1.ErrorType.UPLOAD_NO_FILE);
            // const dir = '/union/headpic/';
            const formData = await alioss_1.getSignature(filepath, dir);
            ctx.body = { formData };
        }
        catch (error) {
            ctx.body = new message_1.default(message_1.ErrorType.UPLOAD_FAIL, { error });
        }
    }
    /**
     * 上传 app 统一unionid指向的头像到 union/headpic/
     * get("/upload/sheu/headpic")
     */
    async get_sheu_headpic() {
        const dir = 'union/headpic/';
        this.common_sign(dir);
    }
    /**
     * 上传 云社团 openid指向的头像到 cloudclub/headpic/
     * get("/upload/cloudclub/headpic")
     */
    async get_cloudclub_headpic() {
        const dir = 'cloudclub/headpic/';
        this.common_sign(dir);
    }
    /**
     * 上传 外卖用户端 openid指向的头像到 wm/client/headpic/
     * get("/upload/wm/client/headpic")
     */
    async get_wm_client_headpic() {
        const dir = 'wm/client/headpic/';
        this.common_sign(dir);
    }
    /**
     * 上传 外卖骑士端 openid指向的头像到 wm/knight/headpic/
     * get("/upload/wm/knight/headpic")
     */
    async get_wm_knight_headpic() {
        const dir = 'wm/knight/headpic/';
        this.common_sign(dir);
    }
    /**
     * 上传 外卖商家端 openid指向的头像到 wm/seller/headpic/
     * get("/upload/wm/seller/headpic")
     */
    async get_wm_seller_headpic() {
        const dir = 'wm/seller/headpic/';
        this.common_sign(dir);
    }
    /**
     * 上传 外卖校园合伙人端 openid指向的头像到 wm/partner/headpic/
     * get("/upload/wm/partner/headpic")
     */
    async get_wm_partner_headpic() {
        const dir = 'wm/partner/headpic/';
        this.common_sign(dir);
    }
    /**
     * 上传 云社团手持学生证或身份证 openid指向的头像到 cloudclub/pid/
     * get("/upload/cloudclub/pid")
     */
    async get_cloudclub_pid() {
        const dir = 'cloudclub/pid/';
        this.common_sign(dir);
    }
    /**
     * 上传 云社团：社团合影 指向的头像到 cloudclub/clubapply/
     * get("/upload/cloudclub/clubapply")
     */
    async get_cloudclub_clubapply() {
        const dir = 'cloudclub/clubapply/';
        this.common_sign(dir);
    }
    /**
     * 上传 云社团：社团logo 指向的头像到 cloudclub/{clubid}/logo_xxx.jpg
     * get("/upload/cloudclub/:clubid/logo")
     */
    async get_cloudclub_clubid_logo(clubid) {
        const dir = 'cloudclub/' + clubid + '/';
        this.common_sign(dir);
    }
    /**
     * 上传 云社团：社团背景图 指向的头像到 cloudclub/{clubid}/bgimg_xxx.jpg
     * get("/upload/cloudclub/:clubid/bgimg")
     */
    async get_cloudclub_clubid_bgimg(clubid) {
        const dir = 'cloudclub/' + clubid + '/';
        this.common_sign(dir);
    }
    /**
     * 上传 云社团：社团活动图 指向的头像到 cloudclub/activity/{yyyyMM}/xxx.jpg
     * get("/upload/cloudclub/activity")
     */
    async get_cloudclub_activity() {
        const date = new Date();
        const year = date.getFullYear();
        let month = String(date.getMonth() + 1);
        month = ('' + month)[1] ? month : '0' + month;
        const dir = 'cloudclub/activity/' + (year + '' + month) + '/';
        this.common_sign(dir);
    }
    /**
     * 上传 外卖合伙人端：上传商家营业执照 到 wm/seller/apply/
     * get("/upload/wm/seller/apply")
     */
    async get_wm_seller_apply() {
        const dir = 'wm/seller/apply/';
        this.common_sign(dir);
    }
    /**
     * 上传 外卖商家端：上传商家logo 到 wm/seller/{sellerid}/logo
     * get("/upload/wm/seller/:sellerid/logo")
     */
    async get_wm_seller_sellerid_logo(sellerid) {
        const dir = 'wm/seller/' + sellerid + '/';
        this.common_sign(dir);
    }
    /**
     * 上传 外卖商家端：上传商家背景图 到 wm/seller/{sellerid}/logo
     * get("/upload/wm/seller/:sellerid/bgimg")
     */
    async get_wm_seller_sellerid_bgimg(sellerid) {
        const dir = 'wm/seller/' + sellerid + '/';
        this.common_sign(dir);
    }
    /**
     * 上传 外卖商家端：上传商家商品配图 到 wm/seller/{sellerid}/goods/
     * get("/upload/wm/seller/:sellerid/goods")
     */
    async get_wm_seller_sellerid_goods(sellerid) {
        const dir = 'wm/seller/' + sellerid + '/goods/';
        this.common_sign(dir);
    }
    /**
     * 上传 外卖骑士端：上传骑士手持学生证配图 到 wm/knight/apply/
     * get("/upload/wm/knight/apply")
     */
    async get_wm_knight_apply() {
        const dir = 'wm/knight/apply/';
        this.common_sign(dir);
    }
}
exports.default = UploadController;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBsb2FkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXBsb2FkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCw4Q0FBc0Q7QUFDdEQsbURBQXNEO0FBQ3RELHdDQUEyQztBQUUzQyxNQUFxQixnQkFBaUIsU0FBUSxjQUFjO0lBQ3hEOztPQUVHO0lBQ0ksS0FBSyxDQUFDLFdBQVcsQ0FBQyxHQUFHO1FBQ3hCLE1BQU0sRUFBRSxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUM7UUFDckIsSUFBSTtZQUNBLE1BQU0sRUFBRSxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDO1lBQy9CLElBQUksQ0FBQyxRQUFRO2dCQUFFLE9BQU8sR0FBRyxDQUFDLElBQUksR0FBRyxJQUFJLGlCQUFPLENBQUMsbUJBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQztZQUN2RSxpQ0FBaUM7WUFDakMsTUFBTSxRQUFRLEdBQUcsTUFBTSxxQkFBWSxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUNuRCxHQUFHLENBQUMsSUFBSSxHQUFHLEVBQUUsUUFBUSxFQUFFLENBQUM7U0FDM0I7UUFBQyxPQUFPLEtBQUssRUFBRTtZQUNaLEdBQUcsQ0FBQyxJQUFJLEdBQUcsSUFBSSxpQkFBTyxDQUFDLG1CQUFTLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUM1RDtJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSSxLQUFLLENBQUMsZ0JBQWdCO1FBQ3pCLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixDQUFDO1FBQzdCLElBQUksQ0FBQyxXQUFXLENBQUUsR0FBRyxDQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVEOzs7T0FHRztJQUNJLEtBQUssQ0FBQyxxQkFBcUI7UUFDOUIsTUFBTSxHQUFHLEdBQUcsb0JBQW9CLENBQUM7UUFDakMsSUFBSSxDQUFDLFdBQVcsQ0FBRSxHQUFHLENBQUUsQ0FBQztJQUM1QixDQUFD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