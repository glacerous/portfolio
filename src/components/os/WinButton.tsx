import React, { useState } from 'react';
import { IconName } from '@/assets/icons';
import { Icon } from '@/components/common/Icon';
import winColors from '@/constants/colors';

export interface WinButtonProps {
    icon?: IconName;
    text?: string;
    onClick?: () => void;
    className?: string;
    style?: React.CSSProperties;
    title?: string;
    active?: boolean;
}

export const WinButton: React.FC<WinButtonProps> = ({
    icon,
    text,
    onClick,
    className = '',
    style,
    title,
    active = false,
}) => {
    const [isPressed, setIsPressed] = useState(false);

    return (
        <button
            title={title}
            onMouseDown={() => setIsPressed(true)}
            onMouseUp={() => setIsPressed(false)}
            onMouseLeave={() => setIsPressed(false)}
            onClick={onClick}
            style={{
                boxSizing: 'border-box',
                backgroundColor: winColors.lightGray,
                boxShadow: isPressed || active
                    ? 'inset -1px -1px var(--button-highlight), inset 1px 1px var(--window-frame), inset -2px -2px var(--surface), inset 2px 2px var(--button-shadow)'
                    : 'inset -1px -1px var(--window-frame), inset 1px 1px var(--button-highlight), inset -2px -2px var(--button-shadow), inset 2px 2px var(--button-face)',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isPressed || active ? '4px 6px 2px 8px' : '3px 7px',
                fontFamily: 'MSSerif, sans-serif',
                fontSize: 11,
                userSelect: 'none',
                ...style,
            }}
            className={className}
        >
            {icon && <Icon icon={icon} size={14} />}
            {text && <span style={{ marginLeft: icon ? 4 : 0 }}>{text}</span>}
        </button>
    );
};

export default WinButton;
