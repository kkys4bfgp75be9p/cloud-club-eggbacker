"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    console.log('【ENV】========> prod');
    const config = {};
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_20181105';
    // the return config will combines to EggAppConfig
    return Object.assign({}, config);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLnByb2QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb25maWcucHJvZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLGtCQUFlLENBQUMsT0FBbUIsRUFBRSxFQUFFO0lBRXJDLE9BQU8sQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQUMsQ0FBQztJQUVuQyxNQUFNLE1BQU0sR0FBK0IsRUFBRSxDQUFDO0lBQzlDLDBDQUEwQztJQUMxQyx1RUFBdUU7SUFDdkUsTUFBTSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUMsSUFBSSxHQUFHLFdBQVcsQ0FBQztJQUV6QyxrREFBa0Q7SUFDbEQseUJBQ0ssTUFBTSxFQUNUO0FBQ0osQ0FBQyxDQUFDIn0=