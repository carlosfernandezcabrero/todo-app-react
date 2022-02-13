import react from '@vitejs/plugin-react'
import { readdirSync } from 'fs'
import { resolve } from 'path'
import { defineConfig } from 'vite'

function getAbsolutePaths () {
  const aliases = {}

  readdirSync('./src', { withFileTypes: true })
    .filter((dir) => dir.isDirectory())
    .forEach(
      ({ name }) => (aliases[name] = resolve(process.cwd(), 'src', name))
    )

  return aliases
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      ...getAbsolutePaths()
    }
  },
  test: {
    environment: 'jsdom'
  }
})
