import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "purple-accent": "#FAFAFF",
        "purple-accent-secondary": "#E9E5FF",
        "purple-quaternary": "#F6F5FF",
        "purple-primary": "#7762FF",
        "purple-secondary": "#C8C2FF",
        "purple-tertiary": "#CEC2FF",
        "grey-accent": "#DBE2E8",
        "grey-text": "#666666",
        "grey-footer-text": "#B3B3B3",
        "grey-footer-background": "#141414",
        "grey-accordion-background": "#494949",
        black: "#090909",
      },
      fontFamily: {
        p22mackinac: ["P22Mackinac", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
