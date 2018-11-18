"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const message_error_1 = require("./message-error");
/**
 * 关于返回数据的统一定义
 */
class Message {
    constructor(err, data) {
        this.err = err || message_error_1.default.SUCCESS;
        if (data !== undefined) {
            this[Array.isArray(data) ? 'list' : 'info'] = data;
        }
    }
}
exports.default = Message;
exports.ErrorType = message_error_1.default;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWVzc2FnZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm1lc3NhZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSxtREFBc0Q7QUFDdEQ7O0dBRUc7QUFDSCxNQUFNLE9BQU87SUFJVCxZQUFZLEdBQUcsRUFBRSxJQUFVO1FBQ3ZCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxJQUFJLHVCQUFPLENBQUMsT0FBTyxDQUFDO1FBQ2xDLElBQUksSUFBSSxLQUFLLFNBQVMsRUFBQztZQUNuQixJQUFJLENBQUUsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUUsR0FBRyxJQUFJLENBQUM7U0FDeEQ7SUFDTCxDQUFDO0NBQ0o7QUFFRCxrQkFBZSxPQUFPLENBQUM7QUFFVixRQUFBLFNBQVMsR0FBRyx1QkFBTyxDQUFDIn0=