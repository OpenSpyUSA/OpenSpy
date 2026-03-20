import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
const buildId = new Date().toISOString()

export default defineConfig({
  base: './',
  define: {
    __BUILD_ID__: JSON.stringify(buildId),
  },
  plugins: [react()],
})
