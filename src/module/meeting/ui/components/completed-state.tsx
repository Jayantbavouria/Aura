import { MeetingGetOne } from "../../types";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import Markdown from "react-markdown";
import Link from "next/link";
import { GeneratedAvatar } from "@/components/generated-avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
    BookOpenTextIcon,
    SparklesIcon,
    FileTextIcon,
    FileVideoIcon,
    CalendarIcon,
    CheckCircle2,
} from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Transcript } from "./transcript";
import { ChatProvider } from "./chat-provider";

interface Props {
    data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
    return (
        <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full pb-10">
            {/* Header Section */}
            <div className="flex flex-col gap-4 border-b pb-6">
                <div className="flex items-start justify-between">
                    <div className="space-y-1">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                            {data.name}
                        </h1>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <CalendarIcon className="size-4" />
                                {data.createdAt ? format(data.createdAt, "PPP p") : ""}
                            </div>
                            <div className="h-4 w-px bg-gray-200" />
                            <Link
                                href={`/agents/${data.agent.id}`}
                                className="flex items-center gap-1.5 hover:text-blue-600 transition-colors"
                            >
                                <GeneratedAvatar
                                    variant="botttsNeutral"
                                    seed={data.agent.name}
                                    className="size-5"
                                />
                                <span className="font-medium text-gray-700 capitalize">
                                    {data.agent.name}
                                </span>
                            </Link>
                        </div>
                    </div>
                    <Badge
                        variant="outline"
                        className="bg-emerald-50 text-emerald-700 border-emerald-200 gap-1.5 px-3 py-1"
                    >
                        <CheckCircle2 className="size-3.5" />
                        Completed
                    </Badge>
                </div>
            </div>

            <Tabs defaultValue="summary" className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <TabsList className="bg-gray-100/50 p-1 border h-auto rounded-xl">
                        <TabsTrigger
                            value="summary"
                            className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 transition-all"
                        >
                            <BookOpenTextIcon className="size-4" />
                            Summary
                        </TabsTrigger>
                        <TabsTrigger
                            value="transcript"
                            className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 transition-all"
                        >
                            <FileTextIcon className="size-4" />
                            Transcript
                        </TabsTrigger>
                        <TabsTrigger
                            value="recording"
                            className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-blue-600 transition-all"
                        >
                            <FileVideoIcon className="size-4" />
                            Recording
                        </TabsTrigger>
                        <TabsTrigger
                            value="chat"
                            className="gap-2 px-4 py-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-purple-600 transition-all"
                        >
                            <SparklesIcon className="size-4" />
                            Ask AI
                        </TabsTrigger>
                    </TabsList>
                </div>

                {/* Content Area with Cards */}
                <div className="bg-white rounded-2xl border shadow-sm min-h-[500px]">
                    <TabsContent value="summary" className="m-0 p-0">
                        <ScrollArea className="h-[600px] w-full rounded-2xl">
                            <div className="p-8 max-w-3xl mx-auto">
                                <div className="flex items-center gap-3 mb-8 pb-4 border-b">
                                    <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                                        <SparklesIcon className="size-5" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-lg">Meeting Summary</h3>
                                        <p className="text-sm text-muted-foreground">
                                            AI-generated overview and key takeaways
                                        </p>
                                    </div>
                                </div>
                                <div className="prose prose-slate prose-headings:font-semibold prose-a:text-blue-600 max-w-none">
                                    <Markdown
                                        components={{
                                            h1: ({ node, ...props }) => (
                                                <h2 {...props} className="text-2xl font-bold mt-8 mb-4 tracking-tight" />
                                            ),
                                            h2: ({ node, ...props }) => (
                                                <h3 {...props} className="text-xl font-semibold mt-8 mb-4 text-gray-800" />
                                            ),
                                            h3: ({ node, ...props }) => (
                                                <h4 {...props} className="text-lg font-semibold mt-6 mb-3 text-gray-800" />
                                            ),
                                            ul: ({ node, ...props }) => (
                                                <ul {...props} className="list-disc list-outside ml-6 space-y-2 mb-6 text-gray-600" />
                                            ),
                                            ol: ({ node, ...props }) => (
                                                <ol {...props} className="list-decimal list-outside ml-6 space-y-2 mb-6 text-gray-600" />
                                            ),
                                            p: ({ node, ...props }) => (
                                                <p {...props} className="leading-relaxed mb-6 text-gray-600" />
                                            ),
                                            li: ({ node, ...props }) => (
                                                <li {...props} className="pl-1" />
                                            ),
                                            strong: ({ node, ...props }) => (
                                                <strong {...props} className="font-semibold text-gray-900" />
                                            ),
                                            blockquote: ({ node, ...props }) => (
                                                <blockquote {...props} className="border-l-4 border-blue-200 pl-4 py-1 my-6 italic text-gray-700 bg-blue-50/50 rounded-r-lg" />
                                            ),
                                        }}
                                    >
                                        {data.summary || ""}
                                    </Markdown>
                                </div>
                            </div>
                        </ScrollArea>
                    </TabsContent>

                    <TabsContent value="transcript" className="m-0 h-[600px]">
                        <Transcript meetingId={data.id} />
                    </TabsContent>

                    <TabsContent value="recording" className="m-0 p-8 h-[600px] flex items-center justify-center bg-gray-50/50 rounded-2xl">
                        <div className="w-full max-w-4xl bg-black rounded-xl overflow-hidden shadow-lg border border-gray-800">
                            {data.recordingUrl ? (
                                <video
                                    src={data.recordingUrl}
                                    className="w-full aspect-video"
                                    controls
                                    playsInline
                                />
                            ) : (
                                <div className="aspect-video flex items-center justify-center text-gray-400">
                                    <p>No recording available</p>
                                </div>
                            )}

                        </div>
                    </TabsContent>

                    <TabsContent value="chat" className="m-0 h-[600px] border-none">
                        <ChatProvider meetingId={data.id} meetingName={data.name} />
                    </TabsContent>
                </div>
            </Tabs>
        </div>
    );
};