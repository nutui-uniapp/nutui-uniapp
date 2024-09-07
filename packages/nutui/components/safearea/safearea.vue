<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { safeareaProps } from './safearea'

const props = defineProps(safeareaProps)

const classes = computed(() => {
  return getMainClass(props, componentName, [
    `${componentName}-position-${props.position}`,
  ])
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-safe-area`

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
  <view :class="classes" :style="customStyle" />
</template>

<style lang="scss">
@import './index';
</style>
