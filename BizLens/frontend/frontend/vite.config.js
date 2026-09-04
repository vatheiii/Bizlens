import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080,
    // Uncomment and point this at your Express/Sequelize backend
    // so client calls to /api/* are forwarded during development.
    // proxy: {
    //   "/api": "http://localhost:5000",
    // },
  },
});
