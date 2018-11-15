"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用户关注关系
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, DATE, NOW } = app.Sequelize;
    const ClientAttention = app.model.define('client_attention', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        client_id: {
            type: CHAR(36),
            allowNull: false
        },
        club_id: {
            type: CHAR(36),
            allowNull: false
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClientAttention.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'client_attention',
        timestamps: false
    });
    return ClientAttention;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X2F0dGVudGlvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsaWVudF9hdHRlbnRpb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUvQixrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFMUMsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsa0JBQWtCLEVBQUU7UUFDM0QsRUFBRSxFQUFFO1lBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFNBQVM7Z0JBQ1gsT0FBTyxNQUFNLENBQUMsZUFBZSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3pGLENBQUM7WUFDRCxZQUFZLEVBQUUsR0FBRztTQUNsQjtLQUNGLEVBQUU7UUFDQyxTQUFTLEVBQUUsa0JBQWtCO1FBQzdCLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQUMsQ0FBQztJQUNMLE9BQU8sZUFBZSxDQUFDO0FBQ3pCLENBQUMsQ0FBQSJ9