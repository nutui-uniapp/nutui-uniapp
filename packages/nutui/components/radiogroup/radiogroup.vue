<script lang="ts" setup>
import { computed, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { useProvide } from '../_hooks'
import { getMainClass } from '../_utils'
import { useFormItemContext } from '../formitem'
import { RADIO_KEY } from '../radio'
import { radiogroupEmits, radiogroupProps } from './radiogroup'

const COMPONENT_NAME = 'nut-radio-group'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(radiogroupProps)

const emit = defineEmits(radiogroupEmits)

const formItemContext = useFormItemContext()

let updateSource: '' | 'children' = ''

function updateValue(value: string | boolean | number) {
  updateSource = 'children'

  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value)

  if (formItemContext !== undefined && formItemContext.triggers.value.change)
    formItemContext.validate('change')
}

useProvide(RADIO_KEY)({
  label: computed(() => props.modelValue),
  position: computed(() => props.textPosition),
  updateValue,
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--${props.direction}`]: true,
  })
})

watch(() => props.modelValue, (value) => {
  if (updateSource === 'children') {
    updateSource = ''
    return
  }

  emit(CHANGE_EVENT, value)
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
