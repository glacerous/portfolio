import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,tsx,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "#030303",
                surface: "#0A0A0A",
                border: "#1A1A1A",
                accent: "#00D1FF", // Electric Blue / Medical Blue
                muted: "#888888",
            },
            fontFamily: {
                sans: ["Outfit", "ui-sans-serif", "system-ui"],
                mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular"],
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
