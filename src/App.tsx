import React, { useState, useEffect } from 'react';
import { 
  Github, 
  Linkedin, 
  BookOpen, 
  ExternalLink, 
  Sun, 
  Moon, 
  ArrowUpRight, 
  Terminal, 
  Calendar,
  Sparkles,
  Rocket,
  ShieldCheck,
  Code2,
  Database
} from 'lucide-react';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { fetchMediumArticles, MediumArticle } from '@/utils/medium';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'light';
  });

  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [loadingArticles, setLoadingArticles] = useState(true);
  const [activityTab, setActivityTab] = useState<'github' | 'backend'>('github');

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    let isMounted = true;
    fetchMediumArticles('azzakyraihan').then(res => {
      if (isMounted) {
        setArticles(res);
        setLoadingArticles(false);
      }
    });
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased transition-colors duration-200">
      <main className="w-full max-w-[740px] mx-auto px-5 sm:px-8 py-8 md:py-14">
        
        {/* Navigation Bar */}
        <header className="flex items-center justify-between pb-12 sm:pb-16">
          <nav className="flex items-center gap-6 sm:gap-8 text-[14px]">
            <a href="#" className="font-semibold text-[var(--ink)] transition-colors">Home</a>
            <a href="#about" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">About</a>
            <a href="#projects" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">Projects</a>
            <a href="#experience" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">Experience</a>
            <a href="#blogs" className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors">Blogs</a>
          </nav>
          
          <button 
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="w-9 h-9 flex items-center justify-center rounded-lg border border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--bg-subtle)] transition-all cursor-pointer"
          >
            {theme === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </header>

        {/* Hero Section */}
        <section id="about" className="space-y-6 pt-2 pb-10">
          <div className="flex flex-wrap items-center gap-3.5 sm:gap-4.5">
            <h1 className="text-3xl sm:text-4xl md:text-[44px] font-bold tracking-tight text-[var(--ink)]">
              Hey, I'm Azzaky
            </h1>
          </div>

          <div className="text-[15px] sm:text-[16px] text-[var(--ink-muted)] leading-relaxed space-y-3.5 font-normal">
            <p>
              I'm a <span className="text-[var(--ink)] font-medium">Backend & Full-Stack Engineer</span>.
            </p>
            <p>
              I build reliable distributed backends, robust database models, and production platforms from data pipelines to <span className="inline-flex items-center text-[var(--ink)] font-medium"><Rocket className="w-3.5 h-3.5 inline mr-1 text-emerald-500" />deployment</span>. 
              I care deeply about software correctness, type-safe API contracts, and defensive testing so bugs <span className="text-[var(--ink)] font-medium">never make it to production</span>.
            </p>
            <p>
              Core technologies: <span className="text-[var(--ink)] font-medium">TypeScript</span>, <span className="text-[var(--ink)] font-medium">Next.js</span>, <span className="text-[var(--ink)] font-medium">Node.js</span>, <span className="text-[var(--ink)] font-medium">PostgreSQL</span>, <span className="text-[var(--ink)] font-medium">Prisma</span>, <span className="text-[var(--ink)] font-medium">Docker</span>, and <span className="text-[var(--ink)] font-medium">Python</span>.
            </p>
            <p>
              Want to build something together? <a href="mailto:azzakyraihan@gmail.com" className="text-[var(--ink)] underline underline-offset-4 decoration-[var(--ink-faint)] hover:decoration-[var(--ink)] font-medium transition-colors">Let's talk</a>. Based in Indonesia.
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4 pt-2">
            <a 
              href="https://github.com/glacerous" 
              target="_blank" 
              rel="noreferrer"
              aria-label="GitHub"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
            <a 
              href="https://www.linkedin.com/in/azzaky-raihan-ramdhani/" 
              target="_blank" 
              rel="noreferrer"
              aria-label="LinkedIn"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--ink-muted)] hover:text-blue-500 hover:border-blue-500 transition-all"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a 
              href="https://medium.com/@azzakyraihan" 
              target="_blank" 
              rel="noreferrer"
              aria-label="Medium"
              className="w-9 h-9 rounded-full flex items-center justify-center border border-[var(--border)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:border-[var(--ink)] transition-all"
            >
              <BookOpen className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Activity & GitHub Contributions */}
        <section className="pt-10 pb-6 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-1.5 font-mono text-[13px] text-[var(--ink-muted)]">
              <span className="text-[var(--ink-faint)]">#</span> activity
            </div>
            <div className="flex items-center gap-2 font-mono text-[13px]">
              <button 
                onClick={() => setActivityTab('github')}
                className={`transition-colors ${activityTab === 'github' ? 'text-[var(--ink)] font-semibold' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'}`}
              >
                github
              </button>
              <span className="text-[var(--ink-faint)]">/</span>
              <button 
                onClick={() => setActivityTab('backend')}
                className={`transition-colors ${activityTab === 'backend' ? 'text-[var(--ink)] font-semibold' : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'}`}
              >
                stack
              </button>
            </div>
          </div>

          {activityTab === 'github' ? (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-4 sm:p-5 overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--border)] text-xs text-[var(--ink-muted)] font-mono">
                <span>@glacerous contributions</span>
                <a 
                  href="https://github.com/glacerous" 
                  target="_blank" 
                  rel="noreferrer" 
                  className="inline-flex items-center gap-1 hover:text-[var(--ink)] transition-colors"
                >
                  View profile <ArrowUpRight className="w-3 h-3" />
                </a>
              </div>
              <div className="pt-4 overflow-x-auto">
                <img 
                  src={`https://ghchart.rshah.org/${theme === 'dark' ? '39d353' : '216e39'}/glacerous`} 
                  alt="glacerous Github Chart"
                  className="w-full min-w-[580px] h-auto select-none"
                  loading="lazy"
                />
              </div>
            </div>
          ) : (
            <div className="rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5 text-sm text-[var(--ink-muted)] grid grid-cols-2 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <div className="font-medium text-[var(--ink)] mb-1 flex items-center gap-1.5">
                  <Database className="w-3.5 h-3.5 text-blue-500" /> Database & ORM
                </div>
                <div className="text-xs">PostgreSQL, Prisma, Redis</div>
              </div>
              <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <div className="font-medium text-[var(--ink)] mb-1 flex items-center gap-1.5">
                  <Code2 className="w-3.5 h-3.5 text-emerald-500" /> API & Backend
                </div>
                <div className="text-xs">Next.js App Router, Express, FastAPI</div>
              </div>
              <div className="p-3 bg-[var(--bg)] rounded-lg border border-[var(--border)]">
                <div className="font-medium text-[var(--ink)] mb-1 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Reliability & QA
                </div>
                <div className="text-xs">Zod Validation, RBAC, CI/CD, Regression Testing</div>
              </div>
            </div>
          )}
        </section>

        {/* Projects Section */}
        <section id="projects" className="pt-12 pb-6 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-[14px] text-[var(--ink-muted)]">
              <span className="text-[var(--ink-faint)]">#</span> projects
            </p>
            <span className="text-xs font-mono text-[var(--ink-faint)]">{projects.length} featured</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {projects.map((proj) => (
              <div 
                key={proj.id}
                className="group flex flex-col justify-between rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] p-5 hover:border-[var(--ink-muted)] hover:shadow-sm transition-all duration-200"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h3 className="font-semibold text-[16px] text-[var(--ink)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {proj.title}
                    </h3>
                    <div className="flex items-center gap-2">
                      {proj.links?.site && (
                        <a 
                          href={proj.links.site} 
                          target="_blank" 
                          rel="noreferrer"
                          aria-label={`${proj.title} website`}
                          className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      )}
                      {proj.links?.code && (
                        <a 
                          href={proj.links.code} 
                          target="_blank" 
                          rel="noreferrer"
                          aria-label={`${proj.title} source code`}
                          className="text-[var(--ink-muted)] hover:text-[var(--ink)] transition-colors"
                        >
                          <Github className="w-4 h-4" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-[13px] text-[var(--ink-muted)] line-clamp-3 leading-relaxed mb-4">
                    {proj.description || proj.oneLiner}
                  </p>
                </div>

                <div>
                  <div className="text-[11px] font-mono text-[var(--ink-faint)] mb-3">
                    {proj.impact}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.stack.slice(0, 4).map((tech) => (
                      <span 
                        key={tech} 
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-[var(--bg)] border border-[var(--border)] text-[var(--ink-muted)]"
                      >
                        {tech}
                      </span>
                    ))}
                    {proj.stack.length > 4 && (
                      <span className="text-[11px] font-mono px-1.5 py-0.5 text-[var(--ink-faint)]">
                        +{proj.stack.length - 4}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="pt-12 pb-6 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <p className="font-mono text-[14px] text-[var(--ink-muted)]">
              <span className="text-[var(--ink-faint)]">#</span> experience
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <div key={index} className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                  <h3 className="font-semibold text-[15px] text-[var(--ink)]">
                    {exp.role} <span className="font-normal text-[var(--ink-muted)]">· {exp.company}</span>
                  </h3>
                  <span className="font-mono text-xs text-[var(--ink-faint)]">{exp.period}</span>
                </div>
                <ul className="list-disc list-outside pl-4 space-y-1.5 text-[13.5px] text-[var(--ink-muted)] leading-relaxed">
                  {exp.description.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Blogs / Medium Section */}
        <section id="blogs" className="pt-12 pb-8 border-t border-[var(--border)]">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <p className="font-mono text-[14px] text-[var(--ink-muted)]">
                <span className="text-[var(--ink-faint)]">#</span> blogs
              </p>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-mono font-medium">
                Live Medium RSS
              </span>
            </div>
            <a 
              href="https://medium.com/@azzakyraihan" 
              target="_blank" 
              rel="noreferrer"
              className="text-xs font-mono text-[var(--ink-muted)] hover:text-[var(--ink)] inline-flex items-center gap-1 transition-colors"
            >
              medium/@azzakyraihan <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {loadingArticles ? (
            <div className="py-8 text-center text-xs font-mono text-[var(--ink-muted)]">
              Loading recent articles from Medium...
            </div>
          ) : (
            <div className="space-y-4">
              {articles.map((post, i) => (
                <a 
                  key={i}
                  href={post.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group block p-4 sm:p-5 rounded-xl border border-[var(--border)] bg-[var(--bg-subtle)] hover:border-[var(--ink-muted)] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2">
                    <h4 className="font-medium text-[15px] text-[var(--ink)] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                      {post.title}
                      <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h4>
                    <span className="font-mono text-xs text-[var(--ink-faint)] shrink-0">
                      {post.pubDate ? new Date(post.pubDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) : "Recent"}
                    </span>
                  </div>
                  <p className="text-[13px] text-[var(--ink-muted)] line-clamp-2 leading-relaxed">
                    {post.description}
                  </p>
                  {post.categories && post.categories.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {post.categories.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--bg)] border border-[var(--border)] text-[var(--ink-faint)]">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Footer */}
        <footer className="pt-14 pb-8 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between text-xs text-[var(--ink-faint)] gap-4 font-mono">
          <div>
            © {new Date().getFullYear()} Azzaky Raihan Ramdhani
          </div>
          <div className="flex items-center gap-4">
            <a href="https://github.com/glacerous" target="_blank" rel="noreferrer" className="hover:text-[var(--ink)] transition-colors">GitHub</a>
            <a href="https://www.linkedin.com/in/azzaky-raihan-ramdhani/" target="_blank" rel="noreferrer" className="hover:text-[var(--ink)] transition-colors">LinkedIn</a>
            <a href="https://medium.com/@azzakyraihan" target="_blank" rel="noreferrer" className="hover:text-[var(--ink)] transition-colors">Medium</a>
          </div>
        </footer>

      </main>
    </div>
  );
};

export default App;
