<script setup lang="ts">
import { type CSSProperties, computed, defineComponent, ref } from 'vue'
import { PREFIX } from '../_utils'
import { stickyProps } from './sticky'

const props = defineProps(stickyProps)
const root = ref<HTMLElement>()

const rootStyle = computed(() => {
  return {
    height: `${props.parentHeight}px`,
  }
})

const stickyStyle = computed(() => {
  const style: CSSProperties = {
    top: `${props.top}px`,
    zIndex: +props.zIndex,
  }

  return style
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-sticky`
export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
  },
})
</script>

<template>
  <view ref="root" :style="rootStyle">
    <view :class="`${componentName} nut-sticky--stickyed`" :style="stickyStyle">
      <slot />
    </view>
  </view>
</template>
