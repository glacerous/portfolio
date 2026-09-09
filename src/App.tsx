import React, { useState, useEffect, useRef } from 'react';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import soundManager from '@/utils/sound';

// Icons
import windowExplorerIcon from '@/assets/icons/windowExplorerIcon.png';
import myComputerIcon from '@/assets/icons/myComputer.png';
import showcaseIcon from '@/assets/icons/showcaseIcon.png';
import windowResizeIcon from '@/assets/icons/windowResize.png';
import closeIcon from '@/assets/icons/close.png';
import maximizeIcon from '@/assets/icons/maximize.png';
import minimizeIcon from '@/assets/icons/minimize.png';
import windowsStartIcon from '@/assets/icons/windowsStartIcon.png';
import printerIcon from '@/assets/icons/printer.gif';
import volumeOnIcon from '@/assets/icons/volumeOn.png';
import volumeOffIcon from '@/assets/icons/volumeOff.png';

// Pictures
import softwareIcon from '@/assets/pictures/projects/software.gif';
import ghIcon from '@/assets/pictures/contact-gh.png';
import inIcon from '@/assets/pictures/contact-in.png';
import forHireGif from '@/assets/pictures/forHireGif.gif';

type TabType = 'about' | 'experience' | 'projects' | 'contact';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('about');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [isStartOpen, setIsStartOpen] = useState(false);
  const [activeLink, setActiveLink] = useState<string | null>(null);
  const [isMuted, setIsMuted] = useState(false);

  const contentRef = useRef<HTMLDivElement>(null);

  // Auto scroll to top on tab change
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTo({ top: 0, behavior: 'instant' });
    }
  }, [activeTab]);

  // Live Windows 95 System Clock
  const [time, setTime] = useState(() => {
    const d = new Date();
    let hours = d.getHours();
    const minutes = d.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;
    const mins = minutes < 10 ? '0' + minutes : minutes;
    return `${hours}:${mins} ${ampm}`;
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const d = new Date();
      let hours = d.getHours();
      const minutes = d.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12 || 12;
      const mins = minutes < 10 ? '0' + minutes : minutes;
      setTime(`${hours}:${mins} ${ampm}`);
    }, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleNavClick = (tab: TabType) => {
    setActiveLink(tab);
    setTimeout(() => {
      setActiveTab(tab);
      setActiveLink(null);
    }, 100);
  };

  const openApp = (tab: TabType) => {
    setIsMinimized(false);
    setActiveTab(tab);
  };

  const handleToggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newMute = soundManager.toggleMute();
    setIsMuted(newMute);
  };

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-[#3e9697] select-none flex flex-col">
      {/* CRT Scanline and Vignette Atmosphere Overlay */}
      <div className="crt-overlay" />

      {/* Desktop Canvas */}
      <div 
        className="flex-1 relative overflow-hidden" 
        onClick={() => isStartOpen && setIsStartOpen(false)}
      >
        {/* Desktop Shortcuts */}
        <div className="absolute top-5 left-5 flex flex-col gap-6 z-0">
          <div
            className="flex flex-col items-center w-20 cursor-pointer group"
            onDoubleClick={() => openApp('about')}
            onClick={() => openApp('about')}
          >
            <img src={windowExplorerIcon} alt="Showcase" className="w-8 h-8 [image-rendering:pixelated]" />
            <span className="mt-1 text-xs text-white px-1 font-['MSSerif'] text-center border border-transparent group-hover:border-dotted group-hover:border-white group-hover:bg-[#0000a3]">
              Showcase
            </span>
          </div>
        </div>

        {/* Main Retro Window */}
        {!isMinimized && (
          <div
            className={`absolute z-10 win-border-outer bg-[#c3c6ca] flex flex-col ${
              isMaximized
                ? 'top-0 left-0 w-full h-[calc(100%-28px)]'
                : 'top-3 left-3 right-3 bottom-10 md:top-6 md:left-24 md:right-16 md:bottom-12 max-w-[1100px] mx-auto shadow-2xl'
            }`}
          >
            <div className="win-border-inner flex flex-col flex-1 p-[2px] overflow-hidden">
              {/* Window Header / Title Bar */}
              <div className="bg-[#0000a3] h-[20px] flex items-center justify-between px-1 shrink-0">
                <div className="flex items-center gap-1.5 overflow-hidden">
                  <img src={windowExplorerIcon} alt="" className="w-4 h-4 [image-rendering:pixelated]" />
                  <span className="showcase-header truncate">
                    Azzaky Raihan - Showcase 2026
                  </span>
                </div>
                {/* Control Buttons with double bevel */}
                <div className="flex items-center gap-0.5 shrink-0 ml-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="w-[16px] h-[14px] bg-[#c3c6ca] border border-black border-t-white border-l-white flex items-center justify-center p-[1px] active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                    title="Minimize"
                  >
                    <div className="w-[12px] h-[12px] border border-[#86898d] border-t-[#c3c6ca] border-l-[#c3c6ca] flex items-center justify-center">
                      <img src={minimizeIcon} alt="_" className="[image-rendering:pixelated]" />
                    </div>
                  </button>
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="w-[16px] h-[14px] bg-[#c3c6ca] border border-black border-t-white border-l-white flex items-center justify-center p-[1px] active:border-t-black active:border-l-black active:border-b-white active:border-r-white"
                    title="Maximize"
                  >
                    <div className="w-[12px] h-[12px] border border-[#86898d] border-t-[#c3c6ca] border-l-[#c3c6ca] flex items-center justify-center">
                      <img src={maximizeIcon} alt="[]" className="[image-rendering:pixelated]" />
                    </div>
                  </button>
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="w-[16px] h-[14px] bg-[#c3c6ca] border border-black border-t-white border-l-white flex items-center justify-center p-[1px] active:border-t-black active:border-l-black active:border-b-white active:border-r-white ml-0.5"
                    title="Close"
                  >
                    <div className="w-[12px] h-[12px] border border-[#86898d] border-t-[#c3c6ca] border-l-[#c3c6ca] flex items-center justify-center">
                      <img src={closeIcon} alt="X" className="[image-rendering:pixelated]" />
                    </div>
                  </button>
                </div>
              </div>

              {/* Window Content Frame */}
              <div className="flex-1 my-[6px] win-inset-panel overflow-hidden relative bg-white flex flex-col min-h-0">
                <div className="win-content-inner flex-1 flex relative overflow-hidden bg-white min-h-0">
                  {/* Left Navigation Sidebar */}
                  <div className="w-[260px] md:w-[280px] h-full p-8 md:p-10 shrink-0 bg-white flex flex-col justify-between select-none overflow-hidden hidden md:flex border-r border-[#d0d0d0]">
                    <div>
                      {/* Header */}
                      <div className="mb-10">
                        <h1 className="text-[38px] leading-[0.9] text-black">
                          Azzaky
                        </h1>
                        <h1 className="text-[38px] leading-[0.9] text-black">
                          Raihan
                        </h1>
                        <h3 className="showcase-header !text-black !text-[15px] mt-2">
                          Showcase '26
                        </h3>
                      </div>

                      {/* Navigation Links */}
                      <nav className="flex flex-col gap-6">
                        {(['about', 'experience', 'projects', 'contact'] as TabType[]).map((tab) => {
                          const isCurrent = activeTab === tab;
                          const isActiveClicked = activeLink === tab;
                          return (
                            <button
                              key={tab}
                              onClick={() => handleNavClick(tab)}
                              className="flex items-center text-left group focus:outline-none w-fit cursor-pointer"
                            >
                              {isCurrent && (
                                <div className="w-[5px] h-[5px] rounded-full border-[3px] border-[rgb(85,26,139)] mr-2 shrink-0" />
                              )}
                              <h4
                                className={`font-bold uppercase underline underline-offset-2 ${
                                  isActiveClicked
                                    ? '!text-red-600'
                                    : isCurrent
                                    ? '!text-[rgb(85,26,139)]'
                                    : '!text-[#0000ee] hover:!text-red-600'
                                }`}
                              >
                                {tab}
                              </h4>
                            </button>
                          );
                        })}
                      </nav>
                    </div>

                    {/* Left Bottom Status & For Hire */}
                    <div>
                      <div 
                        onClick={() => handleNavClick('contact')} 
                        className="cursor-pointer mb-2 hover:opacity-85"
                        title="Click to contact me!"
                      >
                        <img src={forHireGif} alt="For Hire" className="w-[130px] [image-rendering:pixelated]" />
                      </div>
                    </div>
                  </div>

                  {/* Scrollable Main Content Area */}
                  <div 
                    ref={contentRef}
                    className="site-page-content"
                  >
                    {/* Mobile Navigation bar */}
                    <div className="flex md:hidden gap-4 pb-3 mb-6 border-b border-[#c3c6ca] overflow-x-auto shrink-0">
                      {(['about', 'experience', 'projects', 'contact'] as TabType[]).map((tab) => (
                        <button
                          key={tab}
                          onClick={() => handleNavClick(tab)}
                          className={`text-sm font-bold uppercase underline whitespace-nowrap ${
                            activeTab === tab ? 'text-[rgb(85,26,139)]' : 'text-[#0000ee]'
                          }`}
                        >
                          {tab}
                        </button>
                      ))}
                    </div>

                    {/* TAB: ABOUT */}
                    {activeTab === 'about' && (
                      <div className="max-w-[720px] text-black pb-12">
                        <h1 style={{ marginLeft: -8 }}>Welcome</h1>
                        <h3>I'm Azzaky Raihan</h3>
                        <br />

                        <div className="text-block">
                          <p>
                            I'm a software engineer specializing in backend architecture, cloud infrastructure, and platform systems.
                          </p>
                          <br />
                          <p>
                            Thank you for taking the time to check out my portfolio. I really hope you enjoy exploring it. If you have any questions or comments, feel free to contact me using{' '}
                            <button
                              onClick={() => handleNavClick('contact')}
                              className="text-[#0000ee] underline hover:text-red-600 inline font-bold cursor-pointer"
                            >
                              this form
                            </button>{' '}
                            or shoot me an email at{' '}
                            <a href="mailto:azzakyraihan@gmail.com" className="text-[#0000ee] underline hover:text-red-600">
                              azzakyraihan@gmail.com
                            </a>.
                          </p>
                        </div>

                        {/* Resume Printer Download Box */}
                        <div className="bg-white p-3 border-2 border-black border-l-0 border-r-0 w-full flex items-center my-6">
                          <img src={printerIcon} alt="printer" className="w-14 h-12 pr-6 object-contain [image-rendering:pixelated]" />
                          <div className="flex flex-col">
                            <h3 className="text-[20px]">Looking for my resume?</h3>
                            <a
                              href="mailto:azzakyraihan@gmail.com?subject=Resume%20Inquiry"
                              className="text-[#0000ee] underline hover:text-red-600"
                            >
                              <p className="text-[17px]">Click here to download it!</p>
                            </a>
                          </div>
                        </div>

                        <div className="text-block">
                          <h3>About Me</h3>
                          <br />
                          <p>
                            From a young age, I have had an obsessive curiosity about how things worked under the surface. This fascination steered me from Earth Science Olympiads and competitive programming into backend development, distributed architecture, and data pipelines.
                          </p>
                          <br />

                          <p>
                            I build scalable backends with TypeScript, Go, Python, and Node.js, combined with robust relational modeling in PostgreSQL and high-throughput caches with Redis. I am also deeply interested in containerization, Kubernetes orchestration, and AI model serving.
                          </p>
                          <br />

                          <div className="my-4">
                            <div className="text-justify">
                              <h3>My Focus Areas</h3>
                              <br />
                              <p>
                                Beyond software engineering, I explore machine learning allometrics, cloud orchestration, and interactive web tools. I love solving tough architectural bottlenecks and creating performant user-focused applications.
                              </p>
                            </div>
                          </div>
                          <br />
                          <p>
                            Thanks for reading about me! If you have any questions, feel free to reach out through the{' '}
                            <button onClick={() => handleNavClick('contact')} className="text-[#0000ee] underline hover:text-red-600 font-bold cursor-pointer">
                              contact page
                            </button>.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* TAB: PROJECTS */}
                    {activeTab === 'projects' && (
                      <div className="max-w-[760px] text-black pb-12">
                        <h1>Projects</h1>
                        <h3>& Engineering Ventures</h3>
                        <br />
                        <p>
                          Below are some of my favorite software systems and infrastructure projects I have architected and deployed over the last few years.
                        </p>
                        <br />

                        {/* Big Button Container for Software */}
                        <div className="big-button-container flex items-center justify-between mb-8">
                          <div className="flex items-center gap-6">
                            <img src={softwareIcon} alt="Software" className="w-14 h-14 [image-rendering:pixelated]" />
                            <div>
                              <h1 className="!text-[36px] md:!text-[44px]">Software</h1>
                              <h3>SELECTED REPOSITORIES</h3>
                            </div>
                          </div>
                        </div>

                        {/* Projects Breakdown */}
                        <div className="space-y-12">
                          {projects.map((proj, idx) => (
                            <div key={proj.id} className="text-block border-b border-[#808080] pb-8">
                              <h2>{proj.title}</h2>
                              <h4 className="text-[#555] mt-1">
                                {proj.role} - {proj.year} [{proj.category}]
                              </h4>
                              <br />
                              <p>{proj.description}</p>
                              <br />

                              {proj.media && proj.media.src && (
                                <div className="captioned-image my-2">
                                  {proj.media.kind === 'video' ? (
                                    <video
                                      src={proj.media.src}
                                      autoPlay
                                      loop
                                      muted
                                      playsInline
                                      className="border border-black max-h-[360px] object-cover bg-black"
                                    />
                                  ) : (
                                    <img
                                      src={proj.media.src}
                                      alt={proj.title}
                                      className="border border-black max-h-[360px] object-cover"
                                    />
                                  )}
                                  <p className="mt-1 text-xs">
                                    <sub>
                                      <b>Figure {idx + 1}:</b> {proj.impact || proj.oneLiner}
                                    </sub>
                                  </p>
                                </div>
                              )}

                              <h3>Links:</h3>
                              <ul className="mt-2">
                                {proj.links?.site && (
                                  <li>
                                    <a href={proj.links.site} target="_blank" rel="noreferrer" className="text-[#0000ee] underline hover:text-red-600">
                                      <p><b>[Live Application]</b> - {proj.links.site}</p>
                                    </a>
                                  </li>
                                )}
                                {proj.links?.code && (
                                  <li>
                                    <a href={proj.links.code} target="_blank" rel="noreferrer" className="text-[#0000ee] underline hover:text-red-600">
                                      <p><b>[GitHub Repository]</b> - {proj.links.code}</p>
                                    </a>
                                  </li>
                                )}
                              </ul>

                              <p className="text-xs font-['Terminal',monospace] text-[#555]">
                                <b>TECH STACK:</b> {proj.stack.join(' / ')}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* TAB: EXPERIENCE */}
                    {activeTab === 'experience' && (
                      <div className="max-w-[740px] text-black pb-12">
                        <div className="bg-white p-3 border-2 border-black border-l-0 border-r-0 w-full flex items-center mb-8">
                          <img src={printerIcon} alt="printer" className="w-14 h-12 pr-6 object-contain [image-rendering:pixelated]" />
                          <div className="flex flex-col">
                            <h3 className="text-[20px]">Looking for my resume?</h3>
                            <a
                              href="mailto:azzakyraihan@gmail.com?subject=Resume%20Inquiry"
                              className="text-[#0000ee] underline hover:text-red-600"
                            >
                              <p className="text-[17px]">Click here to download it!</p>
                            </a>
                          </div>
                        </div>

                        {experiences.map((exp, idx) => (
                          <div key={exp.company + idx} className="text-block border-b border-[#808080] pb-8 mb-8">
                            <div className="flex flex-wrap justify-between items-baseline mb-2">
                              <h1>{exp.company}</h1>
                              <h4 className="text-[#555]">{exp.period}</h4>
                            </div>
                            <div className="flex justify-between items-baseline mb-4">
                              <h3>{exp.role}</h3>
                            </div>
                            <ul>
                              {exp.description.map((bullet, bIdx) => (
                                <li key={bIdx}>
                                  <p>{bullet}</p>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* TAB: CONTACT */}
                    {activeTab === 'contact' && (
                      <div className="max-w-[700px] text-black pb-12">
                        <div className="flex justify-between items-center mb-6">
                          <h1>Contact</h1>
                          <div className="flex gap-4">
                            <a href="https://github.com/glacerous" target="_blank" rel="noreferrer">
                              <div className="big-button-container p-2.5">
                                <img src={ghIcon} alt="GitHub" className="w-8 h-8" />
                              </div>
                            </a>
                            <a href="https://www.linkedin.com" target="_blank" rel="noreferrer">
                              <div className="big-button-container p-2.5">
                                <img src={inIcon} alt="LinkedIn" className="w-8 h-8" />
                              </div>
                            </a>
                          </div>
                        </div>

                        <div className="text-block">
                          <p>
                            Feel free to reach out directly for fulltime roles, contract engineering, or architectural consulting. You can contact me directly via email or the form below.
                          </p>
                          <br />
                          <p>
                            <b>Email: </b>
                            <a href="mailto:azzakyraihan@gmail.com" className="text-[#0000ee] underline hover:text-red-600">
                              azzakyraihan@gmail.com
                            </a>
                          </p>
                          <br />

                          <form onSubmit={(e) => { e.preventDefault(); alert('Message sent successfully!'); }} className="space-y-4">
                            <div>
                              <label><p><b>Your name:</b></p></label>
                              <input type="text" placeholder="Name" required />
                            </div>
                            <div>
                              <label><p><b>Email:</b></p></label>
                              <input type="email" placeholder="Email" required />
                            </div>
                            <div>
                              <label><p><b>Message:</b></p></label>
                              <textarea placeholder="Your message here..." required></textarea>
                            </div>
                            <div>
                              <button type="submit" className="site-button font-bold">
                                Send Message
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Authentic Windows 95 4-Panel Status Bar */}
              <div className="h-[22px] flex items-center font-['MSSerif'] text-black px-0.5 pb-0.5 gap-[2px] shrink-0 select-none">
                <div className="win-inset h-full flex-[5] flex items-center px-1.5 overflow-hidden">
                  <p className="text-[12px] font-['MSSerif'] text-black truncate">
                    © Copyright 2026 Azzaky Raihan
                  </p>
                </div>
                <div className="win-inset h-full w-[16px]" />
                <div className="win-inset h-full w-[16px]" />
                <div className="win-inset h-full flex-[2] flex items-center justify-end px-0.5">
                  <img src={windowResizeIcon} alt="" className="w-3 h-3 [image-rendering:pixelated]" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Windows 95 Taskbar */}
      <div className="h-[28px] bg-[#c3c6ca] win-border-outer border-b-0 border-l-0 border-r-0 flex items-center justify-between px-1 z-30 shrink-0 select-none">
        <div className="flex items-center gap-1.5 h-full py-0.5">
          {/* Start Button */}
          <button
            onClick={() => setIsStartOpen(!isStartOpen)}
            className={`h-[22px] px-2 flex items-center gap-1.5 win-border-outer bg-[#c3c6ca] ${
              isStartOpen ? 'border-t-black border-l-black border-b-white border-r-white bg-[#b0b0b0]' : ''
            }`}
          >
            <img src={windowsStartIcon} alt="" className="w-4 h-4 [image-rendering:pixelated]" />
            <span className="toolbar-text font-bold text-[14px]">
              Start
            </span>
          </button>

          {/* Taskbar Window Button */}
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className={`h-[22px] px-3 max-w-[220px] flex items-center gap-1.5 win-border-outer text-left truncate ${
              !isMinimized ? 'border-t-black border-l-black border-b-white border-r-white bg-[#dfdfdf] font-bold' : 'bg-[#c3c6ca]'
            }`}
          >
            <img src={windowExplorerIcon} alt="" className="w-3.5 h-3.5 shrink-0 [image-rendering:pixelated]" />
            <span className="font-['MSSerif'] text-[12px] text-black truncate">
              Azzaky Raihan - Showcase
            </span>
          </button>
        </div>

        {/* System Tray with Audio Toggle & Clock */}
        <div className="win-inset px-2.5 py-0.5 text-[12px] font-['MSSerif'] text-black flex items-center gap-2">
          <button
            onClick={handleToggleMute}
            className="hover:opacity-75 cursor-pointer flex items-center"
            title={isMuted ? "Unmute sound" : "Mute sound"}
          >
            <img 
              src={isMuted ? volumeOffIcon : volumeOnIcon} 
              alt="Volume" 
              className="w-3.5 h-3.5 [image-rendering:pixelated]" 
            />
          </button>
          <span>{time}</span>
        </div>
      </div>

      {/* Start Menu Popup */}
      {isStartOpen && (
        <div className="absolute bottom-[28px] left-0 w-[220px] bg-[#c3c6ca] win-border-outer shadow-2xl z-40 flex">
          {/* Vertical Banner */}
          <div className="w-8 bg-gradient-to-t from-[#000055] to-[#0000a3] p-1 flex items-end justify-center">
            <span className="text-white font-['lores-15-bold-alt-oakland','Terminal',monospace] text-base -rotate-90 origin-bottom-left whitespace-nowrap mb-2 tracking-widest">
              AzzakyOS
            </span>
          </div>
          {/* Menu Items */}
          <div className="flex-1 p-1 font-['MSSerif'] text-[13px] flex flex-col gap-1">
            <div
              className="p-1.5 flex items-center gap-2 hover:bg-[#0000a3] hover:text-white cursor-pointer"
              onClick={() => {
                openApp('about');
                setIsStartOpen(false);
              }}
            >
              <img src={windowExplorerIcon} alt="" className="w-4 h-4 [image-rendering:pixelated]" />
              <span>Showcase 2026</span>
            </div>
            <div
              className="p-1.5 flex items-center gap-2 hover:bg-[#0000a3] hover:text-white cursor-pointer"
              onClick={() => {
                openApp('projects');
                setIsStartOpen(false);
              }}
            >
              <img src={softwareIcon} alt="" className="w-4 h-4 [image-rendering:pixelated]" />
              <span>Software Projects</span>
            </div>
            <div className="h-[1px] bg-[#808080] my-0.5" />
            <a
              href="https://github.com/glacerous"
              target="_blank"
              rel="noreferrer"
              className="p-1.5 flex items-center gap-2 hover:bg-[#0000a3] hover:text-white cursor-pointer text-black no-underline"
            >
              <img src={myComputerIcon} alt="" className="w-4 h-4 [image-rendering:pixelated]" />
              <span>GitHub Profile</span>
            </a>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
