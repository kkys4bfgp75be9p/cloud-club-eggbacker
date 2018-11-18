"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const AliOSS = require('ali-oss');
require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');
const env = {
    region: 'oss-cn-huhehaote',
    //云账号AccessKey有所有API访问权限，建议遵循阿里云安全最佳实践，部署在服务端使用RAM子账号或STS，部署在客户端使用STS。
    accessKeyId: 'LTAIbwVY1kExQevZ',
    accessKeySecret: 'eIgtgWQWbP9yPbJ8M5lDNDW3s0DA7c',
    bucket: 'sheu-huabei5',
    timeout: 87600,
    // OSS地址，需要https
    uploadImageUrl: 'https://sheu-huabei5.oss-cn-huhehaote.aliyuncs.com',
};
/**
 * Policy 编码加密
 */
const getPolicyBase64 = function () {
    const date = new Date();
    date.setHours(date.getHours() + env.timeout);
    const srcT = date.toISOString();
    const policyText = {
        expiration: srcT,
        conditions: [
            ['content-length-range', 0, 5 * 1024 * 1024],
        ],
    };
    const policyBase64 = new Buffer(JSON.stringify(policyText)).toString('base64');
    return policyBase64;
};
/**
 * 获取上传图片用的签名
 */
exports.getSignature = async (filepath, dir) => {
    try {
        console.log(`上传图片签名日志 ==>  {filepath: ${filepath}} `);
        // 过滤路径
        const aliyunFileKey = dir + filepath.replace('http://tmp/', '');
        console.log(`上传图片签名日志 ==>  {aliyunFileKey: ${aliyunFileKey}} `);
        const policyBase64 = getPolicyBase64();
        const accesskey = env.accessKeySecret;
        const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
            asBytes: true,
        });
        const signature = Crypto.util.bytesToBase64(bytes);
        return {
            url: env.uploadImageUrl,
            key: aliyunFileKey,
            policy: policyBase64,
            OSSAccessKeyId: env.accessKeyId,
            signature,
        };
    }
    catch (error) {
        return error;
    }
};
const separ = {
    SHEU: 'https://sheu-huabei5.oss-cn-huhehaote.aliyuncs.com/',
};
/**
 * 截取OSS中对象的方法
 * @param {*} url
 * @param {*} separator
 */
const truncateObject = (url, separator = separ.SHEU) => url.replace(separator, '');
// 获取AliOSS操作对象
const client = new AliOSS(env);
/**
 * 删除单独的 OSS 中的照片
 * obj
 */
exports.deleteOnec = async (obj) => {
    try {
        // let client = new AliOSS(env);
        console.log('================> ', truncateObject(obj));
        return await client.delete(truncateObject(obj));
    }
    catch (e) {
        console.log(e);
        return e;
    }
};
/**
 * 批量删除 OSS 中的照片
 * [
 *  dir+filename,dir+filename
 * ]
 */
exports.deleteMulti = async (objs) => {
    try {
        console.log('【deleteMulti  OSS照片删除（过滤前）】', objs);
        objs = objs.map((o) => truncateObject(o));
        console.log('【deleteMulti  OSS照片删除（过滤后）】', objs);
        return await client.deleteMulti(objs);
    }
    catch (e) {
        console.log(e);
        return e;
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWxpb3NzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYWxpb3NzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2xDLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztBQUNyQixPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFDckIsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO0FBRXRDLE1BQU0sR0FBRyxHQUFHO0lBQ1YsTUFBTSxFQUFFLGtCQUFrQjtJQUMxQixzRUFBc0U7SUFDdEUsV0FBVyxFQUFFLGtCQUFrQjtJQUMvQixlQUFlLEVBQUUsZ0NBQWdDO0lBQ2pELE1BQU0sRUFBRSxjQUFjO0lBQ3RCLE9BQU8sRUFBRSxLQUFLO0lBQ2QsZ0JBQWdCO0lBQ2hCLGNBQWMsRUFBRSxvREFBb0Q7Q0FDckUsQ0FBQztBQUNGOztHQUVHO0FBQ0gsTUFBTSxlQUFlLEdBQUc7SUFDdEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLEVBQUUsQ0FBQztJQUN4QixJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUUsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0MsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2hDLE1BQU0sVUFBVSxHQUFHO1FBQ2YsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFO1lBQ1IsQ0FBQyxzQkFBc0IsRUFBRSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksR0FBRyxJQUFJLENBQUM7U0FDL0M7S0FDSixDQUFDO0lBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMvRSxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFD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