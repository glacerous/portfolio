import type { Config } from 'tailwindcss'

export default {
    darkMode: 'class',
    content: [
        "./index.html",
        "./src/**/*.{js,ts,tsx,jsx}",
    ],
    theme: {
        extend: {
            colors: {
                ink: "#0f172a",
                "ink-muted": "#64748b",
                "ink-faint": "#94a3b8",
                "surface-card": "#ffffff",
                "surface-subtle": "#f8fafc",
                "border-subtle": "#e2e8f0",
                "border-strong": "#cbd5e1",
            },
            fontFamily: {
                sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
                mono: ["JetBrains Mono", "ui-monospace", "SFMono-Regular", "monospace"],
            },
        },
    },
    plugins: [],
} satisfies Config
