import { MeetingsView, meetingsViewLoading, meetingsViewError } from "@/module/meeting/ui/views/meetings-views";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MeetingsViewLoading = meetingsViewLoading;
const MeetingsViewError = meetingsViewError;

const Page = async () => {
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

    return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsViewLoading/>}>
                <ErrorBoundary fallback={<MeetingsViewError/>}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
    );
};

export default Page;