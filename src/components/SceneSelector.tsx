import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
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
  return (
    <div className="space-y-2 w-full">
      <Select value={selectedPrompt} onValueChange={onPromptChange}>
        <SelectTrigger className="w-full rounded-none bg-transparent border-2 border-white/70 text-white hover:border-white transition-colors">
          <SelectValue placeholder="Select a scene" />
        </SelectTrigger>
        <SelectContent>
          {prompts.map((prompt) => (
            <SelectItem key={prompt.id} value={prompt.id}>
              {prompt.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};
