"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动: 投票记录表
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, DATE, NOW } = app.Sequelize;
    const ClubActivityVoteRecord = app.model.define('club_activity_vote_record', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        activity_id: {
            type: CHAR(36),
            allowNull: false
        },
        client_id: {
            type: CHAR(36),
            allowNull: false
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubActivityVoteRecord.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'club_activity_vote_record',
        timestamps: false
    });
    return ClubActivityVoteRecord;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9hY3Rpdml0eV92b3RlX3JlY29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWJfYWN0aXZpdHlfdm90ZV9yZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUvQixrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFMUMsTUFBTSxzQkFBc0IsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQywyQkFBMkIsRUFBRTtRQUMzRSxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksU0FBUztnQkFDVCxPQUFPLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNsRyxDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDbEI7S0FDRixFQUFFO1FBQ0QsU0FBUyxFQUFFLDJCQUEyQjtRQUN0QyxVQUFVLEVBQUUsS0FBSztLQUNsQixDQUFDLENBQUM7SUFDSCxPQUFPLHNCQUFzQixDQUFDO0FBQ2hDLENBQUMsQ0FBQSJ9