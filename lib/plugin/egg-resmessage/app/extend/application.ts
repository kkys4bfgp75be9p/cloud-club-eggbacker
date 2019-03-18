import { Application } from 'egg';

export default {

    resmessage(err?, data?) {
        const app: Application | any = this;
        console.log('【create plugin resmessage】 config => ', app.config.resmessage);
        return {err, data};
    }
}
