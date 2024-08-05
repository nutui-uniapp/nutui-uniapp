<script lang="ts" setup>
import { computed } from 'vue'
import { getMainClass, padZero } from '../_utils'
import { indicatorProps } from './indicator'

const COMPONENT_NAME = 'nut-indicator'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(indicatorProps)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}--block`]: props.block,
    [`${COMPONENT_NAME}--align__${props.align}`]: props.block && props.align,
  })
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <template v-for="item in props.size" :key="item">
      <view v-if="item === props.current" :class="`${COMPONENT_NAME}--number`">
        {{ (props.fillZero && padZero(item)) || item }}
      </view>

      <view v-else :class="`${COMPONENT_NAME}--dot`" />
    </template>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
