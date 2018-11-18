"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团: 社团信息表
 */
const moment = require('moment');
// import ClientRole from './client_role';
// import School from './school';
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const Club = app.model.define('club', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true,
        },
        school_id: {
            type: INTEGER(11),
            allowNull: false,
        },
        client_id: {
            type: CHAR(36),
            allowNull: false,
        },
        title: {
            type: STRING(16),
            allowNull: false,
        },
        title_updatedAt: {
            type: DATE,
            get title_updatedAt() {
                return moment(Club.getDataValue('title_updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        struts: {
            type: INTEGER(11),
            allowNull: true,
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(Club.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW,
        },
        logo_url: {
            type: STRING(200),
            allowNull: true,
        },
        logo_created: {
            type: DATE,
            get logo_created() {
                return moment(Club.getDataValue('logo_created')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        bgimg_url: {
            type: STRING(200),
            allowNull: true,
        },
        bgimg_created: {
            type: DATE,
            get bgimg_created() {
                return moment(Club.getDataValue('bgimg_created')).format('YYYY-MM-DD HH:mm:ss');
            },
        },
        intro: {
            type: STRING(200),
            allowNull: true,
        },
        modifier: {
            type: STRING(32),
            allowNull: true,
        },
        updatedAt: {
            type: DATE,
            get updatedAt() {
                return moment(Club.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW,
        },
        referrer: {
            type: STRING(36),
            allowNull: true,
        },
    }, {
        tableName: 'club',
        timestamps: false,
    });
    // app.logger.info('【Model Club】: ', Club);
    Club.associate = function () {
        // app.logger.info('【Model Club associate】: ', models);
        app.model.Club.belongsTo(app.model.School, { as: 'school', foreignKey: 'school_id', targetKey: 'sid' });
    };
    // Club.belongsTo(app.model.School, { as: 'school', foreignKey: 'school_id', targetKey: 'sid' });
    // export default Club;
    return Club;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsdWIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUNqQywwQ0FBMEM7QUFDMUMsaUNBQWlDO0FBRWpDLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRTNELE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtRQUNwQyxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxlQUFlLEVBQUU7WUFDZixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksZUFBZTtnQkFDakIsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDcEYsQ0FBQztTQUNGO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksU0FBUztnQkFDWCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDOUUsQ0FBQztZQUNELFlBQVksRUFBRSxHQUFHO1NBQ2xCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxZQUFZLEVBQUU7WUFDWixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksWUFBWTtnQkFDZCxPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDakYsQ0FBQztTQUNGO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxhQUFhLEVBQUU7WUFDYixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksYUFBYTtnQkFDZixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbEYsQ0FBQztTQUNGO1FBQ0QsS0FBSyxFQUFFO1lBQ0wsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNYLE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUM5RSxDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDbEI7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtLQUNGLEVBQUU7UUFDQyxTQUFTLEVBQUUsTUFBTTtRQUNqQixVQUFVLEVBQUUsS0FBSztLQUNsQixDQUFDLENBQUM7SUFFTCwyQ0FBMkM7SUFFM0MsSUFBSSxDQUFDLFNBQVMsR0FBRztRQUNmLHVEQUF1RDtRQUN2RCxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQ3ZDLEVBQUUsRUFBRSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0lBQ2pFLENBQUMsQ0FBQztJQUNGLGlHQUFpRztJQUVqRyx1QkFBdUI7SUFDdkIsT0FBTyxJQUFJLENBQUM7QUFDZCxDQUFDLENBQUMifQ==