// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import Csrfauth from '../../../app/middleware/csrfauth';
import Mwtest1 from '../../../app/middleware/mwtest1';
import Xtoken from '../../../app/middleware/xtoken';

declare module 'egg' {
  interface IMiddleware {
    csrfauth: typeof Csrfauth;
    mwtest1: typeof Mwtest1;
    xtoken: typeof Xtoken;
  }
}
