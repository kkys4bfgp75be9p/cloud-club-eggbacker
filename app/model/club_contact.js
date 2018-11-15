"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * 社团: 社团联系人(关联)表
 */
let moment = require('moment');
// import ClientRole from './client_role';
exports.default = (app) => {
    const { CHAR, INTEGER, DATE, NOW } = app.Sequelize;
    const ClubContact = app.model.define('club_contact', {
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
        role_ability: {
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
                return moment(ClubContact.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        },
        updatedAt: {
            type: DATE,
            get updatedAt() {
                return moment(ClubContact.getDataValue('updatedAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'club_contact',
        timestamps: false
    });
    ClubContact.associate = () => {
        app.model.ClubContact.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'client_id', targetKey: 'client_id' });
    };
    // ClubContact.belongsTo(app.model.ClientRole, { as: 'crole', foreignKey: 'client_id', targetKey: 'client_id' });
    // export default ClubContact;
    return ClubContact;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2x1Yl9jb250YWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2x1Yl9jb250YWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDL0IsMENBQTBDO0FBRTFDLGtCQUFlLENBQUMsR0FBRyxFQUFFLEVBQUU7SUFDckIsTUFBTSxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFbkQsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO1FBQ25ELEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLElBQUk7U0FDakI7UUFDRCxPQUFPLEVBQUU7WUFDUCxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUUsQ0FBQztZQUNkLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsU0FBUyxFQUFFO1lBQ1QsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7WUFDZCxTQUFTLEVBQUUsS0FBSztTQUNqQjtRQUNELFlBQVksRUFBRTtZQUNaLElBQUksRUFBRSxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxJQUFJO1lBQ2YsWUFBWSxFQUFFLEdBQUc7U0FDbEI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNYLE9BQU8sTUFBTSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUNyRixDQUFDO1lBQ0QsWUFBWSxFQUFFLEdBQUc7U0FDbEI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsSUFBSTtZQUNWLElBQUksU0FBUztnQkFDWCxPQUFPLE1BQU0sQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLENBQUM7WUFDckYsQ0FBQztZQUNELFlBQVksRUFBRSxHQUFHO1NBQ2xCO0tBQ0YsRUFBRTtRQUNDLFNBQVMsRUFBRSxjQUFjO1FBQ3pCLFVBQVUsRUFBRSxLQUFLO0tBQ2xCLENBQUMsQ0FBQztJQUVMLFdBQVcsQ0FBQyxTQUFTLEdBQUcsR0FBRyxFQUFFO1FBQzNCLEdBQUcsQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFDbEQsRUFBRSxFQUFFLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxDQUFDLENBQUM7SUFDdEUsQ0FBQyxDQUFDO0lBQ0YsaUhBQWlIO0lBRWpILDhCQUE4QjtJQUM5QixPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDLENBQUEifQ==