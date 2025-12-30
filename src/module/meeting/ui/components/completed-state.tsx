import { MeetingGetOne } from "../../types"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import Markdown from "react-markdown"
import Link from "next/link"
import { GeneratedAvatar } from "@/components/generated-avatar"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import {
    BookOpenTextIcon,
    SparklesIcon,
    FileTextIcon,
    FileVideoIcon,
    ClockFadingIcon,


} from "lucide-react";
import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { formatDuration } from "@/lib/utils"
import { Transcript } from "./transcript"
import { ChatProvider } from "./chat-provider"

interface Props {
    data: MeetingGetOne;
}

export const CompletedState = ({ data }: Props) => {
    return (
        <div className="flex flex-col gap-y-4" >
            <Tabs defaultValue="summary">
                <div className="bg-white rounded-lg border px-3" >
                    <ScrollArea>
                        <TabsList className="p-0 bg-background justify-start rounded-none h-13" >
                            <TabsTrigger value="summary"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shawdow-none
                            border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground
                            h-full hover:text-accent-foreground"
                            >
                                <BookOpenTextIcon />
                                summary
                            </TabsTrigger>
                            <TabsTrigger value="transcript"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shawdow-none
                            border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground
                            h-full hover:text-accent-foreground"
                            >
                                <FileTextIcon />
                                Transcript
                            </TabsTrigger>
                            <TabsTrigger value="recording"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shawdow-none
                            border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground
                            h-full hover:text-accent-foreground"
                            >
                                <FileVideoIcon />
                                Recording
                            </TabsTrigger>
                            <TabsTrigger value="chat"
                                className="text-muted-foreground rounded-none bg-background data-[state=active]:shawdow-none
                            border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground
                            h-full hover:text-accent-foreground"
                            >
                                <SparklesIcon />
                                Ask Ai
                            </TabsTrigger>
                        </TabsList>
                        <ScrollBar orientation="horizontal" />
                    </ScrollArea>
                </div>
                <TabsContent value="chat" >
                    <ChatProvider meetingId={data.id} meetingName={data.name} />
                </TabsContent>
                <TabsContent value="transcript" >
                    <Transcript meetingId={data.id} />
                </TabsContent>
                <TabsContent value="recording" className="outline-none">
                    <div className="bg-white rounded-lg border px-4 and py-5" >
                        <video
                            src={data.recordingUrl!}
                            className="w-full rounded-lg"
                            controls
                        />
                    </div>
                </TabsContent>
                <TabsContent value="summary">
                    <div className="bg-white rounded-lg border" >
                        <div className="px-4 py-5 gap-y-5 flex flex-col col-span-5" >
                            <h2 className="text-2xl font-medium capitalize" >{data.name}</h2>
                            <div className="flex gap-x-2 items-center" >
                                <Link
                                    href={`/agents/${data.agent.id}`}
                                    className="flex items-center gap-x-2 underline underline-offset-4 capitalize"
                                >
                                    <GeneratedAvatar
                                        variant="botttsNeutral"
                                        seed={data.agent.name}
                                        className="size-5"
                                    />
                                    {data.agent.name}
                                </Link>{" "}
                                <p> {data.createdAt ? format(data.createdAt, "PPP") : ""} </p>
                            </div>
                            <div className="flex gap-x-2 items-center" >
                                <SparklesIcon className="size-4" />
                                <p>General summary</p>
                            </div>
                            <Badge
                                variant="outline"
                                className="flex items-center gap-x-2 [&svg]:size-4 "
                            >
                                <ClockFadingIcon className="text-blue-700" />
                                {data.duration ? formatDuration(data.duration) : "No duration"}
                            </Badge>
                            <div>
                                <Markdown components={{
                                    h1: (props) => (<h1 {...props} className="text-2xl font-medium mb-6" />),
                                    h2: (props) => (<h1 {...props} className="text-xl font-medium mb-6" />),
                                    h3: (props) => (<h1 {...props} className="text-lg font-medium mb-6" />),
                                    h4: (props) => (<h1 {...props} className="text-base font-medium mb-6" />),
                                    p: (props) => (<p {...props} className="mb-6 leading-relaxed" />),
                                    ul: (props) => (<ul {...props} className="mb-6 list-disc list-inside" />),
                                    ol: (props) => (<ol {...props} className="mb-6 list-decimal list-inside" />),
                                    li: (props) => (<li {...props} className="mb-1" />),
                                    strong: (props) => (<strong {...props} className="font-semibold" />),
                                    code: (props) => (<code {...props} className="bg-gray-100 px-1 py-0.5 rounded" />),
                                    blockquote: (props) => (<blockquote {...props} className="border-l-4 pl-4 italic my-4" />),
                                }} >
                                    {data.summary}
                                </Markdown>
                            </div>
                        </div>

                    </div>

                </TabsContent>
            </Tabs>

        </div>
    );
};