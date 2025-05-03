import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [react(), dts()],
  build: {
    lib: {
      entry: "./src/index.ts",
      name: "Reark",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "react",
        "@aokiapp/reark-lark-api",
        "@aokiapp/reark-renderer",
        "node:fs",
      ],
      output: {
        globals: {
          react: "React",
        },
      },
    },
  },
});
