import React from "react";
import { Label } from "../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import type { Prompt } from "../lib/types";

interface SceneSelectorProps {
  prompts: Prompt[];
  selectedPrompt: string;
  onPromptChange: (value: string) => void;
}

export const SceneSelector = ({
  prompts,
  selectedPrompt,
  onPromptChange,
}: SceneSelectorProps) => {
  const selectedPromptDesc = prompts.find((p) => p.id === selectedPrompt)?.desc;

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-end">
        <Label className="text-2xl font-medium text-white/90">
          Scene Selection
        </Label>
        <span className="text-sm text-white/70">{selectedPromptDesc}</span>
      </div>
      <Select value={selectedPrompt} onValueChange={onPromptChange}>
        <SelectTrigger className="w-full rounded-none bg-transparent border-2 border-white/70 text-white hover:border-white transition-colors">
          <SelectValue placeholder="Select a scene" />
        </SelectTrigger>
        <SelectContent className="rounded-none bg-[#141414] border-2 border-white/70">
          {prompts.map((prompt) => (
            <SelectItem
              key={prompt.id}
              value={prompt.id}
              className="text-white rounded-none hover:bg-white/10 focus:bg-white/10"
            >
              {prompt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
