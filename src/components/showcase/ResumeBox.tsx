import React from 'react';
import printerGif from '@/assets/icons/printer.gif';

export interface ResumeBoxProps {
    title?: string;
    subtext?: string;
}

export const ResumeBox: React.FC<ResumeBoxProps> = ({
    title = 'Looking for my resume?',
    subtext = 'Click here to contact or request my full CV!',
}) => {
    return (
        <div
            style={{
                backgroundColor: '#ffffff',
                padding: '12px 16px',
                border: '2px solid #000000',
                borderLeft: 'none',
                borderRight: 'none',
                width: '100%',
                display: 'flex',
                alignItems: 'center',
                gap: 16,
                margin: '20px 0',
                boxSizing: 'border-box',
            }}
        >
            <img
                src={printerGif}
                alt="Printer"
                style={{
                    width: 52,
                    height: 44,
                    imageRendering: 'pixelated',
                    userSelect: 'none',
                    flexShrink: 0,
                }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <h3
                    style={{
                        fontFamily: 'MillenniumBold, serif',
                        fontSize: 18,
                        margin: 0,
                        color: '#000000',
                    }}
                >
                    {title}
                </h3>
                <a
                    href="mailto:azzakyraihan@gmail.com"
                    style={{
                        fontFamily: 'Millennium, serif',
                        fontSize: 15,
                        color: '#0000ee',
                        textDecoration: 'underline',
                        cursor: 'pointer',
                        marginTop: 2,
                    }}
                >
                    {subtext}
                </a>
            </div>
        </div>
    );
};

export default ResumeBox;
