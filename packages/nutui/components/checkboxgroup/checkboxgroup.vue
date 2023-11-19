<script setup lang="ts">
import type { ComponentInternalInstance, ComponentPublicInstance } from 'vue'
import { computed, defineComponent, provide, reactive, watch } from 'vue'
import { CHANGE_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { getMainClass } from '../_utils'
import { checkboxgroupEmits, checkboxgroupProps } from './checkboxgroup'

const props = defineProps(checkboxgroupProps)
const emit = defineEmits(checkboxgroupEmits)
defineExpose({
  toggleAll,
  toggleReverse,
})
const classes = computed(() => {
  return getMainClass(props, componentName)
})
const state = reactive({
  children: [] as ComponentPublicInstance[],
})

function link(child: ComponentInternalInstance) {
  child.proxy && state.children.push(child.proxy)
}

function unlink(child: ComponentInternalInstance) {
  child.proxy && (state.children = state.children.filter(p => p !== child.proxy))
}

function updateValue(value: string[]) {
  emit(UPDATE_MODEL_EVENT, value)
  emit(CHANGE_EVENT, value)
}

function toggleAll(checked: boolean) {
  const values: string[] = []
  if (checked) {
    state.children.forEach((item: any) => {
      if (!item?.disabled)
        values.push(item?.label)
    })
  }
  emit(UPDATE_MODEL_EVENT, values)
}

function toggleReverse() {
  const value = state.children
    .filter((item: any) => {
      if (item?.disabled)
        return false
      else
        return !props.modelValue.includes(item.label)
    })
    .map((item: any) => item.label)
  emit(UPDATE_MODEL_EVENT, value)
}

provide('parent', {
  value: computed(() => props.modelValue),
  disabled: computed(() => props.disabled),
  max: computed(() => props.max),
  updateValue,
  link,
  unlink,
})

watch(
  () => props.modelValue,
  (value) => {
    emit(CHANGE_EVENT, value)
  },
)
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
