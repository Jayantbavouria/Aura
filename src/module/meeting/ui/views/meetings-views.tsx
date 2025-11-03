"use client";

import { DataTable } from "@/components/data-table";
import { ErrorState } from "@/components/error_state";
import { LoadingState } from "@/components/loading_state";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { columns } from "../components/columns";
import { EmptyState } from "@/components/empty-state";

export const MeetingsView = () => {
  const trpc = useTRPC();
  const { data } = useSuspenseQuery(trpc.meetings.getMany.queryOptions({}));
  return (
    <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4">
      <DataTable data={data.items} columns={columns} />
      {data.items.length === 0 && (
        <EmptyState
          title="Create you first Meeting"
          description="schedule a meeting to get started. Meetings allow your agents to interact with participants during calls."
        />
      )}
    </div>
  );
};

export const meetingsViewLoading = () => {
  return (
    <LoadingState
      title="Loading Meetings"
      description="This may take a few seconds"
    />
  );
};
export const meetingsViewError = () => {
  return (
    <ErrorState
      title="Failed to load Meetings"
      description="Something went wrong"
    />
  );
};
