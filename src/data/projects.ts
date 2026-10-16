import { Project } from "./types";
import { media } from "./media";

export const projects: Project[] = [
    {
        id: "vora",
        title: "Vora",
        role: "Lead Developer",
        year: "2026",
        category: "AI PLATFORM",
        impact: "Top 60 of 279 projects · 1,000+ participants",
        description:
            "AI-powered forest carbon estimation platform. One of 60 prize-winning projects (+$800 non-cash prize) at Earth Forward (NextStep Hacks Year 6), out of 279 submissions from 1,000+ participants worldwide. Reconstructs high-fidelity 3D tree models from drone and mobile phone footage using 3D Gaussian Splatting to estimate biomass storage.",
        oneLiner:
            "Prize-winning AI forest carbon estimation using 3D Gaussian Splatting.",
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
        impact: "Used by 1,000+ active students every semester course enrollment cycle",
        description:
            "Academic planning platform actively used by 1,000+ students per semester KRS cycle. Leverages dependency graphs and constraint modeling to validate prerequisite rules, resolve schedule clashes, and enforce credit load limits in real time.",
        oneLiner:
            "Constraint-aware academic course planning system serving 1,000+ students.",
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