<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import { CLICK_EVENT } from '../_constants'
import { GRID_KEY, type GridProps } from '../grid'
import { useInject, useRouter } from '../_hooks'
import { gridItemEmits, gridItemProps } from './griditem'

const COMPONENT_NAME = 'nut-grid-item'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(gridItemProps)

const emit = defineEmits(gridItemEmits)

const Parent = useInject<{ props: Required<GridProps> }>(GRID_KEY)

const index = Parent.index
const parent = Parent?.parent?.props

// root
const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const styles = computed(() => {
  const style: CSSProperties = {}

  if (parent) {
    style.flexBasis = `${100 / +parent.columnNum}%`

    if (parent.square) {
      style.paddingTop = `${100 / +parent.columnNum}%`
    }
    else if (parent.gutter) {
      style.paddingRight = pxCheck(parent.gutter)

      if (index.value >= Number(parent.columnNum))
        style.marginTop = pxCheck(parent.gutter)
    }
  }

  return getMainStyle(props, style)
})

// content
const contentClass = computed(() => {
  const prefixCls = `${COMPONENT_NAME}__content`

  const value: Record<string, boolean> = {
    [prefixCls]: true,
  }

  if (parent) {
    Object.assign(value, {
      [`${prefixCls}--border`]: parent.border,
      [`${prefixCls}--surround`]: parent.border && parent.gutter,
      [`${prefixCls}--center`]: parent.center,
      [`${prefixCls}--square`]: parent.square,
      [`${prefixCls}--reverse`]: parent.reverse,
      [`${prefixCls}--${parent.direction}`]: !!parent.direction,
      [`${prefixCls}--clickable`]: parent.clickable,
    })
  }

  return value
})

// click
const router = useRouter()

function handleClick(event: unknown) {
  emit(CLICK_EVENT, event as MouseEvent)

  if (props.to && router) {
    router[props.replace ? 'replace' : 'push'](props.to as string)
    // #ifdef H5
  }
  else if (props.url) {
    if (props.replace)
      window.location.replace(props.url)

    else
      window.location.href = props.url

    // #endif
  }
}
</script>

<template>
  <view :class="classes" :style="styles" @click="handleClick">
    <view :class="contentClass">
      <slot />
      <view class="nut-grid-item__text">
        <template v-if="props.text">
          {{ props.text }}
        </template>

        <slot v-else name="text" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
