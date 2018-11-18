"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动: 赛季信息表
 */
const moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, DATEONLY, DATE, NOW } = app.Sequelize;
    const ClubActivitySeasonInfo = app.model.define('club_activity_season_info', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true,
        },
        creator_id: {
            type: CHAR(36),
            allowNull: false,
        },
        title: {
            type: STRING(32),
            allowNull: true,
        },
        start_date: {
            type: DATEONLY,
            allowNull: true,
        },
        stop_date: {
            type: DATEONLY,
            allowNull: true,
        },
        updatedAt: {
            type: DATE,
            get updatedAt() {
                return moment(ClubActivitySeasonInfo.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW,
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubActivitySeasonInfo.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW,
        },
    }, {
        tableName: 'club_activity_season_info',
        timestamps: false,
    });
    return ClubActivitySeasonInfo;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9hY3Rpdml0eV9zZWFzb25faW5mby5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWJfYWN0aXZpdHlfc2Vhc29uX2luZm8udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUU1RCxNQUFNLHNCQUFzQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLDJCQUEyQixFQUFFO1FBQzNFLEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLElBQUk7U0FDakI7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxVQUFVLEVBQUU7WUFDVixJQUFJLEVBQUUsUUFBUTtZQUNkLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLFFBQVE7WUFDZCxTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNULE9BQU8sTUFBTSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2xHLENBQUM7WUFDRCxZQUFZLEVBQUUsR0FBRztTQUNsQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNULE9BQU8sTUFBTSxDQUFDLHNCQUFzQixDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2xHLENBQUM7WUFDRCxZQUFZLEVBQUUsR0FBRztTQUNsQjtLQUNGLEVBQUU7UUFDRCxTQUFTLEVBQUUsMkJBQTJCO1FBQ3RDLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQUMsQ0FBQztJQUNILE9BQU8sc0JBQXNCLENBQUM7QUFDaEMsQ0FBQyxDQUFDIn0=