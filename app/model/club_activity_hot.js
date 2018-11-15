"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团活动: 活动热度表
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, INTEGER, DATE, NOW } = app.Sequelize;
    const ClubActivityHot = app.model.define('club_activity_hot', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        activity_id: {
            type: CHAR(36),
            allowNull: false
        },
        heat: {
            type: INTEGER(11),
            allowNull: true
        },
        updatedAt: {
            type: DATE,
            get updatedAt() {
                return moment(ClubActivityHot.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClubActivityHot.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'club_activity_hot',
        timestamps: false
    });
    return ClubActivityHot;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9hY3Rpdml0eV9ob3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjbHViX2FjdGl2aXR5X2hvdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBOztHQUVHO0FBQ0gsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9CLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFbkQsTUFBTSxlQUFlLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsbUJBQW1CLEVBQUU7UUFDNUQsRUFBRSxFQUFFO1lBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELFdBQVcsRUFBRTtZQUNYLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxJQUFJLEVBQUU7WUFDSixJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNULE9BQU8sTUFBTSxDQUFDLGVBQWUsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMzRixDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDbEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksU0FBUztnQkFDVCxPQUFPLE1BQU0sQ0FBQyxlQUFlLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDM0YsQ0FBQztZQUNELFlBQVksRUFBRSxHQUFHO1NBQ2xCO0tBQ0YsRUFBRTtRQUNELFNBQVMsRUFBRSxtQkFBbUI7UUFDOUIsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxlQUFlLENBQUM7QUFDekIsQ0FBQyxDQUFBIn0=