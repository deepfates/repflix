# Repflix

Repflix is a Netflix-inspired web application that helps you understand how fine-tuned video models work on Replicate. It showcases a collection of models fine-tuned on iconic cinematography styles. You can explore how different parameters affect the output quality and style of each model.

Check it out at [repflix.vercel.app](https://repflix.vercel.app).

![screenshot](./screenshot.webp)

## About the Models

Each model was fine-tuned on carefully curated cinematography supercuts that capture the essence of different iconic films and shows like Cowboy Bebop, Twin Peaks, and more (sourced from [The Beauty Of](https://youtube.com/@TheBeautyOf) YouTube channel). The models learn not just the visual style, but also the characteristic camera movements and scene composition that make each source unique.

## Features

- Visual comparison of multiple fine-tuned models, each capturing a distinct cinematographic style
- Interactive parameter visualization showing how LoRA strength, guidance scale, and steps affect video generation
- Netflix-inspired UI with video grid and lightbox viewing
- Curated scene prompts demonstrating different video generation scenarios
- Synchronized playback controls for easy comparison

## Getting Started

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/deepfates/repflix.git
cd repflix
```

2. Install dependencies:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

To create a production build:

```bash
pnpm build
```

The built files will be in the `dist` directory.

## Usage

- **Scene Selection**: Choose from various pre-written scenes to see how different prompts affect the output
- **Playback Control**: Use the Play/Pause button to control all videos simultaneously for easy comparison
- **Parameter Examples**: 
  - LoRA Strength: See how different strength values affect the model's learned style
  - Guidance Scale: Compare how different scales affect prompt adherence
  - Steps: View the impact of different step counts on video quality
- **Video Viewing**: Click any video to open it in a lightbox view for better visibility

## Technology Stack

- React 18
- TypeScript
- Vite
- TailwindCSS
- Shadcn UI Components
- Lucide React Icons

## Learn More

- [Fine-tune your own video models on Replicate](https://replicate.com/blog/fine-tune-video)
- [Video tutorial on fine-tuning video models](https://youtu.be/6fLp23kWpgM)
- [Explore more models by deepfates](https://replicate.com/deepfates)
- [Replicate Documentation](https://replicate.com/docs)

## License

This project is licensed under the MIT License - see the LICENSE file for details.
