// import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
// import util = require('util');

describe('test/app/service/Test.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('sayHi', async () => {
    const result = await ctx.service.area.getCityList({provincecode: '610000'});
    console.log('getActiveInfo ::',  result);

  });
});
