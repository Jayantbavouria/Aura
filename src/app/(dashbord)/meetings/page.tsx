import { auth } from "@/lib/auth";
import { MeetingsListHeader } from "@/module/meeting/ui/components/meetings-list-header";
import { MeetingsView, meetingsViewLoading, meetingsViewError } from "@/module/meeting/ui/views/meetings-views";
import { trpc, getQueryClient } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

const MeetingsViewLoading = meetingsViewLoading;
const MeetingsViewError = meetingsViewError;

const Page = async () => {

     const session = await auth.api.getSession({
        headers: await headers(),
      });
      
      if (!session) {
        redirect("/auth/sign-in");
      }
    const queryClient = getQueryClient();
    await queryClient.prefetchQuery(trpc.meetings.getMany.queryOptions({}));

    return (
        <>
        <MeetingsListHeader/>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<MeetingsViewLoading/>}>
                <ErrorBoundary fallback={<MeetingsViewError/>}>
                    <MeetingsView />
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
        </>
    );
};

export default Page;