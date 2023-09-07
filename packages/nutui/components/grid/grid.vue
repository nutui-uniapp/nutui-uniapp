<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import { useProvide } from '../_hooks'
import { GRID_KEY, gridProps } from './grid'

const props = defineProps(gridProps)

const componentName = `${PREFIX}-grid`

useProvide(GRID_KEY, `${componentName}-item`)({ props })

const rootClass = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}--border`]: props.border && !props.gutter,
  }
})

const rootStyle = computed(() => {
  const style: import('vue').CSSProperties = {}

  if (props.gutter)
    style.paddingLeft = pxCheck(props.gutter)

  return style
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'NutGrid',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="rootClass" :style="rootStyle">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
