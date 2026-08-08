import React from "react";
import { NavBar, Hero, ProjectsSection, ExperienceSection } from "@/components";

const App: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-secondary selection:bg-accent/30 selection:text-primary antialiased">
            <NavBar />

            <main className="relative pt-4">
                <Hero />
                <ProjectsSection />
                <ExperienceSection />

                <footer className="py-12 px-6 max-w-7xl mx-auto flex justify-center items-center">
                    <a href="#" className="font-mono text-[10px] text-muted hover:text-primary uppercase transition-colors tracking-widest">Back_to_top</a>
                </footer>
            </main>
        </div>
    );
};

export default App;
