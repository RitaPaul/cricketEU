import { IWicketFall } from "./compititor";

export interface ICompititorInning {
    inningId: string;
    battingId: string;
    batting: string;
    bowlingId: string;
    bowling: string;
    inningStart: boolean;
    inningOver: boolean;
    totalRuns: number;
    inningNumber: number;
    innings: IInning[];
}

export interface IInning {
    id: string;
    over: number;
    ball: number;
    facingBatsmanId: string;
    runOnBallsByFacingBatsman: string;
    nonFacingBatsmanId: string;
    runOnBallsByNonFacingBatsman: string;
    bowlerId: string;
    runsOnBall: number;
    totalRuns: number;
    createdAt: Date;
    isOver: boolean;    
    extra: IExtra;
    wicketFall: IWicketFall;
}

export interface IExtra {
    id: string;
    type: string;
    byPlayerId?: string;
}