<script setup lang="ts">
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_utils'
import { transitionEmits, transitionProps } from './transition'
import { useTransition } from './use-transition'

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
})
</script>

<template>
  <div
    v-if="display" :class="[classes, animationClass, customClass]"
    :style="[{ 'animation-duration': `${duration}ms` }, { 'animation-timing-function': timingFunction }, customStyle]"
    @click="clickHandler"
  >
    <slot />
  </div>
</template>

<style lang="scss">
@import './index';
</style>
