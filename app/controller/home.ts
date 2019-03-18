import BaseController from './common/base';

export default class HomeController extends BaseController {
  async index() {
    // const { ctx } = this;
    // ctx.body = await ctx.service.test.sayHi('egg');
    await this.ctx.render('index.tpl');
  }

  public async test1(){
    const { ctx, app } = this;
    // console.log('Home Controller => ', ctx.helper.resmessage('a error', 'maybe this is a error!'));
    console.log('Home Controller => ', app['resmessage']('a error', 'maybe this is a error!'));
    ctx.body = `我收到了参数：${ {...ctx.query} }`;
  }
}
