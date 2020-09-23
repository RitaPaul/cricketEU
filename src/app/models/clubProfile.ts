import { IPlayerPhoto } from "./profile";

export interface IClubProfileEnvelope {
  clubProfiles: IClubProfiles[];
  clubCount: number;
}

export interface IClubProfileFormValues {
  id: string;
  clubname: string;
  displayname: string;
  type: string;
  country: string;
  street: string;
  city: string;
  pincode: string;
  originAt: Date;
}

export interface IClubProfile {
  id: string;
  username: string;
  clubname: string;
  displayname: string;
  clubBio: string;
  clubImage: string;
  type: string;
  country: string;
  street: string;
  city: string;
  pincode: string;
  originAt: Date;
  clubFollowersCount: number;
  clubMembersCount: number;
  following: boolean;
  member: boolean;
  clubAdmin: boolean;
  clubPhotos: IPlayerPhoto[];
  teams: ITeams[];
}

//In ClubProfiles 'approved' is not concerned with club, but it is concerned with user itself
// user have approved ID or not
// 'member' "if true" is concerned with user is member of club else waiting for approval
export interface IClubProfiles {
  id: string;
  clubname: string;
  displayname: string;
  clubImage: string;
  type: string;
  clubFollowersCount: number;
  clubMembersCount: number;
  approved: boolean;
  following: boolean;
  member: boolean;
  clubAdmin: boolean;
  clubCount: number;
}

export interface IClubApproved {
  clubId: string;
  id: string;
}

export interface ITeams {
  clubId: string;
  id: string;
  teamname: string;
}

export interface ITeamFormValues extends Partial<ITeams> {}

export class TeamFormValues implements ITeamFormValues {
  clubId?: string = undefined;
  teamId?: string = undefined;
  teamname: string = "";
  constructor(init?: ITeams) {
    Object.assign(this, init);
  }
}

export interface ITeamPlayer {
  playerId: string;
  clubId: string;
  teamId: string;
}
