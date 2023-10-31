<script setup lang="ts">
import { type ComponentInternalInstance, type VNode, nextTick } from 'vue'
import { computed, defineComponent, getCurrentInstance, onBeforeUnmount, onDeactivated, reactive, watch } from 'vue'
import { clamp } from '../_utils'
import { PREFIX, refRandomId } from '../_constants'
import { useProvide, useRect, useTouch } from '../_hooks'
import requestAniFrame from '../_utils/raf'
import { SWIPER_KEY, swiperEmits, swiperProps } from './swiper'

const props = defineProps(swiperProps)
const emit = defineEmits(swiperEmits)
const instance = getCurrentInstance() as ComponentInternalInstance

const containerId = `container-${refRandomId}`
const state = reactive({
  active: 0,
  num: 0,
  rect: null as any,
  width: 0,
  height: 0,
  moving: false,
  offset: 0,
  touchTime: 0,
  autoplayTimer: null as any | undefined | null,
  childrenVNode: [] as VNode[],
  style: {},
})

const touch = useTouch()

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
  }
})

const isVertical = computed(() => props.direction === 'vertical')

const classesInner = computed(() => {
  const prefixCls = componentName
  return {
    [`${prefixCls}-inner`]: true,
    [`${prefixCls}-vertical`]: isVertical.value,
  }
})

const classesPagination = computed(() => {
  const prefixCls = componentName
  return {
    [`${prefixCls}-pagination`]: true,
    [`${prefixCls}-pagination-vertical`]: isVertical.value,
  }
})

const delTa = computed(() => {
  return isVertical.value ? touch.deltaY.value : touch.deltaX.value
})

const isCorrectDirection = computed(() => {
  return touch.direction.value === props.direction
})

const childCount = computed(() => internalChildren.length)

const size = computed(() => state[isVertical.value ? 'height' : 'width'])

const trackSize = computed(() => childCount.value * size.value)

const minOffset = computed(() => {
  if (state.rect) {
    const base = isVertical.value ? state.rect.height : state.rect.width
    return base - size.value * childCount.value
  }
  return 0
})

const activePagination = computed(() => (state.active + childCount.value) % childCount.value)

function getStyle() {
  let offset = 0
  offset = state.offset
  state.style = {
    transitionDuration: `${state.moving ? 0 : props.duration}ms`,
    transform: `translate${isVertical.value ? 'Y' : 'X'}(${offset}px)`,
    [isVertical.value ? 'height' : 'width']: `${size.value * childCount.value}px`,
    [isVertical.value ? 'width' : 'height']: `${isVertical.value ? state.width : state.height}px`,
  }
}

const { internalChildren } = useProvide(SWIPER_KEY, 'nut-form-swiper')(
  {
    props,
    size,
  },
)

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
  const { active } = state
  if (pace) {
    if (props.loop)
      return clamp(active + pace, -1, childCount.value)

    return clamp(active + pace, 0, childCount.value - 1)
  }
  return active
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

  getStyle()
}

function resettPosition() {
  state.moving = true

  if (state.active <= -1)
    move({ pace: childCount.value })

  if (state.active >= childCount.value)
    move({ pace: -childCount.value })
}

function stopAutoPlay() {
  if (state.autoplayTimer)
    clearTimeout(state.autoplayTimer)
}

function jump(pace: number) {
  resettPosition()
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
  resettPosition()

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
  if (+props.autoPlay <= 0 || childCount.value <= 1)
    return
  stopAutoPlay()

  state.autoplayTimer = setTimeout(() => {
    next()
    autoplay()
  }, Number(props.autoPlay))
}

async function init(active: number = +props.initPage) {
  stopAutoPlay()
  state.rect = await useRect(containerId, instance)
  if (state.rect) {
    active = Math.min(childCount.value - 1, active)
    state.width = props.width ? +props.width : (state.rect as DOMRect).width
    state.height = props.height ? +props.height : (state.rect as DOMRect).height
    state.active = active
    state.offset = getOffset(state.active)
    state.moving = true
    getStyle()

    autoplay()
  }
}

function onTouchStart(e: TouchEvent) {
  if (props.isStopPropagation)
    e.stopPropagation()
  if (!props.touchable)
    return
  touch.start(e)
  state.touchTime = Date.now()
  stopAutoPlay()
  resettPosition()
}

function onTouchMove(e: TouchEvent) {
  if (props.touchable && state.moving) {
    touch.move(e)
    if (isCorrectDirection.value) {
      move({
        offset: delTa.value,
      })
    }
  }
}

function onTouchEnd(e: TouchEvent) {
  if (!props.touchable || !state.moving)
    return
  const speed = delTa.value / (Date.now() - state.touchTime)
  const isShouldMove = Math.abs(speed) > 0.3 || Math.abs(delTa.value) > +(size.value / 2).toFixed(2)

  if (isShouldMove && isCorrectDirection.value) {
    let pace = 0
    const offset = isVertical.value ? touch.offsetY.value : touch.offsetX.value
    if (props.loop)
      pace = offset > 0 ? (delTa.value > 0 ? -1 : 1) : 0
    else
      pace = -Math[delTa.value > 0 ? 'ceil' : 'floor'](delTa.value / size.value)

    move({
      pace,
      isEmit: true,
    })
  }
  else if (delTa.value) {
    move({ pace: 0 })
  }
  state.moving = false
  getStyle()
  autoplay()
}

defineExpose({
  prev,
  next,
  to,
})

onDeactivated(() => {
  stopAutoPlay()
})

onBeforeUnmount(() => {
  stopAutoPlay()
})

watch(
  () => props.initPage,
  (val) => {
    nextTick(() => {
      init(+val)
    })
  },
)

watch(
  () => props.height,
  (val) => {
    nextTick(() => {
      init(+val)
    })
  },
)

watch(
  () => internalChildren.length,
  () => {
    nextTick(() => {
      init()
    })
  },
)

watch(
  () => props.autoPlay,
  (val) => {
    +val > 0 ? autoplay() : stopAutoPlay()
  },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-swiper`

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
  <view
    :id="containerId"
    :class="[classes, customClass]"
    :catch-move="isPreventDefault"
    :style="[customStyle]"
    @touchstart="(onTouchStart as any)"
    @touchmove="(onTouchMove as any)"
    @touchend="(onTouchEnd as any)"
    @touchcancel="(onTouchEnd as any)"
  >
    <view :class="classesInner" :style="state.style">
      <slot />
    </view>
    <slot name="page" />
    <view v-if="paginationVisible && !$slots.page" :class="classesPagination">
      <i
        v-for="(item, index) in internalChildren.length"
        :key="index"
        class="pagination"
        :style="{
          backgroundColor: activePagination === index ? paginationColor : '#ddd',
        }"
        :class="{ active: activePagination === index }"
      />
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
