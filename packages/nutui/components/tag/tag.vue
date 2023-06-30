<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, toRefs } from 'vue'
import { PREFIX } from '../_utils'
import NutIcon from '../icon/icon.vue'
import { tagEmits, tagProps } from './tag'

const props = defineProps(tagProps)

const emit = defineEmits(tagEmits)

const { type, color, plain, round, mark, textColor } = toRefs(props)

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}--${type.value}`]: type.value,
    [`${prefixCls}--plain`]: plain.value,
    [`${prefixCls}--round`]: round.value,
    [`${prefixCls}--mark`]: mark.value,
  }
})

function getStyle(): CSSProperties {
  const style: CSSProperties = {}
  if (textColor.value)
    style.color = textColor.value

  else if (color.value && plain.value)
    style.color = color.value

  if (plain.value) {
    style.background = '#fff'
    style['border-color'] = color.value
  }
  else if (color.value) {
    style.background = color.value
  }
  return style
}

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
})
</script>

<template>
  <view :class="classes" :style="getStyle()" @click="onClick">
    <slot />
    <NutIcon v-if="closeable" name="close" custom-class="nut-tag--close" size="11" @click="onClose" />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
