<script lang="ts" setup>
import { computed, provide, ref, toRef } from 'vue'
import { getMainClass } from '../_utils'
import { swipegroupProps } from './swipegroup'

const COMPONENT_NAME = 'nut-swipe-group'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(swipegroupProps)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
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

<template>
  <view :class="classes" :style="props.customStyle">
    <slot />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
