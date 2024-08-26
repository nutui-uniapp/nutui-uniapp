<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import NutIcon from '../icon/icon.vue'
import { CLICK_EVENT, CLOSE_EVENT } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import { tagEmits, tagProps } from './tag'

const COMPONENT_NAME = 'nut-tag'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(tagProps)

const emit = defineEmits(tagEmits)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--${props.type}`]: props.type,
    [`${COMPONENT_NAME}--plain`]: props.plain,
    [`${COMPONENT_NAME}--round`]: props.round,
    [`${COMPONENT_NAME}--mark`]: props.mark,
    [`${COMPONENT_NAME}--disabled`]: props.disabled,
  })
})

const styles = computed(() => {
  const value: CSSProperties = {}

  if (props.textColor)
    value.color = props.textColor

  if (props.customColor) {
    value.borderColor = props.customColor

    if (props.plain) {
      if (!props.textColor)
        value.color = props.customColor
    }
    else {
      value.background = props.customColor
    }
  }

  return getMainStyle(props, value)
})

function onClick(event: any) {
  if (props.disabled)
    return

  emit(CLICK_EVENT, event)
}

function onCloseClick(event: any) {
  if (props.disabled)
    return

  emit(CLOSE_EVENT, event)
}
</script>

<template>
  <view :class="classes" :style="styles" @tap="onClick">
    <slot />

    <NutIcon
      v-if="props.closeable"
      custom-class="nut-tag--close"
      name="close"
      :size="props.closeIconSize"
      @tap.stop="onCloseClick"
    />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
