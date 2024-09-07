<script lang="ts" setup>
import { computed, defineComponent, getCurrentInstance, inject, onMounted, reactive, ref, watch } from 'vue'
import { CLICK_EVENT, PREFIX } from '../_constants'
import { useRect, useTouch } from '../_hooks'
import { getMainClass, getRandomId } from '../_utils'
import { swipeEmits, swipeProps } from './swipe'
import type { SwipeDirection, SwipePosition } from './types'

const props = defineProps(swipeProps)

const emit = defineEmits(swipeEmits)

const instance = getCurrentInstance()!

const parent = inject('swipeGroup', null) as any

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const randomId = getRandomId()

// eslint-disable-next-line ts/no-use-before-define
const leftElId = `${componentName}-left-${randomId}`
const leftElWidth = ref(0)

// eslint-disable-next-line ts/no-use-before-define
const rightElId = `${componentName}-right-${randomId}`
const rightElWidth = ref(0)

async function getElementWidth(elementId: string) {
  const rect = await useRect(elementId, instance)

  return rect.width || 0
}

async function initWidth() {
  const [leftWidth, rightWidth] = await Promise.all([
    getElementWidth(leftElId),
    getElementWidth(rightElId),
  ])

  leftElWidth.value = leftWidth
  rightElWidth.value = rightWidth
}

watch(() => parent?.name.value, (value) => {
  if (props.name !== value && parent && parent.lock.value)
    close()
})

const opened = ref(false)

let direction: SwipeDirection = ''
let oldDirection: SwipeDirection = ''

const state = reactive({
  offset: 0,
  moving: false,
})

const innerStyles = computed(() => {
  return {
    transform: `translate3d(${state.offset}px, 0, 0)`,
  }
})

function open(dir: SwipeDirection = '') {
  parent && parent.update(props.name)

  if (opened.value)
    return

  if (dir)
    state.offset = dir === 'left' ? -rightElWidth.value : leftElWidth.value

  opened.value = true

  const finalDirection = direction || dir

  emit('open', {
    name: props.name!,
    direction: finalDirection,
    position: finalDirection,
  })
}

function close() {
  if (!opened.value)
    return

  state.offset = 0

  opened.value = false

  emit('close', {
    name: props.name!,
    direction,
    position: direction,
  })
}

function handleClick(position: SwipePosition) {
  if (props.closeOnClick.includes(position))
    close()

  emit(CLICK_EVENT, position)
}

function updateOffset(deltaX: number) {
  direction = deltaX > 0 ? 'right' : 'left'

  let offset = deltaX
  switch (direction) {
    case 'left': {
      if (opened.value && oldDirection === direction)
        offset = -rightElWidth.value
      else
        offset = Math.abs(deltaX) > rightElWidth.value ? -rightElWidth.value : deltaX
      break
    }
    case 'right': {
      if (opened.value && oldDirection === direction)
        offset = leftElWidth.value
      else
        offset = Math.abs(deltaX) > leftElWidth.value ? leftElWidth.value : deltaX
      break
    }
  }

  state.offset = offset
}

const touch = useTouch()

function onTouchStart(event: any) {
  if (props.disabled)
    return

  touch.start(event)
}

async function onTouchMove(event: any) {
  if (props.disabled)
    return

  touch.move(event)

  if (touch.isHorizontal()) {
    state.moving = true

    updateOffset(touch.deltaX.value)

    if (props.touchMovePreventDefault)
      event.preventDefault()

    if (props.touchMoveStopPropagation)
      event.stopPropagation()
  }
}

function onTouchEnd() {
  if (!state.moving)
    return

  state.moving = false

  oldDirection = direction
  switch (direction) {
    case 'left': {
      if (Math.abs(state.offset) <= rightElWidth.value / 2) {
        close()
      }
      else {
        state.offset = -rightElWidth.value
        open()
      }
      break
    }
    case 'right': {
      if (Math.abs(state.offset) <= leftElWidth.value / 2) {
        close()
      }
      else {
        state.offset = leftElWidth.value
        open()
      }
      break
    }
  }
}

onMounted(() => {
  setTimeout(() => {
    initWidth()
  }, 100)
})

defineExpose({
  open,
  close,
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-swipe`

export default defineComponent({
  name: componentName,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    // #ifndef H5
    styleIsolation: 'shared',
    // #endif
  },
})
</script>

<template>
  <view :class="classes" :style="props.customStyle">
    <view
      class="nut-swipe__inner"
      :style="innerStyles"
      @touchstart="onTouchStart"
      @touchmove="onTouchMove"
      @touchend="onTouchEnd"
      @touchcancel="onTouchEnd"
    >
      <view :id="leftElId" class="nut-swipe__left" @click="handleClick('left')">
        <slot name="left" />
      </view>

      <view class="nut-swipe__content" @click="handleClick('content')">
        <slot name="default" />
      </view>

      <view :id="rightElId" class="nut-swipe__right" @click="handleClick('right')">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
