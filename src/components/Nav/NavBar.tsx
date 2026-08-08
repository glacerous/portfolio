import React from "react";

export const NavBar: React.FC = () => {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-background/85 backdrop-blur-[6px] px-6 py-4 flex justify-center items-center">
            <div className="flex gap-6 font-mono text-xs text-slate-400">
                <a href="#" className="hover:text-slate-100 transition-colors">0:whoami</a>
                <a href="#projects" className="hover:text-slate-100 transition-colors">1:projects</a>
                <a href="#experience" className="hover:text-slate-100 transition-colors">2:experience</a>
            </div>
        </nav>
    );
};
