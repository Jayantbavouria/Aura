"use client";
import { ResponsiveDialog } from "@/components/responsive_dialog";
import { AgentForm } from "./agent-form";

interface NewAgentDialogProps{
    isOpen:boolean;
    onOpenChange:(open:boolean)=>void;
}
export const NewAgentDialog=({isOpen,onOpenChange}:NewAgentDialogProps)=>{
    return(
        <ResponsiveDialog title="New Agent" description="Create a new agent" open={isOpen} onOpenChange={onOpenChange}>
            <AgentForm
                onSuccess={()=> onOpenChange(false)}  
                onCancel={()=> onOpenChange(false)}
            />
        </ResponsiveDialog>
        )
}