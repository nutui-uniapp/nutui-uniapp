// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import Layout from '../components/Layout.vue'
import ReloadPrompt from '../components/ReloadPrompt.vue'
import './style.css'
import 'uno.css'

export default {
  ...Theme,
  Layout() {
    return h(Layout, null, {
      'layout-bottom': () => h(ReloadPrompt),
    })
  },
  // enhanceApp({ app, router, siteData }) {
  //   // ...
  // },
}
