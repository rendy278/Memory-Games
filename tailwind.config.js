/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "app-banner": "url(assets/images/app-bg.jpg)",
        "gameboard-background": "url(assets/images/gameboard.png)",
        "fruit-background": "url(assets/images/fruit-bg.png)",
        "sidebar-background": "url(assets/images/sidebar-bg.png)",
      },
    },
  },
  plugins: [],
};
