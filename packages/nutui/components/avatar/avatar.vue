<script setup lang="ts">
import { computed, defineComponent, ref, toRefs } from 'vue'
import { PREFIX } from '../_utils'
import { AVATAR_KEY, type AvatarGroupProps } from '../avatargroup'
import { useInject } from '../_hooks'
import { avatarProps } from './avatar'

const props = defineProps(avatarProps)

const { size, shape, bgColor, customColor } = toRefs(props)
const sizeValue = ['large', 'normal', 'small']
const avatarRef = ref(null)

const { parent } = useInject<{ props: Required<AvatarGroupProps> }>(AVATAR_KEY)

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`nut-avatar-${size.value || parent?.props?.size || 'normal'}`]: true,
    [`nut-avatar-${shape.value || parent?.props?.shape || 'normal'}`]: true,
  }
})

const styles = computed(() => {
  return {
    width: sizeValue.includes(size.value) ? '' : `${size.value}px`,
    height: sizeValue.includes(size.value) ? '' : `${size.value}px`,
    backgroundColor: `${bgColor.value}`,
    color: `${customColor.value}`,
    marginLeft: (parent?.props?.span ? `${parent?.props?.span}px` : ''),
  }
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
  <view ref="avatarRef" :style="styles" :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
