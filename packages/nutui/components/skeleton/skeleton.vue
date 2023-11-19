<script setup lang="ts">
import { computed, defineComponent, toRefs } from 'vue'
import { PREFIX } from '../_constants'
import NutAvatar from '../avatar/avatar.vue'
import { getMainClass } from '../_utils'
import { skeletonProps } from './skeleton'

const props = defineProps(skeletonProps)
const { avatarShape, round, avatarSize } = toRefs(props)

const classes = computed(() => {
  return getMainClass(props, componentName)
})
const avatarClass = computed(() => {
  const prefixCls = 'avatarClass'
  return {
    [prefixCls]: true,
    [`${prefixCls}--${avatarShape.value}`]: avatarShape.value,
  }
})

function getBlockClass(prefixCls: string) {
  return {
    [prefixCls]: true,
    [`${prefixCls}--round`]: round.value,
  }
}

function getStyle(): import('vue').CSSProperties {
  if (avatarSize.value) {
    return {
      width: avatarSize.value,
      height: avatarSize.value,
    }
  }
  return {
    width: '50px',
    height: '50px',
  }
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-skeleton`

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
  <view v-if="!loading">
    <slot />
  </view>
  <view v-else :class="classes" :style="customStyle">
    <view v-if="animated" class="nut-skeleton-animation" />
    <view class="nut-skeleton-content">
      <NutAvatar v-if="avatar" :custom-class="avatarClass" :shape="avatarShape" :custom-style="getStyle()" />

      <view class="nut-skeleton-content__line" :style="{ width }">
        <view v-if="title" :class="getBlockClass('nut-skeleton-blockTitle')" :style="{ height }" />
        <view v-for="_ in Number(row)" :key="_" :class="getBlockClass('nut-skeleton-blockLine')" :style="{ height }" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
