<script setup lang="ts">
import { computed, defineComponent, onMounted, provide, ref } from 'vue'
import { PREFIX } from '../_utils'
import { avatargroupProps } from './avatargroup'

const props = defineProps(avatargroupProps)

const avatarGroupRef = ref(null)

const index = ref(0)

// const sizeValue = ['large', 'normal', 'small'];
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

onMounted(() => {})

provide('avatarGroup', {
  props,
  avatarGroupRef,
  index,
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
  <view ref="avatarGroupRef" :class="classes">
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
