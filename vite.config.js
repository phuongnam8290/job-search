import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
// To fix Vitest matcher resolve to Chai, we need to mark node_modules/@types/chai/index.d.ts as plain text to
// exclude it from code completion.
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: [
      { find: "@", replacement: fileURLToPath(new URL("./src", import.meta.url)) },
      // Workaround for vitest & @testing-library/vue importing different build of @vue/test-utils. Use when you want to
      // work directly with the underlying @vue/test-utils for stubs global component, function...
      {
        find: "@vue/test-utils",
        replacement: "/node_modules/@vue/test-utils/dist/vue-test-utils.cjs.js",
      },
    ],
  },
  test: {
    globals: true,
    setupFiles: ["./tests/setup.js"],
  },
});
