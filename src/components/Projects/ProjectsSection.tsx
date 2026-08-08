import React from "react";
import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";

export const ProjectsSection: React.FC = () => {
    return (
        <section id="projects" className="pt-20 pb-0 px-6 max-w-7xl mx-auto">
            <div className="mb-12 font-mono">
                <h2 className="text-base font-bold tracking-wider text-slate-200 uppercase">Selected Projects</h2>
                <p className="text-slate-500 text-xs">
                    A collection of backend modules, infrastructure setups, and fullstack systems.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map((project) => (
                    <ProjectCard key={project.id} project={project} />
                ))}
            </div>
        </section>
    );
};
