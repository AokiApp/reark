import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    lib: {
      entry: path.resolve(__dirname, "index.ts"),
      name: "RearkSubmoduleA",
      fileName: "reark-submodule-a",
      formats: ["es", "cjs"]
    },
    rollupOptions: {
      external: ["react", "@aokiapp/reark"],
      output: {
        globals: {
          react: "React"
        }
      }
    }
  }
});