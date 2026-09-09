import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,tsx,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#0A0F1A",
                surface: "#c0c0c0",
                "surface-hover": "#e9e9e9",
                "desktop-teal": "#3e9697",
                "win-blue": "#0000a3",
                "win-gray": "#86898d",
                border: "rgba(255, 255, 255, 0.06)",
                accent: "#00D4FF", // Cyan / Electric Blue
                "accent-warm": "#F59E0B", // Amber / Warm Accent
                "accent-hover": "#00B8E6",
                primary: "#F1F5F9",
                secondary: "#C5CFD9",
                muted: "#8892A6",
            },
            fontFamily: {
                sans: ["Outfit", "ui-sans-serif", "system-ui"],
                mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"],
                serif: ["Millennium", "Times New Roman", "serif"],
                serifBold: ["MillenniumBold", "Times New Roman", "serif"],
                pixel: ["MSSerif", "Tahoma", "sans-serif"],
                terminal: ["Terminal", "monospace"],
            },
            backgroundImage: {
                "grid-pattern": "linear-gradient(to right, #1A1A1A 1px, transparent 1px), linear-gradient(to bottom, #1A1A1A 1px, transparent 1px)",
            },
            backgroundSize: {
                "grid-24": "24px 24px",
            },
        },
    },
    plugins: [],
} satisfies Config
