import type { Model, Prompt, Parameters } from "./types";

export const MODELS: Model[] = [
  { id: "dune", name: "Dune" },
  { id: "pixar", name: "Pixar" },
  { id: "arcane", name: "Arcane" },
  { id: "lalaland", name: "La La Land" },
  { id: "twinpeaks", name: "Twin Peaks" },
  { id: "pulpfiction", name: "Pulp Fiction" },
  { id: "cowboybebop", name: "Cowboy Bebop" },
  { id: "budapest", name: "Grand Budapest Hotel" },
  { id: "spiderverse", name: "Spider-Verse" },
];

export const PROMPTS: Prompt[] = [
  {
    id: "scientist",
    name: "Scientist in Lab",
    desc: "Sci-fi lighting effects and reactions",
  },
  {
    id: "hotel",
    name: "Hotel Lobby",
    desc: "Architectural space and movement",
  },
  {
    id: "temple",
    name: "Temple Explorer",
    desc: "Dynamic lighting and texture",
  },
  {
    id: "diner",
    name: "Diner Conversation",
    desc: "Two-person dramatic scene",
  },
  {
    id: "martial",
    name: "Martial Arts Master",
    desc: "Controlled movement and atmosphere",
  },
  {
    id: "rooftop",
    name: "Windy Rooftop",
    desc: "Environmental effects and weather",
  },
  {
    id: "control",
    name: "Control Panel",
    desc: "UI interaction and hand movement",
  },
  {
    id: "backstage",
    name: "Backstage Mirror",
    desc: "Reflections and emotions",
  },
  {
    id: "kitchen",
    name: "Restaurant Kitchen",
    desc: "Multiple figures and dynamics",
  },
];

export const PARAMS: Parameters = {
  lora_strength: [0.7, 1.15, 1.35],
  guidance_scale: [6.0, 7.0, 9.0],
  steps: [25, 35, 50],
};
