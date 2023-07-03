import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'

export default defineConfig({
  plugins: [
    UnoCSS(),
    AutoImport({
      imports: ['vue'],
      vueTemplate: true,
    }),
    {
      name: 'vitepress-layout-slots-fix',
      enforce: 'pre',
      transform(code, id) {
        if (id.includes('Layout.vue') && !id.endsWith('.css'))
          return code.replace('<VPFooter />', '<VPFooter />\n<slot name="layout-bottom" />')
      },
    },
  ],
})
