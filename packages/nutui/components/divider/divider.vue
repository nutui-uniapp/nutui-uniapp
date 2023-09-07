<script setup lang="ts">
import { computed, defineComponent, useSlots } from 'vue'
import { PREFIX } from '../_constants'
import { dividerProps } from './divider'

const props = defineProps(dividerProps)
const slotDefault = !!useSlots().default
const classes = computed(() => {
  const prefixCls = componentName

  const defaultClassesObj = {
    [prefixCls]: true,
    [`${props.customClass}`]: props.customClass,
  }

  let classesObj = {

  }

  if (props.direction === 'horizontal') {
    classesObj = {
      ...defaultClassesObj,
      [`${prefixCls}-center`]: slotDefault,
      [`${prefixCls}-left`]: props.contentPosition === 'left',
      [`${prefixCls}-right`]: props.contentPosition === 'right',
      [`${prefixCls}-dashed`]: props.dashed,
      [`${prefixCls}-hairline`]: props.hairline,
    }
  }
  else {
    classesObj = {
      ...defaultClassesObj,
      [`${prefixCls}-vertical`]: props.direction === 'vertical',
    }
  }

  return classesObj
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-divider`

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
  <view v-if="direction === 'horizontal'" :class="classes" :style="customStyle">
    <slot />
  </view>
  <view v-else :class="classes" />
</template>

<style lang="scss">
@import './index';
</style>
