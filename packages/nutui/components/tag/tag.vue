<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import { CLICK_EVENT, CLOSE_EVENT, PREFIX } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { tagEmits, tagProps } from './tag'

const props = defineProps(tagProps)

const emit = defineEmits(tagEmits)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`${componentName}--${props.type}`]: props.type,
    [`${componentName}--plain`]: props.plain,
    [`${componentName}--round`]: props.round,
    [`${componentName}--mark`]: props.mark,
    [`${componentName}--disabled`]: props.disabled,
  })
})

const styles = computed<string>(() => {
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

<script lang="ts">
const componentName = `${PREFIX}-tag`

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
  <view :class="classes" :style="styles" @tap="onClick">
    <slot />

    <NutIcon
      v-if="props.closeable"
      name="close"
      custom-class="nut-tag--close"
      :size="props.closeIconSize"
      @tap.stop="onCloseClick"
    />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
