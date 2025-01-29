import { useCallback, useRef, useState, useEffect } from "react";
import { PlayCircle, PauseCircle } from "lucide-react";
import { Button } from "./components/ui/button";
import { MODELS, PARAMS, PROMPTS } from "./lib/constants";
import { getVideoUrl } from "./lib/utils";
import { ParameterControls } from "./components/ParameterControls";
import { SceneSelector } from "./components/SceneSelector";
import { VideoGrid } from "./components/VideoGrid";
import { VideoLightbox } from "./components/VideoLightbox";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./components/ui/tooltip";

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

  // Reset isPlaying when scene changes
  useEffect(() => {
    setIsPlaying(true);
    // Start playing all videos
    for (const video of videoRefs.current) {
      if (video) {
        video.play();
      }
    }
  }, [selectedPrompt]);

  return (
    <TooltipProvider>
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
            {/* Header */}
            <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent">
              <div className="max-w-[2000px] mx-auto px-4 py-4 flex justify-between items-center gap-8">
                <a href="/" className="flex items-center shrink-0">
                  <img src="/repflix.png" alt="Repflix" className="h-8" />
                </a>
                <a
                  href="https://replicate.com/blog/fine-tune-video"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-3 px-6 py-3 bg-red-600/90 hover:bg-red-700 transition-all duration-300 text-white hover:text-white flex-1 max-w-xl border border-transparent hover:border-white/30 hover:shadow-lg hover:scale-[1.02] origin-right transform-gpu"
                >
                  <div className="flex-1">
                    <div className="text-sm font-semibold tracking-wide uppercase">
                      Want to make your own AI videos?
                    </div>
                    <div className="flex items-center gap-1 text-[13px] text-white/90 mt-0.5 group-hover:text-white transition-colors">
                      Learn how to fine-tune video models on Replicate
                      <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-1.5">
                        →
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            </div>

            {/* Hero section */}
            <div className="relative px-4 pt-28 pb-8 bg-gradient-to-b from-black/80 via-black/50 to-transparent">
              <div className="max-w-3xl space-y-3">
                <h1 className="text-6xl font-bold tracking-tight">
                  {PROMPTS.find((p) => p.id === selectedPrompt)?.name}
                </h1>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-xl text-white/70 cursor-help">
                      <i>
                        {PROMPTS.find((p) => p.id === selectedPrompt)?.desc}
                      </i>
                    </p>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-sm">
                    Key concepts this scene demonstrates in video generation
                  </TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <p className="text-lg text-white/60 mt-4 max-w-2xl cursor-help">
                      {PROMPTS.find((p) => p.id === selectedPrompt)?.prompt}
                    </p>
                  </TooltipTrigger>
                  <TooltipContent side="right" className="max-w-sm">
                    This is the exact prompt used to generate these videos
                  </TooltipContent>
                </Tooltip>
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
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div>
                          <SceneSelector
                            prompts={PROMPTS}
                            selectedPrompt={selectedPrompt}
                            onPromptChange={setSelectedPrompt}
                          />
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        Select a different scene to generate new videos
                      </TooltipContent>
                    </Tooltip>
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

            {/* Footer */}
            <div className="mt-16 px-4 py-8 bg-black/40">
              <div className="max-w-[2000px] mx-auto flex items-start gap-8">
                <img
                  src="/replicate.svg"
                  alt="Replicate"
                  className="h-8 opacity-60"
                />
                <div className="flex flex-col gap-6 text-sm text-white/60">
                  <p className="max-w-2xl">
                    Repflix shows the power of fine-tuned video models on
                    Replicate. Each video is generated using a different
                    fine-tuned model, showing how the same prompt can produce
                    different styles and interpretations. Try moving the sliders
                    to see how different parameters affect the output.
                  </p>
                  <p className="max-w-2xl">
                    These models were trained on video supercuts from{" "}
                    <a
                      href="https://youtube.com/@TheBeautyOf"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white/60 hover:text-white underline underline-offset-2"
                    >
                      The Beauty Of
                    </a>{" "}
                    YouTube channel. They learn both the visual style and camera
                    movements that make each film or show distinct. The models
                    and code are open source - give them a try.
                  </p>
                  <div className="flex flex-col gap-4">
                    <a
                      href="https://replicate.com/deepfates"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white underline underline-offset-2 w-fit"
                    >
                      Try out these models and others fine-tuned by deepfates
                    </a>
                    <a
                      href="https://replicate.com/zsxkib/hunyuan-video-lora"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white underline underline-offset-2 w-fit"
                    >
                      Fine-tune your own HunyuanVideo model on Replicate
                    </a>{" "}
                    <a
                      href="https://github.com/deepfates/repflix"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white underline underline-offset-2 w-fit"
                    >
                      View this open source project on GitHub
                    </a>
                    <a
                      href="https://replicate.com/docs"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white underline underline-offset-2 w-fit"
                    >
                      Documentation
                    </a>
                    <a
                      href="https://replicate.com/pricing"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-white/60 hover:text-white underline underline-offset-2 w-fit"
                    >
                      Pricing
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
