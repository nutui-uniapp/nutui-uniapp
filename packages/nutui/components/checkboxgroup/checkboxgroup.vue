<script lang="ts" setup>
import { computed, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { useProvide } from '../_hooks'
import { getMainClass } from '../_utils'
import { CHECKBOX_KEY } from '../checkbox'
import { useFormItemContext } from '../formitem'
import { checkboxgroupEmits, checkboxgroupProps } from './checkboxgroup'

const COMPONENT_NAME = 'nut-checkbox-group'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(checkboxgroupProps)

const emit = defineEmits(checkboxgroupEmits)

const formItemContext = useFormItemContext()

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const valuesMap = computed(() => {
  const results = new Map<any, boolean>()

  for (const it of props.modelValue)
    results.set(it, true)

  return results
})

function isCheckedValue<T>(value: T) {
  const result = valuesMap.value.get(value)

  if (result == null)
    return false

  return result
}

function updateValue(value: any[]) {
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value)

  if (formItemContext !== undefined && formItemContext.triggers.value.change)
    formItemContext.validate('change')
}

const { children } = useProvide(CHECKBOX_KEY)({
  value: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  max: computed(() => props.max),
  updateValue,
})

function toggleAll(checked: boolean) {
  const values: string[] = []

  for (const item of children) {
    if (item == null)
      continue

    if (checked) {
      if (!item.disabled || isCheckedValue(item.label))
        values.push(item.label)
    }
    else {
      if (item.disabled && isCheckedValue(item.label))
        values.push(item.label)
    }
  }

  emit(UPDATE_MODEL_EVENT, values)
}

function toggleReverse() {
  const values: string[] = []

  for (const item of children) {
    if (item == null)
      continue

    if (item.disabled) {
      if (isCheckedValue(item.label))
        values.push(item.label)
    }
    else {
      if (!isCheckedValue(item.label))
        values.push(item.label)
    }
  }

  emit(UPDATE_MODEL_EVENT, values)
}

watch(() => props.modelValue, (value) => {
  emit(CHANGE_EVENT, value)
})

defineExpose({
  toggleAll,
  toggleReverse,
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
