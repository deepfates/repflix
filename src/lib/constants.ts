import type { Model, Parameters } from "./types";

export const MODELS: Model[] = [
  { id: "dune", name: "Dune" },
  { id: "pixar", name: "Pixar" },
  { id: "arcane", name: "Arcane" },
  { id: "lalaland", name: "La La Land" },
  { id: "twinpeaks", name: "Twin Peaks" },
  { id: "pulpfiction", name: "Pulp Fiction" },
  { id: "cowboybebop", name: "Cowboy Bebop" },
  { id: "budapest", name: "The Grand Budapest Hotel" },
  { id: "spiderverse", name: "Spider-Man: Into the Spider-Verse" },
];

export const PROMPTS = [
  {
    id: "diner",
    name: "Late Night Diner",
    desc: "intimate drama, tension, blocking",
    prompt:
      "A video clip shows two people having an intense conversation in a diner booth. The booth has red vinyl seats and a window beside it showing nighttime city lights. One person is leaning forward, wearing a leather jacket, while the other sits back against the booth, wearing a white dress shirt with rolled-up sleeves. The fluorescent lights above cast stark shadows.",
  },
  {
    id: "hotel",
    name: "The Grand Hotel",
    desc: "architectural space, perspective, movement",
    prompt:
      "A video clip shows a person walking through an elegant hotel lobby. The space is grand and open, with marble floors that reflect the light from crystal chandeliers above. The person is wearing formal attire and moving with purpose toward the center of the frame. Ornate columns line the sides of the lobby, and the lighting creates a warm, luxurious atmosphere.",
  },

  {
    id: "backstage",
    name: "Backstage Reflections",
    desc: "emotion, reflections",
    prompt:
      "A video clip features a performer backstage looking into a mirror. They are wearing stage makeup and a elaborate costume that catches the light. The mirror is surrounded by warm bulbs, creating a soft glow around their reflection. Their expression shifts as they study their reflection, and various emotions play across their face.",
  },
  {
    id: "kitchen",
    name: "Kitchen Symphony",
    desc: "multiple characters, dynamic motion",
    prompt:
      "A video clip shows a busy restaurant kitchen during service. A chef in white works at the center station, while other kitchen staff move purposefully around them. Steam rises from pots, and flames occasionally flare from the stovetops. The stainless steel surfaces are bright and reflective under the overhead lights, and the overall scene has an energy of coordinated chaos.",
  },
  {
    id: "temple",
    name: "Ancient Temple",
    desc: "dynamic lighting, texture",
    prompt:
      "A video clip depicts someone exploring an ancient temple chamber. They are wearing explorer's gear and carrying a light source that illuminates the space around them. The walls are covered in carved symbols that catch the light as the person moves past them. Dust particles float in the beam of light, and the stone surfaces have a weathered, textured appearance.",
  },
  {
    id: "martial",
    name: "Training Hall",
    desc: "movement, atmosphere",
    prompt:
      "A video clip features a martial arts master demonstrating a move in a traditional training hall. They are wearing loose black training clothes, moving with controlled precision on the polished wooden floor. Sunlight streams through high windows in diagonal beams, catching the dust motes in the air. The walls are lined with wooden practice weapons and scrolls.",
  },
  {
    id: "scientist",
    name: "The Laboratory",
    desc: "sci-fi lighting, character reactions",
    prompt:
      "A video clip features a scientist in a brightly lit laboratory. They are wearing a white lab coat and protective goggles, standing in front of a large glass containment chamber. The chamber contains a softly pulsing light that casts shifting patterns across the scientist's face. As they observe the phenomenon, their expression changes from curiosity to amazement.",
  },

  {
    id: "control",
    name: "Control Room",
    desc: "UI interaction, hand movement",
    prompt:
      "A video clip shows someone working at a complex control panel. They are wearing a sleek headset and touching holographic displays that float in the air before them. The room is dark except for the blue glow of multiple screens and status lights, which reflect off the metallic surfaces of the equipment. Their fingers move with precise gestures.",
  },
  {
    id: "rooftop",
    name: "Storm's Edge",
    desc: "weather, environmental effects",
    prompt:
      "A video clip depicts a person standing on a windy rooftop helipad. They are wearing a long coat that moves dramatically in the wind, and their hair is being blown back from their face. The sky above shows threatening storm clouds, and the city lights below create a grid of illumination through the gathering darkness.",
  },
];

export const PARAMS: Parameters = {
  lora_strength: [0.7, 1.15, 1.35],
  guidance_scale: [6.0, 7.0, 9.0],
  steps: [25, 35, 50],
};
