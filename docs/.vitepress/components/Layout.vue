<script lang="ts" setup>
import { useData, useRouter } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import { computed, onMounted, watch } from 'vue'
import FriendlyLinks from './FriendlyLinks.vue'

const { Layout } = DefaultTheme
const { route, go } = useRouter()
const { isDark } = useData()
const isComponentPage = computed(() => route.path.startsWith('/components'))

const iframeUrl = computed(() => {
  const path = route.path.replace('/components', '').split('.')[0]

  return import.meta.env.DEV
    ? `http://localhost:5173/ui/#/pages/demo${path}/index`
    : `/ui/#/pages/demo${path}/index`
})

function enableTransitions() {
  return 'startViewTransition' in document
    && window.matchMedia('(prefers-reduced-motion: no-preference)').matches
}

provide('toggle-appearance', async ({ clientX: x, clientY: y }: MouseEvent) => {
  if (!enableTransitions()) {
    isDark.value = !isDark.value
    return
  }

  const clipPath = [
    `circle(0px at ${x}px ${y}px)`,
    `circle(${Math.hypot(
      Math.max(x, innerWidth - x),
      Math.max(y, innerHeight - y),
    )}px at ${x}px ${y}px)`,
  ]

  await document.startViewTransition(async () => {
    isDark.value = !isDark.value
    await nextTick()
  }).ready

  document.documentElement.animate(
    { clipPath: isDark.value ? clipPath.reverse() : clipPath },
    {
      duration: 300,
      easing: 'ease-in',
      pseudoElement: `::view-transition-${isDark.value ? 'old' : 'new'}(root)`,
    },
  )
})

onMounted(() => {
  if (typeof window !== 'undefined') {
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
        const path = e.data.data.split('/demo/').slice(1).join('/')
        if (!path)
          return

        if (path !== 'index')
          go(`/components/${path}.html`)
      }

      if (e.data.type === 'theme') {
        const html = document.querySelector('html')
        if (e.data.data)
          html?.classList.add('dark')
        else
          html?.classList.remove('dark')
      }

      // isDark.value = e.data.data
    })
  }
})
</script>

<template>
  <Layout id="docs" :class="[{ 'xl:[&>.VPContent]:!pr-100': isComponentPage }]">
    <template #home-features-after>
      <FriendlyLinks />
    </template>
  </Layout>

  <div
    v-if="isComponentPage"
    class="fixed bottom-0  top-80px flex right-0 flex transition-all scrollbar-width-0 rounded-l-xl xl:w-375px w-0 xl:right-10"
  >
    <iframe class="border-none rounded-xl transition-all scrollbar-width-0 block w-375px h-675px" :src="iframeUrl" />
  </div>
</template>

<style>
/* stylelint-disable selector-class-pattern */

::view-transition-old(root),
::view-transition-new(root) {
  mix-blend-mode: normal;
  animation: none;
}

::view-transition-old(root),
.dark::view-transition-new(root) {
  z-index: 1;
}

::view-transition-new(root),
.dark::view-transition-old(root) {
  z-index: 9999;
}

.VPSwitchAppearance {
  width: 22px !important;
}

.VPSwitchAppearance .check {
  transform: none !important;
}
</style>
