<script lang="ts" setup>
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())
</script>

<template>
  <view @click="darkMode = !darkMode">
    <div v-if="darkMode" class="i-tabler-sun" />
    <div v-else class="i-tabler-moon" />
  </view>
</template>
