import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/Moshaf/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary_color:"var(--primary-color)",
        secondary_color:"var(--secondary-color)", 
        accent_color:"var(--accent-color)",
        background_color:"var(--background-color)",
        second_background_color:"var(--second-background-color)",
        text_color:"var(--text-color)",
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('tailwind-scrollbar-hide'),
    
  ],
};
export default config;
