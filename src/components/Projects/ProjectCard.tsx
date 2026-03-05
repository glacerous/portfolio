import React, { useRef, useEffect, useState } from "react";
import { Project } from "@/data/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

interface ProjectCardProps {
    project: Project;
}

const STACK_CATEGORIES: Record<string, string> = {
    Rust: "orange",
    Lean: "violet",
    Prolog: "orange",
    // Language
    TypeScript: "blue",
    Python: "blue",
    JavaScript: "blue",
    Go: "blue",
    Java: "blue",
    C: "blue",
    "C++": "blue",
    Dart: "blue",
    PHP: "blue",
    Kotlin: "blue",
    Swift: "blue",
    Bash: "blue",
    Shell: "blue",

    // ───────────────
    // Frontend Frameworks / Libraries
    // ───────────────
    React: "violet",
    "Next.js": "violet",
    Vue: "violet",
    Nuxt: "violet",
    Svelte: "orange",
    "SvelteKit": "violet",
    Angular: "violet",
    Remix: "violet",
    Astro: "violet",
    Vite: "violet",

    // ───────────────
    // Backend Frameworks
    // ───────────────
    Express: "violet",
    Fastify: "violet",
    NestJS: "violet",
    Django: "violet",
    Flask: "violet",
    Spring: "violet",
    "Spring Boot": "violet",
    Laravel: "violet",
    Rails: "violet",
    Fiber: "violet",

    // ───────────────
    // Infrastructure / DevOps
    // ───────────────
    Docker: "cyan",
    Kubernetes: "blue",
    Helm: "cyan",
    Terraform: "cyan",
    Ansible: "cyan",
    AWS: "cyan",
    GCP: "cyan",
    Azure: "cyan",
    Vercel: "cyan",
    Netlify: "cyan",
    DigitalOcean: "cyan",
    Railway: "cyan",
    Fly: "cyan",
    Nginx: "cyan",
    Apache: "cyan",
    Cloudflare: "cyan",
    "GitHub Actions": "cyan",
    GitLab: "cyan",
    Jenkins: "cyan",
    CI: "cyan",
    CD: "cyan",

    // ───────────────
    // Databases
    // ───────────────
    PostgreSQL: "blue",
    MySQL: "green",
    MariaDB: "green",
    SQLite: "green",
    Redis: "green",
    MongoDB: "green",
    Cassandra: "green",
    DynamoDB: "green",
    Supabase: "green",
    Firebase: "green",
    Prisma: "neutral",
    Drizzle: "neutral",
    Sequelize: "neutral",
    Mongoose: "neutral",

    // ───────────────
    // Messaging / Streaming
    // ───────────────
    Kafka: "cyan",
    RabbitMQ: "cyan",
    NATS: "cyan",
    WebSockets: "cyan",
    gRPC: "cyan",

    // ───────────────
    // AI / ML
    // ───────────────
    OpenAI: "amber",
    Gemini: "amber",
    LangChain: "amber",
    HuggingFace: "amber",
    TensorFlow: "amber",
    PyTorch: "amber",
    Ollama: "amber",

    // ───────────────
    // Testing
    // ───────────────
    Jest: "neutral",
    Vitest: "neutral",
    Cypress: "neutral",
    Playwright: "neutral",
    Mocha: "neutral",

    // ───────────────
    // Styling / UI
    // ───────────────
    "Tailwind CSS": "neutral",
    Bootstrap: "neutral",
    MUI: "neutral",
    Shadcn: "neutral",
    Chakra: "neutral",

    // ───────────────
    // Mobile
    // ───────────────
    Flutter: "cyan",
    ReactNative: "violet",
    "React Native": "violet",

    // ───────────────
    // Other / Tools
    // ───────────────
    WASM: "violet",
    Git: "neutral",
    Bun: "neutral",
    pnpm: "neutral",
    npm: "neutral",
    Yarn: "neutral",
    Linux: "neutral",
};

