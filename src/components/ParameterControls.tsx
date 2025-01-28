import { type ElementType } from "react";
import { ArrowRight, ArrowUp } from "lucide-react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { useState, useRef, useEffect } from "react";

interface ParameterControlProps {
  icon: ElementType;
  label: string;
  value: number;
  values: number[];
  onChange: (value: number) => void;
  rotate?: number;
}

const ParameterControl = ({
  icon: Icon,
  label,
  value,
  values,
  onChange,
  rotate = 0,
}: ParameterControlProps) => (
  <div className="space-y-2 text-center flex-1">
    <div className="flex justify-center mb-1">
      <Icon
        className="h-5 w-5 text-white/70"
        style={{ transform: `rotate(${rotate}deg)` }}
      />
    </div>
    <Label className="block text-sm text-white/70">{label}</Label>
    <Slider
      value={[value]}
      onValueChange={([newValue]: number[]) => onChange(newValue)}
      max={2}
      step={1}
      className="w-24 mx-auto [&_[role=slider]]:rounded-none [&_[role=slider]]:border-white/70"
    />
    <div className="text-sm text-white/70">{values[value]}</div>
  </div>
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
    <div className="flex justify-center gap-12 py-4">
      <ParameterControl
        icon={ArrowRight}
        label="LoRA Strength"
        value={loraStrength}
        values={params.lora_strength}
        onChange={onLoraChange}
      />
      <ParameterControl
        icon={ArrowUp}
        label="Guidance Scale"
        value={guidanceScale}
        values={params.guidance_scale}
        onChange={onGuidanceChange}
      />
      <ParameterControl
        icon={ArrowUp}
        label="Steps"
        value={steps}
        values={params.steps}
        onChange={onStepsChange}
        rotate={45}
      />
    </div>
  );
};

export const useVideoLoader = () => {
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );
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
