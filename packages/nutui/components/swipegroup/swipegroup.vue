<script lang="ts" setup>
import { computed, defineComponent, provide, ref, toRef } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { swipegroupProps } from './swipegroup'

const props = defineProps(swipegroupProps)

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const name = ref('')

function update(value: string) {
  name.value = value
}

provide('swipeGroup', {
  update,
  lock: toRef(props, 'lock'),
  name,
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-swipe-group`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <slot />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
