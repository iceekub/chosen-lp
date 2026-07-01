import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// Separate config for the server build used only by the prerenderer.
// Emits a single ESM bundle (dist-ssr/entry-server.mjs) exporting render(url).
export default defineConfig({
  plugins: [react()],
  build: {
    ssr: "src/entry-server.jsx",
    outDir: "dist-ssr",
    emptyOutDir: true,
    rollupOptions: {
      output: { format: "es", entryFileNames: "entry-server.mjs" },
    },
  },
});
