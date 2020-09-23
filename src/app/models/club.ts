// import { IPlayerPhoto } from "./profile";

export interface IClubFormValues {
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

export interface IClubToReturn {
    username: string;
    clubname: string;
}
