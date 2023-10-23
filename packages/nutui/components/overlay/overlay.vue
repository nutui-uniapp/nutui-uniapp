<script setup lang="ts">
import { type ComputedRef, watchEffect } from 'vue'
import { computed, defineComponent } from 'vue'
import { PREFIX } from '../_constants'
import NutTransition from '../transition/transition.vue'
import { useLockScroll } from '../_hooks'
import { overlayEmits, overlayProps } from './overlay'

const props = defineProps(overlayProps)
const emits = defineEmits(overlayEmits)
const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [props.overlayClass]: true,
  }
})

const style: ComputedRef = computed(() => {
  return {
    transitionDuration: `${props.duration}ms`,
    zIndex: props.zIndex,
    ...props.overlayStyle,
  }
})
function onClick(e: MouseEvent) {
  emits('click', e)
  if (props.closeOnClickOverlay)
    emits('update:visible', false)
}
// #ifdef H5
const [lock, unlock] = useLockScroll(() => props.lockScroll)
watchEffect(() => {
  props.visible ? lock() : unlock()
})
// #endif
function toMoveHandle() {

}
</script>

<script lang="ts">
const componentName = `${PREFIX}-overlay`
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
  <NutTransition
    :show="visible"
    name="fade"
    :custom-style="[overlayStyle, style]"
    :custom-class="[overlayClass, classes]"
    :duration="Number(props.duration)"
    @click="onClick"
    @touchmove.stop.prevent="props.lockScroll ? toMoveHandle : ''"
  >
    <slot />
    <!-- </view> -->
  </NutTransition>
</template>

<style lang="scss">
@import './index';
</style>
