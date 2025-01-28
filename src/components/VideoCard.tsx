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
      className="group relative cursor-pointer aspect-video bg-black/20"
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

      <div className="relative w-full h-full overflow-hidden">
        <video
          ref={videoRef}
          autoPlay={isPlaying}
          loop
          muted
          playsInline
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 z-20 p-4">
          <div className="text-base font-medium text-white/90 transition-transform duration-300 transform group-hover:translate-y-0 translate-y-2">
            {model.name}
          </div>
        </div>
      </div>
    </div>
  );
};
