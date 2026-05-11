import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        border: "rgb(226 232 240)",
        surface: "rgb(248 250 252)",
        ink: "rgb(15 23 42)",
        muted: "rgb(100 116 139)",
        primary: "rgb(20 83 45)",
        accent: "rgb(14 116 144)"
      },
      boxShadow: {
        soft: "0 10px 30px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};

export default config;
