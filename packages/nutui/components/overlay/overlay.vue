<script setup lang="ts">
import { computed, defineComponent, watchEffect } from 'vue'
import { CLICK_EVENT, PREFIX, UPDATE_VISIBLE_EVENT } from '../_constants'
import { useLockScroll } from '../_hooks'
import { getMainClass, getMainStyle } from '../_utils'
import NutTransition from '../transition/transition.vue'
import { overlayEmits, overlayProps } from './overlay'

const props = defineProps(overlayProps)

const emit = defineEmits(overlayEmits)

const classes = computed(() => {
  return getMainClass(props, componentName, {
    [props.overlayClass]: true,
  })
})

const innerDuration = computed(() => {
  if (typeof props.duration === 'number')
    return props.duration

  return Number(props.duration)
})

const styles = computed(() => {
  return getMainStyle(props, {
    transitionDuration: `${innerDuration.value}ms`,
    zIndex: props.zIndex,
    ...props.overlayStyle,
  })
})

function onClick(event: any) {
  emit(CLICK_EVENT, event)

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
    :custom-class="classes"
    :custom-style="styles"
    :show="props.visible"
    name="fade"
    :duration="innerDuration"
    :destroy-on-close="props.destroyOnClose"
    @click="onClick"
  >
    <slot />
  </NutTransition>
</template>

<style lang="scss">
@import "./index";
</style>
