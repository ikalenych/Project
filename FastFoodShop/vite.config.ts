import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,

    allowedHosts: ["localhost", "127.0.0.1", "0104a6004b01.ngrok-free.app"],
  },
});
