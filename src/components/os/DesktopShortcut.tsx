import React, { useCallback, useEffect, useRef, useState } from 'react';
import { IconName } from '@/assets/icons';
import { Icon } from '@/components/common/Icon';
import winColors from '@/constants/colors';

export interface DesktopShortcutProps {
    icon: IconName;
    shortcutName: string;
    onOpen: () => void;
}

export const DesktopShortcut: React.FC<DesktopShortcutProps> = ({
    icon,
    shortcutName,
    onOpen,
}) => {
    const [isSelected, setIsSelected] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const clickTimer = useRef<number | null>(null);

    const handleClickOutside = useCallback((e: MouseEvent) => {
        if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
            setIsSelected(false);
        }
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [handleClickOutside]);

    const handleMouseDown = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (clickTimer.current) {
            clearTimeout(clickTimer.current);
            clickTimer.current = null;
            setIsSelected(false);
            onOpen();
        } else {
            setIsSelected(true);
            clickTimer.current = window.setTimeout(() => {
                clickTimer.current = null;
            }, 300);
        }
    };

    return (
        <div
            ref={containerRef}
            onMouseDown={handleMouseDown}
            style={{
                width: 76,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                cursor: 'pointer',
                userSelect: 'none',
                padding: '6px 4px',
            }}
        >
            <div
                style={{
                    position: 'relative',
                    width: 32,
                    height: 32,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 4,
                }}
            >
                {isSelected && (
                    <div
                        style={{
                            position: 'absolute',
                            inset: 0,
                            backgroundColor: winColors.blue,
                            opacity: 0.45,
                            mixBlendMode: 'color',
                            pointerEvents: 'none',
                        }}
                    />
                )}
                <Icon icon={icon} size={32} />
            </div>
            <div
                className={isSelected ? 'selected-shortcut-border' : ''}
                style={{
                    backgroundColor: isSelected ? winColors.blue : 'transparent',
                    padding: '1px 3px',
                    borderRadius: 0,
                    maxWidth: 72,
                    textAlign: 'center',
                }}
            >
                <span
                    style={{
                        fontFamily: 'MSSerif, sans-serif',
                        fontSize: 11,
                        color: '#ffffff',
                        textShadow: isSelected ? 'none' : '1px 1px 1px rgba(0,0,0,0.9)',
                        lineHeight: 1.2,
                        wordBreak: 'break-word',
                        display: 'block',
                    }}
                >
                    {shortcutName}
                </span>
            </div>
        </div>
    );
};

export default DesktopShortcut;
