"use client";

import {
  Call,
  CallingState,
  StreamCall,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";
import { CallUI } from "./call-ui";
import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
  meetingId: string;
  meetingName: string;
  userId: string;
  userName: string;
  userImage: string;
}

export const CallConnect = ({
  meetingId,
  meetingName,
  userId,
  userName,
  userImage,
}: Props) => {
  const trpc = useTRPC();

  const { mutateAsync: generateToken } = useMutation(
    trpc.meetings.generateToken.mutationOptions()
  );

  const [client, setClient] = useState<StreamVideoClient>();
  const [clientError, setClientError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const init = async () => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY ?? process.env.NEXT_PUBLIC_KEY_STREAM_VIDEO_API_KEY;
        if (!apiKey) throw new Error("Stream API key not found. Set NEXT_PUBLIC_STREAM_VIDEO_API_KEY in env.");

        const _client = new StreamVideoClient({
          apiKey,
          user: {
            id: userId,
            name: userName,
            image: userImage,
          },
          tokenProvider: async () => {
            try {
              // wrap mutateAsync to avoid forwarding unexpected args from the SDK
              const token = await generateToken();
              return token;
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error("generateToken error:", err);
              throw err;
            }
          },
        });

        if (isMounted) {
          setClient(_client);
        }
      } catch (err: unknown) {
        // capture errors during client initialization
        // eslint-disable-next-line no-console
        console.error("StreamVideoClient init error:", err);
        setClientError(err instanceof Error ? err.message : String(err));
      }
    };

    init();

    return () => {
      isMounted = false;
    };
  }, [userId, userName, userImage, generateToken]);

  const [call, setCall] = useState<Call>();

  useEffect(() => {
    if (!client) return;

    const _call = client.call("default", meetingId);

    _call.camera.disable();
    _call.microphone.disable();

    setCall(_call);

    return () => {
      if (_call.state.callingState !== CallingState.LEFT) {
        _call.leave();
        _call.endCall();
      }
      setCall(undefined);
    };
  }, [client, meetingId]);

  if (!client || !call) {
    return (
      <div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
        <LoaderIcon className="animate-spin size-6 text-white" />
      </div>
    );
  }

  if (clientError) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center text-white">
          <h4 className="text-lg font-medium">Connection error</h4>
          <p className="text-sm">{clientError}</p>
        </div>
      </div>
    );
  }

  return (
    <StreamVideo client={client}>
      <StreamCall call={call}>
        <CallUI meetingId={meetingId} meetingName={meetingName} />
      </StreamCall>
    </StreamVideo>
  );
};
