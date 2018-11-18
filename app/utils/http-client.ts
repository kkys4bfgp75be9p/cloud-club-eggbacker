/**
 * 用于请求外部接口的封装
 */
const request = require('request');
import ProConf, {APP_CLOUD_CLUB} from './configs/project-config';

const http = (url, method, reqData?) => new Promise((resolve, reject) => {
    const options = {
        url,
        method,
        // headers: {},
        // body: {}
    };
    if (method === 'POST'){
        options['json'] = true,
        options['headers'] = {
            'content-type': 'application/json',
        };
        options['body'] = reqData; //JSON.stringify(reqData);
    }else if (method === 'GET'){
        // options.qs = JSON.stringify(reqData);
        // options.useQuerystring = true;
    }
    console.log('options:: ', options);
    // 请求微信接口
    request(options, function (err, response, data) {
        // 解析返回结果
        const result_data = typeof data == 'string' ? JSON.parse(data) : data;
        if (!err && response.statusCode === 200) {
            return resolve(result_data);
        }
        reject(result_data);
    }); // end: request
});

export const $get = (url) => http(url, 'GET');
export const $post = (url) => http(url, 'POST');
/**
 * 发送短信 (修改个人信息)
 * @param {*} phone
 * @param {*} param
 */
export const sendSMS = (phone, param) => {
    const APPKEY = '939c8b657b7a7718252d8b71c4f10798';
    const templateid = 2014;
    const url = `http://api.id98.cn/api/sms?appkey=${APPKEY}&phone=${phone}&templateid=${templateid}&param=${param}`;
    console.log('sms_url:: ', url);
    return $get(url);
};
/**
 * 发送短信 (学校设置通知)
 * @param {*} phone
 * @param {*} param
 */
export const sendSMSToSchool = (phone) => {
    const APPKEY = '939c8b657b7a7718252d8b71c4f10798';
    const templateid = 2015;
    const param = 'none';
    const url = `http://api.id98.cn/api/sms?appkey=${APPKEY}&phone=${phone}&templateid=${templateid}&param=${param}`;
    console.log('sms_url:: ', url);
    return $get(url);
};
/**
 * 发送短信 (社团建立通知)
 * @param {*} phone
 * @param {*} param
 */
export const sendSMSToClub = (phone) => {
    const APPKEY = '939c8b657b7a7718252d8b71c4f10798';
    const templateid = 2016;
    const param = 'none';
    const url = `http://api.id98.cn/api/sms?appkey=${APPKEY}&phone=${phone}&templateid=${templateid}&param=${param}`;
    console.log('sms_url:: ', url);
    return $get(url);
};
/**
 * 获取小程序凭证
 */
const getAccessToken = () => {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_CLOUD_CLUB}&secret=${ProConf.get(APP_CLOUD_CLUB)}`;
    console.log('getAccessToken:: ', url);
    return $get(url);
};
/**
 *
 * @param {*} touser 接收者（用户）的 openid
 * @param {*} template_id 所需下发的模板消息的id
 * @param {*} page 点击模板卡片后的跳转页面，仅限本小程序内的页面。支持带参数,（示例index?foo=bar）。该字段不填则模板无跳转。
 * @param {*} form_id 表单提交场景下，为 submit 事件带上的 formId；支付场景下，为本次支付的 prepay_id
 * @param {*} data 模板内容，不填则下发空模板
 * @param {*} emphasis_keyword 模板需要放大的关键词，不填则默认无放大
 */
export const sendTemplateMessage = async ({touser, template_id, page, form_id, data, emphasis_keyword}) => {
    const accessTokenResult = await getAccessToken();
    if (!accessTokenResult || !accessTokenResult['access_token']){
        return Promise.reject({err: 'access_token is null'});
    }
    console.log('accessTokenResult: ', accessTokenResult);
    const url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${accessTokenResult['access_token']}`;
    // console.log('sms_url:: ', url);
    const post_data = {touser, template_id, page, form_id, data, emphasis_keyword};
    return http(url, 'POST', post_data);
};

// export const sendSMS2 = (phone, param) => {
//     const APPKEY = "LTAIbwVY1kExQevZ";
//     const SECRET = "eIgtgWQWbP9yPbJ8M5lDNDW3s0DA7c";
//     const templateid = 2009;
//     const url = `http://api.id98.cn/api/sms?appkey=${APPKEY}&phone=${phone}&templateid=${templateid}&param=${param}`;
//     console.log('sms_url:: ', url);
//     return http(url, 'GET');
// }