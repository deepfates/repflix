import React, { useEffect } from "react";
import type { Model } from "../lib/types";
import { Loader2Icon } from "lucide-react";

interface VideoCardProps {
  model: Model;
  videoUrl: string;
  isPlaying: boolean;
  isLoading: boolean;
  onLoad: () => void;
  onError: () => void;
  onClick: () => void;
  videoRef: (element: HTMLVideoElement | null) => void;
}

export const VideoCard = ({
  model,
  videoUrl,
  isPlaying,
  isLoading,
  onLoad,
  onError,
  onClick,
  videoRef,
}: VideoCardProps) => {
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClick();
    }
  };

  useEffect(() => {
    console.log(`Loading video for ${model.name}:`, videoUrl);
  }, [videoUrl, model.name]);

  const handleError = (e: React.SyntheticEvent<HTMLVideoElement, Event>) => {
    const video = e.currentTarget;
    console.error(`Error loading video for ${model.name}:`, {
      url: videoUrl,
      error: video.error?.message,
      networkState: video.networkState,
      readyState: video.readyState,
      currentSrc: video.currentSrc,
    });
    onError();
  };

  const handleLoadStart = () => {
    console.log(`Started loading video for ${model.name}:`, {
      url: videoUrl,
      timestamp: new Date().toISOString(),
    });
  };

  return (
    <div
      className="group relative cursor-pointer"
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <div
        className="absolute inset-0 z-10 transition-all duration-200 opacity-0 group-hover:opacity-100"
        style={{ boxShadow: "0 0 0 2px white inset" }}
      />

      {isLoading && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/60">
          <Loader2Icon className="h-8 w-8 animate-spin text-red-600" />
        </div>
      )}

      <video
        ref={videoRef}
        autoPlay={isPlaying}
        loop
        muted
        playsInline
        className="w-full aspect-video object-cover transition-transform duration-300 group-hover:scale-105 bg-black"
        src={videoUrl}
        onLoadStart={handleLoadStart}
        onLoadedData={() => {
          console.log(`Video loaded for ${model.name}:`, {
            url: videoUrl,
            timestamp: new Date().toISOString(),
          });
          onLoad();
        }}
        onError={handleError}
        preload="none"
      />

      <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black to-transparent pt-8 pb-2 px-2">
        <div className="text-base font-medium text-white/90">{model.name}</div>
      </div>
    </div>
  );
};
