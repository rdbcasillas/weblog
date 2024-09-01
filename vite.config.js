import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Markdown from "vite-plugin-md";
import { Buffer } from "buffer";

export default defineConfig({
  base: "/",
  plugins: [
    vue({
      include: [/\.vue$/, /\.md$/],
    }),

    Markdown(),
  ],
  define: {
    "process.env": {},
    global: "window",
    Buffer: Buffer,
  },
});
