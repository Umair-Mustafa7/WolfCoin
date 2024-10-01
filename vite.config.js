import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      external: ['react-router-dom'],
    },
    outDir: 'dist',  // Ensure the output directory is set to 'dist' (default for Vite)
    sourcemap: true,  // Helpful for debugging production issues
  },
  
});
