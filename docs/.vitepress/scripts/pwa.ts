import type { VitePWAOptions } from 'vite-plugin-pwa'

export const pwa: Partial<VitePWAOptions> = {
  base: '/',
  scope: '/',
  manifest: {
    name: 'nutui-uniapp',
    short_name: 'nutui-uniapp',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  workbox: {
    globPatterns: ['**/*.{css,js,html,svg,png,ico,txt,woff2}'],
  },
  devOptions: {
    enabled: true,
    suppressWarnings: true,
    navigateFallback: '/',
  },
}
