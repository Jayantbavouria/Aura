import { LogInIcon } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { generateAvatarUri } from "@/lib/avatar";
import {
  DefaultVideoPlaceholder,
  StreamVideoParticipant,
  ToggleAudioPreviewButton,
  ToggleVideoPreviewButton,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import "@stream-io/video-react-sdk/dist/css/styles.css";

interface Props {
  onJoin: () => void;
  isJoining?: boolean;
}
  const DisabledVideoPreview = () => {
    const { data } = authClient.useSession();
    return (
      <DefaultVideoPlaceholder
        participant={
          ({
            name: data?.user.name ?? "",
            image:
              data?.user.image ??
              generateAvatarUri({
                seed: data?.user.name ?? "",
                variant: "initials",
              }),
          } as StreamVideoParticipant)
        }
      />
    );
  };
      
const AllowBrowerPermissions = () => {
    return (
        <p>
            Please allow camera and microphone permissions in your browser
        </p>
    );
};
export const CallLobby = ({ onJoin, isJoining }: Props) => {
  const { useCameraState, useMicrophoneState } = useCallStateHooks();
  const { hasBrowserPermission: hasMicPermission } = useMicrophoneState();
  const { hasBrowserPermission: hasCameraPermission } = useCameraState();
  const hasBrowserMediaPermissions = hasMicPermission && hasCameraPermission;

  return (
    <div className="flex h-full flex-col items-center justify-center gap-6 bg-radial from-sidebar-accent to-sidebar ">
      <div className="py-4 px-8 flex flex-1 items-center justify-center ">
        <div className="flex flex-col items-center gap-6 justify-center bg-background rounded-lg p-10 shadow-sm">
          <div className="flex flex-col text-center gap-y-2">
            <h6 className="text-lg font-medium">Ready to join ?</h6>
            <p className="text-sm">Set up your call before joining</p>
          </div>
          <VideoPreview
            DisabledVideoPreview={
                hasBrowserMediaPermissions ? DisabledVideoPreview :AllowBrowerPermissions
            }
          />
          <div className="flex gap-x-2" >
            <ToggleAudioPreviewButton />
            <ToggleVideoPreviewButton />

          </div>
          <div  className="flex gap-x-2 justify-between w-full  " >
                <Button variant="ghost" asChild>
                    <Link href="/meetings">
                    Cancel
                    </Link>
                </Button>
                <Button onClick={onJoin} disabled={isJoining}>
                  <LogInIcon className="size-4 mr-2"/>
                  {isJoining ? "Joining..." : "Join call"}
                </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
