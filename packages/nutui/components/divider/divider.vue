<script lang="ts" setup>
import { computed, useSlots } from 'vue'
import { getMainClass } from '../_utils'
import { dividerProps } from './divider'

const COMPONENT_NAME = 'nut-divider'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(dividerProps)

const slotDefault = !!useSlots().default

const classes = computed(() => {
  const value: Record<string, boolean> = {}

  if (props.direction === 'horizontal') {
    Object.assign(value, {
      [`${COMPONENT_NAME}-center`]: slotDefault,
      [`${COMPONENT_NAME}-left`]: props.contentPosition === 'left',
      [`${COMPONENT_NAME}-right`]: props.contentPosition === 'right',
      [`${COMPONENT_NAME}-dashed`]: props.dashed,
      [`${COMPONENT_NAME}-hairline`]: props.hairline,
    })
  }
  else {
    Object.assign(value, {
      [`${COMPONENT_NAME}-vertical`]: props.direction === 'vertical',
    })
  }

  return getMainClass(props, COMPONENT_NAME, value)
})
</script>

<template>
  <view v-if="props.direction === 'horizontal'" :class="classes" :style="props.customStyle">
    <slot />
  </view>

  <view v-else :class="classes" :style="props.customStyle" />
</template>

<style lang="scss">
@import "./index";
</style>
