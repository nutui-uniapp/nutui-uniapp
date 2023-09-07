<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { cellgroupProps } from './cellgroup'

const props = defineProps(cellgroupProps)
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-cell-group`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})
</script>

<template>
  <view :class="classes">
    <slot v-if="$slots.title" name="title" />
    <view v-else-if="title" class="nut-cell-group__title">
      {{ title }}
    </view>
    <slot v-if="$slots.desc" name="desc" />
    <view v-else-if="desc" class="nut-cell-group__desc">
      {{ desc }}
    </view>
    <view class="nut-cell-group__wrap">
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
