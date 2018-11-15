"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用户投掷火把的记录表
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, INTEGER, DATE, NOW } = app.Sequelize;
    const ClientTorchRecord = app.model.define('client_torch_record', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        client_id: {
            type: CHAR(36),
            allowNull: false
        },
        torch_count_current: {
            type: INTEGER(11),
            allowNull: true
        },
        torch_count_history: {
            type: INTEGER(11),
            allowNull: true
        },
        updatedAt: {
            type: DATE,
            get updatedAt() {
                return moment(ClientTorchRecord.getDataValue('updatedAt')).format('YYYY-MM-DD');
            },
            allowNull: true
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClientTorchRecord.getDataValue('createdAt')).format('YYYY-MM-DD');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'client_torch_record',
        timestamps: false
    });
    return ClientTorchRecord;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X3RvcmNoX3JlY29yZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsaWVudF90b3JjaF9yZWNvcmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILElBQUksTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUUvQixrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxJQUFJLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxHQUFHLEVBQUUsR0FBRyxHQUFHLENBQUMsU0FBUyxDQUFDO0lBRW5ELE1BQU0saUJBQWlCLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMscUJBQXFCLEVBQUU7UUFDaEUsRUFBRSxFQUFFO1lBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxtQkFBbUIsRUFBRTtZQUNuQixJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELG1CQUFtQixFQUFFO1lBQ25CLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2hCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxNQUFNLENBQUMsaUJBQWlCLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxDQUFDO1lBQ3BGLENBQUM7WUFDRCxTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNULE9BQU8sTUFBTSxDQUFDLGlCQUFpQixDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUNwRixDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDbEI7S0FDRixFQUFFO1FBQ0QsU0FBUyxFQUFFLHFCQUFxQjtRQUNoQyxVQUFVLEVBQUUsS0FBSztLQUNsQixDQUFDLENBQUM7SUFDSCxPQUFPLGlCQUFpQixDQUFDO0FBQzNCLENBQUMsQ0FBQSJ9