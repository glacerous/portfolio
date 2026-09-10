import { CreativeProject, CreativeStill } from "./types";
import himasisfoRewindVid from "@/assets/pictures/projects/art/himasisfo-rewind.mp4";
import pkkftiTeaserVid from "@/assets/pictures/projects/art/pkkfti-teaser.mp4";
import gameAssetsImg from "@/assets/pictures/projects/art/game-assets-weapon.png";
import neonAlleyImg from "@/assets/pictures/projects/art/render-neon-alley.jpg";
import gothicHallImg from "@/assets/pictures/projects/art/render-gothic-hall.jpg";
import blossomShrineImg from "@/assets/pictures/projects/art/render-blossom-shrine.png";

export const creativeProjects: CreativeProject[] = [
  {
    id: "himasisfo-rewind",
    title: "HIMASISFO Annual Rewind",
    role: "3D Animation & Scene Setup",
    year: "2025",
    category: "3D ANIMATION",
    impact: "Retro CRT room, floor reflections & nostalgic screen aesthetic",
    description:
      "I built this 3D retro television scene in Blender to present our student organization's journey throughout the year. Focused on getting the nostalgic CRT screen glow, wet floor reflections, and dim ambient lighting to feel authentic.",
    tools: ["Blender", "After Effects", "Premiere Pro"],
    media: {
      kind: "video",
      src: himasisfoRewindVid,
      alt: "HIMASISFO Rewind 3D Animation",
    },
  },
  {
    id: "pkkfti-teaser",
    title: "PKKFTI 2025 Orientation Teaser",
    role: "3D Environment & Camera Animation",
    year: "2025",
    category: "3D ANIMATION",
    impact: "Misty canyon flythrough, stone arch & emblem reveal",
    description:
      "A cinematic 3D teaser I animated for our faculty campus orientation. I designed a continuous camera flythrough moving through mist-shrouded canyon cliffs and ancient stone arches over shallow water, ending on the floating faculty emblem.",
    tools: ["Blender", "After Effects", "Premiere Pro"],
    media: {
      kind: "video",
      src: pkkftiTeaserVid,
      alt: "PKKFTI Orientation Teaser Video",
    },
  },
];

export const creativeStills: CreativeStill[] = [
  {
    id: "game-weapons",
    title: "Fantasy Bow & Dagger",
    category: "Game Asset",
    year: "2025",
    tools: ["Blender", "Substance Painter"],
    description:
      "Stylized weapon models I designed for a game project, experimenting with clean silhouettes, pastel tones, and cel shading.",
    src: gameAssetsImg,
    alt: "Stylized Fantasy Game Weapon Assets",
  },
  {
    id: "neon-alley",
    title: "Rainy Tokyo Alley",
    category: "3D Environment",
    year: "2025",
    tools: ["Blender", "Cycles"],
    description:
      "A moody night scene inspired by Tokyo backstreets. Spent time refining the glowing Japanese neon signs, wet asphalt reflections, and hazy rain fog.",
    src: neonAlleyImg,
    alt: "Rainy Neon Tokyo Alleyway 3D Render",
  },
  {
    id: "gothic-hall",
    title: "Gothic Stone Hall",
    category: "Environment Study",
    year: "2025",
    tools: ["Blender", "Cycles"],
    description:
      "An architectural lighting study focusing on modular vaulted stone arches, aged wood textures, and dusty volumetric godrays.",
    src: gothicHallImg,
    alt: "Gothic Cloister Corridor 3D Render",
  },
  {
    id: "blossom-shrine",
    title: "Cherry Blossom Sanctuary",
    category: "Environment Concept",
    year: "2025",
    tools: ["Blender", "Cycles"],
    description:
      "A fantasy sanctuary concept featuring a twisted blossom tree in shallow water inside an ancient stone ruin with a celestial skylight.",
    src: blossomShrineImg,
    alt: "Blossom Tree Pantheon Shrine 3D Render",
  },
];
