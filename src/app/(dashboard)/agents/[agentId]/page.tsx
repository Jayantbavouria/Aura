import { AgentIdView, AgentsIdViewLoading,AgentsIdViewError } from "@/module/agents/ui/views/agent-id-view";
import { trpc,getQueryClient } from "@/trpc/server";
import { HydrationBoundary,dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";

interface Props{
    params:Promise<{agentId:string}>
};

const Page=async({params}:Props)=>{
const {agentId}=await params;
const queryClient=getQueryClient();
void queryClient.prefetchQuery(
    trpc.agents.getOne.queryOptions({id:agentId}),

);

 return (
        <HydrationBoundary state={dehydrate(queryClient)}>
            <Suspense fallback={<AgentsIdViewLoading/>} >
                <ErrorBoundary fallback={<AgentsIdViewError/>}>
                        <AgentIdView agentId={agentId}/>
                </ErrorBoundary>
            </Suspense>
        </HydrationBoundary>
 );

};

export default Page;