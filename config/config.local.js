"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (appInfo) => {
    const config = {};
    console.log('【ENV】========> local');
    // override config from framework / plugin
    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_20181105';
    // the return config will combines to EggAppConfig
    return Object.assign({}, config);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnLmxvY2FsLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlnLmxvY2FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWUsQ0FBQyxPQUFtQixFQUFFLEVBQUU7SUFDckMsTUFBTSxNQUFNLEdBQStCLEVBQUUsQ0FBQztJQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDLENBQUM7SUFFcEMsMENBQTBDO0lBQzFDLHVFQUF1RTtJQUN2RSxNQUFNLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxJQUFJLEdBQUcsV0FBVyxDQUFDO0lBRXpDLGtEQUFrRDtJQUNsRCx5QkFDSyxNQUFNLEVBQ1Q7QUFDSixDQUFDLENBQUMifQ==