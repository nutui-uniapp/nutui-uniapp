<script lang="ts" setup>
import type { CSSProperties } from 'vue'
import { computed, ref, watch } from 'vue'
import { getMainClass } from '../_utils'
import { shakediceEmits, shakediceProps } from './shakedice'

const COMPONENT_NAME = 'nut-shakedice'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(shakediceProps)

const emit = defineEmits(shakediceEmits)

const clicked = ref(false)
const isShaking = ref(false)

const animationStyles = ref<CSSProperties>({
  animation: 'none',
})
const transformStyles = ref<CSSProperties>({
  transform: 'none',
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

function getShakeResult(want: number) {
  const possibles = [
    { value: 1, x: 0, y: 0 },
    { value: 1, x: 0, y: 0 },
    { value: 2, x: 90, y: 0 },
    { value: 3, x: 0, y: -90 },
    { value: 4, x: 0, y: 90 },
    { value: 5, x: -90, y: 0 },
    { value: 6, x: 0, y: 180 },
  ]

  const finalWant = Math.max(0, Math.min(possibles.length - 1, want))

  return possibles[finalWant]!
}

watch(isShaking, (value) => {
  if (!value) {
    animationStyles.value.animation = 'none'
    return
  }

  animationStyles.value.animation = `rotate ${props.time}s infinite linear`

  setTimeout(() => {
    clicked.value = false
    isShaking.value = false

    const result = getShakeResult(props.id)

    setTimeout(() => {
      transformStyles.value.transform = `rotateX(${result.x}deg) rotateY(${result.y}deg)`
    }, 0)

    emit('end')
  }, props.speed)
})

function shake() {
  if (clicked.value)
    return false

  clicked.value = true
  isShaking.value = true
}

defineExpose({
  shake,
})
</script>

<template>
  <view :class="classes" :style="[animationStyles, transformStyles, props.customStyle]">
    <view
      v-for="it in 6"
      :key="it"
      class="nut-shakedice__page"
      :class="`is-page-${it}`"
    >
      <text v-for="i in it" :key="i" class="nut-shakedice__dot" />
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
