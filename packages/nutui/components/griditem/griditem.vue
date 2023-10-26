<script setup lang="ts">
import { type CSSProperties, computed, defineComponent } from 'vue'
import { pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import { GRID_KEY, type GridProps } from '../grid'
import { useInject, useRouter } from '../_hooks'
import { gridItemEmits, gridItemProps } from './griditem'

const props = defineProps(gridItemProps)
const emit = defineEmits(gridItemEmits)
const componentName = `${PREFIX}-grid-item`

const Parent = useInject<{ props: Required<GridProps> }>(GRID_KEY)
const index = Parent.index
const parent = Parent?.parent?.props
// root
const rootClass = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

const rootStyle = computed(() => {
  if (!parent)
    return
  const style: CSSProperties = {
    flexBasis: `${100 / +parent.columnNum}%`,
  }

  if (parent?.square) {
    style.paddingTop = `${100 / +parent.columnNum}%`
  }
  else if (parent.gutter) {
    style.paddingRight = pxCheck(parent.gutter)
    if (index.value >= Number(parent.columnNum))
      style.marginTop = pxCheck(parent.gutter)
  }

  return style
})

// content
const contentClass = computed(() => {
  if (!parent)
    return
  const prefixCls = `${componentName}__content`
  return {
    [`${prefixCls}`]: true,
    [`${prefixCls}--border`]: parent.border,
    [`${prefixCls}--surround`]: parent.border && parent.gutter,
    [`${prefixCls}--center`]: parent.center,
    [`${prefixCls}--square`]: parent.square,
    [`${prefixCls}--reverse`]: parent.reverse,
    [`${prefixCls}--${parent.direction}`]: !!parent.direction,
    [`${prefixCls}--clickable`]: parent.clickable,
  }
})

// click
const router = useRouter()
function handleClick(event: Event) {
  emit('click', event)

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

<script lang="ts">
export default defineComponent({
  name: 'NutGridItem',
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view :class="rootClass" :style="rootStyle" @click="(handleClick as any)">
    <view :class="contentClass">
      <slot />
      <view class="nut-grid-item__text">
        <template v-if="text">
          {{ text }}
        </template>
        <slot v-else name="text" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
