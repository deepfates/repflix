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

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center">
      <Button
        onClick={onClose}
        className="absolute top-4 right-4 bg-transparent hover:bg-transparent border-0 text-white/70 hover:text-white"
      >
        <XIcon className="h-8 w-8" />
      </Button>
      <div className="relative">
        <video
          autoPlay={isPlaying}
          loop
          controls
          className="max-h-[90vh] max-w-[90vw]"
          src={videoUrl}
        />
      </div>
    </div>
  );
};
