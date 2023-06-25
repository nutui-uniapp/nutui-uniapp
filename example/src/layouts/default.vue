<script lang="ts" setup>
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())

const curPage = getCurrentPages().at(-1) as any
const title = computed(() => {
  return curPage.route.split('/')[2]
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
  <view class="h-100vh">
    <nut-config-provider :theme="darkMode ? 'dark' : ''">
      <nut-navbar :placeholder="true" :fixed="true" :left-show="title !== 'index'" safe-area-inset-top :title="title === 'index' ? 'NutUi' : title" @on-click-back="onClickLeft">
        <!-- <template #left>
          <div v-if="title !== 'index'">
            返回
          </div>
        </template> -->
      </nut-navbar>
      <slot />
    </nut-config-provider>
  </view>
</template>

<style>
.header {
  color: #fff;
  background-color: black;
}
</style>
