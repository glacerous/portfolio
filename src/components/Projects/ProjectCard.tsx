import React, { useRef, useEffect, useState } from "react";
import { Project } from "@/data/types";

interface ProjectCardProps {
    project: Project;
}

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
            className="group relative border border-border bg-surface flex flex-col h-full text-left transition-all duration-200 hover:border-slate-700 hover:bg-slate-800/10"
        >
            {/* Header Section */}
            <div className="flex justify-between items-start px-8 py-6 border-b border-border">
                <h3 className="text-sm font-bold text-slate-100 tracking-tight font-mono leading-tight">
                    {project.title}
                    {project.impact && (
                        <span className="block font-mono text-[11px] text-slate-400 font-normal mt-2">
                            {project.impact}
                        </span>
                    )}
                </h3>
                <span className="text-[10px] font-mono font-normal uppercase text-slate-500 tracking-widest shrink-0 ml-4 mt-1">
                    {project.category || "Project"}
                </span>
            </div>

            {/* Media Section */}
            <div className="relative aspect-video w-full overflow-hidden bg-slate-900/60 border-b border-border flex items-center justify-center">
                {project.media.src === "" ? (
                    <div className="text-slate-600 font-mono text-xs uppercase tracking-widest select-none font-medium">
                        [ {project.title} ]
                    </div>
                ) : project.media.kind === "video" ? (
                    <video
                        ref={videoRef}
                        src={project.media.src}
                        poster={project.media.poster}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-90 transition-opacity"
                        aria-label={project.media.alt}
                    />
                ) : (
                    <img
                        src={project.media.src}
                        alt={project.media.alt}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-90 transition-opacity"
                    />
                )}
            </div>

            {/* Content Section */}
            <div className="p-8 flex flex-col flex-grow font-mono gap-5">
                <div className="space-y-3">
                    <p className="text-xs font-semibold text-slate-200">
                        {project.oneLiner}
                    </p>
                    <p className="text-xs text-slate-400 leading-relaxed">
                        {project.description}
                    </p>
                </div>

                <div className="text-[10px] text-slate-500 tracking-wider uppercase font-mono mt-1">
                    {project.stack.join(" / ")}
                </div>

                {project.links && (
                    <div className="mt-auto pt-4 border-t border-border">
                        <div className="flex flex-wrap gap-4 text-xs">
                            {(project.links.site || project.links.demo) && (
                                <a
                                    href={project.links.site || project.links.demo}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1"
                                >
                                    visit site ↗
                                </a>
                            )}
                            {project.links.code && (
                                <a
                                    href={project.links.code}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors inline-flex items-center gap-1"
                                >
                                    view source ↗
                                </a>
                            )}
                            {!project.links.code && !project.links.site && !project.links.demo && (
                                <span className="text-xs text-slate-500 leading-normal">
                                    {project.category === "CLOSED SOURCE"
                                        ? "closed source – details on request"
                                        : "details on request"
                                    }
                                </span>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
