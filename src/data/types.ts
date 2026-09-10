export type MediaKind = "image" | "video";

export interface Media {
  kind: MediaKind;
  src: string;
  poster?: string;
  alt?: string;
}

export type ProjectCategory =
  | "INTERNAL PLATFORM"
  | "CAMPUS SYSTEM"
  | "FULLSTACK SYSTEM"
  | "BACKEND SERVICE"
  | "DEVOPS / INFRA"
  | "AI PLATFORM"
  | "DATA PIPELINE"
  | "AUTOMATION TOOL"
  | "CLOSED SOURCE"
  | "OPEN SOURCE"
  | "PLATFORM"
  | "HACKATHON";

export interface Project {
  id: string;
  title: string;
  role: string; // e.g., Backend Lead
  year: string;
  category: ProjectCategory;
  impact: string; // e.g., "300+ active users · 5 services"
  description: string;
  oneLiner: string;
  stack: string[];
  media: Media;
  links?: {
    site?: string;
    demo?: string;
    code?: string;
  };
}

export interface Experience {
  company: string;
  role: string;
  period: string;
  logo?: string;
  description: string[];
}

export interface CreativeProject {
  id: string;
  title: string;
  role: string;
  year: string;
  category: "3D ANIMATION" | "VIDEO EDITING" | "MOTION GRAPHICS" | "VFX" | "CREATIVE";
  tools: string[];
  description: string;
  impact?: string;
  media: Media;
  links?: {
    video?: string;
    demo?: string;
    site?: string;
  };
}

export interface CreativeStill {
  id: string;
  title: string;
  category: string;
  year: string;
  tools: string[];
  description: string;
  src: string;
  alt: string;
}

export interface SocialLink {
  label: string;
  url: string;
  platform: string;
}
