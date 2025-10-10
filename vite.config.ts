import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import generateNoscriptPlugin from "./vite-plugins/generate-noscript";

// https://vitejs.dev/config/
export default defineConfig(() => ({
  base: "/",
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    generateNoscriptPlugin(), // Run before other HTML transforms
    react()
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "dist",
  },
}));
