export interface Model {
  id: string;
  name: string;
}

export interface Prompt {
  id: string;
  name: string;
  desc: string;
}

export interface Parameters {
  lora_strength: number[];
  guidance_scale: number[];
  steps: number[];
}

export interface VideoState {
  isPlaying: boolean;
  isLoading: boolean;
  error?: Error;
}
