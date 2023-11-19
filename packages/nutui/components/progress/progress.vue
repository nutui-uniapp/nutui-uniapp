<script setup lang="ts">
import { computed, defineComponent, useSlots } from 'vue'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { getMainClass } from '../_utils'
import { progressProps } from './progress'

const props = defineProps(progressProps)

const slotDefault = !!useSlots().default
const classes = computed(() => {
  return getMainClass(props, componentName)
})
const height = computed(() => {
  if (props.strokeWidth)
    return `${props.strokeWidth}px`

  return undefined
})
const percentage = computed(() => {
  return Number(props.percentage) >= 100 ? 100 : Number(props.percentage)
})
const bgStyle = computed(() => {
  return {
    width: `${percentage.value}%`,
    background: props.strokeColor || '',
  }
})
const textStyle = computed(() => {
  return {
    color: props.textColor || '',
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-progress`

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
  <div :class="classes" :style="customStyle">
    <div
      class="nut-progress-outer"
      :class="[showText && !textInside ? 'nut-progress-outer-part' : '', size ? `nut-progress-${size}` : '']"
      :style="{ height }"
    >
      <div class="nut-progress-inner" :class="[status === 'active' ? 'nut-active' : '']" :style="bgStyle" />
      <div
        v-if="showText && textInside && !slotDefault"
        class="nut-progress-text nut-progress-insidetext"
        :style="{
          lineHeight: height,
          left: `${percentage}%`,
          transform: `translate(-${+percentage}%,-50%)`,
          background: textBackground || strokeColor,
        }"
      >
        <span :style="textStyle">{{ percentage }}{{ isShowPercentage ? '%' : '' }} </span>
      </div>
      <div
        v-if="showText && textInside && slotDefault"
        class="nut-progress-slot"
        :style="{
          position: `absolute`,
          top: `50%`,
          left: `${percentage}%`,
          transform: `translate(-${+percentage}%,-50%)`,
        }"
      >
        <slot />
      </div>
    </div>
    <div v-if="showText && !textInside" class="nut-progress-text" :style="{ lineHeight: height }">
      <template v-if="status === 'text' || status === 'active'">
        <span :style="textStyle">{{ percentage }}{{ isShowPercentage ? '%' : '' }} </span>
      </template>
      <template v-else-if="status === 'icon'">
        <slot name="iconName">
          <NutIcon name="checked" width="15px" height="15px" custom-color="#439422" />
        </slot>
      </template>
    </div>
  </div>
</template>

<style lang="scss">
@import './index';
</style>
