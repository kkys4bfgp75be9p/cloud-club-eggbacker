// import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/part1.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('city school list 1 ::', async () => {
    const result = await ctx.service.school.getSchoolListByCity({citycode: 140100});
    console.log('city school list 2 ::',  result);
    // assert(result === 'hi, egg');
  });
});
