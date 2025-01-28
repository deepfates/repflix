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
  const [loraStrength, setLoraStrength] = useState(1);
  const [guidanceScale, setGuidanceScale] = useState(1);
  const [steps, setSteps] = useState(1);
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
      className="fixed inset-0 overflow-y-auto overflow-x-hidden bg-[#141414] text-white"
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

      <div className="relative w-full">
        <div className="max-w-[2000px] mx-auto">
          {/* Hero section */}
          <div className="relative px-4 pt-16 pb-8 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
            <div className="max-w-3xl space-y-3">
              <h1 className="text-6xl font-bold tracking-tight">
                {PROMPTS.find((p) => p.id === selectedPrompt)?.name}
              </h1>
              <p className="text-xl text-white/70">
                <i>{PROMPTS.find((p) => p.id === selectedPrompt)?.desc}</i>
              </p>
              <p className="text-lg text-white/60 mt-4 max-w-2xl">
                {PROMPTS.find((p) => p.id === selectedPrompt)?.prompt}
              </p>
            </div>

            {/* Compact controls */}
            <div className="mt-8 flex flex-col md:flex-row items-center gap-8 w-full max-w-[1200px]">
              <div className="flex items-center gap-4 w-full">
                <Button
                  onClick={handlePlayPause}
                  className="rounded-none flex items-center gap-2 bg-red-600 hover:bg-red-700 border-0 text-white shrink-0"
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

                <div className="flex-1 min-w-0">
                  <SceneSelector
                    prompts={PROMPTS}
                    selectedPrompt={selectedPrompt}
                    onPromptChange={setSelectedPrompt}
                  />
                </div>
              </div>

              <div className="w-full md:w-auto shrink-0">
                <ParameterControls
                  loraStrength={loraStrength}
                  guidanceScale={guidanceScale}
                  steps={steps}
                  onLoraChange={setLoraStrength}
                  onGuidanceChange={setGuidanceScale}
                  onStepsChange={setSteps}
                  params={PARAMS}
                />
              </div>
            </div>
          </div>

          {/* Video grid */}
          <div className="mt-4 px-4">
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
    </div>
  );
}
