<script lang="ts" setup>
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())

const curPage = getCurrentPages().at(-1) as any

// #ifdef H5
if (window.parent !== window.self) {
  window.parent.postMessage({
    type: 'route',
    data: curPage.route.slice(0, -6),
  }, '*')
}
// #endif
</script>

<template>
  <nut-config-provider :theme="darkMode ? 'dark' : ''">
    <slot />
  </nut-config-provider>
</template>

<style lang="scss">
page {
  > .nut-theme-,
  > .nut-theme-dark {
    height: 100%;
  }
}
</style>
