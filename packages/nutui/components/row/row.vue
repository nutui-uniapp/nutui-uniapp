<script lang="ts" setup>
import { computed, provide } from 'vue'
import { getMainClass } from '../_utils'
import { rowProps } from './row'

const COMPONENT_NAME = 'nut-row'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(rowProps)

provide('gutter', props.gutter)

function getClass(prefix: string, type: string) {
  return prefix ? (type ? `nut-row-${prefix}-${type}` : '') : `nut-row-${type}`
}

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, [
    getClass('', props.type),
    getClass('justify', props.justify),
    getClass('align', props.align),
    getClass('flex', props.flexWrap),
  ])
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
