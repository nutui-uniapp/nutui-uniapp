<script setup lang="ts">
import { defineComponent, provide } from 'vue'
import { PREFIX } from '../_utils'
import { rowProps } from './row'

const props = defineProps(rowProps)
const componentName = `${PREFIX}-row`

const prefixCls = componentName
provide('gutter', props.gutter)
function getClass(prefix: string, type: string) {
  return prefix ? (type ? `nut-row-${prefix}-${type}` : '') : `nut-row-${type}`
}
function getClasses() {
  return `
          ${getClass('', props.type)}
          ${getClass('justify', props.justify)}
          ${getClass('align', props.align)}
          ${getClass('flex', props.flexWrap)}
          ${prefixCls}
          `
}
</script>

<script lang="ts">
export default defineComponent({
  name: 'NutRow',
  options: {
    virtualHost: true,
  },
})
</script>

<template>
  <view :class="getClasses()">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
