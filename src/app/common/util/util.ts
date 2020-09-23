import { IActivity, IAttendee } from "../../models/activity";
import { IUser } from "../../models/user";
import { IPlayerProfile } from "../../models/profile";
import { IClubProfile} from "../../models/clubProfile";

export const combineDateAndTime = (date: Date, time: Date) => {
    const dateString = date.toISOString().split('T')[0];
    const timeString = time.toISOString().split('T')[1];

    return new Date(dateString + 'T' + timeString);
}

export const setActivityProps = (activity: IActivity, user: IUser) => {
    activity.date = new Date(activity.date);
    activity.isGoing = activity.attendees.some(
      a => a.username === user.username
    )
    activity.isHost = activity.attendees.some(
      a => a.username === user.username && a.isHost
    )
    return activity;
}

export const setUserProfileJoinDate = (profile: IPlayerProfile) => {
  profile.joinDate = new Date(profile.joinDate); 
  return profile;
}

export const setClubOriginDate = (clubProfile: IClubProfile) => {
  clubProfile.originAt = new Date(clubProfile.originAt); 
  return clubProfile;
}

export const createAttendee = (user: IUser): IAttendee => {
    return {
        displayName: user.displayName,
        isHost: false,
        username: user.username,
        image: user.image!
    }
}