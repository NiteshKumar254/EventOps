// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// ✅ Vercel + React Router friendly config
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // optional for local dev
  },
  build: {
    outDir: 'dist', // default, but explicit is good
  },
})
