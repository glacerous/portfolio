import React, { useEffect, useRef, useState } from 'react';
import { IconName } from '@/assets/icons';
import { Icon } from '@/components/common/Icon';
import winColors from '@/constants/colors';

export interface WindowProps {
    windowTitle?: string;
    windowBarIcon?: IconName;
    bottomLeftText?: string;
    width: number;
    height: number;
    top: number;
    left: number;
    zIndex: number;
    minimized?: boolean;
    onClose: () => void;
    onMinimize: () => void;
    onInteract: () => void;
    children: React.ReactNode;
}

export const Window: React.FC<WindowProps> = ({
    windowTitle = 'Program',
    windowBarIcon = 'windowExplorerIcon',
    bottomLeftText,
    width: initialWidth,
    height: initialHeight,
    top: initialTop,
    left: initialLeft,
    zIndex,
    minimized = false,
    onClose,
    onMinimize,
    onInteract,
    children,
}) => {
    const [top, setTop] = useState(initialTop);
    const [left, setLeft] = useState(initialLeft);
    const [width, setWidth] = useState(initialWidth);
    const [height, setHeight] = useState(initialHeight);
    const [isMaximized, setIsMaximized] = useState(false);
    const [preMaxSize, setPreMaxSize] = useState({ top, left, width, height });

    // Drag state
    const isDragging = useRef(false);
    const dragOffset = useRef({ x: 0, y: 0 });

    // Resize state
    const isResizing = useRef(false);
    const resizeStart = useRef({ x: 0, y: 0, w: 0, h: 0 });

    const handleTitleMouseDown = (e: React.MouseEvent) => {
        if (isMaximized) return;
        onInteract();
        isDragging.current = true;
        dragOffset.current = {
            x: e.clientX - left,
            y: e.clientY - top,
        };

        const handleMouseMove = (ev: MouseEvent) => {
            if (!isDragging.current) return;
            const newLeft = Math.max(0, Math.min(window.innerWidth - 100, ev.clientX - dragOffset.current.x));
            const newTop = Math.max(0, Math.min(window.innerHeight - 80, ev.clientY - dragOffset.current.y));
            setLeft(newLeft);
            setTop(newTop);
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const handleResizeMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        onInteract();
        isResizing.current = true;
        resizeStart.current = {
            x: e.clientX,
            y: e.clientY,
            w: width,
            h: height,
        };

        const handleMouseMove = (ev: MouseEvent) => {
            if (!isResizing.current) return;
            const newW = Math.max(340, resizeStart.current.w + (ev.clientX - resizeStart.current.x));
            const newH = Math.max(220, resizeStart.current.h + (ev.clientY - resizeStart.current.y));
            setWidth(newW);
            setHeight(newH);
        };

        const handleMouseUp = () => {
            isResizing.current = false;
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    const toggleMaximize = () => {
        onInteract();
        if (!isMaximized) {
            setPreMaxSize({ top, left, width, height });
            setTop(0);
            setLeft(0);
            setWidth(window.innerWidth);
            setHeight(window.innerHeight - 30); // Leave room for taskbar
            setIsMaximized(true);
        } else {
            setTop(preMaxSize.top);
            setLeft(preMaxSize.left);
            setWidth(preMaxSize.width);
            setHeight(preMaxSize.height);
            setIsMaximized(false);
        }
    };

    if (minimized) return null;

    return (
        <div
            onMouseDown={onInteract}
            style={{
                position: 'fixed',
                top,
                left,
                width: isMaximized ? '100vw' : `${width}px`,
                height: isMaximized ? 'calc(100vh - 30px)' : `${height}px`,
                zIndex,
                display: 'flex',
                flexDirection: 'column',
                backgroundColor: winColors.lightGray,
                boxShadow: 'var(--border-raised-outer), var(--border-raised-inner)',
                padding: 3,
                boxSizing: 'border-box',
            }}
        >
            {/* Title Bar */}
            <div
                onMouseDown={handleTitleMouseDown}
                onDoubleClick={toggleMaximize}
                style={{
                    height: 20,
                    minHeight: 20,
                    background: `linear-gradient(90deg, ${winColors.blue} 0%, #1084d0 100%)`,
                    color: '#ffffff',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '0 3px',
                    cursor: isMaximized ? 'default' : 'move',
                    userSelect: 'none',
                }}
            >
                {/* Title and Icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 4, overflow: 'hidden' }}>
                    <Icon icon={windowBarIcon} size={14} />
                    <span
                        style={{
                            fontFamily: 'MSSerif, sans-serif',
                            fontSize: 11,
                            fontWeight: 'bold',
                            whiteSpace: 'nowrap',
                            textOverflow: 'ellipsis',
                            overflow: 'hidden',
                            letterSpacing: '0.2px',
                        }}
                    >
                        {windowTitle}
                    </span>
                </div>

                {/* Control Buttons */}
                <div style={{ display: 'flex', gap: 2 }} onMouseDown={(e) => e.stopPropagation()}>
                    {/* Minimize */}
                    <button
                        onClick={onMinimize}
                        style={controlBtnStyle}
                        title="Minimize"
                    >
                        <Icon icon="minimize" size={9} />
                    </button>

                    {/* Maximize / Restore */}
                    <button
                        onClick={toggleMaximize}
                        style={controlBtnStyle}
                        title={isMaximized ? 'Restore' : 'Maximize'}
                    >
                        <Icon icon="maximize" size={9} />
                    </button>

                    {/* Close */}
                    <button
                        onClick={onClose}
                        style={controlBtnStyle}
                        title="Close"
                    >
                        <Icon icon="close" size={9} />
                    </button>
                </div>
            </div>

            {/* Window Content */}
            <div
                style={{
                    flex: 1,
                    position: 'relative',
                    overflow: 'hidden',
                    backgroundColor: '#ffffff',
                    boxShadow: 'var(--border-field)',
                    marginTop: 3,
                    display: 'flex',
                }}
            >
                {children}
            </div>

            {/* Bottom Status / Footer Bar */}
            <div
                style={{
                    height: 18,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '2px 4px 0px 4px',
                    fontSize: 10,
                    fontFamily: 'MSSerif, sans-serif',
                    color: '#222222',
                    boxSizing: 'border-box',
                }}
            >
                <div
                    style={{
                        boxShadow: 'var(--border-field)',
                        padding: '1px 6px',
                        flex: 1,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        height: 14,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    {bottomLeftText || 'Ready'}
                </div>

                {!isMaximized && (
                    <div
                        onMouseDown={handleResizeMouseDown}
                        style={{
                            width: 14,
                            height: 14,
                            marginLeft: 4,
                            cursor: 'nwse-resize',
                            display: 'flex',
                            alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                        }}
                    >
                        <Icon icon="windowResize" size={12} />
                    </div>
                )}
            </div>
        </div>
    );
};

const controlBtnStyle: React.CSSProperties = {
    width: 14,
    height: 14,
    backgroundColor: winColors.lightGray,
    boxShadow: 'var(--border-raised-outer), var(--border-raised-inner)',
    border: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    cursor: 'pointer',
    padding: 0,
};

export default Window;
