<script lang="ts" setup>
import { computed } from 'vue'
import { getMainClass } from '../_utils'
import { safeareaProps } from './safearea'

const COMPONENT_NAME = 'nut-safe-area'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(safeareaProps)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, [
    `${COMPONENT_NAME}-position-${props.position}`,
  ])
})
</script>

<template>
  <view :class="classes" :style="props.customStyle" />
</template>

<style lang="scss">
@import "./index";
</style>
