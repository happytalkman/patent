/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        nexus: {
          bg: "#070d18",
          surface: "#0d131f",
          panel: "#0f172a",
          card: "rgba(15, 23, 42, 0.7)",
          border: "rgba(255, 255, 255, 0.08)",
          borderGlow: "rgba(0, 242, 255, 0.3)",
          cyan: "#00f2ff",
          blue: "#3b82f6",
          emerald: "#10b981",
          amber: "#f59e0b",
          rose: "#f43f5e",
          purple: "#a855f7"
        }
      },
      fontFamily: {
        sora: ["Sora", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"]
      }
    },
  },
  plugins: [],
}