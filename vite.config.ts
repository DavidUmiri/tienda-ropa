import { defineConfig } from 'vite';
import { fileURLToPath } from 'url';

function securityPlugin() {
  return {
    name: 'vite-plugin-security',
    enforce: 'pre',
    resolveId(source, importer) {
      // Validar todas las variantes de consultas peligrosas
      const hasUnsafeQuery = source.includes('?import') || 
                            source.includes('?raw') || 
                            source.includes('?inline') ||
                            source.includes('.wasm?init');
      
      if (hasUnsafeQuery) {
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
    /\.\./,  // Prevenir directory traversal
    /^[@/]fs\//i,  // Bloquear acceso directo al sistema de archivos
    /^[a-zA-Z]:\\/i // Bloquear rutas absolutas Windows
  ];
  return denyPatterns.some(pattern => pattern.test(path));
}

export default defineConfig({
  plugins: [
    securityPlugin()
  ],
  server: {
    fs: {
      strict: true,
      allow: ['.'], // Solo permitir archivos dentro del proyecto
      deny: ['**/.env*', '**/.git/**', '**/node_modules/**']
    },
    host: false // Deshabilitar acceso remoto por defecto
  }
});
