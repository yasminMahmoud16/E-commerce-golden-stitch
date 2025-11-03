import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from "path"

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    }
  },

  base: "./",

  server: {
    port:3001,
    proxy: {
      '/uploads': {
        // target: 'http://localhost:3000',
        // target: 'https://carletta-nonchimerical-hilda.ngrok-free.dev',
        // target: 'http://18.234.168.49',
        // target: 'http://54.221.212.74/',
        target: 'https://www.goldenstitchleathers.com/api',
        changeOrigin: true,
      },
    },
  },
})
