<script lang="ts" setup>
import { computed, inject } from 'vue'
import { getMainClass, getMainStyle } from '../_utils'
import { colProps } from './col'

const COMPONENT_NAME = 'nut-col'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(colProps)

const gutter = inject('gutter') as number

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}-gutter`]: gutter,
    [`nut-col-${props.span}`]: true,
    [`nut-col-offset-${props.offset}`]: true,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    paddingLeft: `${gutter / 2}px`,
    paddingRight: `${gutter / 2}px`,
  })
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
