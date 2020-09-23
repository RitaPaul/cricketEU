export interface IUser {
    username: string;
    displayName: string;
    token: string;
    refreshToken: string;
    image?: string;
    approved: boolean;
    club: IClub;
}

export interface IUserFormValues {
    currentClubName: string;
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}

export interface IClub {
    clubname: string;
    id: string;
}