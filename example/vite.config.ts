import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import { NutResolver } from '../packages/nutui/src'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    Components({
      deep: true,
      dts: 'src/components.d.ts',
      resolvers: [NutResolver()],

    }),
    UniPages({
      routeBlockLang: 'yaml',
      minify: true,
    }),
    UniManifest({ minify: true }),
    AutoImport({
      imports: ['vue', 'pinia', 'uni-app'],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true,
    }),
    uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "uniapp-nutui/styles/variables.scss";',
      },
    },
  },
})
