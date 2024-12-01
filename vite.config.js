import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      // Watch the public folder
      usePolling: true,
      interval: 500, // You can adjust this interval if needed
      ignored: ["!**/public/**"], // Make sure to watch public folder
    },
  },
});
