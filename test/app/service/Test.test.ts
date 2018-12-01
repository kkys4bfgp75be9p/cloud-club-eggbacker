// import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';
import util = require('util');

describe('test/app/service/Test.test.js', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  it('sayHi', async () => {
    const result = await ctx.service.gift.getNextLottery();
    console.log('getActiveInfo ::',  util.inspect( result, true, 3));
    // assert(result === 'hi, egg');
  });
});
