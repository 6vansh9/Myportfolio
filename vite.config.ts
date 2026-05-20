import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { visualizer } from 'rollup-plugin-visualizer'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    visualizer({
      filename: 'dist/bundle-stats.html',
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    proxy: {
      '/api/github-contributions': {
        target: 'https://github-contributions-api.jogruber.de/v4',
        changeOrigin: true,
        rewrite: (path) => {
          // Extract username and year from query params
          const url = new URL(path, 'http://localhost');
          const username = url.searchParams.get('username');
          const year = url.searchParams.get('year') || 'last';
          return `/${username}?y=${year}`;
        },
      },
    },
  },
})
