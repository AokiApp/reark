import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dts from "vite-plugin-dts";

// Minimal Vite config for a React component library with CSS and PostCSS support
export default defineConfig({
  plugins: [react(), dts()],
  css: {
    // PostCSS config is picked up automatically from postcss.config.js if present.
    // This block is ready for future PostCSS plugin configuration.
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "renderer",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React",
        },
      },
    },
    sourcemap: true,
  },
});
