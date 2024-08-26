<script lang="ts" setup>
import type { VNode } from 'vue'
import { computed, getCurrentInstance, nextTick, onBeforeUnmount, onDeactivated, reactive, useSlots, watch } from 'vue'
import { useProvide, useRect, useTouch } from '../_hooks'
import { clamp, getMainClass, getRandomId } from '../_utils'
import requestAniFrame from '../_utils/raf'
import { SWIPER_KEY, swiperEmits, swiperProps } from './swiper'

const COMPONENT_NAME = 'nut-swiper'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(swiperProps)

const emit = defineEmits(swiperEmits)

const slots = useSlots()

const instance = getCurrentInstance()!

const containerId = `container-${getRandomId()}`

const state = reactive({
  active: 0,
  num: 0,
  rect: null as any,
  width: 0,
  height: 0,
  moving: false,
  offset: 0,
  touchTime: 0,
  autoplayTimer: 0,
  childrenVNode: [] as VNode[],
  style: {},
})

const touch = useTouch()

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const isVertical = computed(() => props.direction === 'vertical')

const size = computed(() => state[isVertical.value ? 'height' : 'width'])

const { internalChildren } = useProvide(SWIPER_KEY, 'nut-form-swiper')({
  props,
  size,
})

const innerClasses = computed(() => {
  const prefixCls = COMPONENT_NAME

  return {
    [`${prefixCls}-inner`]: true,
    [`${prefixCls}-vertical`]: isVertical.value,
  }
})

const paginationClasses = computed(() => {
  const prefixCls = COMPONENT_NAME

  return {
    [`${prefixCls}-pagination`]: true,
    [`${prefixCls}-pagination-vertical`]: isVertical.value,
  }
})

const childCount = computed(() => internalChildren.length)

const trackSize = computed(() => childCount.value * size.value)

const touchDelta = computed(() => {
  return isVertical.value ? touch.deltaY.value : touch.deltaX.value
})

const isCorrectDirection = computed(() => {
  return touch.direction.value === props.direction
})

const minOffset = computed(() => {
  if (state.rect == null) {
    return 0
  }

  const base = isVertical.value ? state.rect.height : state.rect.width

  return base - size.value * childCount.value
})

const activePagination = computed(() => (state.active + childCount.value) % childCount.value)

function updateStyles() {
  state.style = {
    transitionDuration: `${state.moving ? 0 : props.duration}ms`,
    transform: `translate${isVertical.value ? 'Y' : 'X'}(${state.offset}px)`,
    [isVertical.value ? 'height' : 'width']: `${size.value * childCount.value}px`,
    [isVertical.value ? 'width' : 'height']: `${isVertical.value ? state.width : state.height}px`,
  }
}

function getOffset(active: number, offset = 0) {
  let currentPosition = active * size.value

  if (!props.loop)
    currentPosition = Math.min(currentPosition, -minOffset.value)

  let targetOffset = offset - currentPosition

  if (!props.loop)
    targetOffset = clamp(targetOffset, minOffset.value, 0)

  return targetOffset
}

function getActive(pace: number) {
  if (pace) {
    if (props.loop)
      return clamp(state.active + pace, -1, childCount.value)

    return clamp(state.active + pace, 0, childCount.value - 1)
  }

  return state.active
}

function move({ pace = 0, offset = 0, isEmit = false }) {
  if (childCount.value <= 1)
    return

  const { active } = state

  const targetActive = getActive(pace)
  const targetOffset = getOffset(targetActive, offset)

  if (props.loop) {
    if (internalChildren[0] && targetOffset !== minOffset.value) {
      const rightBound = targetOffset < minOffset.value;
      (internalChildren[0] as any).exposed.setOffset(rightBound ? trackSize.value : 0)
    }

    if (internalChildren[childCount.value - 1] && targetOffset !== 0) {
      const leftBound = targetOffset > 0;
      (internalChildren[childCount.value - 1] as any).exposed.setOffset(leftBound ? -trackSize.value : 0)
    }
  }

  state.active = targetActive
  state.offset = targetOffset

  if (isEmit && active !== state.active)
    emit('change', activePagination.value)

  updateStyles()
}

