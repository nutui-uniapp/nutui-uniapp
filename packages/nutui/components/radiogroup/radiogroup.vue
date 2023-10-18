<script setup lang="ts">
import { computed, defineComponent, provide, readonly, watch } from 'vue'
import { PREFIX } from '../_constants'
import { radiogroupEmits, radiogroupProps } from './radiogroup'

const props = defineProps(radiogroupProps)
const emit = defineEmits(radiogroupEmits)
const updateValue = (value: string | boolean | number) => emit('update:modelValue', value)

provide('parent', {
  label: readonly(computed(() => props.modelValue)),
  position: readonly(computed(() => props.textPosition)),
  updateValue,
})

const classes = computed(() => {
  return {
    [componentName]: true,
    [`${componentName}--${props.direction}`]: true,
  }
})

watch(
  () => props.modelValue,
  value => emit('change', value),
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-radio-group`

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
  <view :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
