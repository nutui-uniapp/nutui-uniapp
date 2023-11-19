<script setup lang="ts">
import type { CSSProperties, ComputedRef } from 'vue'
import { computed, defineComponent, reactive } from 'vue'
import { PREFIX } from '../_constants'
import { useInject } from '../_hooks'
import type { SwiperProps } from '../swiper/swiper'
import { SWIPER_KEY } from '../swiper/swiper'
import { getMainClass, getMainStyle } from '../_utils'
import { swiperItemProps } from './swiperitem'

const props = defineProps(swiperItemProps)
const { parent } = useInject<{ size: ComputedRef<number>;props: Required<SwiperProps> }>(SWIPER_KEY)

const state = reactive({
  offset: 0,
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const style = computed<string>(() => {
  const style = {} as CSSProperties
  const direction = parent?.props.direction
  if (parent?.size.value)
    style[direction === 'horizontal' ? 'width' : 'height'] = `${parent?.size.value}px`

  if (state.offset)
    style.transform = `translate${direction === 'horizontal' ? 'X' : 'Y'}(${state.offset}px)`

  return getMainStyle(props, style)
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
