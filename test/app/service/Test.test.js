"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("egg-mock/bootstrap");
// import util = require('util');
describe('test/app/service/Test.test.js', () => {
    let ctx;
    before(async () => {
        ctx = bootstrap_1.app.mockContext();
    });
    // it('formartDateTime ::: ', async () => {
    //   const result = ctx.helper.formartDateTime(new Date(), true);
    //   console.log('result:: ', result);
    // });
    //   it('sayHi', async () => {
    //     const result = await ctx.service.gift.getActiveInfo();
    //     console.log('getActiveInfo ::',  result);
    //     // console.log('getActiveInfo ::',  util.inspect( result, true, 3));
    //     // assert(result === 'hi, egg');
    //   });
    it('sayHi', async () => {
        const result = await ctx.service.area.getCityList({ provincecode: '610000' });
        console.log('getActiveInfo ::', result);
        // console.log('getActiveInfo ::',  util.inspect( result, true, 3));
        // assert(result === 'hi, egg');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVzdC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0RBQXlDO0FBQ3pDLGlDQUFpQztBQUVqQyxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO0lBQzdDLElBQUksR0FBWSxDQUFDO0lBRWpCLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNoQixHQUFHLEdBQUcsZUFBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsMkNBQTJDO0lBQzNDLGlFQUFpRTtJQUNqRSxzQ0FBc0M7SUFDdEMsTUFBTTtJQUVSLDhCQUE4QjtJQUM5Qiw2REFBNkQ7SUFDN0QsZ0RBQWdEO0lBQ2hELDJFQUEyRTtJQUMzRSx1Q0FBdUM7SUFDdkMsUUFBUTtJQUVOLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDckIsTUFBTSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsRUFBQyxZQUFZLEVBQUUsUUFBUSxFQUFDLENBQUMsQ0FBQztRQUM1RSxPQUFPLENBQUMsR0FBRyxDQUFDLGtCQUFrQixFQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQ3pDLG9FQUFvRTtRQUNwRSxnQ0FBZ0M7SUFDbEMsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9