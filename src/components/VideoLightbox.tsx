import { useEffect } from "react";
import { Button } from "../components/ui/button";
import { XIcon } from "lucide-react";

interface VideoLightboxProps {
  videoUrl: string | null;
  isPlaying: boolean;
  onClose: () => void;
}

export const VideoLightbox = ({
  videoUrl,
  isPlaying,
  onClose,
}: VideoLightboxProps) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!videoUrl) return null;

  const handleBackgroundClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    // Only close if clicking the background overlay, not the video itself
    if ("target" in e && e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
      onClick={handleBackgroundClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <Button
        onClick={onClose}
        className="absolute top-4 right-4 bg-transparent hover:bg-transparent border-0 text-white/70 hover:text-white"
      >
        <XIcon className="h-8 w-8" />
      </Button>
      <div
        className="relative"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.key === "Escape" && onClose()}
        role="presentation"
      >
        <video
          autoPlay={isPlaying}
          loop
          controls
          className="max-h-[90vh] max-w-[90vw]"
          src={videoUrl}
        >
          <track kind="captions" src="" label="English" srcLang="en" default />
        </video>
      </div>
    </div>
  );
};
