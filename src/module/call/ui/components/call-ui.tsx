import { useState } from "react";
import { StreamTheme, useCall, CallingState } from "@stream-io/video-react-sdk";
import { CallLobby } from "./call-lobby";
import { CallActive } from "./call-acive";
import { CallEnded } from "./call-ended";

interface Props {
    meetingId: string;
    meetingName: string;
}

export const CallUI = ({ meetingId, meetingName }: Props) => {
    const call = useCall();
    const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

    const [joining, setJoining] = useState(false);
    const [leaving, setLeaving] = useState(false);

    const handleJoin = async () => {
        if (!call) return;

        // If already joined or joining, avoid duplicate calls
        const state = call.state?.callingState;
        if (state === CallingState.JOINED || joining) {
            setShow("call");
            return;
        }

        setJoining(true);
        try {
            await call.join();
            setShow("call");
        } catch (err) {
            // If the SDK reports that join was already called, ignore
            // otherwise rethrow/log for debugging
            // eslint-disable-next-line no-console
            console.error("call.join() error:", err);
        } finally {
            setJoining(false);
        }
    };

    const handleLeave = async () => {
        if (!call || leaving) return;
        setLeaving(true);
        try {
            await call.leave();
        } catch (err) {
            // eslint-disable-next-line no-console
            console.error("call.leave() error:", err);
        } finally {
            setLeaving(false);
            setShow("ended");
        }
    };

    return (
        <StreamTheme className="h-full">
            {show === "lobby" && <CallLobby onJoin={handleJoin} isJoining={joining} />}
            {show === "call" && <CallActive onLeave={handleLeave} meetingName={meetingName} />}
            {show === "ended" && <CallEnded />}
        </StreamTheme>
    );
};
