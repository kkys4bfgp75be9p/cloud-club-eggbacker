// This file was auto created by egg-ts-helper
// Do not modify this file!!!!!!!!!

import 'egg'; // Make sure ts to import egg declaration at first
import CheckerRole from '../../../app/model/checker_role';
import City from '../../../app/model/city';
import Client from '../../../app/model/client';
import ClientAttention from '../../../app/model/client_attention';
import ClientRole from '../../../app/model/client_role';
import ClientSeason from '../../../app/model/client_season';
import ClientTorchRecord from '../../../app/model/client_torch_record';
import Club from '../../../app/model/club';
import ClubActivity from '../../../app/model/club_activity';
import ClubActivityComment from '../../../app/model/club_activity_comment';
import ClubActivityHot from '../../../app/model/club_activity_hot';
import ClubActivityPic from '../../../app/model/club_activity_pic';
import ClubActivitySeasonAward from '../../../app/model/club_activity_season_award';
import ClubActivitySeasonInfo from '../../../app/model/club_activity_season_info';
import ClubActivitySeasonWiner from '../../../app/model/club_activity_season_winer';
import ClubActivityVoteRecord from '../../../app/model/club_activity_vote_record';
import ClubApply from '../../../app/model/club_apply';
import ClubBuildApply from '../../../app/model/club_build_apply';
import ClubContact from '../../../app/model/club_contact';
import ClubContactRecord from '../../../app/model/club_contact_record';
import ClubNotice from '../../../app/model/club_notice';
import District from '../../../app/model/district';
import Province from '../../../app/model/province';
import School from '../../../app/model/school';
import CommonBase from '../../../app/model/common/base';

declare module 'sequelize' {
  interface Sequelize {
    CheckerRole: ReturnType<typeof CheckerRole>;
    City: ReturnType<typeof City>;
    Client: ReturnType<typeof Client>;
    ClientAttention: ReturnType<typeof ClientAttention>;
    ClientRole: ReturnType<typeof ClientRole>;
    ClientSeason: ReturnType<typeof ClientSeason>;
    ClientTorchRecord: ReturnType<typeof ClientTorchRecord>;
    Club: ReturnType<typeof Club>;
    ClubActivity: ReturnType<typeof ClubActivity>;
    ClubActivityComment: ReturnType<typeof ClubActivityComment>;
    ClubActivityHot: ReturnType<typeof ClubActivityHot>;
    ClubActivityPic: ReturnType<typeof ClubActivityPic>;
    ClubActivitySeasonAward: ReturnType<typeof ClubActivitySeasonAward>;
    ClubActivitySeasonInfo: ReturnType<typeof ClubActivitySeasonInfo>;
    ClubActivitySeasonWiner: ReturnType<typeof ClubActivitySeasonWiner>;
    ClubActivityVoteRecord: ReturnType<typeof ClubActivityVoteRecord>;
    ClubApply: ReturnType<typeof ClubApply>;
    ClubBuildApply: ReturnType<typeof ClubBuildApply>;
    ClubContact: ReturnType<typeof ClubContact>;
    ClubContactRecord: ReturnType<typeof ClubContactRecord>;
    ClubNotice: ReturnType<typeof ClubNotice>;
    District: ReturnType<typeof District>;
    Province: ReturnType<typeof Province>;
    School: ReturnType<typeof School>;
    Common: {
      Base: ReturnType<typeof CommonBase>;
    };
  }
}
