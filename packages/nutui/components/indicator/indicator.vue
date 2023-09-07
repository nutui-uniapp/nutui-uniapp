<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { padZero } from '../_utils'
import { PREFIX } from '../_constants'
import { indicatorProps } from './indicator'

const props = defineProps(indicatorProps)

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}--block`]: props.block,
    [`${prefixCls}--align__${props.align}`]: props.block && props.align,
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-indicator`

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
  <view :class="classes">
    <template v-for="item in size" :key="item">
      <view v-if="item === current" :class="`${componentName}--number`">
        {{ (fillZero && padZero(item)) || item }}
      </view>
      <view v-else :class="`${componentName}--dot`" />
    </template>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
