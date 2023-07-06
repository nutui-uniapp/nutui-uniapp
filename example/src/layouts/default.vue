<script lang="ts" setup>
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())

const curPage = getCurrentPages().at(-1) as any

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
      :title="title ? title : 'NutUi'" :size="16" custom-style="font-weight: bold;"
      @on-click-back="onClickLeft"
    />
    <!-- #endif -->
    <scroll-view style="height:100vh" class=" n-bg pb-safe pt-safe" scroll-y>
      <slot />
    </scroll-view>
  </nut-config-provider>
</template>

<style>
.header {
  color: #fff;
  background-color: black;
}
</style>
