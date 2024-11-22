import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/pages/**/*.{js,ts,jsx,tsx,mdx}", "./src/components/**/*.{js,ts,jsx,tsx,mdx}", "./src/app/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "purple-accent": "#FAFAFF",
        "purple-accent-secondary": "#E9E5FF",
        "purple-quaternary": "#F6F5FF",
        "purple-primary": "#7762FF",
        "purple-secondary": "#C8C2FF",
        "purple-tertiary": "#CEC2FF",
        "purple-quinary": "#F8F2FF",
        "grey-accent": "#DBE2E8",
        "grey-text": "#666666",
        "grey-secondary-text": "#5A5A5A",
        "grey-tertiary-text": "#5A5B5C",
        "grey-button-text": "#F7F8F9",
        "grey-footer-text": "#B3B3B3",
        "grey-footer-background": "#141414",
        "grey-accordion-background": "#F6F5FF",
        "grey-signin-background": "#D9D9D9",
        "grey-button-border": "#DBE2E8",
        "grey-card-border": "#f5f5f5",
        "green-primary": "#28A745",
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
