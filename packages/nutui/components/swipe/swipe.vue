<script lang="ts" setup>
import { computed, defineComponent, getCurrentInstance, inject, onMounted, reactive, ref, watch } from 'vue'
import { CLICK_EVENT, PREFIX } from '../_constants'
import { useRect, useTouch } from '../_hooks'
import { getMainClass, getRandomId } from '../_utils'
import { swipeEmits, swipeProps } from './swipe'
import type { SwipeDirection, SwipePosition } from './type'

const props = defineProps(swipeProps)

const emit = defineEmits(swipeEmits)

const instance = getCurrentInstance()!

const classes = computed(() => {
  return getMainClass(props, componentName)
})

const refRandomId = getRandomId()

const leftRefId = `leftRef-${refRandomId}`
const leftRefWidth = ref<number>(0)

const rightRefId = `rightRef-${refRandomId}`
const rightRefWidth = ref<number>(0)

async function getRefWidth(elementId: string) {
  const rect = await useRect(elementId, instance)

  return rect.width || 0
}

async function initWidth() {
  const [leftWidth, rightWidth] = await Promise.all([
    getRefWidth(leftRefId),
    getRefWidth(rightRefId),
  ])

  leftRefWidth.value = leftWidth
  rightRefWidth.value = rightWidth
}

const parent = inject('swipeGroup', null) as any

watch(
  () => parent?.name?.value,
  (name) => {
    if (props.name !== name && parent && parent.lock.value)
      close()
  },
)

const opened = ref<boolean>(false)

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
    state.offset = dir === 'left' ? -rightRefWidth.value : leftRefWidth.value

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
        offset = -rightRefWidth.value
      else
        offset = Math.abs(deltaX) > rightRefWidth.value ? -rightRefWidth.value : deltaX
      break
    }
    case 'right': {
      if (opened.value && oldDirection === direction)
        offset = leftRefWidth.value
      else
        offset = Math.abs(deltaX) > leftRefWidth.value ? leftRefWidth.value : deltaX
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
      if (Math.abs(state.offset) <= rightRefWidth.value / 2) {
        close()
      }
      else {
        state.offset = -rightRefWidth.value
        open()
      }
      break
    }
    case 'right': {
      if (Math.abs(state.offset) <= leftRefWidth.value / 2) {
        close()
      }
      else {
        state.offset = leftRefWidth.value
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
      <view :id="leftRefId" class="nut-swipe__left" @click="handleClick('left')">
        <slot name="left" />
      </view>

      <view class="nut-swipe__content" @click="handleClick('content')">
        <slot name="default" />
      </view>

      <view :id="rightRefId" class="nut-swipe__right" @click="handleClick('right')">
        <slot name="right" />
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
