<script lang="ts" setup>
import { computed, watchEffect } from 'vue'
import { CLICK_EVENT, UPDATE_VISIBLE_EVENT } from '../_constants'
import NutTransition from '../transition/transition.vue'
import { useLockScroll } from '../_hooks'
import { getMainClass, getMainStyle } from '../_utils'
import { overlayEmits, overlayProps } from './overlay'

const COMPONENT_NAME = 'nut-overlay'

// eslint-disable-next-line vue/define-macros-order
defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(overlayProps)

const emit = defineEmits(overlayEmits)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [props.overlayClass]: true,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    transitionDuration: `${props.duration}ms`,
    zIndex: Number(props.zIndex),
    ...props.overlayStyle,
  })
})

function onClick(e: MouseEvent) {
  emit(CLICK_EVENT, e)

  if (props.closeOnClickOverlay)
    emit(UPDATE_VISIBLE_EVENT, false)
}

// #ifdef H5
const [lock, unlock] = useLockScroll(() => props.lockScroll)

watchEffect(() => {
  if (props.visible)
    lock()
  else
    unlock()
})
// #endif
</script>

<template>
  <NutTransition
    :custom-class="classes"
    :custom-style="styles"
    :show="props.visible"
    name="fade"
    :duration="Number(props.duration)"
    :destroy-on-close="props.destroyOnClose"
    @click="onClick"
  >
    <slot />
  </NutTransition>
</template>

<style lang="scss">
@import "./index";
</style>
