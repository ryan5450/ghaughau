/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        nav_color: "#F1DBE2",
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        acme: ['Acme', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
