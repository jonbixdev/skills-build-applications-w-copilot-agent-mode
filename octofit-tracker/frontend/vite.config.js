import react from '@vitejs/plugin-react'
import { dirname } from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { defineConfig, loadEnv } from 'vite'

const frontendDirectory = dirname(fileURLToPath(import.meta.url))

export default defineConfig(({ mode }) => {
  const viteEnv = loadEnv(mode, frontendDirectory, 'VITE_')
  const codespaceName =
    process.env.VITE_CODESPACE_NAME || viteEnv.VITE_CODESPACE_NAME || process.env.CODESPACE_NAME || ''

  return {
    plugins: [react()],
    define: {
      'import.meta.env.VITE_CODESPACE_NAME': JSON.stringify(codespaceName),
    },
    server: {
      port: 5173,
      strictPort: true,
    },
  }
})
