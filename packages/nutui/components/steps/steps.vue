<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { computed, provide, reactive } from 'vue'
import { getMainClass } from '../_utils'
import { stepsEmits, stepsProps } from './steps'

const COMPONENT_NAME = 'nut-steps'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(stepsProps)

const emit = defineEmits(stepsEmits)

const state = reactive({
  children: [] as ComponentInternalInstance[],
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}-${props.direction}`]: true,
    [`${COMPONENT_NAME}-dot`]: props.progressDot,
  })
})

function relation(child: ComponentInternalInstance) {
  child && state.children.push(child)
}

function onEmit(index: number) {
  emit('clickStep', index)
}

provide('parent', {
  relation,
  state,
  props,
  onEmit,
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
