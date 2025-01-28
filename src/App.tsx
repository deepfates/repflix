import { useCallback, useRef, useState, useEffect } from "react";
import { PlayCircle, PauseCircle } from "lucide-react";
import { Button } from "./components/ui/button";
import { MODELS, PARAMS, PROMPTS } from "./lib/constants";
import { getVideoUrl, preloadVideo } from "./lib/utils";
import { ParameterControls } from "./components/ParameterControls";
import { SceneSelector } from "./components/SceneSelector";
import { VideoGrid } from "./components/VideoGrid";
import { VideoLightbox } from "./components/VideoLightbox";

export default function App() {
  // State
  const [selectedPrompt, setSelectedPrompt] = useState(PROMPTS[0].id);
  const [loraStrength, setLoraStrength] = useState(0);
  const [guidanceScale, setGuidanceScale] = useState(0);
  const [steps, setSteps] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
  const [lightboxVideo, setLightboxVideo] = useState<string | null>(null);

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  // Handlers
  const handlePlayPause = useCallback(() => {
    setIsPlaying((prev) => !prev);
    for (const video of videoRefs.current) {
      if (video) {
        isPlaying ? video.pause() : video.play();
      }
    }
  }, [isPlaying]);

  const handleVideoLoad = useCallback((modelId: string) => {
    setLoadingStates((prev) => ({ ...prev, [modelId]: false }));
  }, []);

  const handleVideoError = useCallback((modelId: string) => {
    setLoadingStates((prev) => ({ ...prev, [modelId]: false }));
    console.error(`Error loading video for model: ${modelId}`);
  }, []);

  // Effects
  useEffect(() => {
    // Reset loading states when parameters change
    setLoadingStates(
      MODELS.reduce((acc, model) => {
        acc[model.id] = true;
        return acc;
      }, {} as Record<string, boolean>)
    );
  }, [selectedPrompt, loraStrength, guidanceScale, steps]);

  return (
    <div
      className="min-h-screen bg-[#141414] text-white"
      style={{
        fontFamily:
          "Netflix Sans, Helvetica Neue, Segoe UI, Roboto, sans-serif",
      }}
    >
      <VideoLightbox
        videoUrl={lightboxVideo}
        isPlaying={isPlaying}
        onClose={() => setLightboxVideo(null)}
      />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="space-y-6">
          <SceneSelector
            prompts={PROMPTS}
            selectedPrompt={selectedPrompt}
            onPromptChange={setSelectedPrompt}
          />

          <ParameterControls
            loraStrength={loraStrength}
            guidanceScale={guidanceScale}
            steps={steps}
            onLoraChange={setLoraStrength}
            onGuidanceChange={setGuidanceScale}
            onStepsChange={setSteps}
            params={PARAMS}
          />

          <div className="flex justify-center">
            <Button
              onClick={handlePlayPause}
              className="rounded-none flex items-center gap-2 bg-red-600 hover:bg-red-700 border-0 text-white"
            >
              {isPlaying ? (
                <>
                  <PauseCircle className="h-4 w-4" /> Pause All
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4" /> Play All
                </>
              )}
            </Button>
          </div>
        </div>

        <div className="mt-8">
          <VideoGrid
            models={MODELS}
            selectedPrompt={selectedPrompt}
            loraStrength={PARAMS.lora_strength[loraStrength]}
            guidanceScale={PARAMS.guidance_scale[guidanceScale]}
            steps={PARAMS.steps[steps]}
            isPlaying={isPlaying}
            loadingStates={loadingStates}
            onVideoLoad={handleVideoLoad}
            onVideoError={handleVideoError}
            onVideoClick={setLightboxVideo}
            getVideoUrl={getVideoUrl}
            videoRefs={videoRefs}
          />
        </div>
      </div>
    </div>
  );
}
