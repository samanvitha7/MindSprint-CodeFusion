import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Specific rule for ML prediction requests
      '/api/predict': {
        target: 'http://localhost:8000', // Your Python ML Backend
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''), // Rewrites /api/predict to /predict
      },
      // General rule for all other API requests
      '/api': {
        target: 'http://localhost:5050', // Your Node.js Backend
        changeOrigin: true,
      },
    },
  },
});
