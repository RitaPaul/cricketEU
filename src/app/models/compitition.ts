import { ICompititor } from "./compititor";
import { ICompititorInning } from "./compititorInning";

export interface ICompititionFormValues {
    userId: string;
    country: string;
    dayOn: Date;
    startTime: Date;
    endTime: Date;
    overs: number;
    balls: number;
  }

  export interface ICompitition {
    compititionId: string;
    createdBy: string;
    createdById: string;
    createdAt: Date;
    country: string;
    dayOn: Date;
    startTime: Date;
    endTime: Date;
    customOvers: number;
    customBalls: number;
    start: boolean;
    compititors: ICompititor[];
    toss: IToss;
    compititorInnings: ICompititorInning[];
    result: IResult;
  }

  export interface IToss {
      id: string;
      tossWinnerName: string;
      decision: string;
      battingFirstCompititorId: string;
      battingFirstName: string;
      winnerTeamComment: string;
      losserteamComment: string;
  }

  export interface IResult {
      id: string;
      matchWinnerId: string;
      matchLosserId: string;
      noResult: boolean;
      noResultReason: string;
      matchAbandent: boolean;
      matchAbandentReason: string;
      tie: boolean;
      comment: string;
  }
