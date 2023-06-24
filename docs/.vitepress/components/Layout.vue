<script lang="ts" setup>
import DefaultTheme from 'vitepress/theme'
import { computed, watch } from 'vue'
import { useData, useRouter } from 'vitepress'

const { Layout } = DefaultTheme
const { route, go } = useRouter()
const { isDark } = useData()
const isComponentPage = computed(() => route.path.startsWith('/components'))

const iframeUrl = computed(() => {
  const path = route.path.replace('/components', '').split('.')[0]

  return import.meta.env.DEV
    ? `http://localhost:5173/ui/#/demo${path}/index`
    : `/ui/#/demo${path}/index`
})

watch(isDark, (val) => {
  const iframe = document.querySelector('iframe')
  if (iframe) {
    iframe.contentWindow?.postMessage(
      {
        type: 'theme',
        data: val ? 'dark' : 'light',
      },
      '*',
    )
  }
})

window.addEventListener('message', (e) => {
  if (e.data.type === 'route') {
    const path = e.data.data.split('/').slice(1).join('/')

    if (path !== 'index')
      go(`/components/${path}.html`)
  }
})
</script>

<template>
  <Layout :class="[{ 'xl:[&>.VPContent]:!pr-100': isComponentPage }]" />
  <div
    v-if="isComponentPage"
    class="fixed bottom-0  top-80px flex right-0 flex transition-all scrollbar-width-none rounded-l-xl xl:w-375px w-0 xl:right-10"
  >
    <iframe class="border-none rounded-xl block w-375px h-675px" :src="iframeUrl" />
  </div>
</template>
