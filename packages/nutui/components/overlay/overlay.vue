<script setup lang="ts">
import { type ComputedRef, watchEffect } from 'vue'
import { computed, defineComponent } from 'vue'
import { CLICK_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import NutTransition from '../transition/transition.vue'
import { useLockScroll } from '../_hooks'
import { getMainClass, getMainStyle } from '../_utils'
import { overlayEmits, overlayProps } from './overlay'

const props = defineProps(overlayProps)
const emits = defineEmits(overlayEmits)
const classes = computed(() => {
  return getMainClass(props, componentName, {
    [props.overlayClass]: true,
  })
})

const styles: ComputedRef<string> = computed(() => {
  return getMainStyle(props, {
    transitionDuration: `${props.duration}ms`,
    zIndex: +props.zIndex,
    ...props.overlayStyle,
  })
})
function onClick(e: MouseEvent) {
  emits(CLICK_EVENT, e)
  if (props.closeOnClickOverlay)
    emits(UPDATE_VISIBLE_EVENT, false)
}
// #ifdef H5
const [lock, unlock] = useLockScroll(() => props.lockScroll)
watchEffect(() => {
  props.visible ? lock() : unlock()
})
// #endif
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
    :custom-style="styles"
    :custom-class="classes"
    :duration="Number(props.duration)"
    @click="onClick"
  >
    <slot />
    <!-- </view> -->
  </NutTransition>
</template>

<style lang="scss">
@import './index';
</style>
