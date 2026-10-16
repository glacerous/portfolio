import { Project } from "./types";
import { media } from "./media";

export const projects: Project[] = [
    {
        id: "vora",
        title: "Vora",
        role: "Lead Developer",
        year: "2026",
        category: "AI PLATFORM",
        impact: "3D Gaussian Splatting | IPCC Tier 1 allometrics",
        description:
            "AI-powered forest carbon estimation platform. Reconstructs high-fidelity 3D tree models from mobile phone footage to estimate biomass storage.",
        oneLiner:
            "AI-powered forest carbon estimation using 3D Gaussian Splatting.",
        stack: [
            "Next.js",
            "Python",
            "FastAPI",
            "Modal",
            "Open3D",
            "Leaflet",
            "PostgreSQL",
        ],
        media: {
            kind: "video",
            src: media.vora,
            alt: "Vora Platform",
        },
        links: {
            code: "https://github.com/glacerous/vora",
        },
    },
    {
        id: "himasisfo",
        title: "HIMASISFO Portal",
        role: "Backend & Platform",
        year: "2024",
        category: "CAMPUS SYSTEM",
        impact: "20-person team",
        description:
            "Web platform for student membership and publishing workflows. Built with relational database modeling and deployed to handle peak traffic.",
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
            src: "/projects/himasisfo.jpg",
            alt: "HIMA SISFO Portal Interface",
        },
        links: {
            site: "https://www.himasisfoupnvy.com/",
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
            "Academic planning tool for constraint modeling. Uses dependency graphs to validate prerequisite rules and enforce credit load limits.",
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
            site: "https://krslab.vercel.app",
        },
    },
];