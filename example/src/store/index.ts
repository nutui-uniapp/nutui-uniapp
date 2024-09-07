import { createPinia } from 'pinia'
import type { App } from 'vue'

export const pinia = createPinia()

export async function setupStore(app: App) {
  app.use(pinia)
}

export * from './modules'
