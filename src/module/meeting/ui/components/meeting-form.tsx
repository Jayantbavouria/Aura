"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { MeetingGetOne } from "../../types";
import { useTRPC } from "@/trpc/client";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { GeneratedAvatar } from "@/components/generated-avatar";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormControl,
  FormDescription,
} from "@/components/ui/form";
import { toast } from "sonner";
import { meetingsInsertSchema } from "../../server/schema";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { CommandSelect } from "@/components/command-select";
import { NewAgentDialog } from "@/module/agents/ui/components/new-agent-dialog";

interface MeetingFormProps {
  onSuccess?: (id?: string) => void;
  onCancel?: () => void;
  initialValues?: MeetingGetOne;
}

export const MeetingForm = ({ onSuccess, onCancel, initialValues }: MeetingFormProps) => {
  const trpc = useTRPC();
  const queryClient = useQueryClient();
  const [agentSearch, setAgentSearch] = useState("");
  const [openNewAgenstDialog, setOpenNewAgentDialog] = useState(false);

  // Query agents list driven by the search string using the queryOptions
  // helper from TRPC. This keeps the same query key shape used elsewhere
  // and lets react-query manage caching and refetching.
  const agent = useQuery(
    trpc.agents.getMany.queryOptions({ pageSize: 100, search: agentSearch })
  );
  const createMeeting = useMutation(
    trpc.meetings.create.mutationOptions({
      onSuccess: async (data) => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        onSuccess?.(data.id);
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const updateMeeting = useMutation(
    trpc.meetings.update.mutationOptions({
      onSuccess: async () => {
        await queryClient.invalidateQueries(trpc.meetings.getMany.queryOptions({}));
        if (initialValues?.id) {
          await queryClient.invalidateQueries(trpc.meetings.getOne.queryOptions({ id: initialValues.id }));
          onSuccess?.();
        }
      },
      onError: (error) => {
        toast.error(error.message);
      },
    })
  );

  const form = useForm<z.infer<typeof meetingsInsertSchema>>({
    resolver: zodResolver(meetingsInsertSchema),
    defaultValues: {
      name: initialValues?.name ?? "",
      agentId: initialValues?.agentId ?? "",
      scheduledAt: initialValues?.scheduledAt ? new Date(initialValues.scheduledAt).toISOString().slice(0, 16) : new Date().toISOString().slice(0, 16),
    },
  });

  const isEdit = !!initialValues?.id;
  const isPending = createMeeting.isPending || updateMeeting.isPending;

  const onSubmit = (values: z.infer<typeof meetingsInsertSchema>) => {
    if (isEdit) {
      updateMeeting.mutate({ ...values, id: initialValues!.id });
    } else {
      createMeeting.mutate(values);
    }
  };

  return (<>
    <NewAgentDialog isOpen={openNewAgenstDialog} onOpenChange={setOpenNewAgentDialog} />
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>

        <FormField
          name="name"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} placeholder="e.g. Interviewer" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          name="agentId"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Agent</FormLabel>
              <FormControl>
                <CommandSelect
                  options={(agent.data?.items ?? []).map((agent) => ({
                    id: agent.id,
                    value: agent.id,
                    children: (
                      <div className="flex items-center gap-x-2">
                        <GeneratedAvatar
                          variant="botttsNeutral"
                          seed={agent.name}
                          className="border size-6" />
                        <span>{agent.name}</span>
                      </div>
                    )
                  }))}
                  onSelect={field.onChange}
                  onSearch={setAgentSearch}
                  value={field.value}
                  placeholder="SelecT an agent"
                />
              </FormControl>
              {/* Debug helpers: show current search and number of results. Remove in prod. */}
              <div className="mt-2 text-xs text-muted-foreground">
                <div>debug: search=&quot;{agentSearch}&quot;</div>
                <div>debug: results={agent.data?.items?.length ?? 0}</div>
                {agent.isFetching && <div>debug: fetching...</div>}
                {agent.isError && <div className="text-destructive">debug: error fetching agents</div>}
              </div>
              <FormDescription>
                Not found you&apos;re looking for?
                <button type="button" className="text-primary hover:underline" onClick={() => setOpenNewAgentDialog(true)}>
                  Create a new agent
                </button>
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between gap-x-2">
          {onCancel && (
            <Button variant="ghost" disabled={isPending} type="button" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button disabled={isPending} type="submit">
            {isEdit ? "Update Meeting" : "Create Meeting"}
          </Button>
        </div>
      </form>
    </Form>
  </>
  );
};
