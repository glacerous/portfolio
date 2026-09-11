import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@/components/common/Icon';
import winColors from '@/constants/colors';
import { IconName } from '@/assets/icons';

export interface WindowItem {
    name: string;
    icon: IconName;
    zIndex: number;
    minimized: boolean;
}

export interface ToolbarProps {
    windows: { [key: string]: WindowItem };
    activeWindowKey: string | null;
    toggleMinimize: (key: string) => void;
    openWindow: (key: string) => void;
}

export const Toolbar: React.FC<ToolbarProps> = ({
    windows,
    activeWindowKey,
    toggleMinimize,
    openWindow,
}) => {
    const [startOpen, setStartOpen] = useState(false);
    const [time, setTime] = useState('');
    const toolbarRef = useRef<HTMLDivElement>(null);

    // Update clock
    useEffect(() => {
        const updateClock = () => {
            const now = new Date();
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            const minStr = minutes < 10 ? '0' + minutes : minutes;
            setTime(`${hours}:${minStr} ${ampm}`);
        };
        updateClock();
        const interval = setInterval(updateClock, 1000);
        return () => clearInterval(interval);
    }, []);

    // Close start menu on outside click
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (toolbarRef.current && !toolbarRef.current.contains(e.target as Node)) {
                setStartOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    return (
        <div
            ref={toolbarRef}
            style={{
                position: 'fixed',
                bottom: 0,
                left: 0,
                right: 0,
                height: 30,
                backgroundColor: winColors.lightGray,
                boxShadow: 'inset 0 1px 0 #ffffff, inset 0 2px 0 #dfdfdf',
                display: 'flex',
                alignItems: 'center',
                padding: '2px 3px',
                zIndex: 999999,
                userSelect: 'none',
            }}
        >
            {/* Start Menu Dropdown */}
            {startOpen && (
                <div
                    style={{
                        position: 'absolute',
                        bottom: 30,
                        left: 2,
                        width: 200,
                        backgroundColor: winColors.lightGray,
                        boxShadow: 'var(--border-raised-outer), var(--border-raised-inner)',
                        display: 'flex',
                        padding: 3,
                    }}
                >
                    {/* Vertical brand bar */}
                    <div
                        style={{
                            width: 28,
                            background: `linear-gradient(180deg, ${winColors.blue} 0%, #000040 100%)`,
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'center',
                            paddingBottom: 8,
                        }}
                    >
                        <span
                            style={{
                                color: '#ffffff',
                                fontFamily: 'MSSerif, sans-serif',
                                fontWeight: 'bold',
                                fontSize: 13,
                                writingMode: 'vertical-rl',
                                transform: 'rotate(180deg)',
                                letterSpacing: 1.5,
                            }}
                        >
                            Windows<span style={{ fontWeight: 'normal' }}>98</span>
                        </span>
                    </div>

                    {/* Menu items */}
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', padding: '2px 0' }}>
                        <div
                            className="start-menu-item"
                            onClick={() => {
                                openWindow('showcase');
                                setStartOpen(false);
                            }}
                            style={menuItemStyle}
                        >
                            <Icon icon="showcaseIcon" size={20} />
                            <span>My Showcase</span>
                        </div>

                        <div
                            className="start-menu-item"
                            onClick={() => {
                                window.open('https://github.com/glacerous', '_blank');
                                setStartOpen(false);
                            }}
                            style={menuItemStyle}
                        >
                            <Icon icon="myComputer" size={20} />
                            <span>GitHub Profile</span>
                        </div>

                        <div
                            className="start-menu-item"
                            onClick={() => {
                                window.location.href = 'mailto:azzakyraihan@gmail.com';
                                setStartOpen(false);
                            }}
                            style={menuItemStyle}
                        >
                            <Icon icon="credits" size={20} />
                            <span>Email Me</span>
                        </div>

                        <div style={{ height: 1, backgroundColor: '#808080', margin: '4px 2px', borderBottom: '1px solid #ffffff' }} />

                        <div
                            className="start-menu-item"
                            onClick={() => {
                                window.location.reload();
                            }}
                            style={menuItemStyle}
                        >
                            <Icon icon="close" size={16} />
                            <span>Restart Desktop</span>
                        </div>
                    </div>
                </div>
            )}

            {/* Start Button */}
            <button
                onClick={() => setStartOpen(!startOpen)}
                style={{
                    height: 24,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    padding: '2px 6px',
                    backgroundColor: winColors.lightGray,
                    boxShadow: startOpen
                        ? 'var(--border-sunken-outer), var(--border-sunken-inner)'
                        : 'var(--border-raised-outer), var(--border-raised-inner)',
                    border: 'none',
                    fontFamily: 'MSSerif, sans-serif',
                    fontWeight: 'bold',
                    fontSize: 11,
                    cursor: 'pointer',
                    outline: 'none',
                    marginRight: 6,
                }}
            >
                <Icon icon="windowsStartIcon" size={16} />
                <span>Start</span>
            </button>

            {/* Window Tabs Container */}
            <div
                style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    gap: 3,
                    overflow: 'hidden',
                    height: '100%',
                }}
            >
                {Object.keys(windows).map((key) => {
                    const win = windows[key];
                    const isActive = activeWindowKey === key && !win.minimized;
                    return (
                        <button
                            key={key}
                            onClick={() => toggleMinimize(key)}
                            style={{
                                height: 23,
                                minWidth: 120,
                                maxWidth: 170,
                                display: 'flex',
                                alignItems: 'center',
                                gap: 4,
                                padding: isActive ? '3px 5px 1px 7px' : '2px 6px',
                                backgroundColor: isActive ? '#e0e0e0' : winColors.lightGray,
                                boxShadow: isActive
                                    ? 'var(--border-sunken-outer), var(--border-sunken-inner)'
                                    : 'var(--border-raised-outer), var(--border-raised-inner)',
                                border: 'none',
                                fontFamily: 'MSSerif, sans-serif',
                                fontSize: 11,
                                fontWeight: isActive ? 'bold' : 'normal',
                                cursor: 'pointer',
                                outline: 'none',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                            }}
                        >
                            <Icon icon={win.icon} size={14} />
                            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {win.name}
                            </span>
                        </button>
                    );
                })}
            </div>

            {/* System Tray (Clock) */}
            <div
                style={{
                    height: 23,
                    padding: '0 8px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                    boxShadow: 'var(--border-field)',
                    fontFamily: 'MSSerif, sans-serif',
                    fontSize: 11,
                    color: '#000000',
                    backgroundColor: winColors.lightGray,
                }}
            >
                <Icon icon="volumeOn" size={13} />
                <span>{time}</span>
            </div>
        </div>
    );
};

const menuItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '4px 10px',
    cursor: 'pointer',
    fontSize: 11,
    fontFamily: 'MSSerif, sans-serif',
    color: '#000000',
};

export default Toolbar;
