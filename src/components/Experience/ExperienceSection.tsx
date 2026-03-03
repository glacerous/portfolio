import React from "react";
import { experiences } from "../../data/experience";
import { motion } from "framer-motion";

export const ExperienceSection: React.FC = () => {
    return (
        <section id="experience" className="py-24 px-6 max-w-7xl mx-auto border-t border-neutral-800">
            <div className="mb-16">
                <h2 className="text-2xl font-semibold tracking-tight text-white mb-2 uppercase">Experience</h2>
                <p className="text-neutral-400 font-mono text-xs">
                    Professional and organizational summary.
                </p>
            </div>

            <div className="space-y-12">
                {experiences.map((exp, index) => (
                    <motion.div
                        key={exp.company + index}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col md:flex-row md:justify-between items-baseline gap-2">
                            <div>
                                <h3 className="text-lg font-semibold text-white">{exp.role}</h3>
                                <span className="text-cyan-400 font-mono text-sm">@{exp.company}</span>
                            </div>
                            <span className="font-mono text-xs text-neutral-400">
                                {exp.period}
                            </span>
                        </div>

                        <ul className="space-y-2 max-w-3xl">
                            {exp.description.map((item, i) => (
                                <li key={i} className="text-neutral-300 text-sm leading-relaxed flex gap-3">
                                    <span className="text-neutral-500 shrink-0 select-none">•</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </div>
        </section>
    );
};
