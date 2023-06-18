<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_utils'
import { sidenavbarProps } from './sidenavbar'

const props = defineProps(sidenavbarProps)

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-side-navbar`

export default defineComponent({
  name: componentName,
})
</script>

<template>
  <!-- TODO 侧标导航样式有问题 -->
  <view :class="classes">
    <view class="nut-side-navbar__content">
      <view class="nut-side-navbar__content__list">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
