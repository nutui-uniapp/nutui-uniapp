<script setup lang="ts">
import { computed, defineComponent, provide } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { rowProps } from './row'

const props = defineProps(rowProps)

provide('gutter', props.gutter)
function getClass(prefix: string, type: string) {
  return prefix ? (type ? `nut-row-${prefix}-${type}` : '') : `nut-row-${type}`
}
const classes = computed(() => {
  return getMainClass(props, componentName, [
    getClass('', props.type),
    getClass('justify', props.justify),
    getClass('align', props.align),
    getClass('flex', props.flexWrap),
  ])
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-row`

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
  <view :class="classes" :style="customStyle">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
