"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动: 赛季奖品表
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, DATE, NOW } = app.Sequelize;
    const ClubActivitySeasonAward = app.model.define('club_activity_season_award', {
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
        club_no1: {
            type: STRING(200),
            allowNull: true
        },
        club_no2: {
            type: STRING(200),
            allowNull: true
        },
        club_no3: {
            type: STRING(200),
            allowNull: true
        },
        role_no1: {
            type: STRING(200),
            allowNull: true
        },
        role_no2: {
            type: STRING(200),
            allowNull: true
        },
        role_no3: {
            type: STRING(200),
            allowNull: true
        },
        remark: {
            type: STRING(200),
            allowNull: true
        },
        updatedAt: {
            type: DATE,
            get updatedAt() {
                return moment(ClubActivitySeasonAward.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubActivitySeasonAward.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'club_activity_season_award',
        timestamps: false
    });
    return ClubActivitySeasonAward;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9hY3Rpdml0eV9zZWFzb25fYXdhcmQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbHViX2FjdGl2aXR5X3NlYXNvbl9hd2FyZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9CLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFbEQsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRTtRQUM3RSxFQUFFLEVBQUU7WUFDRixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLFVBQVUsRUFBRSxJQUFJO1NBQ2pCO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxRQUFRLEVBQUU7WUFDUixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFFBQVEsRUFBRTtZQUNSLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLElBQUk7U0FDaEI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNULE9BQU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25HLENBQUM7WUFDRCxZQUFZLEVBQUUsR0FBRztTQUNsQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNULE9BQU8sTUFBTSxDQUFDLHVCQUF1QixDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ25HLENBQUM7WUFDRCxZQUFZLEVBQUUsR0FBRztTQUNsQjtLQUNGLEVBQUU7UUFDRCxTQUFTLEVBQUUsNEJBQTRCO1FBQ3ZDLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQUMsQ0FBQztJQUNILE9BQU8sdUJBQXVCLENBQUM7QUFDakMsQ0FBQyxDQUFBIn0=