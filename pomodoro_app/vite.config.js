import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  base: '/proxy/3000/',
  server: {
    port: 3000,
    host: '0.0.0.0',
    allowedHosts: [
      'decm2ra0kyhzh.cloudfront.net',
      'localhost',
      '127.0.0.1'
    ]
  },
  test: {
    globals: true,
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
    },
  }
})