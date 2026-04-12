import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/portfolio/',
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        projects: 'projects.html',
        veille: 'veille.html',
        details: 'details.html'
      }
    }
  }
})
