"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 用户: 用户基本信息
 */
// import moment from 'moment';
let moment = require('moment');
exports.default = (app) => {
    const { STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const Client = app.model.define('client', {
        id: {
            type: STRING,
            primaryKey: true
        },
        unionid: {
            type: STRING,
            unique: true
        },
        openid_cloud_club: {
            type: STRING,
            unique: true
        },
        openid_sheu: {
            type: STRING,
            unique: true
        },
        nickname: STRING,
        telephone: STRING,
        avatar_url: STRING,
        gender: INTEGER,
        struts: INTEGER,
        createdAt: {
            type: DATE,
            get createdAt() {
                // return moment(this.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
                // console.log('【client:createdAt】 => ', this);
                return moment(Client.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        },
        updatedAt: {
            type: DATE,
            get updatedAt() {
                return moment(Client.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        // freezeTableName: true, // Model 对应的表名将与model名相同
        tableName: "client",
        timestamps: false,
    });
    return Client;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xpZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCwrQkFBK0I7QUFDL0IsSUFBSSxNQUFNLEdBQUcsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBRS9CLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDbkIsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFckQsTUFBTSxNQUFNLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUNwQztRQUNJLEVBQUUsRUFBRTtZQUNBLElBQUksRUFBRSxNQUFNO1lBQ1osVUFBVSxFQUFFLElBQUk7U0FDbkI7UUFDRCxPQUFPLEVBQUU7WUFDTCxJQUFJLEVBQUUsTUFBTTtZQUNaLE1BQU0sRUFBRSxJQUFJO1NBQ2Y7UUFDRCxpQkFBaUIsRUFBRTtZQUNmLElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTSxFQUFFLElBQUk7U0FDZjtRQUNELFdBQVcsRUFBRTtZQUNULElBQUksRUFBRSxNQUFNO1lBQ1osTUFBTSxFQUFFLElBQUk7U0FDZjtRQUNELFFBQVEsRUFBRSxNQUFNO1FBQ2hCLFNBQVMsRUFBRSxNQUFNO1FBQ2pCLFVBQVUsRUFBRSxNQUFNO1FBQ2xCLE1BQU0sRUFBRSxPQUFPO1FBQ2YsTUFBTSxFQUFFLE9BQU87UUFDZixTQUFTLEVBQUU7WUFDUCxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksU0FBUztnQkFDVCwrRUFBK0U7Z0JBQy9FLCtDQUErQztnQkFDL0MsT0FBTyxNQUFNLENBQUMsTUFBTSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ2xGLENBQUM7WUFDRCxZQUFZLEVBQUUsR0FBRztTQUNwQjtRQUNELFNBQVMsRUFBRTtZQUNQLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNULE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNsRixDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDcEI7S0FDSixFQUNEO1FBQ0ksa0RBQWtEO1FBQ2xELFNBQVMsRUFBRSxRQUFRO1FBQ25CLFVBQVUsRUFBRSxLQUFLO0tBQ3BCLENBQ0osQ0FBQztJQUNGLE9BQU8sTUFBTSxDQUFDO0FBQ2xCLENBQUMsQ0FBQSJ9