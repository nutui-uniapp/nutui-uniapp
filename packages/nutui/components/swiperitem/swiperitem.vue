<script setup lang="ts">
import type { CSSProperties, ComputedRef } from 'vue'
import { computed, defineComponent, reactive } from 'vue'
import { PREFIX } from '../_constants'
import { useInject } from '../_hooks'
import type { SwiperProps } from '../swiper/swiper'
import { SWIPER_KEY } from '../swiper/swiper'

const { parent } = useInject<{ size: ComputedRef<number>;props: Required<SwiperProps> }>(SWIPER_KEY)

const state = reactive({
  offset: 0,
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

const style = computed<CSSProperties>(() => {
  const style = {} as CSSProperties
  const direction = parent?.props.direction
  if (parent?.size.value)
    style[direction === 'horizontal' ? 'width' : 'height'] = `${parent?.size.value}px`

  if (state.offset)
    style.transform = `translate${direction === 'horizontal' ? 'X' : 'Y'}(${state.offset}px)`

  return style
})

function setOffset(offset: number) {
  state.offset = offset
}

defineExpose({ setOffset })
</script>

<script lang="ts">
const componentName = `${PREFIX}-swiper-item`

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
  <view :class="classes" :style="style">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
