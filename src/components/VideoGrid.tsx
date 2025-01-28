import React from "react";
import type { Model } from "../lib/types";
import { VideoCard } from "./VideoCard";

interface VideoGridProps {
  models: Model[];
  selectedPrompt: string;
  loraStrength: number;
  guidanceScale: number;
  steps: number;
  isPlaying: boolean;
  loadingStates: Record<string, boolean>;
  onVideoLoad: (modelId: string) => void;
  onVideoError: (modelId: string) => void;
  onVideoClick: (videoUrl: string) => void;
  getVideoUrl: (
    modelId: string,
    promptId: string,
    loraStrength: number,
    guidanceScale: number,
    steps: number
  ) => string;
  videoRefs: React.MutableRefObject<(HTMLVideoElement | null)[]>;
}

export const VideoGrid = ({
  models,
  selectedPrompt,
  loraStrength,
  guidanceScale,
  steps,
  isPlaying,
  loadingStates,
  onVideoLoad,
  onVideoError,
  onVideoClick,
  getVideoUrl,
  videoRefs,
}: VideoGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 min-h-[50vh] w-full">
      {models.map((model, index) => {
        const videoUrl = getVideoUrl(
          model.id,
          selectedPrompt,
          loraStrength,
          guidanceScale,
          steps
        );

        return (
          <VideoCard
            key={model.id}
            model={model}
            videoUrl={videoUrl}
            isPlaying={isPlaying}
            isLoading={loadingStates[model.id]}
            onLoad={() => onVideoLoad(model.id)}
            onError={() => onVideoError(model.id)}
            onClick={() => onVideoClick(videoUrl)}
            videoRef={(el) => (videoRefs.current[index] = el)}
          />
        );
      })}
    </div>
  );
};
