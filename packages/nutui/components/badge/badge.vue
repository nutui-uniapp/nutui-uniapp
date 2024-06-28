<script lang="ts" setup>
import { computed } from 'vue'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { badgeProps } from './badge'

const COMPONENT_NAME = 'nut-badge'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(badgeProps)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const styles = computed(() => {
  return getMainStyle(props, {
    top: pxCheck(props.top),
    right: pxCheck(props.right),
    zIndex: props.zIndex,
    background: props.customColor,
  })
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

<template>
  <view :class="classes">
    <view v-if="!props.hidden && !props.dot && $slots.icon" class="nut-badge__icon" :style="styles">
      <slot name="icon" />
    </view>

    <slot />

    <view
      v-if="!props.hidden && (content || props.dot)"
      class="nut-badge__content nut-badge__content--sup"
      :class="{ 'nut-badge__content--dot': props.dot, 'nut-badge__content--bubble': !props.dot && props.bubble }"
      :style="styles"
    >
      {{ content }}
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
