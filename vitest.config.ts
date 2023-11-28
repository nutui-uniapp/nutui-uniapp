import path from 'node:path'
import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import uni from '@dcloudio/vite-plugin-uni'

// https://vitejs.dev/config/
const resolve = path.resolve

export default defineConfig({
  resolve: {
    alias: [{ find: '@', replacement: resolve(__dirname, './packages') }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/nutui/styles/variables.scss";`,
      },
    },
  },
  plugins: [
    // uni(),
    vue({
      include: [/\.vue$/],
    }),
    vueJsx(),
  ],
  test: {
    globals: true,
    environment: 'jsdom',
    singleThread: true,
    coverage: {
      provider: 'v8',
    },
    include: ['packages/nutui/**/*.(test|spec).(ts|tsx)'],
    exclude: [...configDefaults.exclude, 'e2e/*'],
    reporters: ['default', 'html'],
  },
})
