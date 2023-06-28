import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        results: resolve(__dirname, "src/results/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
        user: resolve(__dirname, "src/user/index.html"),
      },
    },
  },
});
