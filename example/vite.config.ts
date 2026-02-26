import { resolve } from 'node:path'
import process from 'node:process'
import UniApp from '@dcloudio/vite-plugin-uni'
import UniComponents from '@uni-helper/vite-plugin-uni-components'
import UniLayouts from '@uni-helper/vite-plugin-uni-layouts'
import UniManifest from '@uni-helper/vite-plugin-uni-manifest'
import UniPages from '@uni-helper/vite-plugin-uni-pages'
import { NutResolver } from 'nutui-uniapp'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vite'
import ViteRestart from 'vite-plugin-restart'

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
    UnoCSS(),
    UniComponents({
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
            'useNotify',
            'useToast',
          ],
        },
      ],
      dts: 'src/auto-imports.d.ts',
      dirs: ['src/composables', 'src/stores'],
      vueTemplate: true,
    }),
    UniLayouts(),
    // @ts-expect-error whatever
    UniApp.default(),
    ViteRestart({
      restart: [
        '../packages/nutui/components/**',
      ],
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@import "nutui-uniapp/styles/variables.scss";',
      },
    },
  },
})
