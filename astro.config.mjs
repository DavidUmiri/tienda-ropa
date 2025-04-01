import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  site: 'https://davidumiri.github.io/tienda-ropa/',
  base: '/',
  output: 'static'
});