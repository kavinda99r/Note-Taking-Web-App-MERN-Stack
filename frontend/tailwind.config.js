/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: { sans: ["Roboto", "sans-serif"] },
      colors: {
        "primary": "var(--color-primary)",
        "primary-hover": "var(--color-primary-hover)",
        "accent-muted": "var(--color-accent-muted)",
        "highlight": "var(--color-highlight)",
        "secondary": "var(--color-secondary)",
        "accent": "var(--color-accent)",
        "secondary-ink": "var(--color-secondary-ink)",
        "ink": "var(--color-ink)",
        "muted": "var(--color-muted)",
        "base": "var(--color-base)",
        "surface": "var(--color-surface)",
        "soft": "var(--color-soft)",
        "secondary-soft": "var(--color-secondary-soft)",
        "border": "var(--color-border)",
        "focus": "var(--color-focus)",
        "danger": "var(--color-danger)",
        "danger-hover": "var(--color-danger-hover)",
        "danger-soft": "var(--color-danger-soft)",
        "danger-border": "var(--color-danger-border)",
        "primary-ring": "var(--color-primary-ring)",
        "primary-shadow": "var(--color-primary-shadow)",
        "primary-glow": "var(--color-primary-glow)",
      },
    },
  },
  plugins: [],
};
