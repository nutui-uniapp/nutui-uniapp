import { createSSRApp } from 'vue'

import { Locale } from 'nutui-uniapp/locale'
import App from './App.vue'
import 'uno.css'
import './main.scss'
import { setupStore } from './store'
import './styles/app.scss'
import '@nutui/touch-emulator'

Locale.merge({
  confirm: '已确认',
})

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  return {
    app,
  }
}
