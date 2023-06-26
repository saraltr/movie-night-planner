import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",

  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        result: resolve(__dirname, "src/result/index.html"),
        login: resolve(__dirname, "src/login/index.html"),
        user: resolve(__dirname, "src/user/index.html"),
        
      },
    },
  },
});
