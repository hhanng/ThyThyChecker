import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Base path matches the GitHub Pages repo name.
// If you rename the repo, update this to match: '/your-repo-name/'
export default defineConfig({
  plugins: [react()],
  base: '/study-hub/',
})
