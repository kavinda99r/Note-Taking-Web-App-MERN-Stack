import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const proxy = {
  '/api': {
    target: 'http://localhost:8000',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api(?=\/|$)/, '') || '/',
  },
}

export default defineConfig({
  plugins: [react()],
  server: { proxy },
  preview: { proxy },
})
