"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用于请求外部接口的封装
 */
const request = require('request');
const project_config_1 = require("./configs/project-config");
const http = (url, method, reqData) => new Promise((resolve, reject) => {
    const options = {
        url,
        method,
    };
    if (method === 'POST') {
        options['json'] = true,
            options['headers'] = {
                'content-type': 'application/json',
            };
        options['body'] = reqData; //JSON.stringify(reqData);
    }
    else if (method === 'GET') {
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
exports.$get = (url) => http(url, 'GET');
exports.$post = (url) => http(url, 'POST');
/**
 * 发送短信 (修改个人信息)
 * @param {*} phone
 * @param {*} param
 */
exports.sendSMS = (phone, param) => {
    const APPKEY = '939c8b657b7a7718252d8b71c4f10798';
    const templateid = 2014;
    const url = `http://api.id98.cn/api/sms?appkey=${APPKEY}&phone=${phone}&templateid=${templateid}&param=${param}`;
    console.log('sms_url:: ', url);
    return exports.$get(url);
};
/**
 * 发送短信 (学校设置通知)
 * @param {*} phone
 * @param {*} param
 */
exports.sendSMSToSchool = (phone) => {
    const APPKEY = '939c8b657b7a7718252d8b71c4f10798';
    const templateid = 2015;
    const param = 'none';
    const url = `http://api.id98.cn/api/sms?appkey=${APPKEY}&phone=${phone}&templateid=${templateid}&param=${param}`;
    console.log('sms_url:: ', url);
    return exports.$get(url);
};
/**
 * 发送短信 (社团建立通知)
 * @param {*} phone
 * @param {*} param
 */
exports.sendSMSToClub = (phone) => {
    const APPKEY = '939c8b657b7a7718252d8b71c4f10798';
    const templateid = 2016;
    const param = 'none';
    const url = `http://api.id98.cn/api/sms?appkey=${APPKEY}&phone=${phone}&templateid=${templateid}&param=${param}`;
    console.log('sms_url:: ', url);
    return exports.$get(url);
};
/**
 * 获取小程序凭证
 */
const getAccessToken = () => {
    const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${project_config_1.APP_CLOUD_CLUB}&secret=${project_config_1.default.get(project_config_1.APP_CLOUD_CLUB)}`;
    console.log('getAccessToken:: ', url);
    return exports.$get(url);
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
exports.sendTemplateMessage = async ({ touser, template_id, page, form_id, data, emphasis_keyword }) => {
    const accessTokenResult = await getAccessToken();
    if (!accessTokenResult || !accessTokenResult['access_token']) {
        return Promise.reject({ err: 'access_token is null' });
    }
    console.log('accessTokenResult: ', accessTokenResult);
    const url = `https://api.weixin.qq.com/cgi-bin/message/wxopen/template/send?access_token=${accessTokenResult['access_token']}`;
    // console.log('sms_url:: ', url);
    const post_data = { touser, template_id, page, form_id, data, emphasis_keyword };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaHR0cC1jbGllbnQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJodHRwLWNsaWVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsTUFBTSxPQUFPLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ25DLDZEQUFpRTtBQUVqRSxNQUFNLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxNQUFNLEVBQUUsT0FBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsRUFBRTtJQUNwRSxNQUFNLE9BQU8sR0FBRztRQUNaLEdBQUc7UUFDSCxNQUFNO0tBR1QsQ0FBQztJQUNGLElBQUksTUFBTSxLQUFLLE1BQU0sRUFBQztRQUNsQixPQUFPLENBQUMsTUFBTSxDQUFDLEdBQUcsSUFBSTtZQUN0QixPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUc7Z0JBQ2pCLGNBQWMsRUFBRSxrQkFBa0I7YUFDckMsQ0FBQztRQUNGLE9BQU8sQ0FBQyxNQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQywwQkFBMEI7S0FDeEQ7U0FBSyxJQUFJLE1BQU0sS0FBSyxLQUFLLEVBQUM7UUFDdkIsd0NBQXdDO1FBQ3hDLGlDQUFpQztLQUNwQztJQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0lBQ25DLFNBQVM7SUFDVCxPQUFPLENBQUMsT0FBTyxFQUFFLFVBQVUsR0FBRyxFQUFFLFFBQVEsRUFBRSxJQUFJO1FBQzFDLFNBQVM7UUFDVCxNQUFNLFdBQVcsR0FBRyxPQUFPLElBQUksSUFBSSxRQUFRLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUN0RSxJQUFJLENBQUMsR0FBRyxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssR0FBRyxFQUFFO1lBQ3JDLE9BQU8sT0FBTyxD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