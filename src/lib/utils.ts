import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getVideoUrl = (
  modelId: string,
  promptId: string,
  loraStrength: number,
  guidanceScale: number,
  steps: number
): string => {
  // Map model IDs to directory names
  const dirMap: Record<string, string> = {
    spiderverse: "spider-man-into-the-spider-verse",
    budapest: "the-grand-budapest-hotel",
    cowboybebop: "cowboy-bebop",
    pulpfiction: "pulp-fiction",
    lalaland: "la-la-land",
    twinpeaks: "twin-peaks",
    dune: "dune",
    arcane: "arcane",
    pixar: "pixar",
  };

  const dirModelId = dirMap[modelId] || modelId;

  // Map prompt IDs to scene numbers
  const sceneMap: Record<string, string> = {
    scientist: "025",
    martial: "273",
    kitchen: "518",
    control: "644",
    temple: "740",
    rooftop: "778",
    diner: "779",
    hotel: "842",
    backstage: "847",
  };

  const sceneId = sceneMap[promptId] || promptId;

  // Format numbers to match directory structure
  const loraDir = `lora_${loraStrength.toFixed(2)}`;
  const cfgDir = `cfg_${guidanceScale.toFixed(1)}`;
  const stepsFile = `steps_${steps}.mp4`;

  return `/videos/${dirModelId}/scene_${sceneId}/${loraDir}/${cfgDir}/${stepsFile}`;
};

export const preloadVideo = (videoElement: HTMLVideoElement) => {
  if (!videoElement) return;

  videoElement.preload = "none";

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          videoElement.preload = "auto";
          observer.unobserve(entry.target);
        }
      }
    },
    { rootMargin: "50px" }
  );

  observer.observe(videoElement);

  return () => observer.disconnect();
};
