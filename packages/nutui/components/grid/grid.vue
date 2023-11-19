<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import { useProvide } from '../_hooks'
import { GRID_KEY, gridProps } from './grid'

const props = defineProps(gridProps)

const componentName = `${PREFIX}-grid`

useProvide(GRID_KEY, `${componentName}-item`)({ props })

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--border`]: props.border && !props.gutter,
  })
})

const styles = computed(() => {
  const style: CSSProperties = {}
  if (props.gutter)
    style.paddingLeft = pxCheck(props.gutter)

  return getMainStyle(props, style)
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
  <view :class="classes" :style="styles">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
