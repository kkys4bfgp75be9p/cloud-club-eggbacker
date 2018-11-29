"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 个人抽奖记录
 */
const moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const ClientSeason = app.model.define('client_season', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true,
        },
        struts: {
            type: INTEGER(11),
            allowNull: true,
        },
        no1_time: {
            type: DATE,
            // set no1_time(no1_time) {
            //     console.log('[no1_time SET] =========>', no1_time);
            //     ClientSeason.no1_time = moment(no1_time).format('YYYY-MM-DD HH:mm:ss');
            // },
            get no1_time() {
                // console.log('[no1_time GET] =========>', ClientSeason.getDataValue('no1_time'));
                return moment(ClientSeason.getDataValue('no1_time')).format('YYYY-MM-DD HH:mm:ss');
            },
            allowNull: true,
        },
        no2_time: {
            type: DATE,
            get no2_time() {
                return moment(ClientSeason.getDataValue('no2_time')).format('YYYY-MM-DD HH:mm:ss');
            },
            allowNull: true,
        },
        no3_time: {
            type: DATE,
            get no3_time() {
                return moment(ClientSeason.getDataValue('no3_time')).format('YYYY-MM-DD HH:mm:ss');
            },
            allowNull: true,
        },
        no1_gift: {
            type: STRING(200),
            allowNull: false,
        },
        no2_gift: {
            type: STRING(200),
            allowNull: false,
        },
        no3_gift: {
            type: STRING(200),
            allowNull: false,
        },
        no1_client: {
            type: CHAR(36),
            allowNull: true,
        },
        no2_client: {
            type: CHAR(36),
            allowNull: true,
        },
        no3_client: {
            type: CHAR(36),
            allowNull: true,
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                return moment(ClientSeason.getDataValue('createdAt')).format('YYYY-MM-DD');
            },
            defaultValue: NOW,
        },
    }, {
        tableName: 'client_season',
        timestamps: false,
    });
    //   ClientSeason.associate = () => {
    //     app.model.ClientSeason.belongsTo(app.model.ClientRole,
    //         { as: 'crole', foreignKey: 'no1_client', targetKey: 'client_id' });
    //     app.model.ClientSeason.belongsTo(app.model.ClientRole,
    //         { as: 'crole', foreignKey: 'no2_client', targetKey: 'client_id' });
    //     app.model.ClientSeason.belongsTo(app.model.ClientRole,
    //         { as: 'crole', foreignKey: 'no3_client', targetKey: 'client_id' });
    //     app.model.ClientSeason.belongsTo(app.model.Client,
    //             { as: 'client', foreignKey: 'no1_client', targetKey: 'id' });
    //     app.model.ClientSeason.belongsTo(app.model.Client,
    //             { as: 'client', foreignKey: 'no2_client', targetKey: 'id' });
    //     app.model.ClientSeason.belongsTo(app.model.Client,
    //             { as: 'client', foreignKey: 'no3_client', targetKey: 'id' });
    //   };
    return ClientSeason;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpZW50X3NlYXNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNsaWVudF9zZWFzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTs7R0FFRztBQUNILE1BQU0sTUFBTSxHQUFHLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztBQUVqQyxrQkFBZSxDQUFDLEdBQUcsRUFBRSxFQUFFO0lBQ3JCLE1BQU0sRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFFLEdBQUcsR0FBRyxDQUFDLFNBQVMsQ0FBQztJQUUzRCxNQUFNLFlBQVksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxlQUFlLEVBQUU7UUFDckQsRUFBRSxFQUFFO1lBQ0YsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztZQUNoQixVQUFVLEVBQUUsSUFBSTtTQUNqQjtRQUNELE1BQU0sRUFBRTtZQUNKLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1NBQ2xCO1FBQ0QsUUFBUSxFQUFFO1lBQ04sSUFBSSxFQUFFLElBQUk7WUFDViwyQkFBMkI7WUFDM0IsMERBQTBEO1lBQzFELDhFQUE4RTtZQUM5RSxLQUFLO1lBQ0wsSUFBSSxRQUFRO2dCQUNSLG1GQUFtRjtnQkFDbkYsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3ZGLENBQUM7WUFDRCxTQUFTLEVBQUUsSUFBSTtTQUNsQjtRQUNELFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxRQUFRO2dCQUNSLE9BQU8sTUFBTSxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUN2RixDQUFDO1lBQ0QsU0FBUyxFQUFFLElBQUk7U0FDbEI7UUFDRCxRQUFRLEVBQUU7WUFDTixJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksUUFBUTtnQkFDUixPQUFPLE1BQU0sQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDdkYsQ0FBQztZQUNELFNBQVMsRUFBRSxJQUFJO1NBQ2xCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUM7WUFDakIsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxRQUFRLEVBQUU7WUFDTixJQUFJLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQztZQUNqQixTQUFTLEVBQUUsS0FBSztTQUNuQjtRQUNELFFBQVEsRUFBRTtZQUNOLElBQUksRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxLQUFLO1NBQ25CO1FBQ0QsVUFBVSxFQUFFO1lBQ1YsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFVBQVUsRUFBRTtZQUNSLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLElBQUk7U0FDbEI7UUFDRCxVQUFVLEVBQUU7WUFDUixJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxJQUFJO1NBQ2xCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUk7WUFDVixJQUFJLFNBQVM7Z0JBQ1QsT0FBTyxNQUFNLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxZQUFZLENBQUMsQ0FBQztZQUMvRSxDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDbEI7S0FDRixFQUFFO1FBQ0QsU0FBUyxFQUFFLGVBQWU7UUFDMUIsVUFBVSxFQUFFLEtBQUs7S0FDbEIsQ0FBQyxDQUFDO0lBRUwscUNBQXFDO0lBQ3JDLDZEQUE2RDtJQUM3RCw4RUFBOEU7SUFDOUUsNkRBQTZEO0lBQzdELDhFQUE4RTtJQUM5RSw2REFBNkQ7SUFDN0QsOEVBQThFO0lBRTlFLHlEQUF5RDtJQUN6RCw0RUFBNEU7SUFDNUUseURBQXlEO0lBQ3pELDRFQUE0RTtJQUM1RSx5REFBeUQ7SUFDekQsNEVBQTRFO0lBQzVFLE9BQU87SUFFTCxPQUFPLFlBQVksQ0FBQztBQUN0QixDQUFDLENBQUMifQ==