<script setup lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import { PREFIX } from '../_constants'
import { AVATAR_KEY, type AvatarGroupProps } from '../avatargroup'
import { useInject } from '../_hooks'
import { getMainClass, getMainStyle } from '../_utils'
import { avatarProps } from './avatar'

const props = defineProps(avatarProps)

const { size, shape, bgColor, customColor } = toRefs(props)
const sizeValue = ['large', 'normal', 'small']
const avatarRef = ref(null)

const { parent } = useInject<{ props: Required<AvatarGroupProps> }>(AVATAR_KEY)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [`nut-avatar-${size.value || parent?.props?.size || 'normal'}`]: true,
    [`nut-avatar-${shape.value || parent?.props?.shape || 'normal'}`]: true,
  })
})

const getStyles = computed(() => {
  return getMainStyle(props, {
    width: sizeValue.includes(size.value as string) ? '' : `${size.value}px`,
    height: sizeValue.includes(size.value as string) ? '' : `${size.value}px`,
    backgroundColor: `${bgColor.value}`,
    color: `${customColor.value}`,
    marginLeft: (parent?.props?.span ? `${parent?.props?.span}px` : ''),
  })
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
  <view ref="avatarRef" :style="getStyles" :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
