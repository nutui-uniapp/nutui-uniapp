import { createSSRApp } from 'vue'

import App from './App.vue'
import 'uno.css'
import './main.scss'
import { setupStore } from './store'
import './styles/app.scss'
import '@nutui/touch-emulator'

export function createApp() {
  const app = createSSRApp(App)
  setupStore(app)
  return {
    app,
  }
}
