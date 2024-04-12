<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import { CLICK_EVENT, CLOSE_EVENT, PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { getMainClass, getMainStyle } from '../_utils'
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

// 综合考虑 textColor、color、plain 组合使用时的效果
const styles = computed<string>(() => {
  const value: CSSProperties = {}

  // 标签内字体颜色
  if (props.textColor)
    value.color = props.textColor
  else if (props.customColor && props.plain)
    value.color = props.customColor

  // 标签背景与边框颜色
  if (props.plain)
    value.borderColor = props.customColor
  else if (props.customColor)
    value.background = props.customColor

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
