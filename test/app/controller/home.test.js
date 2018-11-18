"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as assert from 'assert';
const bootstrap_1 = require("egg-mock/bootstrap");
describe('test/app/controller/home.test.ts', () => {
    it('should GET /', async () => {
        const result = await bootstrap_1.app.httpRequest().get('/school/city/list?citycode=110100', {
            dataType: 'json'
        })
            .set('x-access-token', 'eyJkYXRhIjp7ImlkIjoiMzk1N2UxNjAtZWEzZi0xMWU4LTk1ODYtYzE1YjcxY2I3ZGQ1In0sImV4cCI6MTQ0MCwiY3JlYXRlZCI6MjU3MDczODR9.yreLX2E65t9LeI/3vHZ5voFJEQYqfGIyimkSm/NU5+Y=')
            .expect(200)
            .then(res => {
            console.log('city school list 0 ::', res.body);
        });
        // assert(result.text === 'hi, egg');
        console.log('city school list 1 ::', result);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQW9DO0FBQ3BDLGtEQUF5QztBQUV6QyxRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBQ2hELEVBQUUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxlQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLG1DQUFtQyxFQUFFO1lBQzlFLFFBQVEsRUFBRSxNQUFNO1NBQ2pCLENBQUM7YUFDRCxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsK0pBQStKLENBQUM7YUFDdEwsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNWLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xELENBQUMsQ0FBQyxDQUFDO1FBQ0gscUNBQXFDO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsdUJBQXVCLEVBQUcsTUFBTSxDQUFDLENBQUM7SUFDaEQsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMsQ0FBQyJ9