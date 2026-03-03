import { Experience } from "./types";

export const experiences: Experience[] = [
    {
        company: "Student IT Services",
        role: "Backend Platform Lead",
        period: "2023 — PRESENT",
        description: [
            "Architected a containerized authentication service used by 4+ campus organizations.",
            "Optimized database queries for the student activity portal, reducing load times by 60%.",
            "Lead a team of 3 developers to migrate legacy campus tools to a modern CI/CD pipeline."
        ]
    },
    {
        company: "Information Systems Lab",
        role: "Research Assistant (Distributed Systems)",
        period: "2022 — 2023",
        description: [
            "Implemented a peer-to-peer data synchronization protocol for localized campus networks.",
            "Developed a real-time monitoring dashboard for laboratory server infrastructure.",
            "Collaborated on a published paper regarding efficient resource allocation in high-node university clusters."
        ]
    },
    {
        company: "Google Developer Student Clubs",
        role: "Core Team Member (Tech)",
        period: "2021 — 2022",
        description: [
            "Mentored 50+ students in backend development and cloud infrastructure basics.",
            "Orchestrated the technical deployment for 'HackOverCampus 2022'.",
            "Built and maintained the official chapter website and member registration system."
        ]
    }
];
