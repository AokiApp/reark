import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "RearkSubmoduleB",
      fileName: "reark-submodule-b",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react"],
      output: {
        globals: {
          react: "React"
        }
      }
    }
  }
});