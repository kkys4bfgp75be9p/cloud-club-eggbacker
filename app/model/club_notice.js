"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团:公告表
 */
let moment = require('moment');
// import Client from './client';
// import ClientRole from './client_role';
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const ClubNotice = app.model.define('club_notice', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        club_id: {
            type: CHAR(36),
            allowNull: false
        },
        client_id: {
            type: CHAR(36),
            allowNull: false
        },
        title: {
            type: STRING(32),
            allowNull: true
        },
        content: {
            type: STRING(200),
            allowNull: true
        },
        is_sms_inform: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        struts: {
            type: INTEGER(11),
            allowNull: true
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubNotice.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        },
        repeal_date: {
            type: DATE,
            get repeal_date() {
                return moment(ClubNotice.getDataValue('repeal_date')).format('YYYY-MM-DD HH:mm:ss');
            }
        }
    }, {
        tableName: 'club_notice',
        timestamps: false
    });
    ClubNotice.associate = () => {
        app.model.ClubNotice.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'client_id', targetKey: 'client_id' });
        app.model.ClubNotice.belongsTo(app.model.Client, { as: 'client', foreignKey: 'client_id' });
    };
    // ClubNotice.belongsTo(app.model.Client, { as: 'client', foreignKey: 'client_id' });
    // 多学校的情况下会有问题
    // ClubNotice.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'client_id', targetKey: 'client_id' });
    // export default  ClubNotice;
    return ClubNotice;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9ub3RpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbHViX25vdGljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLGlDQUFpQztBQUNqQywwQ0FBMEM7QUFFMUMsa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNyQixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFM0QsTUFBTSxVQUFVLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFO1FBQ2pELEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLElBQUk7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELEtBQUssRUFBRTtZQUNMLElBQUksRUFBRSxNQUFNLENBQUMsRUFBRSxDQUFDO1lBQ2hCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsT0FBTyxFQUFFO1lBQ1AsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxhQUFhLEVBQUU7WUFDYixJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtZQUNmLFlBQVksRUFBRSxHQUFHO1NBQ2xCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksU0FBUztnQkFDWCxPQUFPLE1BQU0sQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDcEYsQ0FBQztZQUNELFlBQVksRUFBRSxHQUFHO1NBQ2xCO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFdBQVc7Z0JBQ2IsT0FBTyxNQUFNLENBQUMsVUFBVSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3RGLENBQUM7U0FDRjtLQUNGLEVBQUU7UUFDQyxTQUFTLEVBQUUsYUFBYTtRQUN4QixVQUFVLEVBQUUsS0FBSztLQUNsQixDQUFDLENBQUM7SUFFTCxVQUFVLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRTtRQUMxQixHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLEVBQ2pELEVBQUUsRUFBRSxFQUFFLE9BQU8sRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO1FBRXBFLEdBQUcsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sRUFDN0MsRUFBRSxFQUFFLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsQ0FBQyxDQUFDO0lBQy9DLENBQUMsQ0FBQztJQUNGLHFGQUFxRjtJQUNyRixjQUFjO0lBQ2QsZ0hBQWdIO0lBRWhILDhCQUE4QjtJQUM5QixPQUFPLFVBQVUsQ0FBQztBQUNwQixDQUFDLENBQUEifQ==