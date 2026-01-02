import {inferRouterOutputs} from '@trpc/server';

import type {AppRouter} from '@/trpc/routers/_app';

export type MeetingGetMany=inferRouterOutputs<AppRouter>['meetings']["getMany"]['items']; ; 

export type MeetingGetOne=inferRouterOutputs<AppRouter>['meetings']["getOne"]; 
export enum MeetingStatus{
    upcoming = 'upcoming',
    active = 'active',
    completed = 'completed',
    cancelled = 'cancelled',
    processing = 'processing',
};

export type StreamTranscriptItem={
    speaker_id:string;
    type:string;
    text:string;
    start_ts:number;
    end_ts:number;
};
    