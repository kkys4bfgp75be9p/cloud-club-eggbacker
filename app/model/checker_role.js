"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * sys用户角色表
 */
let moment = require('moment');
exports.default = (app) => {
    const { CHAR, STRING, INTEGER, DATE, NOW } = app.Sequelize;
    const CheckerRole = app.model.define('checker_role', {
        id: {
            type: CHAR(36),
            allowNull: false,
            primaryKey: true
        },
        openid: {
            type: CHAR(128),
            allowNull: false
        },
        username: {
            type: STRING(16),
            allowNull: false
        },
        the_power: {
            type: INTEGER(11),
            allowNull: true
        },
        createdAt: {
            type: DATE,
            get createdAt() {
                // app.logger.info('【Moment CreatedAt】: ',this['createdAt']);
                return moment(CheckerRole.getDataValue('createdAt')).format('YYYY-MM-DD HH:mm:ss');
            },
            defaultValue: NOW
        }
    }, {
        tableName: 'checker_role',
        timestamps: false
    });
    return CheckerRole;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hlY2tlcl9yb2xlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2hlY2tlcl9yb2xlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7O0dBRUc7QUFDSCxJQUFJLE1BQU0sR0FBRyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUM7QUFFL0Isa0JBQWUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtJQUNyQixNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxHQUFHLEdBQUcsQ0FBQyxTQUFTLENBQUM7SUFFM0QsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsY0FBYyxFQUFFO1FBQ25ELEVBQUUsRUFBRTtZQUNGLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDO1lBQ2QsU0FBUyxFQUFFLEtBQUs7WUFDaEIsVUFBVSxFQUFFLElBQUk7U0FDakI7UUFDRCxNQUFNLEVBQUU7WUFDTixJQUFJLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQztZQUNmLFNBQVMsRUFBRSxLQUFLO1NBQ2pCO1FBQ0QsUUFBUSxFQUFFO1lBQ1IsSUFBSSxFQUFFLE1BQU0sQ0FBQyxFQUFFLENBQUM7WUFDaEIsU0FBUyxFQUFFLEtBQUs7U0FDakI7UUFDRCxTQUFTLEVBQUU7WUFDVCxJQUFJLEVBQUUsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQixTQUFTLEVBQUUsSUFBSTtTQUNoQjtRQUNELFNBQVMsRUFBRTtZQUNULElBQUksRUFBRSxJQUFJO1lBQ1YsSUFBSSxTQUFTO2dCQUNYLDZEQUE2RDtnQkFDN0QsT0FBTyxNQUFNLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO1lBQ3JGLENBQUM7WUFDRCxZQUFZLEVBQUUsR0FBRztTQUNsQjtLQUNGLEVBQUU7UUFDQyxTQUFTLEVBQUUsY0FBYztRQUN6QixVQUFVLEVBQUUsS0FBSztLQUNsQixDQUFDLENBQUM7SUFDTCxPQUFPLFdBQVcsQ0FBQztBQUNyQixDQUFDLENBQUEifQ==