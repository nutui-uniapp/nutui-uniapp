<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { badgeProps } from './badge'

const props = defineProps(badgeProps)

const stl = computed(() => {
  return {
    top: `${props.top}px`,
    right: `${props.right}px`,
    zIndex: props.zIndex,
    background: props.customColor,
  }
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
  <view class="nut-badge">
    <view v-if="!badgeHidden && !dot && $slots.icon" class="nut-badge__icon" :style="stl">
      <slot name="icon" />
    </view>
    <slot />
    <view
      v-if="!badgeHidden && (content || dot)"
      class="nut-badge__content nut-badge__content--sup"
      :class="{ 'nut-badge__content--dot': dot, 'nut-badge__content--bubble': !dot && bubble }"
      :style="stl"
    >
      {{ content }}
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
