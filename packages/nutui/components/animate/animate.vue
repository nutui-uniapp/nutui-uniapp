<script setup lang="ts">
import { computed, defineComponent, reactive, toRefs } from 'vue'
import { PREFIX } from '../_utils'
import { animateEmits, animateProps } from './animate'

const props = defineProps(animateProps)
const emit = defineEmits(animateEmits)

const { type, loop, action } = toRefs(props)

const state = reactive({
  clicked: false,
})

const classes = computed(() => {
  const prefixCls = componentName
  return {
    'nut-animate__container': true,
    [`${prefixCls}-${type.value}`]: action.value === 'initial' || state.clicked ? type.value : false,
    'loop': loop.value,
  }
})

function handleClick(event: Event) {
  state.clicked = true

  // 如果不是无限循环，清除类名
  if (!loop.value) {
    setTimeout(() => {
      state.clicked = false
    }, 1000)
  }

  emit('click', event)
}
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
      @click="handleClick"
    >
      <slot />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
