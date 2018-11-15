"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动评论
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const ClubActivityComment = app.model.define('club_activity_comment', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        client_id: {
            type: CHAR(36),
            allowNull: false
        },
        reply_client_id: {
            type: CHAR(36),
            allowNull: true
        },
        activity_id: {
            type: CHAR(36),
            allowNull: true
        },
        is_hidden: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        content: {
            type: STRING(500),
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
        formId: {
            type: STRING(128),
            allowNull: true
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubActivityComment.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'club_activity_comment',
        timestamps: false
    });
    return ClubActivityComment;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9hY3Rpdml0eV9jb21tZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2x1Yl9hY3Rpdml0eV9jb21tZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFL0Isa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNyQixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFM0QsTUFBTSxtQkFBbUIsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyx1QkFBdUIsRUFBRTtRQUNwRSxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7WUFDZixZQUFZLEVBQUUsR0FBRztTQUNsQjtRQUNELE9BQU8sRUFBRTtZQUNQLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxtQkFBbUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFNBQVM7Z0JBQ1gsT0FBTyxNQUFNLENBQUMsbUJBQW1CLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDN0YsQ0FBQztZQUNELFlBQVksRUFBRSxHQUFHO1NBQ2xCO0tBQ0YsRUFBRTtRQUNDLFNBQVMsRUFBRSx1QkFBdUI7UUFDbEMsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBQyxDQUFDO0lBQ0wsT0FBTyxtQkFBbUIsQ0FBQztBQUM3QixDQUFDLENBQUEifQ==