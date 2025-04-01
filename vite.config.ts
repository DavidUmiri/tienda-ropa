import { defineConfig } from "vite";

export default defineConfig({
  server: {
    fs: {
      strict: true,
      allow: ["."],
      deny: ["**/.env*", "**/.git/**", "**/node_modules/**"]
    },
    host: false
  }
});
