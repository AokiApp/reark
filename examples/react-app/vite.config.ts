import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@aokiapp/reark": path.resolve(__dirname, "../../packages/core"),
      "@aokiapp/reark-submodule-a": path.resolve(__dirname, "../../packages/reark-submodule-a"),
      "@aokiapp/reark-submodule-b": path.resolve(__dirname, "../../packages/reark-submodule-b")
    }
  }
});