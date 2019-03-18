"use strict";
// import { Application } from 'egg';
// import { snakeCase } from 'lodash';
// import { DefineAttributes, SequelizeStatic } from 'sequelize';
// let moment = require('moment');
/**
 * 基础模型模板
 */
// interface ModelArgs {
//     table: string,
//     app: Application,
//     attributes: DefineAttributes,
//     options?: object,
// };
// export default function BaseModel(
//     app: Application,
//     table: string,
//     attributes: DefineAttributes,
//     options: object={},
// ) {
//     console.log('【BaseModel】...');
//     const modelSchema = app.model.define(table, {
//         ...attributes,
//         ...getDefaultAttributes(options, app.Sequelize),
//     });
//     return modelSchema;
// }
// function getDefaultAttributes(options: object, sequelize: SequelizeStatic): object {
//     const { DATE } = sequelize;
//     const defaultAttributes = {
//       created_at: {
//         type: DATE,
//         get() {
//           return moment((this as any).getDataValue('created_at')).format('YYYY-MM-DD HH:mm:ss');
//         },
//       },
//       updated_at: {
//         type: DATE,
//         get() {
//           return moment((this as any).getDataValue('updated_at')).format('YYYY-MM-DD HH:mm:ss');
//         },
//       },
//     };
//     // 需要从 options 读取的配置信息，用于下方做过滤的条件
//     const attributes = ['createdAt', 'updatedAt', 'deletedAt'];
//     Object.keys(options).forEach((value: string) => {
//       if (attributes.includes(value) && (options as any)[value] === false) {
//         delete (defaultAttributes as any)[snakeCase(value)];
//       }
//     });
//     return defaultAttributes || {};
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHFDQUFxQztBQUNyQyxzQ0FBc0M7QUFDdEMsaUVBQWlFO0FBQ2pFLGtDQUFrQztBQUVsQzs7R0FFRztBQUNILHdCQUF3QjtBQUN4QixxQkFBcUI7QUFDckIsd0JBQXdCO0FBQ3hCLG9DQUFvQztBQUNwQyx3QkFBd0I7QUFDeEIsS0FBSztBQUNMLHFDQUFxQztBQUNyQyx3QkFBd0I7QUFDeEIscUJBQXFCO0FBQ3JCLG9DQUFvQztBQUNwQywwQkFBMEI7QUFDMUIsTUFBTTtBQUNOLHFDQUFxQztBQUVyQyxvREFBb0Q7QUFDcEQseUJBQXlCO0FBQ3pCLDJEQUEyRDtBQUMzRCxVQUFVO0FBRVYsMEJBQTBCO0FBQzFCLElBQUk7QUFHSix1RkFBdUY7QUFDdkYsa0NBQWtDO0FBRWxDLGtDQUFrQztBQUNsQyxzQkFBc0I7QUFDdEIsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixtR0FBbUc7QUFDbkcsYUFBYTtBQUNiLFdBQVc7QUFDWCxzQkFBc0I7QUFDdEIsc0JBQXNCO0FBQ3RCLGtCQUFrQjtBQUNsQixtR0FBbUc7QUFDbkcsYUFBYTtBQUNiLFdBQVc7QUFDWCxTQUFTO0FBRVQsd0NBQXdDO0FBQ3hDLGtFQUFrRTtBQUVsRSx3REFBd0Q7QUFDeEQsK0VBQStFO0FBQy9FLCtEQUErRDtBQUMvRCxVQUFVO0FBQ1YsVUFBVTtBQUNWLHNDQUFzQztBQUN0QyxJQUFJIn0=