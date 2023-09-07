<script setup lang="ts">
import { computed, defineComponent, provide, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import { collapseEmits, collapseProps } from './collapse'

const props = defineProps(collapseProps)
const emit = defineEmits(collapseEmits)

const innerValue = ref(props.modelValue || (props.accordion ? '' : []))
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

watch(() => props.modelValue, (val) => {
  innerValue.value = val
})

function changeVal(val: string | number | Array<string | number>, name: string | number, status = true) {
  innerValue.value = val
  emit('update:modelValue', val)
  emit('change', val, name, status)
}

function updateVal(name: string | number) {
  if (props.accordion) {
    if (innerValue.value === name)
      changeVal('', name, false)
    else
      changeVal(name, name, true)
  }
  else {
    if (Array.isArray(innerValue.value)) {
      if (innerValue.value.includes(name)) {
        const newValue = innerValue.value.filter((v: string | number) => v !== name)
        changeVal(newValue, name, false)
      }
      else {
        const newValue = innerValue.value.concat([name])
        changeVal(newValue, name, true)
      }
    }
    else {
      console.warn('[NutUI] <Collapse> 未开启手风琴模式时 v-model 应为数组')
    }
  }
}

function isExpanded(name: string | number) {
  if (props.accordion)
    return innerValue.value === name
  else if (Array.isArray(innerValue.value))
    return innerValue.value.includes(name)

  return false
}

provide('collapseParent', {
  updateVal,
  isExpanded,
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-collapse`

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
