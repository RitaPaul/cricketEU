export interface IActivitiesEnvelope {
  activities: IActivity[];
  activityCount: number;
}

export interface IActivity {
  id: string;
  title: string;
  description: string;
  vsTeam: string;
  date: Date;
  street: string;
  pincode: string;
  city: string;  
  isGoing: boolean;
  isHost: boolean;
  attendees: IAttendee[];
  comments: IComment[];
}

export interface IComment {
  id: string;
  createdAt: Date;
  body: string;
  username: string;
  displayName: string;
  image: string;
}

export interface IActivityFormValues extends Partial<IActivity> {
  time?: Date;
}

export class ActivityFormValues implements IActivityFormValues {
  id?: string = undefined;
  title: string = '';
  vsTeam: string = '';
  description: string = '';
  pincode: string = '';
  street: string = '';
  date?: Date = undefined;
  time?: Date = undefined;
  city: string = '';

  constructor(init?: IActivityFormValues) {
    if (init && init.date) {
      init.time = init.date;
    }
    Object.assign(this, init);
  }
}

export interface IAttendee {
  username: string;
  displayName: string;
  image: string;
  isHost: boolean;
  following?: boolean;
}