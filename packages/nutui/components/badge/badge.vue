<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { badgeProps } from './badge'

const props = defineProps(badgeProps)

const getStyle = computed(() => {
  return getMainStyle(props, {
    top: pxCheck(props.top),
    right: pxCheck(props.right),
    zIndex: props.zIndex,
    background: props.customColor,
  })
})
const classes = computed(() => {
  return getMainClass(props, componentName)
})

const content = computed(() => {
  if (props.dot)
    return
  const value = props.value
  const max = props.max
  if (typeof value === 'number' && typeof max === 'number')
    return max < value ? `${max}+` : value

  return value
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-badge`

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
    <view v-if="!props.hidden && !props.dot && $slots.icon" class="nut-badge__icon" :style="getStyle">
      <slot name="icon" />
    </view>
    <slot />
    <view
      v-if="!props.hidden && (content || props.dot)"
      class="nut-badge__content nut-badge__content--sup"
      :class="{ 'nut-badge__content--dot': props.dot, 'nut-badge__content--bubble': !props.dot && props.bubble }"
      :style="getStyle"
    >
      {{ content }}
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
