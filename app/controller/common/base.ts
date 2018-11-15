import { Controller, Context } from 'egg';

export default class BaseController extends Controller {
    constructor(ctx: Context) {
        super(ctx);
        console.log('in BaseController..');
    }
}