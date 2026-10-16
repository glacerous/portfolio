import { Experience } from "./types";
import code124Logo from "@/assets/pictures/code124.png";

export const experiences: Experience[] = [
    {
        company: "Code124 (student club)",
        role: "Quality Assurance Engineer",
        period: "Jan. 2026 – Present",
        logo: code124Logo,
        description: [
            "Authored Scrum artifacts, including sprint backlogs and product backlog items (PBIs), for the HimaSISFO website revision project",
            "Performed manual and regression testing on HimaSISFO (himasisfoupnvy.com) and BehindTheWeb to verify functionality across releases"
        ]
    },
    {
        company: "Code124 (student club)",
        role: "Back End Developer",
        period: "Jul. 2025 – Jan. 2026",
        logo: code124Logo,
        description: [
            "Managed relational database schemas and migrations across 2 production applications using Prisma ORM with PostgreSQL, integrating third-party services including the Spotify Web API"
        ]
    },
    {
        company: 'Universitas Pembangunan Nasional "Veteran" Yogyakarta',
        role: "Assistant Lecturer / Teaching Assistant",
        period: "Feb. 2026 – Jun. 2026",
        description: [
            "Assisted faculty in delivering lecture material and graded coursework for backend web development, breaking down core architectural concepts across Laravel and Express.js in classroom sessions.",
            "Evaluated student project submissions and assignments, providing direct feedback on RESTful API design, database schemas, and clean code architecture."
        ]
    }
];
