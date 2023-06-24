// https://vitepress.dev/guide/custom-theme
import Theme from 'vitepress/theme'
import Layout from '../components/Layout.vue'
import './style.css'
import 'uno.css'

export default {
  ...Theme,
  Layout,
  // enhanceApp({ app, router, siteData }) {
  //   // ...
  // },
}
