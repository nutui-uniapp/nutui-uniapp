import path from 'node:path'
import { configDefaults, defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

const resolve = path.resolve
// https://vitejs.dev/config/
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
    // uni({
    //   vueOptions: {
    //     include: [/\.vue$/],
    //   },
    // }),
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
