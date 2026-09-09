import React from 'react';
import icons, { IconName } from '@/assets/icons';

export interface IconProps {
    icon: IconName;
    size?: number;
    style?: React.CSSProperties;
    className?: string;
    onClick?: () => void;
}

export const Icon: React.FC<IconProps> = ({
    icon,
    size = 16,
    style,
    className,
    onClick,
}) => {
    // @ts-ignore
    const src = icons[icon];
    return (
        <img
            src={src}
            alt={icon}
            style={{
                width: size,
                height: size,
                imageRendering: 'pixelated',
                userSelect: 'none',
                ...style,
            }}
            className={className}
            onClick={onClick}
            draggable={false}
        />
    );
};

export default Icon;
