import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    //visualizer()
  ],
  test: {
    environment: "jsdom",
    setupFiles: "./src/__tests__/setup.js",
    globals: true,
    watch: true,
  },
  // resolve: {
  //   alias: {
  //     "@": resolve(dirname(fileUrlToPath(import.meta.url)), "src"),
  //   },
  // },
});
