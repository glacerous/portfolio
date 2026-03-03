import React from "react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
    return (
        <section className="relative py-20 md:py-28 px-6 max-w-7xl mx-auto overflow-hidden">
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 text-left border-l border-neutral-700 pl-4 md:pl-6"
            >
                <p className="text-neutral-300 text-sm mb-4 font-mono tracking-wider">
                    Information Systems Undergraduate | Backend Developer
                </p>

                <div className="max-w-3xl">
                    <h1 className="text-3xl md:text-4xl font-semibold text-white leading-tight mb-4">
                        I build internal platforms and backend systems for student organizations
                        and hackathon projects.
                    </h1>

                    <p className="text-base text-neutral-400 max-w-2xl leading-relaxed mb-6">
                        Most of my work focuses on API design, database modeling, and
                        containerized deployments — building tools that are stable enough to be
                        used in real environments.
                    </p>
                </div>

                <div className="flex flex-col gap-1 font-mono text-sm mt-8 text-cyan-400">
                    <a href="https://github.com/yourhandle" className="hover:underline">
                        github: @yourhandle
                    </a>
                    <span className="text-neutral-400">
                        email: yourmail [at] gmail (dot) com
                    </span>
                </div>

                <div className="mt-12 h-px w-24 bg-cyan-400/40"></div>
            </motion.div>
        </section>
    );
};
