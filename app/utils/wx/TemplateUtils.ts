import * as HttpClient from '../http-client';
/**
 * 发送【评论相关的】模板消息
 */
export const sendCommentTemplate = async (formId, openid, title, aid, struts, reason) => {
    const sendData = {
        'keyword1': {value: title},
        'keyword2': {value: (struts == 1 ? '评论成功' : '评论失败')}
        , 'keyword3': {value: '点击查看详情'},
    };
    if (struts == 0 && reason){
        sendData['keyword3'] = {value: reason};
    }
    HttpClient.sendTemplateMessage({
        touser: openid,
        template_id: 'o77NsZ4uLBUUnzTXFoYSXWfSEoboHUWVlCktcijuCgw',
        page: 'pages/activity/info/info?id=' + aid + '&share=true',
        form_id: formId,
        data: sendData,
        emphasis_keyword: null,
    }).then((res) => {
        console.log('sendTemplateMessage res: ', res);
    }).catch((err) => {
        console.log('sendTemplateMessage err: ', err);
    });
};

/**
 * 发送【设置学校相关的】模板消息
 */
export const sendSchoolTemplate = async (formId, openid, school, struts, reason) => {
    const sendData = {
        'keyword1': {value: '设置学校申请：' + school},
        'keyword2': {value: (struts == 1 ? '审核通过' : '未通过')}
        , 'keyword3': {value: '点击查看详情'},
    };
    if (struts == 0 && reason){
        sendData['keyword3'] = {value: reason};
    }
    HttpClient.sendTemplateMessage({
        touser: openid,
        template_id: 'V2PF_GfwJuYBXkY54hFYivKHa1313zqJTJH37NT4jIw',
        page: 'pages/mine/mine',
        form_id: formId,
        data: sendData,
        emphasis_keyword: null,
    }).then((res) => {
        console.log('sendTemplateMessage res: ', res);
    }).catch((err) => {
        console.log('sendTemplateMessage err: ', err);
    });
};

/**
 * 发送【创建社团相关的】模板消息
 */
export const sendClubBuildTemplate = async (formId, openid, school, clubname, struts, reason) => {
    const sendData = {
        'keyword1': {value: '创建社团申请'},
        'keyword2': {value: clubname},
        'keyword3': {value: school},
        'keyword4': {value: (struts == 1 ? '审核通过' : '未通过')}
        , 'keyword5': {value: '点击查看详情'},
    };
    if (struts == 0 && reason){
        sendData['keyword5'] = {value: reason};
    }
    HttpClient.sendTemplateMessage({
        touser: openid,
        template_id: 'Sa77mt6JEhCNiKkwPy2Vb6d62ZlV3RimwlTze2lj0C4',
        page: 'pages/mine/mine',
        form_id: formId,
        data: sendData,
        emphasis_keyword: null,
    }).then((res) => {
        console.log('sendTemplateMessage res: ', res);
    }).catch((err) => {
        console.log('sendTemplateMessage err: ', err);
    });
};

/**
 * 发送【加入社团申请审核】模板消息
 */
export const sendClubJoinTemplate = async (formId, openid, school, clubname, struts, reason) => {
    const sendData = {
        'keyword1': {value: '申请加入社团'},
        'keyword2': {value: clubname},
        'keyword3': {value: school},
        'keyword4': {value: (struts == 1 ? '审核通过' : '未通过')}
        , 'keyword5': {value: '点击查看详情'},
    };
    if (struts == 0 && reason){
        sendData['keyword5'] = {value: reason};
    }
    HttpClient.sendTemplateMessage({
        touser: openid,
        template_id: 'Sa77mt6JEhCNiKkwPy2Vb6d62ZlV3RimwlTze2lj0C4',
        page: 'pages/mine/mine',
        form_id: formId,
        data: sendData,
        emphasis_keyword: null,
    }).then((res) => {
        console.log('sendTemplateMessage res: ', res);
    }).catch((err) => {
        console.log('sendTemplateMessage err: ', err);
    });
};

/**
 * 发送【活动发布】模板消息
 */
export const sendActivityTemplate = async (formId, openid, title, struts, reason) => {
    const sendData = {
        'keyword1': {value: '活动发布申请'},
        'keyword2': {value: title},
        'keyword3': {value: (struts == 1 ? '审核通过' : '未通过')}
        , 'keyword4': {value: '点击查看详情'},
    };
    if (struts == 0 && reason){
        sendData['keyword4'] = {value: reason};
    }
    HttpClient.sendTemplateMessage({
        touser: openid,
        template_id: 'Sa77mt6JEhCNiKkwPy2Vb58roGbF0mQHcGFbs_vA7XE',
        page: 'pages/mine/mine',
        form_id: formId,
        data: sendData,
        emphasis_keyword: null,
    }).then((res) => {
        console.log('sendTemplateMessage res: ', res);
    }).catch((err) => {
        console.log('sendTemplateMessage err: ', err);
    });
};