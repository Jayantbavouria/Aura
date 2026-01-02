import {
    CircleXIcon,
    CircleCheckIcon,
    ClockArrowUpIcon,
    VideoIcon,
    LoaderIcon
} from "lucide-react";
import { CommandSelect } from "@/components/command-select";
import { MeetingStatus } from "../../types";
import { useMeetingsFilter } from "../../hooks/use-meetings-filter";

const options = [
    {
        id: MeetingStatus.upcoming,
        value: MeetingStatus.upcoming,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <ClockArrowUpIcon />
                {MeetingStatus.upcoming}
            </div>
        ),
    },
    {
        id: MeetingStatus.completed,
        value: MeetingStatus.completed,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleCheckIcon />
                {MeetingStatus.completed}
            </div>
        ),
    },
    {
        id: MeetingStatus.active,
        value: MeetingStatus.active,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <VideoIcon />
                {MeetingStatus.active}
            </div>
        ),
    },
    {
        id: MeetingStatus.processing,
        value: MeetingStatus.processing,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <LoaderIcon />
                {MeetingStatus.processing}
            </div>
        ),
    },
    {
        id: MeetingStatus.cancelled,
        value: MeetingStatus.cancelled,
        children: (
            <div className="flex items-center gap-x-2 capitalize">
                <CircleXIcon />
                {MeetingStatus.cancelled}
            </div>
        ),
    },
];

export const MeetingsStatusFilter = () => {
    const [filters, setFilters] = useMeetingsFilter();
    return (
        <CommandSelect
         placeholder="Status"
         className="h-9"
         options={options.map(opt => ({
            id: opt.id.toString(),
            value: opt.value.toString(),
            children: opt.children
         }))}
         onSelect={(value)=>setFilters({status:value as MeetingStatus})}
         value={filters.status || ""}/>
    );
};

