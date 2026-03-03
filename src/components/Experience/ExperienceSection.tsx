import React from "react";
import { experiences } from "@/data/experience";
import { motion } from "framer-motion";

export const ExperienceSection: React.FC = () => {
    return (
        <section id="experience" className="py-24 px-6 max-w-7xl mx-auto font-mono">
            <div className="mb-16">
                <h2 className="text-2xl font-semibold tracking-tight text-primary mb-2 uppercase">
                    Experience
                </h2>
                <p className="text-muted text-xs">
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
                                <h3 className="text-lg font-semibold text-primary">
                                    {exp.role}
                                </h3>
                                <span className="text-accent text-sm">
                                    @{exp.company}
                                </span>
                            </div>
                            <span className="text-xs text-muted">
                                {exp.period}
                            </span>
                        </div>

                        <ul className="space-y-2 max-w-3xl">
                            {exp.description.map((item, i) => (
                                <li
                                    key={i}
                                    className="text-secondary text-sm leading-relaxed flex gap-3"
                                >
                                    <span className="text-muted shrink-0 select-none">
                                        •
                                    </span>
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