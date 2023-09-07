<script setup lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { PREFIX } from '../_constants'
import { colProps } from './col'

const props = defineProps(colProps)
const componentName = `${PREFIX}-col`

const prefixCls = componentName
const gutter = inject('gutter') as number
const classes = computed(() => {
  return {
    [prefixCls]: true,
    [`${prefixCls}-gutter`]: gutter,
    [`nut-col-${props.span}`]: true,
    [`nut-col-offset-${props.offset}`]: true,
  }
})
const style = computed(() => {
  return {
    paddingLeft: `${gutter / 2}px`,
    paddingRight: `${gutter / 2}px`,
  }
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'NutCol',
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
