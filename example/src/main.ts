import { createSSRApp } from 'vue'
import * as Pinia from 'pinia'
import App from './App.vue'
import { setupStore } from './store'
import '@nutui/touch-emulator'
import 'virtual:uno.css'
import './main.scss'
import './styles/app.scss'

export function createApp() {
  const app = createSSRApp(App)

  setupStore(app)

  return {
    app,
    Pinia,
  }
}
