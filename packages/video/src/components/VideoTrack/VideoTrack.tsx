/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable react/require-default-props */

import {styled} from "@material-ui/core/styles";
import React, {useRef, useEffect} from "react";
import {Track} from "twilio-video";

import useMediaStreamTrack from "@sentrei/video/hooks/useMediaStreamTrack";
import {IVideoTrack} from "@sentrei/video/types";

const Video = styled("video")({
  width: "100%",
  maxHeight: "100%",
  objectFit: "contain",
});

interface VideoTrackProps {
  track: IVideoTrack;
  isLocal?: boolean;
  priority?: Track.Priority | null;
}

export default function VideoTrack({
  track,
  isLocal,
  priority,
}: VideoTrackProps): JSX.Element {
  const ref = useRef<HTMLVideoElement>(null!);
  const mediaStreamTrack = useMediaStreamTrack(track);

  useEffect(() => {
    const el = ref.current;
    el.muted = true;
    if (track.setPriority && priority) {
      track.setPriority(priority);
    }
    track.attach(el);
    return (): void => {
      track.detach(el);
      if (track.setPriority && priority) {
        // Passing `null` to setPriority will set the track's priority to that which it was published with.
        track.setPriority(null);
      }
    };
  }, [track, priority]);

  // The local video track is mirrored if it is not facing the environment.
  const isFrontFacing =
    mediaStreamTrack?.getSettings().facingMode !== "environment";
  const style = isLocal && isFrontFacing ? {transform: "rotateY(180deg)"} : {};

  return <Video ref={ref} style={style} />;
}
