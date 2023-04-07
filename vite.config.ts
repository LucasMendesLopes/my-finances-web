import { defineConfig } from 'vite'
import { resolve } from 'path';
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '-src': resolve(__dirname, './src'),
      '-assets': resolve(__dirname, './src/assets'),
      '-components': resolve(__dirname, './src/components'),
      '-utils': resolve(__dirname, './src/utils'),
      '-services': resolve(__dirname, './src/services'),
    },
  },
})
