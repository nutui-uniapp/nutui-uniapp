<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { useProvide } from '../_hooks'
import { GRID_KEY, gridProps } from './grid'

const COMPONENT_NAME = 'nut-grid'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(gridProps)

useProvide(GRID_KEY, `${COMPONENT_NAME}-item`)({ props })

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--border`]: props.border && !props.gutter,
  })
})

const styles = computed(() => {
  const style: CSSProperties = {}

  if (props.gutter)
    style.paddingLeft = pxCheck(props.gutter)

  return getMainStyle(props, style)
})
</script>

<template>
  <view :class="classes" :style="styles">
    <slot />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
