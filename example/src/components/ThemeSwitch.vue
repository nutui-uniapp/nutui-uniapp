<script lang="ts" setup>
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())
function switchTheme() {
  darkMode.value = !darkMode.value

  window.parent.postMessage(
    {
      type: 'theme',
      data: darkMode.value,
    },
    '*',
  )
}
</script>

<template>
  <view @click="switchTheme">
    <div v-if="darkMode" class="i-tabler-sun" />
    <div v-else class="i-tabler-moon c-black" />
  </view>
</template>
