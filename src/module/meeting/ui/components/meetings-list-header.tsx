"use client";

import { Button } from "@/components/ui/button";
import { PlusIcon, XCircleIcon } from "lucide-react";
import { NewMeetingDialog } from "./new-meeting-dialog"; // fixed typo: NewMeetingtDialog → NewMeetingDialog
import { useState } from "react";
import { MeetingsSearchFilter } from "./meetings-search-filter";
import { MeetingsStatusFilter } from "./status-filter";
import { AgentsIdFilter } from "./agent-id-filter";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"; 
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";

export const MeetingsListHeader = () => {
  const [filters, setFilters] = useMeetingsFilter();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const asAnyFilterModified =
  !!filters.search || !!filters.status || !!filters.agentId;

  const onClearAllFilters = () => {
    setFilters({
      search: "",
      status: null,
      agentId: "",
      page: 1, 
    });
  }

  return (
    <>
      <NewMeetingDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />

      <div className="py-4 px-4 md:px-8 flex flex-col gap-y-4">
        <div className="flex items-center justify-between">
          <h5 className="font-medium text-xl">My Meetings</h5>
          <Button onClick={() => setIsDialogOpen(true)}>
            <PlusIcon className="mr-2 h-4 w-4" />
            New Meeting
          </Button>
        </div>
        <ScrollArea>
        <div className="flex items-center gap-x-2 p-1">
        <MeetingsSearchFilter />
          <MeetingsStatusFilter /> 
          <AgentsIdFilter />
          {asAnyFilterModified && (
            <Button  
            variant="outline" onClick={onClearAllFilters}>
              <XCircleIcon className="size-4" />
              Clear
            </Button>
          )}
        </div>
        <ScrollBar orientation="horizontal" />  
        </ScrollArea>
      </div>
    </>
  );
};


