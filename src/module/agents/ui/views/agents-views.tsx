"use client";
import {useSuspenseQuery} from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client"; 
import { LoadingState } from "@/components/loading_state";
import { ErrorState } from "@/components/error_state";
import { DataTable } from "@/components/data-table";
import { columns} from "../components/columns";
import { EmptyState } from "@/components/empty-state";
import { useAgentsFilter } from "../../hooks/use-agents-filter";
import { DataPagination } from "../components/data-pagination";
import { useRouter } from "next/navigation";

 
export const AgentsView=()=> {
    const router=useRouter();
    const [filters,setFilters]=useAgentsFilter();

    const trpc =useTRPC();
    const {data}=useSuspenseQuery(trpc.agents.getMany.queryOptions({...filters}));

    return ( 
        <div className="flex-1 pb-4 px-4 md:px-8 flex flex-col gap-y-4" >
           <DataTable data={data.items} columns={columns} onRowClick={(row)=>router.push(`/agents/${row.id}`)} />
           <DataPagination 
           page={filters.page}
           totalPages={data.totalPages}
           onOpenChange={(page)=>setFilters({page})}
           />
           {data.items.length===0 && (<EmptyState  title="Create you first agent" description="create an agent to join your meetings.Each agent will follow your instructions and can interact with the participants during the call  "  />)}
        </div>
    );
};

export const AgentsViewLoading=()=>{
    return (
        <LoadingState title="Loading Agents" description="This may take a few seconds"/>
    );
};
export const AgentsViewError=()=>{
    return (
        <ErrorState title="Failed to load Agents" description="Something went wrong"/>
    );
};