"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("egg-mock/bootstrap");
// import util = require('util');
describe('test/app/service/Test.test.js', () => {
    let ctx;
    before(async () => {
        ctx = bootstrap_1.app.mockContext();
    });
    it('sayHi', async () => {
        const result = await ctx.service.area.getCityList({ provincecode: '610000' });
        console.log('getActiveInfo ::', result);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVzdC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0RBQXlDO0FBQ3pDLGlDQUFpQztBQUVqQyxRQUFRLENBQUMsK0JBQStCLEVBQUUsR0FBRyxFQUFFO0lBQzdDLElBQUksR0FBWSxDQUFDO0lBRWpCLE1BQU0sQ0FBQyxLQUFLLElBQUksRUFBRTtRQUNoQixHQUFHLEdBQUcsZUFBRyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQzFCLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLE9BQU8sRUFBRSxLQUFLLElBQUksRUFBRTtRQUNyQixNQUFNLE1BQU0sR0FBRyxNQUFNLEdBQUcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFDLFlBQVksRUFBRSxRQUFRLEVBQUMsQ0FBQyxDQUFDO1FBQzVFLE9BQU8sQ0FBQyxHQUFHLENBQUMsa0JBQWtCLEVBQUcsTUFBTSxDQUFDLENBQUM7SUFFM0MsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9