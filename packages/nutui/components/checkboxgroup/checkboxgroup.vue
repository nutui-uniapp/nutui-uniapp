<script lang="ts" setup>
import { computed, watch } from 'vue'
import { CHANGE_EVENT, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { useProvide } from '../_hooks'
import { CHECKBOX_KEY } from '../checkbox'
import { useFormItemContext } from '../formitem'
import { checkboxgroupEmits, checkboxgroupProps } from './checkboxgroup'

const COMPONENT_NAME = 'nut-checkbox-group'

// eslint-disable-next-line vue/define-macros-order
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

function updateValue(value: string[]) {
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
  if (checked) {
    children.forEach((item: any) => {
      if (!item?.disabled)
        values.push(item?.label)
    })
  }
  emit(UPDATE_MODEL_EVENT, values)
}

function toggleReverse() {
  const value = children
    .filter((item: any) => {
      if (item?.disabled)
        return false
      else
        return !props.modelValue.includes(item.label)
    })
    .map((item: any) => item.label)
  emit(UPDATE_MODEL_EVENT, value)
}

watch(
  () => props.modelValue,
  (value) => {
    emit(CHANGE_EVENT, value)
  },
)

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
