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
  })
})

// 综合考虑 textColor、color、plain 组合使用时的效果
const style = computed<string>(() => {
  const style: CSSProperties = {}
  // 标签内字体颜色
  if (props.textColor)
    style.color = props.textColor

  else if (props.customColor && props.plain)
    style.color = props.customColor

  // 标签背景与边框颜色
  if (props.plain) {
    style.background = '#fff'
    style['border-color'] = props.customColor
  }
  else if (props.customColor) {
    style.background = props.customColor
  }
  return getMainStyle(props, style)
})

function onClose(event: Event) {
  event.stopPropagation()
  emit(CLOSE_EVENT, event)
}

function onClick(event: unknown) {
  emit(CLICK_EVENT, event as Event)
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
  <view :class="classes" :style="style" @click="onClick">
    <slot />
    <NutIcon v-if="closeable" name="close" custom-class="nut-tag--close" size="11" @click="onClose" />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
