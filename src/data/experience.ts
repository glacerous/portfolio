import { Experience } from "./types";
import code124Logo from "@/assets/pictures/code124.png";

export const experiences: Experience[] = [
    {
        company: "Code124",
        role: "Quality Assurance Engineer",
        period: "Jan. 2026 - Present",
        logo: code124Logo,
        description: [
            "Authored Scrum backlogs, user stories, and acceptance criteria that turned rough competition ideas into clear, shippable product requirements for the team.",
            "Ran thorough manual and regression test passes on HimaSISFO (himasisfoupnvy.com) and BehindTheWeb, tracking down pesky edge cases and verifying UI and API behaviors across releases.",
            "Took pride in breaking features in staging so users never experienced them in production, collaborating directly with developers to triage and patch bugs before launch."
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
        company: "Universitas Pembangunan Nasional “Veteran” Yogyakarta",
        role: "Assistant Lecturer / Teaching Assistant",
        period: "Feb. 2026 - Jun. 2026",
        description: [
            "Assisted faculty in delivering lecture material and graded coursework for backend web development, breaking down core architectural concepts across Laravel and Express.js in classroom sessions.",
            "Evaluated student project submissions and assignments, providing direct feedback on RESTful API design, database schemas, and clean code architecture.",
            "Helped students connect textbook backend theory with real-world engineering, guiding them through defensive error handling, authentication, and building systems that hold up beyond the classroom."
        ]
    }
];
