import { defineConfig } from 'astro/config';
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  site: 'https://davidumiri.github.io',
  base: '/tienda-ropa',
  output: 'static'
});