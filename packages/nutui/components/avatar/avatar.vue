<script setup lang="ts">
import type { CSSProperties } from 'vue'
import { computed, defineComponent, getCurrentInstance, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import { useInject } from '../_hooks'
import { getMainClass, getMainStyle, pxCheck } from '../_utils'
import type { AvatarGroupProps } from '../avatargroup'
import { AVATAR_GROUP_KEY } from '../avatargroup'
import { avatarProps } from './avatar'
import type { AvatarFinalSize, AvatarShape, AvatarSize } from './type'
import { avatarSize } from './type'

const props = defineProps(avatarProps)

const instance = getCurrentInstance()

const { parent } = useInject<{ props: Required<AvatarGroupProps> }>(AVATAR_GROUP_KEY)

const show = ref(true)

const innerZIndex = ref<number | undefined>(undefined)

watch(() => ({
  maxCount: parent?.props.maxCount,
  children: parent?.internalChildren,
}), ({ maxCount, children }) => {
  if (maxCount == null || Number(maxCount) <= 0 || children == null || instance == null) {
    show.value = true
    innerZIndex.value = undefined
    return
  }

  const index = children.findIndex((item) => {
    return item.uid === instance.uid && !(item.props.customClass as string)?.includes('avatar-fold')
  })

  if (index < 0) {
    show.value = true
    innerZIndex.value = undefined
    return
  }

  show.value = index < Number(maxCount)

  if (parent?.props.zIndex === 'right')
    innerZIndex.value = children.length - index
  else
    innerZIndex.value = undefined
}, {
  immediate: true,
  deep: true,
})

function getTrulySize() {
  if (props.size != null)
    return props.size

  if (parent != null && parent.props.size != null)
    return parent.props.size

  return 'normal'
}

const finalSize = computed<AvatarFinalSize>(() => {
  const size: string | number = getTrulySize()

  const preset: boolean = avatarSize.includes(size as AvatarSize)

  return {
    preset,
    value: preset ? (size as AvatarSize) : pxCheck(size),
  }
})

const finalShape = computed<AvatarShape>(() => {
  if (props.shape != null)
    return props.shape

  if (parent != null && parent.props.shape != null)
    return parent.props.shape

  return 'round'
})

const classes = computed(() => {
  const value: Record<string, boolean> = {
    [`nut-avatar-${finalShape.value}`]: true,
    'nut-hidden': !show.value,
  }

  if (finalSize.value.preset)
    value[`nut-avatar-${finalSize.value.value}`] = true

  return getMainClass(props, componentName, value)
})

const styles = computed(() => {
  const value: CSSProperties = {
    backgroundColor: props.bgColor,
    color: props.customColor,
  }

  if (!finalSize.value.preset) {
    value.width = finalSize.value.value
    value.height = finalSize.value.value
  }

  if (parent?.props.span)
    value.marginLeft = pxCheck(parent?.props.span)

  if (innerZIndex.value !== undefined)
    value.zIndex = innerZIndex.value

  return getMainStyle(props, value)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-avatar`

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
  <view :style="styles" :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
