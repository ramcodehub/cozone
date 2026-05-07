import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: '/',
  define: {
    '__BUILD_TIMESTAMP__': JSON.stringify(new Date().toLocaleString()),
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
    minify: false, // Temporarily disable minification for production debugging
  },
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5005',
        changeOrigin: true,
        secure: false,
      }
    }
  }
})