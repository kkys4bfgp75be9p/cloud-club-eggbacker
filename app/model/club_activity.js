"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动: 活动信息表
 */
const moment = require('moment');
// import ClientRole from './client_role';
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const ClubActivity = app.model.define('club_activity', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true,
        },
        club_id: {
            type: CHAR(36),
            allowNull: false,
        },
        creator_client_id: {
            type: CHAR(36),
            allowNull: false,
        },
        title: {
            type: STRING(32),
            allowNull: true,
        },
        content: {
            type: STRING(1000),
            allowNull: true,
        },
        struts: {
            type: INTEGER(11),
            allowNull: true,
        },
        checked_fail_reason: {
            type: STRING(64),
            allowNull: true,
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubActivity.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW,
        },
        timing: {
            type: INTEGER(11),
            allowNull: true,
        },
        period: {
            type: INTEGER(11),
            allowNull: true,
        },
        formId: {
            type: STRING(128),
            allowNull: true,
        },
        brief_start: {
            type: DATE,
            get brief_start() {
                return moment(ClubActivity.getDataValue('brief_start')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        brief_end: {
            type: DATE,
            get brief_end() {
                return moment(ClubActivity.getDataValue('brief_end')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        classify: {
            type: INTEGER(11),
            allowNull: true,
        },
    }, {
        tableName: 'club_activity',
        timestamps: false,
    });
    ClubActivity.associate = function () {
        app.model.ClubActivity.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'creator_client_id', targetKey: 'client_id' });
    };
    // ClubActivity.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'creator_client_id', targetKey: 'client_id' });
    // export default ClubActivity;
    return ClubActivity;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9hY3Rpdml0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWJfYWN0aXZpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQywwQ0FBMEM7QUFFMUMsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNyQixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFM0QsTUFBTSxZQUFZLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsZUFBZSxFQUFFO1FBQ3JELEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLElBQUk7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsaUJBQWlCLEVBQUU7WUFDakIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUM7WUFDbEIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELG1CQUFtQixFQUFFO1lBQ25CLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFNBQVM7Z0JBQ1gsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3RGLENBQUM7WUFDRCxZQUFZLEVBQUUsR0FBRztTQUNsQjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxXQUFXO2dCQUNiLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN4RixDQUFDO1NBQ0Y7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksU0FBUztnQkFDWCxPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdEYsQ0FBQztTQUNGO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7S0FFRixFQUFFO1FBQ0MsU0FBUyxFQUFFLGVBQWU7UUFDMUIsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBQyxDQUFDO0lBRUwsWUFBWSxDQUFDLFNBQVMsR0FBRztRQUN2QixHQUFHLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQ25ELEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsbUJBQW1CLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDOUUsQ0FBQyxDQUFDO0lBRUYsMEhBQTBIO0lBRTFILCtCQUErQjtJQUMvQixPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLENBQUMifQ==