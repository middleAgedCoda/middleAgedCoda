import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#111827",
          foreground: "#F9FAFB",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
