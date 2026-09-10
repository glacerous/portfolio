import React, { useState } from 'react';
import { projects } from '@/data/projects';
import { experiences } from '@/data/experience';
import ResumeBox from './ResumeBox';
import winColors from '@/constants/colors';
import robloxStudioImg from '@/assets/pictures/roblox-studio.png';

export type TabKey = 'about' | 'projects' | 'experience' | 'contact';

export const ShowcaseContent: React.FC = () => {
    const [currentTab, setCurrentTab] = useState<TabKey>('about');
    const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

    const categories = ['ALL', ...Array.from(new Set(projects.map((p) => p.category)))];

    const filteredProjects = selectedCategory === 'ALL'
        ? projects
        : projects.filter((p) => p.category === selectedCategory);

    return (
        <div
            style={{
                display: 'flex',
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                backgroundColor: '#ffffff',
                fontFamily: 'Millennium, Times New Roman, serif',
                color: '#000000',
            }}
        >
            {/* Left Vertical Retro Sidebar */}
            <div
                style={{
                    width: 220,
                    minWidth: 190,
                    height: '100%',
                    backgroundColor: '#ffffff',
                    borderRight: '1px solid #d0d0d0',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '28px 24px',
                    boxSizing: 'border-box',
                    userSelect: 'none',
                    overflowY: 'auto',
                }}
            >
                {/* Header title */}
                <div style={{ marginBottom: 32 }}>
                    <h1
                        style={{
                            fontFamily: 'MillenniumBold, serif',
                            fontSize: 32,
                            lineHeight: 1.1,
                            margin: 0,
                            letterSpacing: '-0.5px',
                            color: '#000000',
                        }}
                    >
                        Azzaky
                    </h1>
                    <h1
                        style={{
                            fontFamily: 'MillenniumBold, serif',
                            fontSize: 32,
                            lineHeight: 1.1,
                            margin: 0,
                            letterSpacing: '-0.5px',
                            color: '#000000',
                        }}
                    >
                        Raihan
                    </h1>
                    <div
                        style={{
                            fontFamily: 'MSSerif, sans-serif',
                            fontSize: 11,
                            color: winColors.darkGray,
                            marginTop: 6,
                            letterSpacing: '0.5px',
                        }}
                    >
                        SHOWCASE '26
                    </div>
                </div>

                {/* Nav Links */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <SidebarLink
                        title="ABOUT"
                        active={currentTab === 'about'}
                        onClick={() => setCurrentTab('about')}
                    />
                    <SidebarLink
                        title="PROJECTS"
                        active={currentTab === 'projects'}
                        onClick={() => setCurrentTab('projects')}
                    />
                    <SidebarLink
                        title="EXPERIENCE"
                        active={currentTab === 'experience'}
                        onClick={() => setCurrentTab('experience')}
                    />
                    <SidebarLink
                        title="CONTACT"
                        active={currentTab === 'contact'}
                        onClick={() => setCurrentTab('contact')}
                    />
                </div>

                <div style={{ marginTop: 'auto', paddingTop: 24 }}>
                    <div
                        style={{
                            border: '1px dashed #a0a0a0',
                            padding: '8px 10px',
                            fontSize: 11,
                            fontFamily: 'MSSerif, sans-serif',
                            color: '#444444',
                            backgroundColor: '#f8f8f8',
                        }}
                    >
                        <span style={{ color: '#008000', fontWeight: 'bold' }}>●</span> Open for collaborations & engineering roles.
                    </div>
                </div>
            </div>

            {/* Right Main Content Panel */}
            <div
                style={{
                    flex: 1,
                    height: '100%',
                    overflowY: 'auto',
                    padding: '32px 36px',
                    boxSizing: 'border-box',
                }}
            >
                {currentTab === 'about' && (
                    <div>
                        <h1
                            style={{
                                fontFamily: 'MillenniumBold, serif',
                                fontSize: 48,
                                margin: '0 0 4px 0',
                                color: '#000000',
                            }}
                        >
                            Welcome
                        </h1>
                        <h3
                            style={{
                                fontFamily: 'Millennium, serif',
                                fontSize: 20,
                                color: '#444444',
                                margin: '0 0 20px 0',
                            }}
                        >
                            I'm Azzaky Raihan - big fan of computers.
                        </h3>

                        <div
                            style={{
                                fontSize: 17,
                                lineHeight: 1.6,
                                textAlign: 'justify',
                                color: '#111111',
                            }}
                        >
                            <p style={{ marginBottom: 14 }}>
                                I focus on DevSecOps and cloud infrastructure, building automated pipelines and keeping production systems secure.
                            </p>
                            <p style={{ marginBottom: 14 }}>
                                I got into coding when I was 14 through Roblox Studio using Lua, which sparked my curiosity for how software actually works. Having worked in different roles like backend development and QA gave me practical experience in both building systems and spotting failure points. Today, that experience feeds directly into my DevSecOps focus: automating pipelines and making sure infrastructure is resilient and secure.
                            </p>
                            <div style={{ margin: '16px 0' }}>
                                <img
                                    src={robloxStudioImg}
                                    alt="Roblox Studio project"
                                    style={{
                                        width: '100%',
                                        maxHeight: 380,
                                        objectFit: 'cover',
                                        border: '1px solid #000000',
                                    }}
                                />
                                <div style={{ fontSize: 13, color: '#555555', marginTop: 4 }}>
                                    <b>Figure 1:</b> One of my early creations in Roblox Studio where it all started.
                                </div>
                            </div>
                            <p style={{ marginBottom: 14 }}>
                                Earlier on, I spent time competing in math and Earth Science olympiads, building projects in hackathons, and shipping campus platforms used by thousands of active students.
                            </p>
                        </div>

                        <ResumeBox
                            title="Want to connect or view my credentials?"
                            subtext="Reach out at azzakyraihan@gmail.com or explore my GitHub!"
                        />

                        <div style={{ marginTop: 24 }}>
                            <h2
                                style={{
                                    fontFamily: 'MillenniumBold, serif',
                                    fontSize: 24,
                                    marginBottom: 12,
                                    borderBottom: '1px solid #c0c0c0',
                                    paddingBottom: 4,
                                }}
                            >
                                Core Competencies & Philosophy
                            </h2>
                            <ul
                                style={{
                                    fontSize: 16,
                                    lineHeight: 1.7,
                                    paddingLeft: 20,
                                    margin: 0,
                                }}
                            >
                                <li>
                                    <b>System Architecture:</b> Microservices, Docker, Kubernetes, database indexing, and caching with Redis.
                                </li>
                                <li>
                                    <b>Robust Backends:</b> High-throughput APIs, queue workers, schema modeling, and constraint engines.
                                </li>
                                <li>
                                    <b>Developer Tooling:</b> Automation pipelines, Linux environments, CLI tooling, and Vim-based workflows.
                                </li>
                            </ul>
                        </div>
                    </div>
                )}

                {currentTab === 'projects' && (
                    <div>
                        <h1
                            style={{
                                fontFamily: 'MillenniumBold, serif',
                                fontSize: 40,
                                margin: '0 0 6px 0',
                            }}
                        >
                            Selected Projects
                        </h1>
                        <p
                            style={{
                                fontFamily: 'MSSerif, sans-serif',
                                fontSize: 12,
                                color: '#555555',
                                marginBottom: 20,
                            }}
                        >
                            A collection of backend modules, infrastructure setups, and production systems.
                        </p>

                        {/* Category Filter Pills */}
                        <div
                            style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: 6,
                                marginBottom: 24,
                            }}
                        >
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className="win95-btn"
                                    style={{
                                        fontWeight: selectedCategory === cat ? 'bold' : 'normal',
                                        backgroundColor: selectedCategory === cat ? '#e0e0e0' : winColors.lightGray,
                                        boxShadow: selectedCategory === cat
                                            ? 'var(--border-sunken-outer), var(--border-sunken-inner)'
                                            : 'var(--border-raised-outer), var(--border-raised-inner)',
                                    }}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>

                        {/* Projects Grid */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                            {filteredProjects.map((p) => (
                                <div
                                    key={p.id}
                                    style={{
                                        boxShadow: 'var(--border-raised-outer), var(--border-raised-inner)',
                                        backgroundColor: winColors.lightGray,
                                        padding: 12,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    {/* Project Header */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'baseline',
                                            marginBottom: 8,
                                            borderBottom: '1px solid #999999',
                                            paddingBottom: 4,
                                        }}
                                    >
                                        <div>
                                            <h3
                                                style={{
                                                    fontFamily: 'MillenniumBold, serif',
                                                    fontSize: 22,
                                                    display: 'inline',
                                                    marginRight: 8,
                                                }}
                                            >
                                                {p.title}
                                            </h3>
                                            <span
                                                style={{
                                                    fontFamily: 'MSSerif, sans-serif',
                                                    fontSize: 11,
                                                    color: winColors.blue,
                                                    fontWeight: 'bold',
                                                }}
                                            >
                                                ({p.role} · {p.year})
                                            </span>
                                        </div>
                                        <span
                                            style={{
                                                fontFamily: 'Terminal, monospace',
                                                fontSize: 11,
                                                color: '#333333',
                                                backgroundColor: '#e6e6e6',
                                                padding: '1px 6px',
                                                border: '1px solid #b0b0b0',
                                            }}
                                        >
                                            {p.category}
                                        </span>
                                    </div>

                                    {/* Media Video / Preview */}
                                    {p.media && p.media.src && (
                                        <div
                                            style={{
                                                width: '100%',
                                                maxHeight: 320,
                                                overflow: 'hidden',
                                                backgroundColor: '#000000',
                                                marginBottom: 10,
                                                boxShadow: 'var(--border-field)',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}
                                        >
                                            {p.media.kind === 'video' ? (
                                                <video
                                                    src={p.media.src}
                                                    controls
                                                    muted
                                                    loop
                                                    playsInline
                                                    style={{ width: '100%', maxHeight: 320, objectFit: 'contain' }}
                                                />
                                            ) : (
                                                <img
                                                    src={p.media.src}
                                                    alt={p.media.alt || p.title}
                                                    style={{ width: '100%', maxHeight: 320, objectFit: 'contain' }}
                                                />
                                            )}
                                        </div>
                                    )}

                                    {/* One liner & description */}
                                    <div
                                        style={{
                                            backgroundColor: '#ffffff',
                                            boxShadow: 'var(--border-field)',
                                            padding: '10px 14px',
                                            marginBottom: 8,
                                        }}
                                    >
                                        <p style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 4 }}>
                                            {p.oneLiner}
                                        </p>
                                        <p style={{ fontSize: 15, lineHeight: 1.5, color: '#222222' }}>
                                            {p.description}
                                        </p>
                                        {p.impact && (
                                            <div
                                                style={{
                                                    fontFamily: 'MSSerif, sans-serif',
                                                    fontSize: 11,
                                                    color: '#006600',
                                                    marginTop: 6,
                                                }}
                                            >
                                                <b>Impact:</b> {p.impact}
                                            </div>
                                        )}
                                    </div>

                                    {/* Stack Badges & Links */}
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            flexWrap: 'wrap',
                                            gap: 8,
                                            paddingTop: 4,
                                        }}
                                    >
                                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                                            {p.stack.map((tech) => (
                                                <span
                                                    key={tech}
                                                    style={{
                                                        fontFamily: 'MSSerif, sans-serif',
                                                        fontSize: 10,
                                                        backgroundColor: '#e8e8e8',
                                                        padding: '1px 5px',
                                                        border: '1px solid #b8b8b8',
                                                    }}
                                                >
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>

                                        <div style={{ display: 'flex', gap: 8 }}>
                                            {p.links?.site && (
                                                <a
                                                    href={p.links.site}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="win95-btn"
                                                    style={{ textDecoration: 'none', color: '#000000' }}
                                                >
                                                    Visit Site ↗
                                                </a>
                                            )}
                                            {p.links?.code && (
                                                <a
                                                    href={p.links.code}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="win95-btn"
                                                    style={{ textDecoration: 'none', color: '#000000' }}
                                                >
                                                    Source Code ↗
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentTab === 'experience' && (
                    <div>
                        <h1
                            style={{
                                fontFamily: 'MillenniumBold, serif',
                                fontSize: 40,
                                margin: '0 0 6px 0',
                            }}
                        >
                            Experience
                        </h1>
                        <p
                            style={{
                                fontFamily: 'MSSerif, sans-serif',
                                fontSize: 12,
                                color: '#555555',
                                marginBottom: 24,
                            }}
                        >
                            Professional trajectory and engineering milestones.
                        </p>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                            {experiences.map((exp, idx) => (
                                <div
                                    key={exp.company + idx}
                                    style={{
                                        boxShadow: 'var(--border-raised-outer), var(--border-raised-inner)',
                                        backgroundColor: winColors.lightGray,
                                        padding: 14,
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'baseline',
                                            borderBottom: '1px solid #999999',
                                            paddingBottom: 6,
                                            marginBottom: 8,
                                        }}
                                    >
                                        <div>
                                            <h3
                                                style={{
                                                    fontFamily: 'MillenniumBold, serif',
                                                    fontSize: 20,
                                                    margin: 0,
                                                    color: '#000000',
                                                }}
                                            >
                                                {exp.role}
                                            </h3>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                                                {exp.logo && (
                                                    <img
                                                        src={exp.logo}
                                                        alt={exp.company}
                                                        style={{ width: 18, height: 18, objectFit: 'contain', border: '1px solid #000', backgroundColor: '#000' }}
                                                    />
                                                )}
                                                <span
                                                    style={{
                                                        fontFamily: 'MSSerif, sans-serif',
                                                        fontSize: 12,
                                                        fontWeight: 'bold',
                                                        color: winColors.blue,
                                                    }}
                                                >
                                                    @{exp.company}
                                                </span>
                                            </div>
                                        </div>
                                        <span
                                            style={{
                                                fontFamily: 'Terminal, monospace',
                                                fontSize: 11,
                                                color: '#444444',
                                            }}
                                        >
                                            {exp.period}
                                        </span>
                                    </div>

                                    <div
                                        style={{
                                            backgroundColor: '#ffffff',
                                            boxShadow: 'var(--border-field)',
                                            padding: '10px 14px',
                                        }}
                                    >
                                        <ul style={{ margin: 0, paddingLeft: 18, fontSize: 15, lineHeight: 1.6 }}>
                                            {exp.description.map((item, i) => (
                                                <li key={i} style={{ marginBottom: 4 }}>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {currentTab === 'contact' && (
                    <div>
                        <h1
                            style={{
                                fontFamily: 'MillenniumBold, serif',
                                fontSize: 40,
                                margin: '0 0 6px 0',
                            }}
                        >
                            Contact
                        </h1>
                        <p
                            style={{
                                fontFamily: 'MSSerif, sans-serif',
                                fontSize: 12,
                                color: '#555555',
                                marginBottom: 20,
                            }}
                        >
                            Feel free to leave a note or send a direct message.
                        </p>

                        <div
                            style={{
                                boxShadow: 'var(--border-raised-outer), var(--border-raised-inner)',
                                backgroundColor: winColors.lightGray,
                                padding: 18,
                                maxWidth: 500,
                            }}
                        >
                            <div style={{ marginBottom: 12 }}>
                                <label
                                    style={{
                                        display: 'block',
                                        fontFamily: 'MSSerif, sans-serif',
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        marginBottom: 4,
                                    }}
                                >
                                    Email:
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value="azzakyraihan@gmail.com"
                                    style={{
                                        width: '100%',
                                        padding: '4px 8px',
                                        boxShadow: 'var(--border-field)',
                                        border: 'none',
                                        fontFamily: 'MSSerif, sans-serif',
                                        fontSize: 12,
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                            </div>

                            <div style={{ marginBottom: 14 }}>
                                <label
                                    style={{
                                        display: 'block',
                                        fontFamily: 'MSSerif, sans-serif',
                                        fontSize: 11,
                                        fontWeight: 'bold',
                                        marginBottom: 4,
                                    }}
                                >
                                    GitHub Profile:
                                </label>
                                <input
                                    type="text"
                                    readOnly
                                    value="https://github.com/glacerous"
                                    style={{
                                        width: '100%',
                                        padding: '4px 8px',
                                        boxShadow: 'var(--border-field)',
                                        border: 'none',
                                        fontFamily: 'MSSerif, sans-serif',
                                        fontSize: 12,
                                        backgroundColor: '#ffffff',
                                    }}
                                />
                            </div>

                            <div style={{ display: 'flex', gap: 8 }}>
                                <a
                                    href="mailto:azzakyraihan@gmail.com"
                                    className="win95-btn"
                                    style={{ textDecoration: 'none', color: '#000000', padding: '5px 12px' }}
                                >
                                    Compose Email ↗
                                </a>
                                <a
                                    href="https://github.com/glacerous"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="win95-btn"
                                    style={{ textDecoration: 'none', color: '#000000', padding: '5px 12px' }}
                                >
                                    Open GitHub ↗
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const SidebarLink: React.FC<{ title: string; active: boolean; onClick: () => void }> = ({
    title,
    active,
    onClick,
}) => {
    const [isHover, setIsHover] = useState(false);

    return (
        <div
            onClick={onClick}
            onMouseEnter={() => setIsHover(true)}
            onMouseLeave={() => setIsHover(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                cursor: 'pointer',
                fontFamily: 'MillenniumBold, serif',
                fontSize: 17,
                color: active ? '#000000' : isHover ? '#333333' : '#666666',
                textDecoration: isHover || active ? 'underline' : 'none',
            }}
        >
            <div
                style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: active ? '#800080' : isHover ? '#b060b0' : 'transparent',
                    border: '1px solid #800080',
                }}
            />
            <span>{title}</span>
        </div>
    );
};

export default ShowcaseContent;
