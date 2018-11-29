import { Application } from 'egg';

export default (app: Application) => {
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
