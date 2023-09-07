<script setup lang="ts">
import { computed, defineComponent, provide } from 'vue'
import { PREFIX } from '../_constants'
import { rowProps } from './row'

const props = defineProps(rowProps)
const componentName = `${PREFIX}-row`

const prefixCls = componentName
provide('gutter', props.gutter)
function getClass(prefix: string, type: string) {
  return prefix ? (type ? `nut-row-${prefix}-${type}` : '') : `nut-row-${type}`
}
const classes = computed(() => {
  return [
    prefixCls,
    getClass('', props.type),
    getClass('justify', props.justify),
    getClass('align', props.align),
    getClass('flex', props.flexWrap),
  ]
})
</script>

<script lang="ts">
export default defineComponent({
  name: 'NutRow',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
