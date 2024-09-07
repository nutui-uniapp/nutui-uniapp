<script lang="ts" setup>
import type { ComputedRef, CSSProperties } from 'vue'
import { computed, reactive } from 'vue'
import { useInject } from '../_hooks'
import { getMainClass, getMainStyle } from '../_utils'
import type { SwiperProps } from '../swiper/swiper'
import { SWIPER_KEY } from '../swiper/swiper'
import { swiperItemProps } from './swiperitem'

const COMPONENT_NAME = 'nut-swiper-item'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(swiperItemProps)

const { parent } = useInject<{
  size: ComputedRef<number>
  props: Required<SwiperProps>
}>(SWIPER_KEY)

const state = reactive({
  offset: 0,
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const styles = computed<string>(() => {
  const value: CSSProperties = {}

  if (parent != null) {
    const { direction } = parent.props

    if (parent.size.value)
      value[direction === 'horizontal' ? 'width' : 'height'] = `${parent.size.value}px`

    if (state.offset)
      value.transform = `translate${direction === 'horizontal' ? 'X' : 'Y'}(${state.offset}px)`
  }

  return getMainStyle(props, value)
})

function setOffset(offset: number) {
  state.offset = offset
}

defineExpose({
  setOffset,
})
</script>

<template>
  <view :class="classes" :style="styles">
    <slot />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
