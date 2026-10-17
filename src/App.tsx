import React, { useState, useEffect } from 'react';
import { 
  ArrowUpRight, 
  ChevronDown,
  Copy,
  Check
} from 'lucide-react';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import { fetchMediumArticles, MediumArticle } from '@/utils/medium';
import { ActivityGraph } from '@/components/ActivityGraph';
import { TechIcon } from '@/components/TechIcon';
import { 
  NexvynReachArrow, 
  HandwrittenNote,
  HandDrawnArrow
} from '@/components/common/Doodles';

interface CopyContactProps {
  text: string;
  copyValue: string;
  label: string;
  className?: string;
}

const XLogo: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" aria-hidden="true" fill="currentColor" className={className}>
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const VerifiedBadge: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg viewBox="0 0 24 24" aria-label="Verified account" className={className}>
    <g>
      <path
        d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.9-.81-3.91s-2.52-1.27-3.91-.81c-.66-1.31-1.91-2.19-3.34-2.19s-2.67.88-3.33 2.19c-1.4-.46-2.91-.2-3.92.81s-1.26 2.52-.8 3.91c-1.31.67-2.2 1.91-2.2 3.34s.89 2.67 2.2 3.34c-.46 1.39-.21 2.9.8 3.91s2.52 1.26 3.91.81c.67 1.31 1.91 2.19 3.34 2.19s2.68-.88 3.34-2.19c1.39.45 2.9.2 3.91-.81s1.27-2.52.81-3.91c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2L6.8 12.46l1.41-1.42 2.26 2.26 4.8-5.23 1.47 1.36-6.2 6.77z"
        fill="#1D9BF0"
      />
    </g>
  </svg>
);

const TwitterHoverCard: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const timeoutRef = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleMouseEnter = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsOpen(false);
    }, 180);
  };

  return (
    <span
      className="relative inline-block group"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <a
        href="https://x.com/thefuturehold"
        target="_blank"
        rel="noreferrer"
        className="relative inline-flex items-center text-[#2563EB] font-medium transition-colors hover:text-[#1d4ed8]"
        onFocus={() => setIsOpen(true)}
        onBlur={() => setIsOpen(false)}
      >
        <span>Twitter</span>

        {/* Floating tilted X logo badge above top-right - appears ONLY on hover */}
        <span
          aria-hidden="true"
          className="absolute -top-2.5 -right-2.5 h-3.5 w-3.5 -translate-x-1 translate-y-1 scale-[0.8] rotate-[-8deg] text-[#0A0A0A] opacity-0 blur-[1px] transition-all duration-200 ease-out group-hover:translate-x-0 group-hover:translate-y-0 group-hover:scale-110 group-hover:rotate-[4deg] group-hover:opacity-100 group-hover:blur-none pointer-events-none select-none"
        >
          <XLogo className="w-full h-full" />
        </span>

        {/* Wavy scribble underline */}
        <svg
          className="absolute -bottom-1 left-0 w-full h-[6px] text-[#2563EB] overflow-visible pointer-events-none"
          viewBox="0 0 60 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 5.5C12 2 22 7.5 33 4C42 1 50 6.5 59 3"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </a>

      {/* Floating Profile Card */}
      <span
        role="dialog"
        aria-label="Twitter Profile Preview"
        className={`absolute left-0 sm:left-1/2 sm:-translate-x-1/2 top-full mt-2.5 z-50 w-[270px] rounded-2xl bg-white p-4 border border-[#E5E5E5] shadow-[0_12px_32px_rgba(0,0,0,0.12)] text-left transition-all duration-200 ease-out origin-top block ${
          isOpen
            ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 scale-95 -translate-y-1 pointer-events-none'
        }`}
      >
        {/* Top row: Avatar + X logo */}
        <span className="flex items-start justify-between">
          <a
            href="https://x.com/thefuturehold"
            target="_blank"
            rel="noreferrer"
            className="block rounded-full focus:outline-none focus:ring-2 focus:ring-[#1D9BF0]"
          >
            <img
              src="https://avatars.githubusercontent.com/u/167007103?v=4"
              alt="zak"
              className="w-14 h-14 rounded-full border border-black/10 object-cover bg-neutral-100 shadow-sm transition-transform hover:scale-105"
            />
          </a>
          <a
            href="https://x.com/thefuturehold"
            target="_blank"
            rel="noreferrer"
            aria-label="Visit @thefuturehold on X"
            className="text-[#737373] hover:text-[#0A0A0A] p-1 transition-colors"
          >
            <XLogo className="w-4 h-4" />
          </a>
        </span>

        {/* User Name & Handle */}
        <span className="mt-2.5 block">
          <a
            href="https://x.com/thefuturehold"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1 font-semibold text-[15.5px] text-[#0A0A0A] hover:underline leading-tight"
          >
            <span>zak</span>
            <VerifiedBadge className="w-4 h-4 text-[#1D9BF0] flex-shrink-0" />
          </a>
          <span className="text-[13px] text-[#737373] leading-tight mt-0.5 font-normal block">
            @thefuturehold
          </span>
        </span>

        {/* Bio & Link - strictly lowercase */}
        <span className="mt-3 text-[13.5px] text-[#0A0A0A] leading-snug space-y-0.5 font-normal lowercase block">
          <span className="block">i do tech</span>
          <a
            href="https://github.com/glacerous"
            target="_blank"
            rel="noreferrer"
            className="text-[#1D9BF0] hover:underline inline-block lowercase"
          >
            github.com/glacerous
          </a>
        </span>

        {/* Stats */}
        <span className="mt-3.5 pt-1 flex items-center gap-4 text-[13px] text-[#737373] font-normal">
          <span>
            <strong className="font-semibold text-[#0A0A0A]">51</strong> Following
          </span>
          <span>
            <strong className="font-semibold text-[#0A0A0A]">604</strong> Followers
          </span>
        </span>
      </span>
    </span>
  );
};

