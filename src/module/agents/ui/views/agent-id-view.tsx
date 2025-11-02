"use client";
import { ErrorState } from "@/components/error_state";
import { LoadingState } from "@/components/loading_state";
import { useTRPC } from "@/trpc/client";
import {
  useMutation,
  useQueryClient,
  useSuspenseQuery,
} from "@tanstack/react-query";
import { AgentIdViewHeader } from "../components/agent-id-view-header";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { VideoIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // ✅ Make sure toast is imported
import { useConfirm } from "@/hooks/use-confirm";
import { useState } from "react";
import { UpdateAgentDialog } from "../components/update-agent-dialog";

interface Props {
  agentId: string;
}

export const AgentIdView = ({ agentId }: Props) => {
  const trpc = useTRPC();
  const router = useRouter();
  const queryClient = useQueryClient();
  const [updateAgentDiaglogOpen,setUpdateAgentDialogOpen] =useState(false);
  const { data } = useSuspenseQuery(
    trpc.agents.getOne.queryOptions({ id: agentId })
  );

  const removeAgent = useMutation(
    trpc.agents.remove.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(
          trpc.agents.getMany.queryOptions({})
        );
        router.push("/agents");
        toast.success("Agent removed successfully");
      },
      onError: (error: any) => {
        toast.error(error.message);
      },
    })
  );

  const [RemoveConfirmation,confirmRemove]=useConfirm(
    "Are you sure ",
    `Following action will remove agent ${data.meetingCount} permanently. This action cannot be undone.`
  )
  const handleRemoveAgent = async () => {
    const ok = await confirmRemove();
    if (!ok) {
      return;
    }
    await removeAgent.mutateAsync({id: agentId});
  }

  return (
    <>
    <RemoveConfirmation/>
    <UpdateAgentDialog
    open={updateAgentDiaglogOpen}
    onOpenChange={setUpdateAgentDialogOpen}
    initialValues={data}
    />
    <div className="flex-1 py-4 px-4 md:px-8 flex flex-col gap-y-4">
      <AgentIdViewHeader
        agentId={agentId}
        agentName={data.name}
        onEdit={() =>setUpdateAgentDialogOpen(true)}
        onRemove={handleRemoveAgent}
      />
      <div className="bg-white rounded-lg border">
        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5">
          <div className="flex items-center gap-x-3">
            <GeneratedAvatar
              variant="botttsNeutral"
              seed={data.name}
              className="size-10" // ✅ Fixed typo: sizee-10 → size-10
            />
            <h2 className="text-2xl font-medium">{data.name}</h2>
          </div>
          <Badge
            variant="outline"
            className="flex items-center gap-x-2 [&>svg]:size-4"
          >
            <VideoIcon className="text-blue-700" /> {/* ✅ Fixed = to - */}
            {data.meetingCount}{" "}
            {data.meetingCount === 1 ? "Meeting" : "Meetings"}
          </Badge>
          <div className="flex flex-col gap-y-4">
            <p className="font-medium text-lg">Instructions</p>
            <p className="text-neutral-800">{data.instructions}</p>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export const AgentsIdViewLoading = () => {
  return (
    <LoadingState
      title="Loading Agents"
      description="This may take a few seconds"
    />
  );
};

export const AgentsIdViewError = () => {
  return (
    <ErrorState
      title="Failed to load Agents"
      description="Something went wrong"
    />
  );
};
