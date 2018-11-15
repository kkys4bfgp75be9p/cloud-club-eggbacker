"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动: 活动配图表
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, DATE, NOW } = app.Sequelize;
    const ClubActivityPic = app.model.define('club_activity_pic', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        activity_id: {
            type: CHAR(36),
            allowNull: false
        },
        pic_url: {
            type: STRING(32),
            allowNull: true
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubActivityPic.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'club_activity_pic',
        timestamps: false
    });
    return ClubActivityPic;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9hY3Rpdml0eV9waWMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbHViX2FjdGl2aXR5X3BpYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9CLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFbEQsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUU7UUFDNUQsRUFBRSxFQUFFO1lBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsTUFBTSxDQUFDLEVBQUUsQ0FBQztZQUNoQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNULE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDbEI7S0FDRixFQUFFO1FBQ0QsU0FBUyxFQUFFLG1CQUFtQjtRQUM5QixVQUFVLEVBQUUsS0FBSztLQUNsQixDQUFDLENBQUM7SUFDSCxPQUFPLGVBQWUsQ0FBQztBQUN6QixDQUFDLENBQUEifQ==