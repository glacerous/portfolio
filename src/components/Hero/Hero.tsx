import React from "react";
import { motion } from "framer-motion";

export const Hero: React.FC = () => {
    return (
        <section className="pt-28 pb-16 px-6 font-mono">
            <div className="max-w-3xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Identity Line */}
                    <p className="text-xs tracking-widest uppercase text-slate-500">
                        Software Architect | Information Systems
                    </p>

                    {/* Core Statement */}
                    <p className="mt-6 text-base md:text-lg text-slate-300 leading-relaxed">
                        My focus is on architecture first — API boundaries,
                        data modeling, system reliability, and deployment.
                        I work mostly with campus organizations and hackathons,
                        building tools that are actually used, not just demoed.
                    </p>

                    {/* Contact */}
                    <div className="mt-10 text-base space-y-2 tracking-wide">
                        <div>
                            <span className="text-slate-400">github:</span>{" "}
                            <a
                                href="https://github.com/glacerous"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#F6E6A6] hover:text-cyan-300 transition-colors duration-200"
                            >
                                @glacerous
                            </a>
                        </div>

                        <div>
                            <span className="text-slate-400">email:</span>{" "}
                            <a
                                href="mailto:azzakyraihan@protonmail.com"
                                className="text-[#F6E6A6] hover:text-cyan-300 transition-colors duration-200"
                            >
                                azzakyraihan [at] protonmail (dot) com
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};