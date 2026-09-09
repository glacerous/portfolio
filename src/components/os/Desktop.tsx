import React, { useState, useEffect } from 'react';
import DesktopShortcut from '@/components/os/DesktopShortcut';
import Window from '@/components/os/Window';
import Toolbar, { WindowItem } from '@/components/os/Toolbar';
import ShowcaseContent from '@/components/showcase/ShowcaseContent';

export const Desktop: React.FC = () => {
    // Registered windows
    const [windows, setWindows] = useState<{ [key: string]: WindowItem }>({
        showcase: {
            name: 'Azzaky Raihan - Showcase 2026',
            icon: 'showcaseIcon',
            zIndex: 10,
            minimized: false,
        },
    });

    const [activeWindowKey, setActiveWindowKey] = useState<string | null>('showcase');
    const [highestZIndex, setHighestZIndex] = useState<number>(10);

    // Initial window dimensions based on screen size
    const [initSize, setInitSize] = useState({
        width: Math.min(1000, window.innerWidth - 60),
        height: Math.min(700, window.innerHeight - 80),
        top: 24,
        left: 40,
    });

    useEffect(() => {
        const updateSize = () => {
            const w = Math.min(1000, Math.max(360, window.innerWidth - 60));
            const h = Math.min(720, Math.max(300, window.innerHeight - 80));
            setInitSize({
                width: w,
                height: h,
                top: Math.max(10, (window.innerHeight - h - 30) / 2),
                left: Math.max(10, (window.innerWidth - w) / 2),
            });
        };
        updateSize();
        window.addEventListener('resize', updateSize);
        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const bringToFront = (key: string) => {
        const nextZ = highestZIndex + 1;
        setHighestZIndex(nextZ);
        setActiveWindowKey(key);
        setWindows((prev) => {
            if (!prev[key]) return prev;
            return {
                ...prev,
                [key]: {
                    ...prev[key],
                    zIndex: nextZ,
                    minimized: false,
                },
            };
        });
    };

    const toggleMinimize = (key: string) => {
        setWindows((prev) => {
            if (!prev[key]) return prev;
            const willMinimize = !prev[key].minimized;
            if (!willMinimize) {
                const nextZ = highestZIndex + 1;
                setHighestZIndex(nextZ);
                setActiveWindowKey(key);
                return {
                    ...prev,
                    [key]: {
                        ...prev[key],
                        minimized: false,
                        zIndex: nextZ,
                    },
                };
            } else {
                if (activeWindowKey === key) {
                    setActiveWindowKey(null);
                }
                return {
                    ...prev,
                    [key]: {
                        ...prev[key],
                        minimized: true,
                    },
                };
            }
        });
    };

    const closeWindow = (key: string) => {
        setWindows((prev) => {
            const copy = { ...prev };
            delete copy[key];
            return copy;
        });
        if (activeWindowKey === key) {
            setActiveWindowKey(null);
        }
    };

    const openWindow = (key: string) => {
        if (windows[key]) {
            bringToFront(key);
        } else {
            if (key === 'showcase') {
                const nextZ = highestZIndex + 1;
                setHighestZIndex(nextZ);
                setActiveWindowKey(key);
                setWindows((prev) => ({
                    ...prev,
                    showcase: {
                        name: 'Azzaky Raihan - Showcase 2026',
                        icon: 'showcaseIcon',
                        zIndex: nextZ,
                        minimized: false,
                    },
                }));
            }
        }
    };

    return (
        <div
            style={{
                position: 'fixed',
                inset: 0,
                backgroundColor: '#3e9697', // Retro Teal Windows background
                overflow: 'hidden',
                userSelect: 'none',
            }}
        >
            {/* Desktop Shortcuts Column */}
            <div
                style={{
                    position: 'absolute',
                    top: 16,
                    left: 16,
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 16,
                    zIndex: 1,
                }}
            >
                <DesktopShortcut
                    icon="showcaseIcon"
                    shortcutName="My Showcase"
                    onOpen={() => openWindow('showcase')}
                />
                <DesktopShortcut
                    icon="myComputer"
                    shortcutName="My Computer"
                    onOpen={() => {
                        window.open('https://github.com/glacerous', '_blank');
                    }}
                />
                <DesktopShortcut
                    icon="credits"
                    shortcutName="Contact Me"
                    onOpen={() => {
                        window.location.href = 'mailto:azzakyraihan@gmail.com';
                    }}
                />
            </div>

            {/* Active Windows */}
            {windows.showcase && (
                <Window
                    windowTitle="Azzaky Raihan - Showcase 2026"
                    windowBarIcon="windowExplorerIcon"
                    bottomLeftText="© Copyright 2026 Azzaky Raihan · Retro Edition"
                    width={initSize.width}
                    height={initSize.height}
                    top={initSize.top}
                    left={initSize.left}
                    zIndex={windows.showcase.zIndex}
                    minimized={windows.showcase.minimized}
                    onClose={() => closeWindow('showcase')}
                    onMinimize={() => toggleMinimize('showcase')}
                    onInteract={() => bringToFront('showcase')}
                >
                    <ShowcaseContent />
                </Window>
            )}

            {/* Bottom Retro Toolbar / Taskbar */}
            <Toolbar
                windows={windows}
                activeWindowKey={activeWindowKey}
                toggleMinimize={toggleMinimize}
                openWindow={openWindow}
            />
        </div>
    );
};

export default Desktop;
