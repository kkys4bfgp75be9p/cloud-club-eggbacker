// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Access from '../../../app/service/access';
import Activity from '../../../app/service/activity';
import Area from '../../../app/service/area';
import Club from '../../../app/service/club';
import Clubmaster from '../../../app/service/clubmaster';
import School from '../../../app/service/school';
import Test from '../../../app/service/Test';
import Torch from '../../../app/service/torch';
import User from '../../../app/service/user';
import Validate from '../../../app/service/validate';
import CommonBase from '../../../app/service/common/base';

declare module 'egg' {
  interface IService {
    access: Access;
    activity: Activity;
    area: Area;
    club: Club;
    clubmaster: Clubmaster;
    school: School;
    test: Test;
    torch: Torch;
    user: User;
    validate: Validate;
    common: {
      base: CommonBase;
    };
  }
}
