<script setup lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { PREFIX } from '../_constants'
import requestAniFrame from '../_utils/raf'
import { animateEmits, animateProps } from './animate'

const props = defineProps(animateProps)
const emit = defineEmits(animateEmits)

const animated = ref(props.action === 'initial' || props.show === true || props.loop)
const classes = computed(() => {
  const prefixCls = 'nut-animate'
  return {
    'nut-animate__container': true,
    [`${prefixCls}-${props.type}`]: animated.value,
    'loop': props.loop,
  }
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

function handleClick(event: Event) {
  if (props.action === 'click') {
    animate()
    emit('click', event)
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
      :style="{
        animationDuration: duration ? `${duration}ms` : undefined,
      }"
      @click="(handleClick as any)"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
