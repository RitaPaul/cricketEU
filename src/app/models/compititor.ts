export interface ICompititorFormValues {
    CompititionId: string;
    compititors: ICompititorsFormValues[];
}

export interface ICompititorsFormValues {
    compititorClubId: string;
    compititorTeamId: string;
}

export interface IUpdatedCompititorFormValues {
    CompititionId: string;
    compititors: IUpdatedCompititorFormValues[];
}
export interface IUpdatedCompititorsFormValues {
    compititorId: string;
    compititorClubId: string;
    newCompititorClubId: string;
    compititorTeamId: string;
    newCompititorTeamId: string;
}

export interface ICompititor {
    compititorId: string;
    compititorClubId: string;
    compititorClubName: string;
    compititorteamId: string;
    compititorTeamName: string;
    players: IPlayer[];
    wicketFalls: IWicketFall[];
}

export interface IPlayer {
    playerId: string;
    playerDisplayName: string;
}

export interface IWicketFall {
    wicketNo: number;
    fallOn: number;
    outPlayerId: string;
    outType: string;
    outByPlayerId: string;
}