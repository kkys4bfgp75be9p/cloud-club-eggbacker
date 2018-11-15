"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团: 社团建立申请表
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const ClubBuildApply = app.model.define('club_build_apply', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        create_client_id: {
            type: CHAR(36),
            allowNull: false
        },
        school_id: {
            type: INTEGER(11),
            allowNull: false
        },
        title: {
            type: STRING(16),
            allowNull: false
        },
        club_check_url: {
            type: STRING(200),
            allowNull: true
        },
        struts: {
            type: INTEGER(11),
            allowNull: true
        },
        checked_fail_reason: {
            type: STRING(64),
            allowNull: true
        },
        checked_user: {
            type: CHAR(36),
            allowNull: true
        },
        checkedAt: {
            type: DATE,
            get checkedAt() {
                return moment(ClubBuildApply.getDataValue('checkedAt')).format('YYYY-MM-DD HH:mm:ss');
            }
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubBuildApply.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        },
        formId: {
            type: STRING(128),
            allowNull: true
        },
        referrer: {
            type: STRING(36),
            allowNull: true
        }
    }, {
        tableName: 'club_build_apply',
        timestamps: false
    });
    return ClubBuildApply;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9idWlsZF9hcHBseS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWJfYnVpbGRfYXBwbHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUvQixrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUUzRCxNQUFNLGNBQWMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsRUFBRTtRQUMxRCxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDaEIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsS0FBSyxFQUFFO1lBQ0gsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsU0FBUyxFQUFFLEtBQUs7U0FDbkI7UUFDRCxjQUFjLEVBQUU7WUFDZCxJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsbUJBQW1CLEVBQUU7WUFDbkIsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxZQUFZLEVBQUU7WUFDVixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxJQUFJO1NBQ2xCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxNQUFNLENBQUMsY0FBYyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQzFGLENBQUM7U0FDRjtRQUNELFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNULE9BQU8sTUFBTSxDQUFDLGNBQWMsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMxRixDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDcEI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO0tBQ0YsRUFBRTtRQUNELFNBQVMsRUFBRSxrQkFBa0I7UUFDN0IsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxjQUFjLENBQUM7QUFDeEIsQ0FBQyxDQUFBIn0=