const CopyContact: React.FC<CopyContactProps> = ({ text, copyValue, label, className = '' }) => {
  const [copied, setCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(copyValue);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isVisible = isHovered || copied;

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        type="button"
        onClick={handleCopy}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        aria-label={`Copy ${copyValue}`}
        className={`text-[#0A0A0A] underline underline-offset-4 decoration-[#D4D4D4] hover:decoration-[#0A0A0A] transition-colors font-medium cursor-pointer ${className}`}
      >
        {text}
      </button>

      {/* Floating Copy Tooltip (matches nexvyn design) */}
      <span
        role="tooltip"
        className={`pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-1.5 whitespace-nowrap rounded-lg bg-white border border-[#E5E5E5] px-2.5 py-1 text-[11.5px] font-sans font-medium text-[#0A0A0A] shadow-[0_2px_8px_rgba(0,0,0,0.08)] transition-all duration-150 ${
          isVisible
            ? 'opacity-100 translate-y-0 scale-100'
            : 'opacity-0 translate-y-1 scale-95'
        }`}
      >
        {copied ? (
          <>
            <Check className="w-3.5 h-3.5 text-emerald-600" />
            <span>Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3.5 h-3.5 text-[#737373]" />
            <span>{label}</span>
          </>
        )}
      </span>
    </span>
  );
};

export const App: React.FC = () => {
  const [articles, setArticles] = useState<MediumArticle[]>([]);
  const [openBlogIdx, setOpenBlogIdx] = useState<number | null>(null);

  useEffect(() => {
    fetchMediumArticles('azzakyraihan').then(res => {
      setArticles(res);
    });
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (targetId === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const el = document.querySelector(targetId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FCFCFB] text-[#0A0A0A] selection:bg-[#0A0A0A] selection:text-[#FCFCFB] antialiased overflow-x-hidden">
      <main className="min-h-screen w-full flex flex-col items-center px-6 sm:px-8">
        <div className="w-full max-w-[720px]">
          
          {/* Header Navigation */}
          <header className="w-full pt-8 pb-14 flex items-center justify-between">
            <nav className="flex items-center gap-7 text-[14px]">
              <a href="#" onClick={(e) => handleNavClick(e, '#')} className="font-medium text-[#0A0A0A] transition-colors">Home</a>
              <a href="#about" onClick={(e) => handleNavClick(e, '#about')} className="font-normal text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors">About</a>
              <a href="#projects" onClick={(e) => handleNavClick(e, '#projects')} className="font-normal text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors">Projects</a>
              <a href="#experience" onClick={(e) => handleNavClick(e, '#experience')} className="font-normal text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors">Experience</a>
              <a href="#blogs" onClick={(e) => handleNavClick(e, '#blogs')} className="font-normal text-[#8A8A8A] hover:text-[#0A0A0A] transition-colors">Blogs</a>
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
              
              <div>
                <span className="relative inline-block">
                  <span>Got something fun to build? Reach out on&nbsp;</span>
                  <TwitterHoverCard />
                  <span>,&nbsp;email me at&nbsp;</span>
                  <CopyContact 
                    text="azzakyraihan@gmail.com" 
                    copyValue="azzakyraihan@gmail.com" 
                    label="Copy email" 
                  />
                  <span>.</span>

                  {/* Hand-drawn note & arrow pointing to contact - strictly on the same line */}
                  <span className="hidden sm:inline-flex items-center gap-1.5 absolute left-[calc(100%+12px)] top-1/2 -translate-y-1/2 whitespace-nowrap text-[#2563EB] select-none pointer-events-none">
                    <HandDrawnArrow direction="left" className="w-5 h-3 text-[#2563EB]" />
                    <span className="font-handwriting text-[#2563EB] text-[18px] sm:text-[19px] rotate-[-3deg]">
                      feel free to reach out
                    </span>
                  </span>
                </span>
              </div>
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

              {/* X (Twitter) */}
              <a 
                href="https://x.com/thefuturehold" 
                target="_blank" 
                rel="noreferrer" 
                aria-label="X (Twitter)"
                className="group relative flex items-center justify-center transition-all duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 text-[#0A0A0A] hover:opacity-80"
              >
                <XLogo className="h-[16px] w-[16px]" />
                <span className="pointer-events-none absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-[#0A0A0A] px-2 py-0.5 text-[11px] font-medium text-[#FCFCFB] opacity-0 group-hover:opacity-100 transition-opacity">
                  X
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
                  className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#E8E8E8] transition-all duration-300 hover:border-[#C8C8C8] hover:shadow-[0_4px_24px_-6px_rgba(0,0,0,0.06)] bg-white"
                >
                  {/* Media Preview (Video/GIF/Image) */}
                  <div className="relative aspect-video w-full overflow-hidden border-b border-[#E8E8E8] bg-[#F5F5F4]">
                    {proj.media?.kind === 'video' ? (
                      <video 
                        src={proj.media.src}
                        autoPlay
                        loop
                        muted
                        playsInline
                        className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                          proj.media.fit === 'contain' ? 'object-contain' : 'object-cover'
                        } ${
                          proj.media.position === 'top'
                            ? 'object-top'
                            : proj.media.position === 'bottom'
                            ? 'object-bottom'
                            : 'object-center'
                        }`}
                      />
                    ) : (
                      <img 
                        src={proj.media?.src || '/projects/himasisfo.png'} 
                        alt={proj.title}
                        loading="lazy"
                        className={`h-full w-full transition-transform duration-500 ease-out group-hover:scale-[1.03] ${
                          proj.media?.fit === 'contain' ? 'object-contain' : 'object-cover'
                        } ${
                          proj.media?.position === 'center'
                            ? 'object-center'
                            : proj.media?.position === 'bottom'
                            ? 'object-bottom'
                            : 'object-top'
                        }`}
                      />
                    )}
                  </div>

                  <div className="flex flex-1 flex-col gap-3 p-5">
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2">
                        <h3 className="text-[16px] font-medium tracking-[-0.01em] text-[#0A0A0A] transition-colors">
                          {proj.title}
                        </h3>
                        {proj.id === 'vora' && (
                          <span className="font-handwriting text-[#2563EB] text-[19px] sm:text-[20px] -rotate-2 select-none font-medium ml-2">
                            award winner
                          </span>
                        )}
                        {proj.id === 'krslab' && (
                          <span className="font-handwriting text-[#2563EB] text-[19px] sm:text-[20px] -rotate-2 select-none font-medium ml-2">
                            1k+ users
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

                    <p className="text-[14px] leading-[1.65] text-[#525252]">
                      {proj.id === 'vora' ? (
                        <>
                          AI-powered forest carbon estimation platform.{' '}
                          <span className="text-[#0A0A0A] font-medium">
                            One of 60 prize-winning projects (+$800 non-cash prize) at Earth Forward (NextStep Hacks Year 6), out of 279 submissions from 1,000+ participants worldwide.
                          </span>{' '}
                          Reconstructs high-fidelity 3D tree models from footage using 3D Gaussian Splatting to estimate biomass storage.
                        </>
                      ) : proj.id === 'krslab' ? (
                        <>
                          Academic course planning platform{' '}
                          <span className="text-[#0A0A0A] font-medium">
                            actively used by 1,000+ students per semester KRS cycle.
                          </span>{' '}
                          Leverages dependency graphs and constraint modeling to validate prerequisite rules, resolve schedule clashes, and enforce credit load limits in real time.
                        </>
                      ) : proj.id === 'himasisfo' ? (
                        <>
                          Production web platform for the Information Systems student association.{' '}
                          <span className="text-[#0A0A0A] font-medium">
                            Built within a 30+ person team collaborating across Backend, Frontend, and UI/UX divisions
                          </span>{' '}
                          to deliver student membership, content publishing, and organization workflows.
                        </>
                      ) : (
                        proj.description || proj.oneLiner
                      )}
                    </p>

                    <div className="mt-auto flex flex-wrap items-center gap-1.5 pt-3">
                      {proj.stack.map(tech => (
                        <span 
                          key={tech} 
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] text-[#525252] bg-[#F5F5F4] border border-[#EBEBEA] px-2 py-0.5 rounded-md"
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
                      {exp.description.map((item, dIdx) => {
                        // Make himasisfoupnvy.com clickable with subtle underline
                        if (item.includes('himasisfoupnvy.com')) {
                          const parts = item.split('himasisfoupnvy.com');
                          return (
                            <li key={dIdx}>
                              {parts[0]}
                              <a
                                href="https://www.himasisfoupnvy.com"
                                target="_blank"
                                rel="noreferrer"
                                className="text-[#0A0A0A] underline underline-offset-2 decoration-[#D4D4D4] hover:decoration-[#0A0A0A] transition-colors"
                              >
                                himasisfoupnvy.com
                              </a>
                              {parts[1]}
                            </li>
                          );
                        }
                        return <li key={dIdx}>{item}</li>;
                      })}
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
              <a href="https://x.com/thefuturehold" target="_blank" rel="noreferrer" className="hover:text-[#0A0A0A] transition-colors">X</a>
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
