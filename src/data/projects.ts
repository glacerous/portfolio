import { Project } from "./types";

export const projects: Project[] = [
    {
        id: "campus-flow",
        title: "CampusFlow Manager",
        role: "Backend Lead",
        year: "2023",
        category: "CAMPUS SYSTEM",
        impact: "300+ active users · 5 services · containerized stack",
        description: "Designed a high-throughput data pipeline for real-time neural signal processing in clinical environments.",
        oneLiner: "Real-time resource orchestration for campus-wide organizations.",
        stack: ["TypeScript", "Next.js", "PostgreSQL", "Docker", "Prisma"],
        media: {
            kind: "video",
            src: "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-a-human-brain-34442-large.mp4",
            poster: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&w=800&q=80",
            alt: "Dashboard demonstration of campus resource management"
        },
        links: {
            demo: "https://example.com",
            code: "https://github.com"
        }
    },
    {
        id: "sisfo-portal",
        title: "HIMA SISFO Portal",
        role: "Fullstack Engineer",
        year: "2024",
        category: "FULLSTACK SYSTEM",
        impact: "Used by HIMA SISFO committee · 2k+ monthly visits",
        description: "Cloud-native orchestration for automated hematology analysis, reducing manual intervention by 40%.",
        oneLiner: "Official committee portal for Information Systems department.",
        stack: ["TypeScript", "Next.js", "PostgreSQL", "Tailwind CSS", "GitHub Actions"],
        media: {
            kind: "image",
            src: "https://images.unsplash.com/photo-1579165466541-713028243be7?auto=format&fit=crop&w=800&q=80",
            alt: "Interface of the HIMA SISFO portal"
        },
        links: {
            demo: "https://example.com"
        }
    },
    {
        id: "sentinel-bot",
        title: "Sentinel Auth Bot",
        role: "Infra Engineer",
        year: "2022",
        category: "BACKEND SERVICE",
        impact: "Hackathon deployment · containerized stack · 50+ servers",
        description: "Built a resilient, multi-tenant platform for patient monitoring across multiple hospital networks.",
        oneLiner: "Discord-based authentication service for campus groups.",
        stack: ["Python", "Docker", "Redis", "PostgreSQL"],
        media: {
            kind: "video",
            src: "https://assets.mixkit.co/videos/preview/mixkit-heart-rate-monitor-screen-at-the-hospital-33230-large.mp4",
            poster: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=800&q=80",
            alt: "Terminal log view of the authentication bot"
        }
    }
];
