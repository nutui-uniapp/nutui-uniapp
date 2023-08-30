import { defineConfig } from 'vitepress'
import { withPwa } from '@vite-pwa/vitepress'
import { version } from '../../package.json'
import { components, guides, navComponents } from './items'
import { pwa } from './scripts/pwa'

// https://vitepress.dev/reference/site-config
export default withPwa(defineConfig({
  title: 'nutui-uniapp',
  description: '京东风格的移动端组件库，完全适配uni-app',
  lastUpdated: true,
  head: [
    ['meta', { property: 'og:title', content: 'NutUi' }],
    [
      'meta',
      {
        property: 'og:description',
        content: '京东风格的移动端组件库，完全适配uni-app',
      },
    ],
    ['meta', { property: 'og:url', content: 'https://github.com/nutui-uniapp/nutui-uniapp' }],
    ['meta', { name: 'referrer', content: 'no-referrer' }],
    ['link', { rel: 'icon', href: 'https://s2.loli.net/2023/08/30/1AxH9rbqi4kvCls.png', type: 'image/png' }],
  ],
  themeConfig: {
    logo: 'https://s2.loli.net/2023/08/30/foMY3ui4nQpUA1C.png',

    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '指南', items: guides },
      { text: '组件', items: navComponents },
      {
        text: '其他',
        items: [
          {
            text: ' NutUI-Vue',
            link: 'https://nutui.jd.com/h5/vue/4x/#/zh-CN/guide/intro',
          },
          {
            text: ' NutUI-Taro',
            link: 'https://nutui.jd.com/taro/vue/4x/#/zh-CN/guide/intro',
          },
          {
            text: ' NutUI-React',
            link: 'https://nutui.jd.com/h5/react/2x/#/zh-CN/guide/intro-react',
          },
        ],
      },
      {
        text: `v${version}`,
        items: [
          {
            text: '更新日志',
            link: 'https://github.com/nutui-uniapp/nutui-uniapp/releases',
          },
          {
            text: '贡献',
            link: 'https://github.com/nutui-uniapp/nutui-uniapp/blob/main/CONTRIBUTING.md',
          },
          {
            text: '行为准则',
            link: 'https://github.com/nutui-uniapp/nutui-uniapp/blob/main/CODE_OF_CONDUCT.md',
          },
        ],
      },

    ],

    search: {
      provider: 'local',
    },

    sidebar: {
      '/guide/': [
        {
          text: '指南',
          items: guides,
        },
      ],
      '/components/': [
        {
          text: '组件',
          items: components,
        },
      ],
    },

    socialLinks: [{ icon: 'github', link: 'https://github.com/nutui-uniapp/nutui-uniapp' }],

    editLink: {
      pattern: 'https://github.com/nutui-uniapp/nutui-uniapp/edit/main/docs/:path',
      text: '在 GitHub 上编辑此页',
    },

    footer: {
      message: 'MIT Licensed',
      copyright: '版权所有 © 2023 年-至今 yang1206 贡献者',
    },
    aside: false,
    returnToTopLabel: 'top',

  },

  markdown: {
    theme: {
      light: 'vitesse-light',
      dark: 'vitesse-dark',
    },
  },
  pwa,
}))
