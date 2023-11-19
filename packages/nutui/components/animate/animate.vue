<script setup lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { CLICK_EVENT, PREFIX } from '../_constants'
import requestAniFrame from '../_utils/raf'
import { getMainClass, getMainStyle } from '../_utils'
import { animateEmits, animateProps } from './animate'

const props = defineProps(animateProps)
const emit = defineEmits(animateEmits)

const animated = ref(props.action === 'initial' || props.show === true || props.loop)
const classes = computed(() => {
  const obj = {
    [`${componentName}__container`]: true,
    [`${componentName}-${props.type}`]: animated.value,
    loop: props.loop,
  }
  return getMainClass(props, componentName, obj)
})
const getStyle = computed(() => {
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

<script lang="ts">
const componentName = `${PREFIX}-animate`

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
  <view class="nut-animate">
    <view
      :class="classes"
      :style="getStyle"
      @click="handleClick"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
