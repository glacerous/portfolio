import React, { useRef, useEffect, useState } from "react";
import { Project } from "../../data/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ProjectCardProps {
    project: Project;
}

const STACK_CATEGORIES: Record<string, string> = {
    // Language
    TypeScript: "blue",
    Python: "blue",
    JavaScript: "blue",
    Go: "blue",
    Rust: "blue",
    // Framework
    "Next.js": "violet",
    Express: "violet",
    React: "violet",
    // Infra
    Docker: "cyan",
    Kubernetes: "cyan",
    AWS: "cyan",
    "GitHub Actions": "cyan",
    // Database
    PostgreSQL: "green",
    Redis: "green",
    MongoDB: "green",
    Prisma: "neutral",
    // AI
    OpenAI: "amber",
    Gemini: "amber",
    // Tooling
    "Tailwind CSS": "neutral",
};

const getColorStyles = (tech: string) => {
    const color = STACK_CATEGORIES[tech] || "neutral";
    const variants: Record<string, string> = {
        blue: "bg-blue-500/15 text-blue-300 border-blue-400/30",
        violet: "bg-violet-500/15 text-violet-300 border-violet-400/30",
        cyan: "bg-cyan-500/15 text-cyan-300 border-cyan-400/30",
        green: "bg-green-500/15 text-green-300 border-green-400/30",
        amber: "bg-amber-500/15 text-amber-300 border-amber-400/30",
        neutral: "bg-neutral-700 text-neutral-200 border-neutral-500",
    };
    return variants[color];
};

export const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
            },
            { threshold: 0.5 }
        );

        if (containerRef.current) {
            observer.observe(containerRef.current);
        }

        return () => {
            if (containerRef.current) {
                observer.unobserve(containerRef.current);
            }
        };
    }, []);

    useEffect(() => {
        if (videoRef.current) {
            if (isInView) {
                videoRef.current.play().catch(() => { });
            } else {
                videoRef.current.pause();
            }
        }
    }, [isInView]);

    return (
        <div
            ref={containerRef}
            className="group relative border border-neutral-700/40 bg-neutral-900/70 rounded-md p-5 transition-colors hover:border-neutral-600 flex flex-col h-full text-left"
        >
            {/* Media Section - Forced 16:10, max-h-200 */}
            <div className="relative aspect-[16/10] max-h-[200px] overflow-hidden bg-black/20 rounded-sm mb-5">
                {project.media.kind === "video" ? (
                    <video
                        ref={videoRef}
                        src={project.media.src}
                        poster={project.media.poster}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover"
                        aria-label={project.media.alt}
                    />
                ) : (
                    <img
                        src={project.media.src}
                        alt={project.media.alt}
                        loading="lazy"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>

            {/* Content */}
            <div className="flex flex-col flex-grow">
                <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-lg font-semibold text-white">
                        {project.title}
                    </h3>
                </div>

                <div className="mb-3">
                    <p className="text-sm text-neutral-300">
                        Impact: <span className="text-neutral-300">{project.impact}</span>
                    </p>
                </div>

                <p className="text-sm text-neutral-200 mb-2 font-medium tracking-tight">
                    {project.oneLiner}
                </p>

                <p className="text-sm text-neutral-400 mb-5 leading-relaxed line-clamp-3">
                    {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className={cn(
                                "px-2 py-[2px] border text-xs font-mono rounded-sm transition-colors",
                                getColorStyles(tech)
                            )}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="flex gap-4 mt-auto">
                    {project.links?.code && (
                        <a
                            href={project.links.code}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-cyan-400 hover:underline"
                        >
                            View Source
                        </a>
                    )}
                    {project.links?.demo && (
                        <a
                            href={project.links.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-xs font-mono text-cyan-400 hover:underline"
                        >
                            Visit Site
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};
