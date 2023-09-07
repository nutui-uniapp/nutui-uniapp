<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import NutIcon from '../icon/icon.vue'
import { tagEmits, tagProps } from './tag'

const props = defineProps(tagProps)

const emit = defineEmits(tagEmits)

const classes = computed(() => {
  const prefixCls = 'nut-tag'
  return {
    [prefixCls]: true,
    [`${prefixCls}--${props.type}`]: props.type,
    [`${prefixCls}--plain`]: props.plain,
    [`${prefixCls}--round`]: props.round,
    [`${prefixCls}--mark`]: props.mark,
  }
})

// 综合考虑 textColor、color、plain 组合使用时的效果
const style = computed<CSSProperties>(() => {
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
  return style
})

function onClose(event: Event) {
  event.stopPropagation()
  emit('close', event)
}

function onClick(event: Event) {
  emit('click', event)
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
