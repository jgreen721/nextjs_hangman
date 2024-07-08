import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./reusables/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
        "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "card-gradient":"var(--cardgradient)",
        "btn-gradient":"var(--pinkgradient)",
        "bluewhitegradient":"var(--bluewhitegradient)"
      },
      borderColor:{
        "dark-gray":"var(--darknavy)",
        "customblue":"var(--blue)"
      },
   
      backgroundColor:{
        "dark-gray":"var(--realdarknavy)"
      },
      boxShadow:{
        "inner-card":"-2px -4px 15px var(--darknavy) inset",
        "btn-shadow":"10px 5px 25px var(--darknavy)",
        "btn-inset":"5px 5px 20px var(--darknavy) inset",
        "btn-inset-bottom":"5px -5px 20px var(--darknavy) inset",
        "light-shadow":"5px 5px 15px rgb(255,255,255,.25)"
      },
      letterSpacing:{
        "custom-spacing":"2px"
      },

      textShadow:{
        "custom":"2px 2px 10px black"
      }
    },
  },
  plugins: [],
};
export default config;
