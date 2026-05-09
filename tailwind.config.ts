import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "rgb(var(--brand) / <alpha-value>)",
          accent: "rgb(var(--brand-accent) / <alpha-value>)"
        },
        ink: {
          900: "#06090f",
          800: "#0b1220",
          700: "#101a2c",
          600: "#162238",
          500: "#1f2d47"
        }
      },
      fontFamily: {
        sans: ["ui-sans-serif", "system-ui", "Inter", "Segoe UI", "Roboto", "Helvetica", "Arial"]
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(6, 182, 212, 0.2), 0 10px 40px -10px rgba(6, 182, 212, 0.35)"
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at 50% 0%, rgba(6,182,212,0.18), transparent 60%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)"
      }
    }
  },
  plugins: []
};

export default config;
