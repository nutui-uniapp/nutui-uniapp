import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import Components from '@uni-helper/vite-plugin-uni-components'
import { AnoResolver } from '@uni-helper/vite-plugin-uni-components/resolvers'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    AutoImport({
      imports: ['vue'],
      vueTemplate: true,
    }),
    Components({
      resolvers: [
        AnoResolver(),
      ],
    }),
  ],
})
