<script setup lang="ts">
import { computed, defineComponent, useSlots } from 'vue'
import { PREFIX } from '../_constants'
import { getMainClass } from '../_utils'
import { dividerProps } from './divider'

const props = defineProps(dividerProps)
const slotDefault = !!useSlots().default
const classes = computed(() => {
  let classesObj = {

  }
  if (props.direction === 'horizontal') {
    classesObj = {
      [`${componentName}-center`]: slotDefault,
      [`${componentName}-left`]: props.contentPosition === 'left',
      [`${componentName}-right`]: props.contentPosition === 'right',
      [`${componentName}-dashed`]: props.dashed,
      [`${componentName}-hairline`]: props.hairline,
    }
  }
  else {
    classesObj = {
      [`${componentName}-vertical`]: props.direction === 'vertical',
    }
  }

  return getMainClass(props, componentName, classesObj)
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
  <view v-else :class="classes" :style="customStyle" />
</template>

<style lang="scss">
@import './index';
</style>
