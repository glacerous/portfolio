import React from "react";
import { NavBar } from "./components/Nav/NavBar";
import { Hero } from "./components/Hero/Hero";
import { ProjectsSection } from "./components/Projects/ProjectsSection";
import { ExperienceSection } from "./components/Experience/ExperienceSection";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-neutral-300 selection:bg-cyan-500/30 selection:text-white antialiased">
            <NavBar />

            <main className="relative pt-4">
                <Hero />
                <ProjectsSection />
                <ExperienceSection />

                {/* FOOTER */}
                <footer className="py-12 px-6 max-w-7xl mx-auto border-t border-neutral-800 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="font-mono text-[10px] text-neutral-400 uppercase tracking-widest">
                        © 2024 PORTFOLIO.V2 // TECH_DOC_STYLE
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="font-mono text-[10px] text-neutral-400 hover:text-white uppercase transition-colors tracking-widest">Back_to_top</a>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default App;
