import React from "react";

export const Hero: React.FC = () => {
    return (
        <section className="pt-36 pb-0 px-6 font-mono max-w-7xl mx-auto">
            <div className="max-w-3xl">
                <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight">
                    big fan of computers.
                </h1>

                <p className="mt-4 text-xs text-slate-500 font-mono leading-relaxed select-none">
                    i use vim, did earth science olympiad and a lot of dev competitions
                </p>

                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
                    <div>
                        github:{" "}
                        <a
                            href="https://github.com/glacerous"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
                        >
                            glacerous
                        </a>
                    </div>
                    <div>
                        email:{" "}
                        <a
                            href="mailto:azzakyraihan@gmail.com"
                            className="text-cyan-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
                        >
                            azzakyraihan [at] gmail (dot) com
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};