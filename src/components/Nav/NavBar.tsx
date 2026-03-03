import React from "react";
import { socials } from "../../data/socials";

export const NavBar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 border-b border-neutral-800 bg-neutral-900/80 backdrop-blur-sm px-6 py-4 flex justify-between items-center">
            <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-neutral-400 uppercase tracking-widest">
                    Portfolio <span className="text-neutral-600">//</span> IS Undergraduate
                </span>
            </div>

            <div className="flex items-center gap-8">
                <div className="hidden md:flex gap-6 font-mono text-xs text-neutral-400">
                    <a href="#projects" className="hover:text-white transition-colors">Projects</a>
                    <a href="#experience" className="hover:text-white transition-colors">Experience</a>
                </div>

                <div className="h-4 w-[1px] bg-neutral-800 hidden md:block" />

                <div className="flex gap-4">
                    {socials.map((social) => (
                        <a
                            key={social.platform}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-neutral-400 hover:text-white transition-colors text-xs font-mono"
                        >
                            {social.label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    );
};
