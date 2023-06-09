import { resolve } from 'node:path'
import { defineConfig } from 'vite'

const input = {
  main: './styles/index.scss',
}

export default defineConfig({
  build: {
    minify: true,
    cssCodeSplit: true,
    assetsInlineLimit: 1024 * 200,
    rollupOptions: {
      input,
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name].[ext]',
        dir: resolve(__dirname, './styles'),
      },
    },
    emptyOutDir: false,
  },
})