const getColorStyles = (tech: string) => {
    const color = STACK_CATEGORIES[tech] || "neutral";
    const variants: Record<string, string> = {
        orange: "bg-orange-500/10 text-orange-300 border-orange-400/20",
        blue: "bg-blue-500/10 text-blue-300 border-blue-400/20",
        violet: "bg-purple-500/10 text-purple-300 border-purple-400/20",
        cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-400/20", // Infra
        green: "bg-emerald-500/10 text-emerald-300 border-emerald-400/20", // Database
        amber: "bg-amber-500/15 text-amber-300 border-amber-400/30", // AI
        neutral: "bg-neutral-700 text-neutral-200 border-neutral-500/30", // Tooling
    };
    return variants[color];
};

const formatImpact = (impact: string) => {
    // Regex to match patterns like "~1k users", "20 developers", "2k monthly traffic"
    // It looks for numbers followed by specific keywords or units.
    const parts = impact.split(/(\~?\d+[kM\+]?\s*(?:users|developers|monthly traffic|traffic|services|active users))/i);

    return parts.map((part, i) => {
        if (i % 2 === 1) {
            return (
                <span key={i} className="text-cyan-300 font-semibold">
                    {part}
                </span>
            );
        }
        return part;
    });
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
            className="group relative border border-border bg-surface rounded-sm transition-all duration-200 ease-in-out hover:-translate-y-[3px] hover:border-accent/35 flex flex-col h-full text-left overflow-hidden"
        >
            {/* Header Section */}
            <div className="flex justify-between items-center px-5 py-3 border-b border-border bg-white/[0.01]">
                <h3 className="text-lg font-semibold text-primary tracking-tight font-mono leading-tight">
                    {project.title}
                    {project.impact && (
                        <span className="block font-mono text-xs tracking-wide text-slate-500 font-normal mt-0.5">
                            {formatImpact(project.impact)}
                        </span>
                    )}
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-1 border border-accent-warm/20 rounded-sm text-accent-warm/80 bg-accent-warm/5">
                    {project.category || "Project"}
                </span>
            </div>

            {/* Media Section */}
            <div className="relative aspect-[16/10] max-h-[220px] overflow-hidden bg-background/40 border-b border-border">
                {project.media.kind === "video" ? (
                    <video
                        ref={videoRef}
                        src={project.media.src}
                        poster={project.media.poster}
                        muted
                        loop
                        playsInline
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                        aria-label={project.media.alt}
                    />
                ) : (
                    <img
                        src={project.media.src}
                        alt={project.media.alt}
                        loading="lazy"
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                    />
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <div className="mb-6">
                    <p className="text-lg text-primary font-medium mb-4 leading-relaxed tracking-tight font-sans">
                        {project.oneLiner}
                    </p>
                    <p className="text-[15px] text-secondary leading-relaxed font-normal font-sans">
                        {project.description}
                    </p>
                </div>

                <div className="flex flex-wrap gap-x-3 gap-y-2 mb-8">
                    {project.stack.map((tech) => (
                        <span
                            key={tech}
                            className={cn(
                                "px-2 py-[2px] border text-[11px] font-mono rounded-sm transition-colors uppercase tracking-tight",
                                getColorStyles(tech)
                            )}
                        >
                            {tech}
                        </span>
                    ))}
                </div>

                <div className="mt-auto pt-6 border-t border-border">
                    <div className="flex flex-wrap gap-4">
                        {project.links?.code && (
                            <a
                                href={project.links.code}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-cyan-300 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono"
                            >
                                View Source ↗
                            </a>
                        )}
                        {project.links?.demo && (
                            <a
                                href={project.links.demo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-cyan-300 hover:text-amber-300 transition-colors flex items-center gap-1 font-mono"
                            >
                                Visit Site ↗
                            </a>
                        )}
                        {!project.links?.code && !project.links?.demo && (
                            <span className="text-[15px] text-accent-warm/80 font-medium leading-normal font-sans">
                                {project.category === "CLOSED SOURCE"
                                    ? "Closed-source project – media, details, and demo available on request."
                                    : "Details available on request."
                                }
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
