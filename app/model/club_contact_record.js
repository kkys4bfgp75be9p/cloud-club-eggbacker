"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团: 社团联系人(关联)表
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const ClubContactRecord = app.model.define('club_contact_record', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        club_id: {
            type: CHAR(36),
            allowNull: false
        },
        operator_client_id: {
            type: CHAR(36),
            allowNull: false
        },
        operator_name: {
            type: STRING(16),
            allowNull: true
        },
        target_client_id: {
            type: CHAR(36),
            allowNull: false
        },
        target_name: {
            type: STRING(16),
            allowNull: true
        },
        origin_power: {
            type: INTEGER(11),
            allowNull: true
        },
        new_power: {
            type: INTEGER(11),
            allowNull: true
        },
        struts: {
            type: INTEGER(11),
            allowNull: true
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubContactRecord.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'club_contact_record',
        timestamps: false
    });
    return ClubContactRecord;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9jb250YWN0X3JlY29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWJfY29udGFjdF9yZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUvQixrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUUzRCxNQUFNLGlCQUFpQixHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLHFCQUFxQixFQUFFO1FBQ2hFLEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLElBQUk7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0Qsa0JBQWtCLEVBQUU7WUFDbEIsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELGFBQWEsRUFBRTtZQUNYLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxJQUFJO1NBQ2xCO1FBQ0QsZ0JBQWdCLEVBQUU7WUFDZCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1NBQ25CO1FBQ0QsV0FBVyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsU0FBUyxFQUFFLElBQUk7U0FDbEI7UUFDRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2xCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksU0FBUztnQkFDVCxPQUFPLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM3RixDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDbEI7S0FDRixFQUFFO1FBQ0QsU0FBUyxFQUFFLHFCQUFxQjtRQUNoQyxVQUFVLEVBQUUsS0FBSztLQUNsQixDQUFDLENBQUM7SUFDSCxPQUFPLGlCQUFpQixDQUFDO0FBQzNCLENBQUMsQ0FBQSJ9