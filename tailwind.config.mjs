
import { iconsPlugin, getIconCollections } from "@egoist/tailwindcss-icons";
import typography from "@tailwindcss/typography";
import daisyui from "daisyui";


/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
  ],

  plugins: [
    daisyui,
    typography,
    iconsPlugin({
      // Select the icon collections you want to use
      // You can also ignore this option to automatically discover all individual icon packages you have installed
      // If you install @iconify/json, you should explicitly specify the collections you want to use, like this:
      collections: getIconCollections(["tabler"]),
      // If you want to use all icons from @iconify/json, you can do this:
      // collections: getIconCollections("all"),
      // and the more recommended way is to use `dynamicIconsPlugin`, see below.
    }),
  ],
  daisyui: {
    themes: ["emerald", "synthwave", "corporate", "halloween"],
  },
  theme: {
    fontFamily: {
      sans: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica",
        "Arial",
        "sans-serif",
      ],
      serif: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Georgia",
        "Cambria",
        "Times New Roman",
        "serif",
      ],
      mono: [
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    extend: {
      backgroundImage: {
        "gradient-to-t":
          "linear-gradient(to top, rgba(0, 0, 0, 1) 0%, rgba(0, 0, 0, 0) 100%)",
        transparent:
          "linear-gradient(to top, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 100%)",
      },
    },
  },
  darkMode: ['class', '[data-theme="halloween"]'],

};
