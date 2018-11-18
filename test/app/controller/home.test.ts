// import * as assert from 'assert';
import { app } from 'egg-mock/bootstrap';

describe('test/app/controller/home.test.ts', () => {
  it('should GET /', async () => {
    const result = await app.httpRequest().get('/school/city/list?citycode=110100', {
      dataType: 'json'
    })
    .set('x-access-token', 'eyJkYXRhIjp7ImlkIjoiMzk1N2UxNjAtZWEzZi0xMWU4LTk1ODYtYzE1YjcxY2I3ZGQ1In0sImV4cCI6MTQ0MCwiY3JlYXRlZCI6MjU3MDczODR9.yreLX2E65t9LeI/3vHZ5voFJEQYqfGIyimkSm/NU5+Y=')
    .expect(200)
    .then(res => {
      console.log('city school list 0 ::',  res.body);
    });
    // assert(result.text === 'hi, egg');
    console.log('city school list 1 ::',  result);
  });
});
