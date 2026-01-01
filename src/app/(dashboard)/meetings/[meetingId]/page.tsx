import { auth } from "@/lib/auth";
import { MeetingIdView,MeetingsIdViewError, MeetingsIdViewLoading } from "@/module/meeting/ui/views/meetings-id-views";
import { MeetingsView } from "@/module/meeting/ui/views/meetings-views";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";


interface Props {
  params: Promise<{ meetingId: string }>;
}

const Page = async ({ params }: Props) => {
  // Await params since you mentioned it comes as a Promise
  const { meetingId } = await params;

  // Await headers as you specified
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    redirect("/sign-in");
  }

  const queryClient = getQueryClient();

  // Prefetch meeting data before rendering
  await queryClient.prefetchQuery(
    trpc.meetings.getOne.queryOptions({ id: meetingId })
  );

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<MeetingsIdViewLoading />}>
        <ErrorBoundary fallback={<MeetingsIdViewError />}>
          <MeetingIdView meetingId={meetingId} />
        </ErrorBoundary>
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
