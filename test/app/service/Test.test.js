"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = require("egg-mock/bootstrap");
describe('test/app/service/Test.test.js', () => {
    let ctx;
    before(async () => {
        ctx = bootstrap_1.app.mockContext();
    });
    it('sayHi', async () => {
        const result = await ctx.service.school.getSchoolListByCity({ citycode: 110100 });
        console.log('city school list 2 ::', result);
        // assert(result === 'hi, egg');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGVzdC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVGVzdC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0RBQXlDO0FBRXpDLFFBQVEsQ0FBQywrQkFBK0IsRUFBRSxHQUFHLEVBQUU7SUFDN0MsSUFBSSxHQUFZLENBQUM7SUFFakIsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ2hCLEdBQUcsR0FBRyxlQUFHLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDMUIsQ0FBQyxDQUFDLENBQUM7SUFFSCxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ3JCLE1BQU0sTUFBTSxHQUFHLE1BQU0sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsbUJBQW1CLENBQUMsRUFBQyxRQUFRLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztRQUNoRixPQUFPLENBQUMsR0FBRyxDQUFDLHVCQUF1QixFQUFHLE1BQU0sQ0FBQyxDQUFDO1FBQzlDLGdDQUFnQztJQUNsQyxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=