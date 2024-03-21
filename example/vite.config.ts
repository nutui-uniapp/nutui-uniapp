import { resolve } from 'node:path'
import process from 'node:process'
import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import unocss from 'unocss/vite'

import { NutResolver } from 'nutui-uniapp'

// https://vitejs.dev/config/
export default defineConfig({
  root: process.cwd(),
  base: '/ui/',
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
    },
  },
  plugins: [
    unocss(),
    Components({
      deep: true,
      dts: 'src/components.d.ts',
      resolvers: [NutResolver()],

    }),
    UniPages({
      minify: true,
    }),
    UniManifest({ minify: true }),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'uni-app',
        {
          'nutui-uniapp/composables': [
            'useToast'
          ],
        }
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true,
    }),

    UniLayouts(),
    uni(),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "nutui-uniapp/styles/variables.scss";',
      },
    },
  },
})
