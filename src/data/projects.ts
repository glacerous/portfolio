import { Project } from "./types";
import { media } from "./media";

export const projects: Project[] = [
    {
        id: "himasisfo",
        title: "HIMASISFO Portal",
        role: "Backend & Platform",
        year: "2024",
        category: "CAMPUS SYSTEM",
        impact: "20 developers · ~2k monthly traffic",
        description:
            "Official web platform for the Information Systems student association. Handles member management, publishing workflows, and internal coordination. Designed with clean database modeling and stable deployment for peak recruitment traffic.",
        oneLiner:
            "Production portal for the Information Systems student association.",
        stack: [
            "TypeScript",
            "Next.js",
            "PostgreSQL",
            "Prisma",
            "Docker",
            "Vercel",
            "GitHub Actions",
            "Tailwind CSS",
        ],
        media: {
            kind: "image",
            src: "/projects/himasisfo.webp",
            alt: "HIMA SISFO Portal Interface",
        },
        links: {
            code: "https://github.com/glacerous",
        },
    },

    {
        id: "krslab",
        title: "KRSLab",
        role: "System Architecture & Backend",
        year: "2025",
        category: "PLATFORM",
        impact: "Cross-faculty curriculum parsing · ~1k users per KRS cycle",
        description:
            "Academic planning system for modeling semester constraints, prerequisite chains, and credit limits. Designed with explicit data boundaries, predictable rule enforcement, and clean client state management.",
        oneLiner:
            "Constraint-aware academic course planning system.",
        stack: [
            "TypeScript",
            "Next.js",
            "PostgreSQL",
            "Prisma",
            "Zustand",
            "Docker",
        ],
        media: {
            kind: "video",
            src: media.krslab, // assuming you used media.ts
            alt: "KRSLab semester planning demo",
        },
        links: {
            code: "https://github.com/glacerous",
        },
    },

    {
        id: "repoly",
        title: "Repoly",
        role: "Backend Architecture",
        year: "2025",
        category: "HACKATHON",
        impact: "containerized infra | my first ever hackathon!",
        description:
            "Repository automation and analytics system built under hackathon constraints. Focused on backend structure, containerized deployment, and scalable orchestration. Emphasized reliability and deployment readiness over surface-level polish.",
        oneLiner:
            "Containerized repository automation platform.",
        stack: [
            "TypeScript",
            "Node.js",
            "Express",
            "PostgreSQL",
            "Redis",
            "Docker",
            "Kubernetes",
            "Three.js",
            "Groq",
            "OpenSpec",
        ],
        media: {
            kind: "image",
            src: "/projects/repoly.webp",
            alt: "Repoly Dashboard",
        },
        links: {
            code: "https://github.com/glacerous",
        },
    },
];