<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, useSlots } from 'vue'
import NutIcon from '../icon/icon.vue'
import { getMainClass, pxCheck } from '../_utils'
import { progressProps } from './progress'

const COMPONENT_NAME = 'nut-progress'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(progressProps)

const slots = useSlots()

const innerValue = computed(() => {
  return Math.max(0, Math.min(100, Number(props.percentage)))
})

const innerText = computed(() => {
  return `${innerValue.value}${props.isShowPercentage ? '%' : ''}`
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const outerClasses = computed<Record<string, boolean>>(() => {
  return {
    'nut-progress-outer-part': props.showText && !props.textInside,
    [`nut-progress-${props.size}`]: true,
  }
})

const innerClasses = computed<Record<string, boolean>>(() => {
  return {
    'nut-active': props.status === 'active',
  }
})

const outerHeight = computed(() => {
  if (props.strokeWidth)
    return pxCheck(props.strokeWidth)

  return undefined
})

const outerStyles = computed(() => {
  const value: CSSProperties = {}

  if (outerHeight.value != null)
    value.height = outerHeight.value

  return value
})

const innerStyles = computed(() => {
  const value: CSSProperties = {
    width: `${innerValue.value}%`,
  }

  if (props.strokeColor)
    value.background = props.strokeColor

  return value
})

const textStyles = computed(() => {
  const value: CSSProperties = {
    left: `${innerValue.value}%`,
    transform: `translate(-${innerValue.value}%,-50%)`,
    background: props.textBackground || props.strokeColor,
  }

  if (outerHeight.value != null)
    value.lineHeight = outerHeight.value

  return value
})

const pureTextStyles = computed(() => {
  const value: CSSProperties = {}

  if (props.textColor)
    value.color = props.textColor

  return value
})

const outsideTextStyles = computed(() => {
  const value: CSSProperties = {}

  if (outerHeight.value != null)
    value.lineHeight = outerHeight.value

  return value
})

const slotStyles = computed<CSSProperties>(() => {
  return {
    position: 'absolute',
    top: '50%',
    left: `${innerValue.value}%`,
    transform: `translate(-${innerValue.value}%,-50%)`,
  }
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view class="nut-progress-outer" :class="outerClasses" :style="outerStyles">
      <view class="nut-progress-inner" :class="innerClasses" :style="innerStyles" />

      <template v-if="props.showText && props.textInside">
        <view
          v-if="!slots.default"
          class="nut-progress-text nut-progress-insidetext"
          :style="textStyles"
        >
          <text :style="pureTextStyles">
            {{ innerText }}
          </text>
        </view>

        <view v-else class="nut-progress-slot" :style="slotStyles">
          <slot />
        </view>
      </template>
    </view>

    <view
      v-if="props.showText && !props.textInside"
      class="nut-progress-text"
      :style="outsideTextStyles"
    >
      <template v-if="props.status === 'text' || props.status === 'active'">
        <text :style="pureTextStyles">
          {{ innerText }}
        </text>
      </template>

      <template v-else-if="props.status === 'icon'">
        <slot v-if="slots.iconName" name="iconName" />

        <NutIcon
          v-else
          name="checked"
          width="15px"
          height="15px"
          custom-color="#439422"
        />
      </template>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
