import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({})],
  base: "/report/",
  build:
      process.env.USE_DTS_PLUGIN === "true"
          ? {
            lib: {
              entry: resolve(__dirname, "src/libs/index.js"),
              fileName: "canyon-report",
              name: "CanyonReport",
            },
            rollupOptions: {
              external: ["react", "react-dom"],
            }
          }
          : {},
});
