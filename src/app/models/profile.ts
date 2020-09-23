export interface IPlayerProfile {
  id: string;
  displayName: string;
  username: string;
  bio: string;
  joinDate: Date;
  joinAs: string;
  batsman: string;
  bowler: string;
  other: string;
  previousClubName: string;
  image: string;
  following: boolean;  
  Approved: boolean;
  followersCount: number;
  followingCount: number;

  // properties for club
  isClubMember: boolean; //approved by club admin
  isClubFollower: boolean;
  clubFollowingCount: number;
  clubMembersCount: number;
  clubMemberTeam: string;

  playerPhotos: IPlayerPhoto[];
}

export interface IPlayerPhoto {
  id: string;
  url: string;
  isMain: boolean;
}

export interface IUserActivity {
  id: string;
  title: string;
  date: Date;
}

// export interface IProfileFormValues extends Partial<IProfile> {
//   time?: Date;
// }
// export class ProfileFormValues implements IProfileFormValues {
//   displayName?: string = '';
//   bio: string = '';
//   joinDate?: Date = undefined;
//   joinAs: string = '';
//   batsman: string = '';
//   bowler: string = '';
//   other: string = '';
//   previousClubName: string = '';
  
//   constructor(init?: IProfileFormValues) {
//     if (init && init.joinDate) {
//       init.time = init.joinDate;
//     }
//     Object.assign(this, init);
//   }
// }
