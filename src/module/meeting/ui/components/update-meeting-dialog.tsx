"use client";
import { ResponsiveDialog } from "@/components/responsive_dialog";
import { MeetingForm } from "./meeting-form";
import { useRouter } from "next/navigation";
import { MeetingGetOne } from "../../types";

interface UpdateMeetingDialogProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    initialValues:MeetingGetOne;
}

export const UpdateMeetingDialog = ({ isOpen, onOpenChange,initialValues }: UpdateMeetingDialogProps) => {

    return (
        <ResponsiveDialog title="Edit Meeting" description="Edit the meeting meeting details" open={isOpen} onOpenChange={onOpenChange}>
            <MeetingForm
                onSuccess={() => {
                    onOpenChange(false);
                   
                }}
                onCancel={() => onOpenChange(false)}
                initialValues={initialValues}
            />
        </ResponsiveDialog>
    );
};