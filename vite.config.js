import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 4065,
    host: true, // allow external access
    allowedHosts: ["eyeage.algoapp.in"], // ✅ allow this domain
  },
});
