// @ts-check
import { defineConfig } from "astro/config";

import react from "@astrojs/react";
import svgr from "vite-plugin-svgr";
import vercel from "@astrojs/vercel";

// https://astro.build/config
export default defineConfig({
  adapter: vercel({}),
  integrations: [react()],
  vite: {
    plugins: [svgr()],
  },
});
