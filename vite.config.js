import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 3001,
    allowedHosts: [
      'localhost',
      'rngoq-2804-14c-94-256e-113f-6b14-f27-e565.a.free.pinggy.link'
    ],
    hmr: {
      overlay: true
    }
  },
})
