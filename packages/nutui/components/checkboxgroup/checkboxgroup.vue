<script setup lang="ts">
import { computed, defineComponent, watch } from 'vue'
import { CHANGE_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { useProvide } from '../_hooks'
import { CHECKBOX_KEY } from '../checkbox'
import { useFormItemContext } from '../formitem'
import { checkboxgroupEmits, checkboxgroupProps } from './checkboxgroup'

const props = defineProps(checkboxgroupProps)

const emit = defineEmits(checkboxgroupEmits)

const formItemContext = useFormItemContext()

const classes = computed(() => {
  return getMainClass(props, componentName)
})

function updateValue(value: string[]) {
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value)

  if (formItemContext !== undefined && formItemContext.triggers.value.change)
    formItemContext.validate('change')
}

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

const { children } = useProvide(CHECKBOX_KEY)({
  value: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  max: computed(() => props.max),
  updateValue,
})

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

<script lang="ts">
const componentName = `${PREFIX}-checkbox-group`

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
