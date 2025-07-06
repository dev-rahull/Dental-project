// vite.config.js
import { defineConfig } from "vite";

export default defineConfig({
  // your existing config...
  preview: {
    host: "0.0.0.0",
    port: process.env.PORT || 4173,
    allowedHosts: ["dental-project-40vi.onrender.com"],
  },
});
