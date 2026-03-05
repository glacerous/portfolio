import { Project } from "./types";
import { media } from "./media";

export const projects: Project[] = [
    {
        id: "himasisfo",
        title: "HIMASISFO Portal",
        role: "Backend & Platform",
        year: "2024",
        category: "CAMPUS SYSTEM",
        impact: "worked with 20+ developers and designers",
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
            'Academic planning system for modeling semester scheduling constraints, course prerequisite graphs, and credit load limits.Courses and prerequisite relationships are represented as dependency graphs, allowing deterministic validation of eligibility rules and schedule feasibility before enrollment. The backend enforces prerequisite resolution, credit limits, and semester availability through explicit validation layers',
        oneLiner:
            "Constraint-aware academic course planning system.",
        stack: [
            "TypeScript",
            "Next.js",
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
            `Repository analysis and documentation automation system that ingests a code repository, inspects its structure, and generates explanations for the frameworks, libraries, and tools used in the project.

The backend integrates Llama-3.3-70B-Versatile to interpret source files and produce structured, human-readable descriptions of each detected technology.

Built under hackathon constraints with emphasis on backend architecture, containerized deployment, and scalable orchestration rather than surface-level UI polish.`,
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
            kind: "video",
            src: media.repoly,
            alt: "Repoly Dashboard",
        },
        links: {
            code: "https://github.com/glacerous",
        },
    },
];