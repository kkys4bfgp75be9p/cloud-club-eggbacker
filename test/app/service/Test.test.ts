// import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Test.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('sayHi', async () => {
    const result = await ctx.service.school.getSchoolListByCity({citycode: 110100});
    console.log('city school list 2 ::',  result);
    // assert(result === 'hi, egg');
  });
});