function resetPosition() {
  state.moving = true

  if (state.active <= -1)
    move({ pace: childCount.value })

  if (state.active >= childCount.value)
    move({ pace: -childCount.value })
}

function stopAutoPlay() {
  if (!state.autoplayTimer)
    return

  clearTimeout(state.autoplayTimer)
  state.autoplayTimer = 0
}

function jump(pace: number) {
  resetPosition()

  touch.reset()

  requestAniFrame(() => {
    requestAniFrame(() => {
      state.moving = false

      move({
        pace,
        isEmit: true,
      })
    })
  })
}

function prev() {
  jump(-1)
}

function next() {
  jump(1)
}

function to(index: number) {
  resetPosition()

  touch.reset()

  requestAniFrame(() => {
    state.moving = false

    let targetIndex
    if (props.loop && childCount.value === index)
      targetIndex = state.active === 0 ? 0 : index
    else
      targetIndex = index % childCount.value

    move({
      pace: targetIndex - state.active,
      isEmit: true,
    })
  })
}

function autoplay() {
  if (Number(props.autoPlay) <= 0 || childCount.value <= 1)
    return

  stopAutoPlay()

  // @ts-expect-error whatever
  state.autoplayTimer = setTimeout(() => {
    next()
    autoplay()
  }, Number(props.autoPlay))
}

async function init() {
  stopAutoPlay()

  state.rect = await useRect(containerId, instance)

  if (state.rect) {
    const active = Math.min(childCount.value - 1, Number(props.initPage))

    state.width = props.width ? Number(props.width) : (state.rect as DOMRect).width
    state.height = props.height ? Number(props.height) : (state.rect as DOMRect).height
    state.active = active
    state.offset = getOffset(state.active)
    state.moving = true

    updateStyles()

    autoplay()
  }
}

function onTouchStart(event: any) {
  if (props.isStopPropagation)
    event.stopPropagation()

  if (!props.touchable)
    return

  touch.start(event)

  state.touchTime = Date.now()

  stopAutoPlay()
  resetPosition()
}

function onTouchMove(event: any) {
  if (props.touchable && state.moving) {
    touch.move(event)

    if (isCorrectDirection.value) {
      move({
        offset: touchDelta.value,
      })
    }
  }
}

function onTouchEnd() {
  if (!props.touchable || !state.moving)
    return

  const speed = touchDelta.value / (Date.now() - state.touchTime)
  const isShouldMove = Math.abs(speed) > 0.3
    || Math.abs(touchDelta.value) > Number((size.value / 2).toFixed(2))

  if (isShouldMove && isCorrectDirection.value) {
    const offset = isVertical.value ? touch.offsetY.value : touch.offsetX.value

    let pace: number
    if (props.loop)
      pace = offset > 0 ? (touchDelta.value > 0 ? -1 : 1) : 0
    else
      pace = -Math[touchDelta.value > 0 ? 'ceil' : 'floor'](touchDelta.value / size.value)

    move({
      pace,
      isEmit: true,
    })
  }
  else if (touchDelta.value) {
    move({ pace: 0 })
  }

  state.moving = false

  updateStyles()

  autoplay()
}

watch(() => [props.initPage, props.height, internalChildren.length], () => {
  nextTick(() => {
    init()
  })
})

watch(() => props.autoPlay, (value) => {
  Number(value) > 0 ? autoplay() : stopAutoPlay()
})

onDeactivated(() => {
  stopAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})

defineExpose({
  prev,
  next,
  to,
})
</script>

<template>
  <view
    :id="containerId"
    :class="classes"
    :style="[props.customStyle]"
    :catch-move="props.isPreventDefault"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
    @touchcancel="onTouchEnd"
  >
    <view :class="innerClasses" :style="state.style">
      <slot />
    </view>

    <slot v-if="slots.page" name="page" />

    <template v-else>
      <view v-if="props.paginationVisible" :class="paginationClasses">
        <view
          v-for="(it) in internalChildren.length"
          :key="it"
          class="pagination"
          :class="{ active: activePagination === it - 1 }"
          :style="{
            backgroundColor: activePagination === it - 1 ? props.paginationColor : props.paginationUnselectedColor,
          }"
        />
      </view>
    </template>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
