import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      'three128': path.resolve(__dirname, 'node_modules/three')
    }
  },
  server: {
    fs: {
      allow: ['..']
    }
  },
  assetsInclude: ['**/*.md', '**/*.py', '**/*.ipynb'],
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          react: ['react', 'react-dom', 'react-router-dom'],
          prism: ['prismjs']
        }
      }
    }
  }
});
