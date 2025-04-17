import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// 🛑 todo-app
export default defineConfig({
  base: "/todo-app/", \
  plugins: [react()],
})
