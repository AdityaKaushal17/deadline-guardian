import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./hooks/**/*.{ts,tsx}", "./store/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        guardian: {
          ink: "#070A12",
          panel: "rgba(15, 23, 42, 0.72)",
          line: "rgba(148, 163, 184, 0.18)",
          cyan: "#44D7F6",
          mint: "#7CF8CF",
          amber: "#F9C86A",
          danger: "#FF6B7A"
        }
      },
      boxShadow: {
        glow: "0 0 60px rgba(68, 215, 246, 0.16)",
        panel: "0 24px 80px rgba(0, 0, 0, 0.35)"
      },
      backgroundImage: {
        "guardian-grid": "linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
