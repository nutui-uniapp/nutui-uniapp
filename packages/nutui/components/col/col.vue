<script setup lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import { colProps } from './col'

const props = defineProps(colProps)

const gutter = inject('gutter') as number
const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}-gutter`]: gutter,
    [`nut-col-${props.span}`]: true,
    [`nut-col-offset-${props.offset}`]: true,
  })
})
const style = computed(() => {
  return getMainStyle(props, {
    paddingLeft: `${gutter / 2}px`,
    paddingRight: `${gutter / 2}px`,
  })
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-col`

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
  <view :class="classes" :style="style">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
