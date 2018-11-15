"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团: 入社申请表
 */
let moment = require('moment');
// import ClientRole from './client_role';
// import Client from './client';
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const ClubApply = app.model.define('club_apply', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        club_id: {
            type: CHAR(36),
            allowNull: false
        },
        apply_client_id: {
            type: CHAR(36),
            allowNull: false
        },
        checker_client_id: {
            type: CHAR(36),
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
                return moment(ClubApply.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        },
        checked_date: {
            type: DATE,
            get checked_date() {
                return moment(ClubApply.getDataValue('checked_date')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        tableName: 'club_apply',
        timestamps: false
    });
    ClubApply.associate = () => {
        app.model.ClubApply.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'apply_client_id', targetKey: 'client_id' });
        app.model.ClubApply.belongsTo(app.model.Client, { as: 'c', foreignKey: 'apply_client_id', targetKey: 'id' });
    };
    // ClientRole
    // ClubApply.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'apply_client_id', targetKey: 'client_id' });
    // ClubApply.belongsTo(app.model.Client, { as: 'c', foreignKey: 'apply_client_id', targetKey: 'id' });
    // export default ClubApply;
    return ClubApply;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9hcHBseS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWJfYXBwbHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUMvQiwwQ0FBMEM7QUFDMUMsaUNBQWlDO0FBRWpDLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRTNELE1BQU0sU0FBUyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLFlBQVksRUFBRTtRQUMvQyxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELGVBQWUsRUFBRTtZQUNmLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxpQkFBaUIsRUFBRTtZQUNqQixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxtQkFBbUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELE1BQU0sRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFNBQVM7Z0JBQ1gsT0FBTyxNQUFNLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25GLENBQUM7WUFDRCxZQUFZLEVBQUUsR0FBRztTQUNsQjtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxZQUFZO2dCQUNkLE9BQU8sTUFBTSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN0RixDQUFDO1NBQ0Y7S0FDRixFQUFFO1FBQ0MsU0FBUyxFQUFFLFlBQVk7UUFDdkIsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBQyxDQUFDO0lBRUwsU0FBUyxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQUU7UUFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUNoRCxFQUFFLEVBQUUsRUFBRSxPQUFPLEVBQUUsVUFBVSxFQUFFLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXhFLEdBQUcsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDOUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxFQUFFLFVBQVUsRUFBRSxpQkFBaUIsRUFBRSxTQUFTLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUNqRSxDQUFDLENBQUM7SUFDRixhQUFhO0lBQ2IscUhBQXFIO0lBQ3JILHNHQUFzRztJQUV0Ryw0QkFBNEI7SUFDNUIsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQyxDQUFBIn0=