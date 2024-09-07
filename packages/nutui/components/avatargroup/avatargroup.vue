<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import { useProvide } from '../_hooks'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import NutAvatar from '../avatar/avatar.vue'
import { AVATAR_GROUP_KEY, avatargroupProps } from './avatargroup'

const props = defineProps(avatargroupProps)

const { internalChildren } = useProvide(AVATAR_GROUP_KEY, `${PREFIX}-avatar`)({ props })

const innerMaxCount = computed<number>(() => {
  return Number(props.maxCount)
})

const foldCount = ref(0)

watch(() => ({
  maxCount: props.maxCount,
  children: internalChildren,
}), ({ children }) => {
  if (innerMaxCount.value > 0)
    foldCount.value = Math.min(99, children.length - innerMaxCount.value)
  else
    foldCount.value = 0
}, {
  immediate: true,
  deep: true,
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const styles = computed(() => {
  return getMainStyle(props, {
    marginLeft: `calc(0px - ${pxCheck(props.span)})`,
  })
})

const foldStyles = computed<CSSProperties>(() => {
  return {
    marginLeft: pxCheck(props.span),
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-avatar-group`

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
  <view :class="classes" :style="styles">
    <slot />
    <NutAvatar
      v-if="foldCount > 0"
      custom-class="avatar-fold"
      :custom-style="foldStyles"
      :size="props.size"
      :shape="props.shape"
      :bg-color="props.maxBgColor"
      :custom-color="props.maxColor"
    >
      {{ props.maxContent || foldCount }}
    </NutAvatar>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
