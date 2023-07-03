// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import './style.css'
import 'uno.css'
import type { Router } from 'vitepress'
import type { App } from 'vue'
import Layout from '../components/Layout.vue'

export default {
  ...Theme,
  Layout() {
    return h(Layout, null, {
      // 'home-features-after': () => h(HomeSponsors),
      // 'aside-ads-before': () => h(AsideSponsors),
    })
  },
  enhanceApp({ app, router }: { app: App; router: Router }) {

  },
}
