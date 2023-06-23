import { createSSRApp } from 'vue'

import { Locale } from 'uniapp-nutui/locale'
import App from './App.vue'
import 'uno.css'
import { setupStore } from './store'
import './styles/app.scss'

// Locale.use('id-id', IdIDLang())
Locale.merge({
  confirm: '确实',
})

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  return {
    app,
  }
}
