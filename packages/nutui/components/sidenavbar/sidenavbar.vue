<script lang="ts" setup>
import { computed } from 'vue'
import { useProvide } from '../_hooks'
import { getMainClass } from '../_utils'
import { SIDE_NAVBAR_KEY, sidenavbarProps } from './sidenavbar'

const COMPONENT_NAME = 'nut-side-navbar'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(sidenavbarProps)

useProvide(SIDE_NAVBAR_KEY, `${COMPONENT_NAME}-item`)({ props })

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})
</script>

<template>
  <!-- TODO 侧标导航样式有问题 -->
  <view :class="classes" :style="props.customStyle">
    <view class="nut-side-navbar__content">
      <view class="nut-side-navbar__content__list">
        <slot />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
