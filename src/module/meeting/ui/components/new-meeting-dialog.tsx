"use client";
import { ResponsiveDialog } from "@/components/responsive_dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";

interface NewMeetingDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

export const NewMeetingDialog = ({ isOpen, onOpenChange }: NewMeetingDialogProps) => {
    const router = useRouter();
    return (
        <ResponsiveDialog title="New Meeting" description="Create a new meeting" open={isOpen} onOpenChange={onOpenChange}>
            <MeetingForm
                onSuccess={(id?: string) => {
                    onOpenChange(false);
                    if (id) router.push(`/meetings/${id}`);
                }}
                onCancel={() => onOpenChange(false)}
            />
        </ResponsiveDialog>
    );
};