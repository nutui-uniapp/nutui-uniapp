<script setup lang="ts">
import { computed, defineComponent, readonly, watch } from 'vue'
import { CHANGE_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { useProvide } from '../_hooks'
import { getMainClass } from '../_utils'
import { RADIO_KEY } from '../radio'
import { radiogroupEmits, radiogroupProps } from './radiogroup'

const props = defineProps(radiogroupProps)
const emit = defineEmits(radiogroupEmits)
const updateValue = (value: string | boolean | number) => emit(UPDATE_MODEL_EVENT, value)

useProvide(RADIO_KEY)({
  label: readonly(computed(() => props.modelValue)),
  position: readonly(computed(() => props.textPosition)),
  updateValue,
})

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--${props.direction}`]: true,
  })
})

watch(
  () => props.modelValue,
  value => emit(CHANGE_EVENT, value),
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
  <view :class="classes" :style="customStyle">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
