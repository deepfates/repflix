import { type ElementType } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useState, useRef, useEffect } from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

interface ParameterControlProps {
  icon: ElementType;
  label: string;
  value: number;
  values: number[];
  onChange: (value: number) => void;
  rotate?: number;
  tooltip: string;
}

const ParameterControl = ({
  icon: Icon,
  label,
  value,
  values,
  onChange,
  rotate = 0,
  tooltip,
}: ParameterControlProps) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <div className="w-36 space-y-2 text-center cursor-help">
        <div className="flex items-center justify-center gap-4">
          <Slider
            value={[value]}
            onValueChange={([newValue]: number[]) => onChange(newValue)}
            max={2}
            step={1}
            className="w-24 [&_[role=slider]]:rounded-none [&_[role=slider]]:border-white/70"
          />
          <div className="text-sm text-white/70 min-w-[2.5rem]">
            {values[value]}
          </div>
        </div>
        <div className="flex justify-center gap-2">
          <Icon
            className="h-5 w-5 text-white/70"
            style={{ transform: `rotate(${rotate}deg)` }}
          />
          <Label className="block text-xs text-white/70 whitespace-nowrap">
            {label}
          </Label>
        </div>
      </div>
    </TooltipTrigger>
    <TooltipContent side="bottom">{tooltip}</TooltipContent>
  </Tooltip>
);

interface ParameterControlsProps {
  loraStrength: number;
  guidanceScale: number;
  steps: number;
  onLoraChange: (value: number) => void;
  onGuidanceChange: (value: number) => void;
  onStepsChange: (value: number) => void;
  params: {
    lora_strength: number[];
    guidance_scale: number[];
    steps: number[];
  };
}

export const ParameterControls = ({
  loraStrength,
  guidanceScale,
  steps,
  onLoraChange,
  onGuidanceChange,
  onStepsChange,
  params,
}: ParameterControlsProps) => {
  return (
    <div className="flex flex-wrap justify-center gap-8">
      <ParameterControl
        icon={ArrowRight}
        label="LoRA Strength"
        value={loraStrength}
        values={params.lora_strength}
        onChange={onLoraChange}
        tooltip="Controls how much influence the fine-tuning has on the output. Higher values make the video more stylized but may be less stable."
      />
      <ParameterControl
        icon={ArrowUp}
        label="Guidance Scale"
        value={guidanceScale}
        values={params.guidance_scale}
        onChange={onGuidanceChange}
        tooltip="Controls how closely the model follows the prompt. Higher values make the video more closely match the prompt but may be less creative."
      />
      <ParameterControl
        icon={ArrowUp}
        label="Steps"
        value={steps}
        values={params.steps}
        onChange={onStepsChange}
        rotate={45}
        tooltip="The number of denoising steps. More steps generally means higher quality but takes longer to generate."
      />
    </div>
  );
};

export const useVideoLoader = () => {
  const [loadingStates] = useState<Record<string, boolean>>({});
  const videoRefs = useRef<HTMLVideoElement[]>([]);

  const observerRef = useRef<IntersectionObserver>();

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const video = entry.target as HTMLVideoElement;
          if (entry.isIntersecting) {
            video.preload = "auto";
          } else {
            video.preload = "none";
          }
        }
      },
      { rootMargin: "50px" }
    );

    return () => observerRef.current?.disconnect();
  }, []);

  return { loadingStates, videoRefs };
};
