import React from "react";
import { NavBar, Hero, ProjectsSection, ExperienceSection } from "@/components";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-secondary selection:bg-accent/30 selection:text-primary antialiased">
            <NavBar />

            <main className="relative pt-4">
                <Hero />
                <div className="section-divider" />
                <ProjectsSection />
                <div className="section-divider" />
                <ExperienceSection />

                {/* FOOTER */}
                <div className="section-divider" />
                <footer className="py-12 px-6 max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="font-mono text-[10px] text-muted uppercase tracking-widest">
                        © 2024 PORTFOLIO.V2 // TECH_DOC_STYLE
                    </div>
                    <div className="flex gap-6">
                        <a href="#" className="font-mono text-[10px] text-muted hover:text-amber-300 uppercase transition-colors tracking-widest">Back_to_top</a>
                    </div>
                </footer>
            </main>
        </div>
    );
};

export default App;
