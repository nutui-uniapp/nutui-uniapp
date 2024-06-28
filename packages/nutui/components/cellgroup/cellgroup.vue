<script lang="ts" setup>
import { computed } from 'vue'
import { getMainClass } from '../_utils'
import { cellgroupProps } from './cellgroup'

const COMPONENT_NAME = 'nut-cell-group'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})

const props = defineProps(cellgroupProps)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <slot v-if="$slots.title" name="title" />

    <view v-else-if="props.title" class="nut-cell-group__title">
      {{ props.title }}
    </view>

    <slot v-if="$slots.desc" name="desc" />

    <view v-else-if="props.desc" class="nut-cell-group__desc">
      {{ props.desc }}
    </view>

    <view class="nut-cell-group__wrap">
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
