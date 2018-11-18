"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用户角色表
 */
const moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const ClientRole = app.model.define('client_role', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true,
        },
        client_id: {
            type: CHAR(36),
            allowNull: false,
        },
        school_id: {
            type: INTEGER(11),
            allowNull: false,
        },
        profe: {
            type: STRING(32),
            allowNull: true,
        },
        educ_job: {
            type: STRING(16),
            allowNull: true,
        },
        realname: {
            type: STRING(16),
            allowNull: true,
        },
        cert_url: {
            type: STRING(200),
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
        formId: {
            type: STRING(128),
            allowNull: true,
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClientRole.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW,
        },
    }, {
        tableName: 'client_role',
        timestamps: false,
    });
    return ClientRole;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X3JvbGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbGllbnRfcm9sZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRWpDLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRTNELE1BQU0sVUFBVSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLGFBQWEsRUFBRTtRQUNqRCxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELG1CQUFtQixFQUFFO1lBQ25CLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksU0FBUztnQkFDVCxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdEYsQ0FBQztZQUNELFlBQVksRUFBRSxHQUFHO1NBQ2xCO0tBQ0YsRUFBRTtRQUNELFNBQVMsRUFBRSxhQUFhO1FBQ3hCLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQUMsQ0FBQztJQUNILE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMsQ0FBQyJ9