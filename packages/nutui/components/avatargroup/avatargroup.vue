<script setup lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import { useProvide } from '../_hooks'
import NutAvatar from '../avatar/avatar.vue'
import { getMainClass, getMainStyle } from '../_utils'
import { AVATAR_KEY, avatargroupProps } from './avatargroup'

const props = defineProps(avatargroupProps)

const avatarGroupRef = ref(null)

const index = ref(0)

const foldCount = ref(99)
const styles = computed(() => {
  return getMainStyle(props, {
    marginLeft: `${-1 * Number(props.span)}px`,
  })
})

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const { internalChildren } = useProvide(AVATAR_KEY, `${PREFIX}-avatar`)({ props, avatarGroupRef, index })

watch(() => internalChildren, (value) => {
  if (props.maxCount)
    foldCount.value = value.length - (+props.maxCount)
}, {
  immediate: true,
  deep: true,
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
  <view ref="avatarGroupRef" :class="classes" :style="styles">
    <slot />
    <NutAvatar
      v-if="foldCount > 0"
      custom-class="avater-fold"
      :custom-color="maxColor"
      :bg-color="maxBgColor"
      :size="size"
      :shape="shape"
      :style="{ magrinLeft: `${span}px` }"
    >
      {{ maxContent || (foldCount === 99 ? foldCount : (foldCount - 1)) }}
    </NutAvatar>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
