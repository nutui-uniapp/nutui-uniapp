<script lang="ts" setup>
import { computed, ref, watch } from 'vue'
import { CLICK_EVENT } from '../_constants'
import { getMainClass, getMainStyle } from '../_utils'
import requestAniFrame from '../_utils/raf'
import { animateEmits, animateProps } from './animate'

const COMPONENT_NAME = 'nut-animate'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(animateProps)

const emit = defineEmits(animateEmits)

const animated = ref(props.action === 'initial' || props.show === true || props.loop)

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME, {
    [`${COMPONENT_NAME}__container`]: true,
    [`${COMPONENT_NAME}-${props.type}`]: animated.value,
    loop: props.loop,
  })
})

const styles = computed(() => {
  return getMainStyle(props, {
    animationDuration: props.duration ? `${props.duration}ms` : undefined,
  })
})

function animate() {
  animated.value = false

  // #ifdef H5
  requestAniFrame(() => {
    requestAniFrame(() => {
      animated.value = true
    })
  })
  // #endif
}

function handleClick(event: unknown) {
  if (props.action === 'click') {
    animate()

    emit(CLICK_EVENT, event as MouseEvent)
    emit('animate')
  }
}

watch(
  () => props.show,
  (val) => {
    if (val) {
      animate()

      emit('animate')
    }
  },
)
</script>

<template>
  <view class="nut-animate">
    <view
      :class="classes"
      :style="styles"
      @click="handleClick"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
