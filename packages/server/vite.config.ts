import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

export default defineConfig({
  plugins: [dts()],
  build: {
    emptyOutDir: false,
    lib: {
      entry: "./src/index.ts",
      name: "RearkServer",
      fileName: "index",
      formats: ["es", "cjs"],
    },
    rollupOptions: {
      external: [
        "@aokiapp/reark-lark-api",
        "mime-types",
        "node:fs",
        "node:path",
        "node:os",
        "node:stream",
        "node:buffer",
      ],
      output: {
        globals: {},
      },
    },
  },
});
