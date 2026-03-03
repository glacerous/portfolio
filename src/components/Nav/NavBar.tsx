import React from "react";
import { socials } from "@/data/socials";

export const NavBar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-border bg-background/85 backdrop-blur-[6px] px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-secondary uppercase tracking-widest">
                    Azzaky's Portfolio <span className="text-muted">//</span>
                </span>
            </div>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex gap-6 font-mono text-xs text-secondary">
                    <a href="#projects" className="hover:text-amber-300 transition-colors">Projects</a>
                    <a href="#experience" className="hover:text-amber-300 transition-colors">Experience</a>
                </div>

                <div className="h-4 w-[1px] bg-border hidden md:block" />

                <div className="flex gap-4">
                    {socials.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-secondary hover:text-amber-300 transition-colors text-xs font-mono"
                        >
                            {social.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};
