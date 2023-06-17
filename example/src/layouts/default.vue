<script lang="ts" setup>
import { useAppStore } from '@/store'

const { darkMode } = storeToRefs(useAppStore())
</script>

<template>
  <view class="h-100vh">
    <nut-config-provider :theme="darkMode ? 'dark' : ''">
      <slot />
    </nut-config-provider>
  </view>
</template>

<style>
.header {
  background-color: black;
  color: #fff;
}
</style>
