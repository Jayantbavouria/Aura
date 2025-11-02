"use client";

import { ErrorState } from "@/components/error_state";
import { LoadingState } from "@/components/loading_state";
import { useTRPC } from "@/trpc/client";
import {  useSuspenseQuery } from "@tanstack/react-query";

export const MeetingsView = () => {
    const trpc=useTRPC();
    const {data}=useSuspenseQuery( trpc.meetings.getMany.queryOptions({}) );
    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}

export const meetingsViewLoading=()=>{
    return (
        <LoadingState title="Loading Meetings" description="This may take a few seconds"/>
    );
};
export const meetingsViewError=()=>{
    return (
        <ErrorState title="Failed to load Meetings" description="Something went wrong"/>
    );
};