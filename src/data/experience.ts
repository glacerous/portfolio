import { Experience } from "./types";
import code124Logo from "@/assets/pictures/code124.png";

export const experiences: Experience[] = [
    {
        company: "Code124",
        role: "Quality Assurance",
        period: "2026 - 2027",
        logo: code124Logo,
        description: [
            "Conducting manual and automated testing to ensure application reliability.",
            "Identifying bugs and documenting issues for the development team.",
            "Ensuring software meets functional and performance requirements before release."
        ]
    },
    {
        company: "Code124",
        role: "Backend Developer",
        period: "2025 - 2026",
        logo: code124Logo,
        description: [
            "Architected and delivered 10+ RESTful API endpoints for the HimaSISFO platform using Next.js App Router, implementing Zod schema validation to ensure robust type safety and data integrity.",
            "Engineered secure authentication and Role-Based Access Control (RBAC) with Better Auth and Next.js Middleware for the BehindTheWeb platform, safeguarding administrative routes and internal data.",
            "Managed relational database schemas and migrations across 2 production web applications using Prisma ORM with PostgreSQL, integrating third-party services including Spotify Web API and TinyMCE."
        ]
    },
    {
        company: "HIMASISFO (Information Systems Student Association)",
        role: "Media, Information & Communication Division - Website Program Coordinator",
        period: "2025 - 2026",
        description: [
            "Responsible for the development and maintenance of the HIMASISFO official website.",
            "Coordinating the website program as part of the Media, Information, and Communication division.",
            "Ensuring the website functions as the main platform for student information and organizational updates."
        ]
    }
];
