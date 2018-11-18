import BaseController from './common/base';

export default class HomeController extends BaseController {
  async index() {
    // const { ctx } = this;
    // ctx.body = await ctx.service.test.sayHi('egg');
    await this.ctx.render('index.tpl');
  }
}
