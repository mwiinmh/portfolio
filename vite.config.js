import { defineConfig } from 'vite'

export default defineConfig({
  base: '/portfolio/',
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
