"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (app) => {
    const { controller, router } = app;
    router.get('/index', controller.home.index);
    router.get('/mytest/get', controller.mytest.testGet);
    router.post('/mytest/post', controller.mytest.testPost);
    // 登录相关
    router.post('/access/login', controller.access.login);
    // validate 相关
    router.get('/validate/school-setting-list', controller.validate.getSchoolSettingList);
    router.get('/validate/club-build-list', controller.validate.getClubBuildList);
    router.get('/validate/activity-create-list', controller.validate.getActivityCreateList);
    router.get('/validate/comment-create-list', controller.validate.getCommentCreateList);
    router.post('/validate/exec-school', controller.validate.execSchool);
    router.post('/validate/exec-build-club', controller.validate.execBuildClub);
    router.post('/validate/exec-activity', controller.validate.execActivity);
    router.post('/validate/exec-comment', controller.validate.execComment);
    // user 相关
    router.get('/user/panel-info', controller.user.get_panelInfo);
    router.post('/user/save', controller.user.post_save);
    router.post('/user/phone-sms', controller.user.post_phoneSms);
    router.post('/user/phone/save', controller.user.post_phone_save);
    // torch 相关
    router.post('/torch/pull', controller.torch.post_pull);
    router.post('/torch/heating', controller.torch.post_heating);
    // school 相关
    router.get('/school/nearby-list', controller.school.get_nearbyList);
    router.get('/school/city/list', controller.school.get_city_list);
    router.get('/school/load-apply', controller.school.get_loadApply);
    router.post('/school/setting', controller.school.post_setting);
    // club 相关
    router.get('/club/simple-list', controller.club.get_simpleList);
    router.get('/club/detail-list', controller.club.get_detailList);
    router.get('/club/self/canapply-list', controller.club.get_self_canapplyList);
    router.get('/club/self/apply-list', controller.club.get_self_applyList);
    router.get('/club/contact-list', controller.club.get_contactList);
    router.get('/club/panel-tips', controller.club.get_panelTips);
    router.get('/club/notice-list', controller.club.get_noticeList);
    router.get('/club/detail-info', controller.club.get_detailInfo);
    router.get('/club/attention-list', controller.club.get_attentionList);
    router.get('/club/recommend-list', controller.club.get_recommendList);
    router.post('/club/self/join', controller.club.post_self_join);
    router.post('/club/add-attention', controller.club.post_addAttention);
    router.post('/club/cancel-attention', controller.club.post_cancelAttention);
    // clubmaster 相关
    router.get('/clubmaster/build-apply-list', controller.clubmaster.get_buildApplyList);
    router.get('/clubmaster/join-list', controller.clubmaster.get_joinList);
    router.get('/clubmaster/activity-list', controller.clubmaster.get_activityList);
    router.get('/clubmaster/edit-info', controller.clubmaster.get_editInfo);
    router.post('/clubmaster/set-power', controller.clubmaster.post_setPower);
    router.post('/clubmaster/create-club', controller.clubmaster.post_createClub);
    router.post('/clubmaster/notice/add', controller.clubmaster.post_notice_add);
    router.post('/clubmaster/notice/repeal', controller.clubmaster.post_notice_repeal);
    router.post('/clubmaster/join-ratify', controller.clubmaster.post_joinRatify);
    router.post('/clubmaster/join-reject', controller.clubmaster.post_joinReject);
    router.post('/clubmaster/activity/save', controller.clubmaster.post_activity_save);
    router.post('/clubmaster/activity/publish', controller.clubmaster.post_activity_publish);
    router.post('/clubmaster/activity/repeal', controller.clubmaster.post_activity_repeal);
    router.post('/clubmaster/activity/delete-imgs', controller.clubmaster.post_activity_deleteImgs);
    router.post('/clubmaster/modify-club', controller.clubmaster.post_modifyClub);
    // area 相关
    router.get('/area/province-list', controller.area.get_provinceList);
    router.get('/area/city-list', controller.area.get_cityList);
    // activity 相关
    router.get('/activity/simple-info', controller.activity.get_simpleInfo);
    router.get('/activity/concerned-list', controller.activity.get_concernedList);
    router.get('/activity/pics', controller.activity.get_pics);
    router.get('/activity/comments-list', controller.activity.get_commentsList);
    router.get('/activity/public-list', controller.activity.get_publicList);
    router.get('/activity/attention-list', controller.activity.get_attentionList);
    router.get('/activity/school-list', controller.activity.get_schoolList);
    router.get('/activity/album', controller.activity.get_album);
    router.post('/activity/add-comment', controller.activity.post_addComment);
    // upload 相关
    router.get('/upload/sheu/headpic', controller.upload.get_sheu_headpic);
    router.get('/upload/cloudclub/headpic', controller.upload.get_cloudclub_headpic);
    router.get('/upload/wm/client/headpic', controller.upload.get_wm_client_headpic);
    router.get('/upload/wm/knight/headpic', controller.upload.get_wm_knight_headpic);
    router.get('/upload/wm/seller/headpic', controller.upload.get_wm_seller_headpic);
    router.get('/upload/wm/partner/headpic', controller.upload.get_wm_partner_headpic);
    router.get('/upload/cloudclub/pid', controller.upload.get_cloudclub_pid);
    router.get('/upload/cloudclub/clubapply', controller.upload.get_cloudclub_clubapply);
    router.get('/upload/cloudclub/:clubid/logo', controller.upload.get_cloudclub_clubid_logo);
    router.get('/upload/cloudclub/:clubid/bgimg', controller.upload.get_cloudclub_clubid_bgimg);
    router.get('/upload/cloudclub/activity', controller.upload.get_cloudclub_activity);
    router.get('/upload/wm/seller/apply', controller.upload.get_wm_seller_apply);
    router.get('/upload/wm/seller/:sellerid/logo', controller.upload.get_wm_seller_sellerid_logo);
    router.get('/upload/wm/seller/:sellerid/bgimg', controller.upload.get_wm_seller_sellerid_bgimg);
    router.get('/upload/wm/seller/:sellerid/goods', controller.upload.get_wm_seller_sellerid_goods);
    router.get('/upload/wm/knight/apply', controller.upload.get_wm_knight_apply);
    // gift 相关
    router.get('/gift/next-lottery', controller.gift.nextLottery);
    router.get('/gift/active-info', controller.gift.activeInfo);
    router.get('/gift/history-list', controller.gift.historyList);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm91dGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm91dGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWUsQ0FBQyxHQUFnQixFQUFFLEVBQUU7SUFDbEMsTUFBTSxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxHQUFHLENBQUM7SUFFbkMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxRQUFRLEVBQUUsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUM1QyxNQUFNLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFeEQsT0FBTztJQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxFQUFFLFVBQVUsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFdEQsY0FBYztJQUNkLE1BQU0sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3RGLE1BQU0sQ0FBQyxHQUFHLENBQUMsMkJBQTJCLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0lBQzlFLE1BQU0sQ0FBQyxHQUFHLENBQUMsZ0NBQWdDLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO0lBQ3hGLE1BQU0sQ0FBQyxHQUFHLENBQUMsK0JBQStCLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO0lBQ3RGLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLEVBQUUsVUFBVSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNyRSxNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixFQUFFLFVBQVUs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