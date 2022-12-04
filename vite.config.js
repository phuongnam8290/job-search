import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
// To fix Vitest matcher resolve to Chai, we need to mark node_modules/@types/chai/index.d.ts as plain text to
// exclude it from code completion.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    globals: true,
    setupFiles: ["./tests/setup.js"],
  },
});
