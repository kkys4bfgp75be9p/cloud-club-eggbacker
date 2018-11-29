"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// import * as assert from 'assert';
const bootstrap_1 = require("egg-mock/bootstrap");
describe('test/app/controller/home.test.ts', () => {
    it('should GET /', async () => {
        const result = await bootstrap_1.app.httpRequest().get('/gift/history-list', {
            dataType: 'json',
        })
            .set('x-access-token', 'eyJkYXRhIjp7ImlkIjoiMDgyMDliNTgtY2FhNi0xMWU4LWE4ZDItNTRiZjY0NTgyNjMzIn0sImNyZWF0ZWQiOjI1NzA1NzAxLCJleHAiOjQzMjAwfQ==.6WSn1fqE0CtizCluf/zOJzWyuQq90GBD0d7+V5Go15Y=')
            .expect(200)
            .then((res) => {
            console.log('/gift/next-lottery 0 ::', res.body);
        });
        // assert(result.text === 'hi, egg');
        console.log('/gift/next-lottery 1 ::', result);
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG9tZS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiaG9tZS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsb0NBQW9DO0FBQ3BDLGtEQUF5QztBQUV6QyxRQUFRLENBQUMsa0NBQWtDLEVBQUUsR0FBRyxFQUFFO0lBQ2hELEVBQUUsQ0FBQyxjQUFjLEVBQUUsS0FBSyxJQUFJLEVBQUU7UUFDNUIsTUFBTSxNQUFNLEdBQUcsTUFBTSxlQUFHLENBQUMsV0FBVyxFQUFFLENBQUMsR0FBRyxDQUFDLG9CQUFvQixFQUFFO1lBQy9ELFFBQVEsRUFBRSxNQUFNO1NBQ2pCLENBQUM7YUFDRCxHQUFHLENBQUMsZ0JBQWdCLEVBQUUsbUtBQW1LLENBQUM7YUFDMUwsTUFBTSxDQUFDLEdBQUcsQ0FBQzthQUNYLElBQUksQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ1osT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDcEQsQ0FBQyxDQUFDLENBQUM7UUFDSCxxQ0FBcUM7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyx5QkFBeUIsRUFBRyxNQUFNLENBQUMsQ0FBQztJQUNsRCxDQUFDLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyxDQUFDIn0=