<script lang="ts" setup>
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())

const curPage = getCurrentPages().at(-1) as any
const height = ref(
  // #ifdef H5
  'calc(100vh - 44px)',
  // #endif
)
const title = computed(() => {
  return curPage.route.split('/')[3]
})

// #ifdef H5
if (window.parent !== window.self) {
  window.parent.postMessage({
    type: 'route',
    data: curPage.route.slice(0, -6),
  }, '*')
}
// #endif

function onClickLeft() {
  const pages = getCurrentPages()
  if (pages.length > 1) {
    uni.navigateBack()
  }
  else {
    uni.redirectTo({
      url: '/',
    })
  }
}
</script>

<template>
  <nut-config-provider :theme="darkMode ? 'dark' : ''">
    <!-- #ifdef H5 -->
    <nut-navbar
      :placeholder="true" :fixed="true" :left-show="!!title" safe-area-inset-top
      :title="title ? title : 'NutUi'" :size="16" custom-style="font-weight: bold;" @on-click-back="onClickLeft"
    />
    <!-- #endif -->
    <nut-backtop :height="height" custom-class=" n-bg pb-safe pt-safe">
      <template #content>
        <slot />
      </template>
    </nut-backtop>
  </nut-config-provider>
</template>

<style>
.header {
  color: #fff;
  background-color: black;
}
</style>
