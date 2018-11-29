// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Access from '../../../app/controller/access';
import Activity from '../../../app/controller/activity';
import Area from '../../../app/controller/area';
import Club from '../../../app/controller/club';
import Clubmaster from '../../../app/controller/clubmaster';
import Gift from '../../../app/controller/gift';
import Home from '../../../app/controller/home';
import Mytest from '../../../app/controller/mytest';
import School from '../../../app/controller/school';
import Torch from '../../../app/controller/torch';
import Upload from '../../../app/controller/upload';
import User from '../../../app/controller/user';
import Validate from '../../../app/controller/validate';
import CommonBase from '../../../app/controller/common/base';

declare module 'egg' {
  interface IController {
    access: Access;
    activity: Activity;
    area: Area;
    club: Club;
    clubmaster: Clubmaster;
    gift: Gift;
    home: Home;
    mytest: Mytest;
    school: School;
    torch: Torch;
    upload: Upload;
    user: User;
    validate: Validate;
    common: {
      base: CommonBase;
    };
  }
}
