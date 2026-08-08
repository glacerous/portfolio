import React from "react";
import { experiences } from "@/data/experience";

export const ExperienceSection: React.FC = () => {
    return (
        <section id="experience" className="pt-10 pb-20 px-6 max-w-7xl mx-auto font-mono">
            <div className="mb-16">
                <h2 className="text-base font-bold tracking-wider text-slate-200 uppercase">
                    Experience
                </h2>
                <p className="text-slate-500 text-xs">
                    Professional and organizational summary.
                </p>
            </div>

            <div className="space-y-12">
                {experiences.map((exp, index) => (
                    <div
                        key={exp.company + index}
                        className="flex flex-col gap-4"
                    >
                        <div className="flex flex-col md:flex-row md:justify-between items-baseline gap-2">
                            <div>
                                <h3 className="text-sm font-bold text-slate-100">
                                    {exp.role}
                                </h3>
                                <span className="text-slate-400 text-xs">
                                    @{exp.company}
                                </span>
                            </div>
                            <span className="text-[11px] text-slate-500">
                                {exp.period}
                            </span>
                        </div>

                        <ul className="space-y-2 max-w-3xl">
                            {exp.description.map((item, i) => (
                                <li
                                    key={i}
                                    className="text-slate-400 text-xs leading-relaxed flex gap-3"
                                >
                                    <span className="text-slate-600 shrink-0 select-none">
                                        •
                                    </span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </section>
    );
};