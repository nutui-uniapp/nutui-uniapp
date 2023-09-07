<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import { transitionEmits, transitionProps } from './transition'
import { isKeyOfAnimations, useTransition } from './use-transition'

const props = defineProps(transitionProps)
const emits = defineEmits(transitionEmits)
const { display, animationClass, clickHandler } = useTransition(props, emits)

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-transition`
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
  <div
    v-if="display" :class="[classes, animationClass, customClass]"
    :style="[{ 'animation-duration': isKeyOfAnimations(name) ? `${duration}ms` : '' }, { 'animation-timing-function': isKeyOfAnimations(name) ? timingFunction : '' }, customStyle]"
    @click="clickHandler"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@import './index';
</style>
