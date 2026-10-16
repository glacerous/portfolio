import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ChevronDown
} from 'lucide-react';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { fetchMediumArticles, MediumArticle } from '@/utils/medium';
import { ActivityGraph } from '@/components/ActivityGraph';
import { TechIcon } from '@/components/TechIcon';

export const App: React.FC = () => {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [openBlogIdx, setOpenBlogIdx] = useState<number | null>(null);

  useEffect(() => {
    fetchMediumArticles('azzakyraihan').then(res => {
      setArticles(res);
    });
  }, []);

  return (
    <div className="min-h-screen bg-[#FCFCFB] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#FCFCFB] antialiased">
      <main className="min-h-screen w-full flex flex-col items-center px-6 sm:px-8">
        <div className="w-full max-w-[720px]">
          
          {/* Header Navigation */}
          <header className="w-full pt-8 pb-14 flex items-center justify-between">
            <nav className="flex items-center gap-7 text-[14px]">
              <a href="#" className="font-medium text-[#0A0A0A] transition-colors">Home</a>
              <a href="#about" className="font-normal text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors">About</a>
              <a href="#projects" className="font-normal text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors">Projects</a>
              <a href="#experience" className="font-normal text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors">Experience</a>
              <a href="#blogs" className="font-normal text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors">Blogs</a>
            </nav>
          </header>

          {/* Hero Section */}
          <section className="w-full flex flex-col pt-4 pb-4">
            <div className="relative">
              <h1 className="text-[38px] sm:text-[48px] md:text-[54px] font-semibold text-[#0A0A0A] leading-[1.2] tracking-[-0.03em] flex items-center">
                Hey, I'm Azzaky
              </h1>
            </div>

            {/* About / Bio */}
            <div id="about" className="scroll-mt-24 sm:scroll-mt-28 mt-8 text-[15px] sm:text-[16px] text-[#525252] leading-[1.7] font-normal space-y-2">
              <p>
                I'm a <span className="text-[#0A0A0A] font-medium">Software Engineer</span>, big fan of computers.
              </p>
              <p>
                Got something fun to build?{' '}
                <a 
                  href="mailto:azzakyraihan@gmail.com" 
                  className="text-[#0A0A0A] underline underline-offset-4 decoration-[#D4D4D4] hover:decoration-[#0A0A0A] transition-colors"
                >
                  Let's talk
                </a>
                .
              </p>
            </div>

            {/* Social Icons */}
            <div className="mt-8 flex flex-wrap items-center gap-5">
              {/* GitHub */}
              <a 
                href="https://github.com/glacerous" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="GitHub"
                className="group relative flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 text-[#0A0A0A] hover:opacity-80"
              >
                <svg viewBox="0 0 512 512" fill="currentColor" className="h-[18px] w-[18px]">
                  <path fillRule="evenodd" clipRule="evenodd" d="M256 6.3C114.6 6.3 0 120.9 0 262.3c0 113.3 73.3 209 175 242.9 12.8 2.2 17.6-5.4 17.6-12.2 0-6.1-.3-26.2-.3-47.7-64.3 11.8-81-15.7-86.1-30.1-2.9-7.4-15.4-30.1-26.2-36.2-9-4.8-21.8-16.6-.3-17 20.2-.3 34.6 18.6 39.4 26.2 23 38.7 59.8 27.8 74.6 21.1 2.2-16.6 9-27.8 16.3-34.2-57-6.4-116.5-28.5-116.5-126.4 0-27.8 9.9-50.9 26.2-68.8-2.6-6.4-11.5-32.6 2.6-67.8 0 0 21.4-6.7 70.4 26.2 20.5-5.8 42.2-8.6 64-8.6s43.5 2.9 64 8.6c49-33.3 70.4-26.2 70.4-26.2 14.1 35.2 5.1 61.4 2.6 67.8 16.3 17.9 26.2 40.6 26.2 68.8 0 98.2-59.8 120-116.8 126.4 9.3 8 17.3 23.4 17.3 47.4 0 34.2-.3 61.8-.3 70.4 0 6.7 4.8 14.7 17.6 12.2C438.7 471.3 512 375.3 512 262.3c0-141.4-114.6-256-256-256" />
                </svg>
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0A0A0A] px-2 py-0.5 text-[11px] font-medium text-[#FCFCFB] opacity-0 group-hover:opacity-100 transition-opacity">
                  GitHub
                </span>
              </a>

              {/* LinkedIn */}
              <a 
                href="https://www.linkedin.com/in/azzaky-raihan-ramdhani/" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="LinkedIn"
                className="group relative flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:opacity-85"
              >
                <svg viewBox="0 0 512 512" className="h-[18px] w-[18px]">
                  <path d="M56.9 512h398.2c31.4 0 56.9-25.5 56.9-56.9V56.9C512 25.5 486.5 0 455.1 0H56.9C25.5 0 0 25.5 0 56.9v398.2C0 486.5 25.5 512 56.9 512" fill="#007ebb" />
                  <path d="M440.9 440.9h-76V311.5c0-35.5-13.5-55.3-41.6-55.3-30.5 0-46.5 20.6-46.5 55.3v129.4h-73.2V194.4h73.2v33.2s22-40.7 74.3-40.7 89.7 31.9 89.7 98v156zM116.3 162.1c-24.9 0-45.2-20.4-45.2-45.5s20.2-45.5 45.2-45.5 45.1 20.4 45.1 45.5-20.2 45.5-45.1 45.5M78.5 440.9h76.4V194.4H78.5z" fill="#ffffff" />
                </svg>
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0A0A0A] px-2 py-0.5 text-[11px] font-medium text-[#FCFCFB] opacity-0 group-hover:opacity-100 transition-opacity">
                  LinkedIn
                </span>
              </a>

              {/* Medium */}
              <a 
                href="https://medium.com/@azzakyraihan" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="Medium"
                className="group relative flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 hover:opacity-85"
              >
                <svg viewBox="0 0 1043.63 592.71" className="h-[13px] w-auto fill-[#0A0A0A]">
                  <path d="M588.67,296.36c0,163.67-131.78,296.35-294.33,296.35S0,460,0,296.36,131.78,0,294.34,0,588.67,132.69,588.67,296.36" />
                  <path d="M911.56,296.36c0,154.06-65.89,279-147.17,279s-147.17-124.94-147.17-279,65.88-279,147.16-279,147.17,124.9,147.17,279" />
                  <path d="M1043.63,296.36c0,138-23.17,249.94-51.76,249.94s-51.75-111.91-51.75-249.94S963.29,46.42,991.87,46.42s51.76,111.9,51.76,249.94" />
                </svg>
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0A0A0A] px-2 py-0.5 text-[11px] font-medium text-[#FCFCFB] opacity-0 group-hover:opacity-100 transition-opacity">
                  Medium
                </span>
              </a>
            </div>
          </section>

          {/* Activity Section */}
          <section id="activity" className="scroll-mt-14 sm:scroll-mt-16 w-full pt-14 pb-4 sm:pt-16 sm:pb-6">
            <div className="flex items-center justify-between mb-8">
              <p className="font-mono text-[15px] text-[#8A8A8A]">
                <span className="text-[#B5B5B5]">#</span> activity
              </p>
              <div className="flex items-center gap-2 font-mono text-[13px]">
                <span className="text-[#0A0A0A] font-medium">github</span>
              </div>
            </div>

            <ActivityGraph username="glacerous" />
          </section>

          {/* Projects Section */}
          <section id="projects" className="scroll-mt-14 sm:scroll-mt-16 w-full pt-8 pb-10 sm:pt-10 sm:pb-12">
            <p className="mb-8 font-mono text-[15px] text-[#8A8A8A]">
              <span className="text-[#B5B5B5]">#</span> projects
            </p>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              {projects.map((proj) => (
                <article 
                  key={proj.id}
                  className="group relative flex flex-col overflow-hidden rounded-xl border border-[#E8E8E8] transition-colors duration-300 hover:border-[#A3A3A3] bg-white"
                >
                  {/* Media Preview (Video/GIF/Image) */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-[#E8E8E8] bg-[#F5F5F4]">
                    {proj.media?.kind === 'video' ? (
                      <video 
                        src={proj.media.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <img 
                        src={proj.media?.src || '/projects/himasisfo.png'} 
                        alt={proj.title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <h3 className="text-[16px] font-medium tracking-[-0.01em] text-[#0A0A0A]">
                          {proj.title}
                        </h3>
                        {proj.badge && (
                          <span className="font-mono text-[11px] text-[#525252] bg-[#F5F5F4] border border-[#EBEBEA] px-2 py-0.5 rounded">
                            {proj.badge}
                          </span>
                        )}
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        {proj.links?.site && (
                          <a 
                            href={proj.links.site} 
                            target="_blank" 
                            rel="noreferrer" 
                            aria-label={`${proj.title} live site`}
                            className="flex items-center gap-1 text-[13px] font-medium text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors"
                          >
                            Live
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                        {proj.links?.code && (
                          <a 
                            href={proj.links.code} 
                            target="_blank" 
                            rel="noreferrer" 
                            aria-label={`${proj.title} source on GitHub`}
                            className="inline-flex items-center gap-1 text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors"
                          >
                            <svg viewBox="0 0 512 512" fill="currentColor" className="h-[15px] w-[15px]">
                              <path fillRule="evenodd" clipRule="evenodd" d="M256 6.3C114.6 6.3 0 120.9 0 262.3c0 113.3 73.3 209 175 242.9 12.8 2.2 17.6-5.4 17.6-12.2 0-6.1-.3-26.2-.3-47.7-64.3 11.8-81-15.7-86.1-30.1-2.9-7.4-15.4-30.1-26.2-36.2-9-4.8-21.8-16.6-.3-17 20.2-.3 34.6 18.6 39.4 26.2 23 38.7 59.8 27.8 74.6 21.1 2.2-16.6 9-27.8 16.3-34.2-57-6.4-116.5-28.5-116.5-126.4 0-27.8 9.9-50.9 26.2-68.8-2.6-6.4-11.5-32.6 2.6-67.8 0 0 21.4-6.7 70.4 26.2 20.5-5.8 42.2-8.6 64-8.6s43.5 2.9 64 8.6c49-33.3 70.4-26.2 70.4-26.2 14.1 35.2 5.1 61.4 2.6 67.8 16.3 17.9 26.2 40.6 26.2 68.8 0 98.2-59.8 120-116.8 126.4 9.3 8 17.3 23.4 17.3 47.4 0 34.2-.3 61.8-.3 70.4 0 6.7 4.8 14.7 17.6 12.2C438.7 471.3 512 375.3 512 262.3c0-141.4-114.6-256-256-256" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    <p className="text-[14px] leading-[1.6] text-[#737373]">
                      {proj.description || proj.oneLiner}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
                      {proj.stack.map(tech => (
                        <span 
                          key={tech} 
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#525252] bg-[#F5F5F4] border border-[#EBEBEA] px-2 py-0.5 rounded"
                        >
                          <TechIcon name={tech} className="w-3 h-3 text-[#737373]" />
                          <span>{tech}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          {/* Blogs Section (Accordion list style matching reference) */}
          <section id="blogs" className="scroll-mt-14 sm:scroll-mt-16 w-full pb-10 sm:pb-12">
            <div className="flex items-center justify-between mb-5">
              <p className="font-mono text-[15px] text-[#8A8A8A]">
                <span className="text-[#B5B5B5]">#</span> blogs
              </p>
              <a 
                href="https://medium.com/@azzakyraihan" 
                target="_blank" 
                rel="noreferrer"
                className="font-mono text-xs text-[#8A8A8A] hover:text-[#0A0A0A] inline-flex items-center gap-1 transition-colors"
              >
                medium/@azzakyraihan <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex flex-col divide-y divide-[#E8E8E8]">
              {articles.map((post, idx) => (
                <div key={idx} className="py-3.5 first:pt-0 last:pb-0">
                  <button 
                    type="button"
                    onClick={() => setOpenBlogIdx(openBlogIdx === idx ? null : idx)}
                    className="w-full flex items-center justify-between gap-3 text-left cursor-pointer group select-none py-1 transition-colors"
                  >
                    <span className="text-[14px] sm:text-[14.5px] font-medium text-[#0A0A0A] group-hover:text-neutral-600 transition-colors leading-snug pr-2">
                      {post.title}
                    </span>
                    <div className="shrink-0 text-[#8A8A8A] group-hover:text-[#0A0A0A] transition-colors">
                      <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${openBlogIdx === idx ? 'rotate-180' : ''}`} />
                    </div>
                  </button>

                  {openBlogIdx === idx && (
                    <div className="pt-2 pb-1 text-[13.5px] text-[#737373] leading-relaxed">
                      <p className="mb-2">{post.description}</p>
                      <a 
                        href={post.link}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-mono font-medium text-[#0A0A0A] hover:underline"
                      >
                        Read on Medium <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Experience Section */}
          <section id="experience" className="scroll-mt-14 sm:scroll-mt-16 w-full pb-10 sm:pb-12">
            <p className="mb-6 font-mono text-[15px] text-[#8A8A8A]">
              <span className="text-[#B5B5B5]">#</span> experience
            </p>

            <div className="relative ml-2 sm:ml-2.5 border-l border-[#E8E8E8] pl-5 sm:pl-6 space-y-6">
              {experiences.map((exp, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[25px] sm:-left-[29px] top-1.5 h-2.5 w-2.5 rounded-full border-2 transition-all duration-200 border-[#D4D4D4] bg-[#FCFCFB] group-hover:border-[#0A0A0A]"></div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[14px] sm:text-[14.5px] font-medium text-[#0A0A0A] leading-snug">
                      {exp.role} · {exp.company}
                    </span>
                    <div className="flex items-center gap-2 font-mono text-[11.5px] text-[#8A8A8A]">
                      <span>{exp.period}</span>
                    </div>
                    <ul className="mt-2 space-y-1.5 text-[13px] text-[#737373] leading-relaxed list-disc list-outside pl-3.5">
                      {exp.description.map((item, dIdx) => (
                        <li key={dIdx}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Footer */}
          <footer className="pt-8 pb-12 border-t border-[#E8E8E8] flex flex-col sm:flex-row items-center justify-between text-xs text-[#8A8A8A] gap-4 font-mono">
            <div>
              © {new Date().getFullYear()} Azzaky Raihan Ramdhani
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/glacerous" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">GitHub</a>
              <a href="https://www.linkedin.com/in/azzaky-raihan-ramdhani/" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">LinkedIn</a>
              <a href="https://medium.com/@azzakyraihan" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">Medium</a>
            </div>
          </footer>

        </div>
      </main>
    </div>
  );
};

export default App;
