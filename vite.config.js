import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // For Vercel or custom domain deployments, base must be '/'
  // Change this back to '/parthbhavsar-portfolio/' ONLY if deploying to GitHub Pages
  base: '/',
})