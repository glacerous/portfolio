import type { Config } from 'tailwindcss'

export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,tsx,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: "#FCFCFB",
                surface: "#FCFCFB",
                border: "#E8E8E8",
                ink: "#0A0A0A",
                "ink-muted": "#8A8A8A",
                "ink-faint": "#B5B5B5",
                "heat-0": "#F0F0F0",
                "heat-1": "#D4D4D4",
                "heat-2": "#A3A3A3",
                "heat-3": "#737373",
                "heat-4": "#0A0A0A",
                doodle: {
                    blue: "#2563EB",
                    ink: "#1E293B",
                },
            },
            fontFamily: {
                sans: ["Geist", "Inter", "system-ui", "-apple-system", "sans-serif"],
                mono: ["Geist Mono", "ui-monospace", "monospace"],
                handwriting: ["Caveat", "cursive"],
            },
            keyframes: {
                draw: {
                    from: { strokeDashoffset: "1" },
                    to: { strokeDashoffset: "0" },
                },
                wiggle: {
                    "0%, 100%": { transform: "rotate(-3deg)" },
                    "50%": { transform: "rotate(3deg)" },
                },
            },
            animation: {
                draw: "draw 500ms ease-out forwards",
                wiggle: "wiggle 0.5s ease-in-out infinite",
            },
        },
    },
    plugins: [],
} satisfies Config
