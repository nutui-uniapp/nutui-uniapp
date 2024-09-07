<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed } from 'vue'
import { getMainClass, pxCheck } from '../_utils'
import NutAvatar from '../avatar/avatar.vue'
import { skeletonProps } from './skeleton'

const COMPONENT_NAME = 'nut-skeleton'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(skeletonProps)

const innerRow = computed(() => Number(props.row))

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const avatarClasses = computed(() => {
  const prefixCls = 'nut-skeleton__avatar'

  return {
    [prefixCls]: true,
    [`${prefixCls}--${props.avatarShape}`]: props.avatarShape,
  }
})

const avatarStyles = computed(() => {
  const value: CSSProperties = {
    width: '50px',
    height: '50px',
  }

  if (props.avatarSize) {
    value.width = pxCheck(props.avatarSize)
    value.height = pxCheck(props.avatarSize)
  }

  return value
})

const lineWrapperStyles = computed(() => {
  const value: CSSProperties = {}

  if (props.width) {
    value.width = pxCheck(props.width)
  }

  return value
})

const lineItemStyles = computed(() => {
  const value: CSSProperties = {}

  if (props.height) {
    value.height = pxCheck(props.height)
  }

  return value
})
</script>

<template>
  <view v-if="!props.loading">
    <slot />
  </view>

  <view v-else :class="classes" :style="props.customStyle">
    <view v-if="props.animated" class="nut-skeleton-animation" />

    <view class="nut-skeleton-content">
      <NutAvatar
        v-if="props.avatar"
        :custom-class="avatarClasses"
        :custom-style="avatarStyles"
        :shape="props.avatarShape"
      />

      <view class="nut-skeleton-content__line" :style="lineWrapperStyles">
        <view
          v-if="props.title"
          class="nut-skeleton__title"
          :class="{ 'nut-skeleton__title--round': props.round }"
          :style="lineItemStyles"
        />

        <view
          v-for="it in innerRow"
          :key="it"
          class="nut-skeleton__line"
          :class="{ 'nut-skeleton__line--round': props.round }"
          :style="lineItemStyles"
        />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
