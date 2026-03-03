import React from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export const ProjectsSection: React.FC = () => {
    return (
        <section id="projects" className="py-12 px-6 max-w-7xl mx-auto">
            <div className="mb-12">
                <h2 className="text-2xl font-semibold tracking-tight text-primary mb-2 uppercase font-mono">Selected Projects</h2>
                <p className="text-muted text-xs font-sans">
                    A collection of backend modules, infrastructure setups, and fullstack systems.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <div key={project.id}>
                        <ProjectCard project={project} />
                    </div>
                ))}
            </div>
        </section>
    );
};
