import { createSSRApp } from 'vue'

import { Locale } from 'uniapp-nutui'

// import EnUSLang from 'uniapp-nutui/components/_locale/lang/en-US'
import App from './App.vue'
import { setupStore } from './store'
import './styles/app.scss'

Locale.merge('zh-CN', {
  confirm: '官博内心',
})
// Locale.use('en-US', EnUSLang)
export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  return {
    app,
  }
}
