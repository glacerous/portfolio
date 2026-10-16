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
            },
            fontFamily: {
                sans: ["Geist", "system-ui", "-apple-system", "sans-serif"],
                mono: ["Geist Mono", "ui-monospace", "monospace"],
            },
        },
    },
    plugins: [],
} satisfies Config
