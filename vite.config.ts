import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

function securityPlugin() {
  return {
    name: 'vite-plugin-security',
    enforce: 'pre',
    resolveId(source, importer) {
      if (source.includes('?raw') || source.includes('?inline')) {
        // Validar la ruta del archivo
        const cleanPath = source.split('?')[0];
        if (shouldDenyAccess(cleanPath)) {
          throw new Error(`Access denied to file: ${cleanPath}`);
        }
      }
    }
  };
}

function shouldDenyAccess(path: string) {
  const denyPatterns = [
    /node_modules/,
    /\.env/,
    /\.git/,
    // Agregar más patrones según sea necesario
  ];
  return denyPatterns.some(pattern => pattern.test(path));
}

export default defineConfig({
  // ...existing code...
  plugins: [
    securityPlugin(),
    // ...existing plugins...
  ],
  server: {
    fs: {
      strict: true,
      deny: ['node_modules/**', '.env*', '.git/**']
    }
  }
});
