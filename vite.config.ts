import react from "@vitejs/plugin-react";
import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({}), dts()],
  base: "/canyon-report/",
  build:
    process.env.USE_DTS_PLUGIN === "true"
      ? {
          lib: {
            entry: resolve(__dirname, "src/libs/index.ts"),
            fileName: "canyon-report",
            name: "CanyonReport",
          },
          rollupOptions: {
            external: ["react", "react-dom"],
          },
          sourcemap: true,
        }
      : {},
});
