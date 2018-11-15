"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动: 赛季获奖名单表
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const ClubActivitySeasonWiner = app.model.define('club_activity_season_winer', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        creator_id: {
            type: CHAR(36),
            allowNull: false
        },
        season_id: {
            type: CHAR(36),
            allowNull: false
        },
        club_no1_id: {
            type: CHAR(36),
            allowNull: true
        },
        club_no2_id: {
            type: CHAR(36),
            allowNull: true
        },
        club_no3_id: {
            type: CHAR(36),
            allowNull: true
        },
        role_no1_id: {
            type: CHAR(36),
            allowNull: true
        },
        role_no2_id: {
            type: CHAR(36),
            allowNull: true
        },
        role_no3_id: {
            type: CHAR(36),
            allowNull: true
        },
        remark: {
            type: STRING(200),
            allowNull: true
        },
        struts: {
            type: INTEGER(11),
            allowNull: true,
            defaultValue: '0'
        },
        updatedAt: {
            type: DATE,
            get updatedAt() {
                return moment(ClubActivitySeasonWiner.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubActivitySeasonWiner.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'club_activity_season_winer',
        timestamps: false
    });
    return ClubActivitySeasonWiner;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9hY3Rpdml0eV9zZWFzb25fd2luZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbHViX2FjdGl2aXR5X3NlYXNvbl93aW5lci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9CLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRTNELE1BQU0sdUJBQXVCLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsNEJBQTRCLEVBQUU7UUFDN0UsRUFBRSxFQUFFO1lBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELFVBQVUsRUFBRTtZQUNWLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsV0FBVyxFQUFFO1lBQ1gsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxXQUFXLEVBQUU7WUFDWCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsTUFBTSxFQUFFO1lBQ04sSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtZQUNmLFlBQVksRUFBRSxHQUFHO1NBQ2xCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxNQUFNLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkcsQ0FBQztZQUNELFlBQVksRUFBRSxHQUFHO1NBQ2xCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxNQUFNLENBQUMsdUJBQXVCLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDbkcsQ0FBQztZQUNELFlBQVksRUFBRSxHQUFHO1NBQ2xCO0tBQ0YsRUFBRTtRQUNELFNBQVMsRUFBRSw0QkFBNEI7UUFDdkMsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyx1QkFBdUIsQ0FBQztBQUNqQyxDQUFDLENBQUEifQ==