<script lang="ts" setup>
import type { ComponentInternalInstance } from 'vue'
import { computed, getCurrentInstance, onMounted, reactive, ref } from 'vue'
import { useRect } from '../_hooks'
import { getMainClass, getMainStyle, getRandomId } from '../_utils'
import { dragProps } from './drag'

const COMPONENT_NAME = 'nut-drag'

defineOptions({
  name: COMPONENT_NAME,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})

const props = defineProps(dragProps)

const instance = getCurrentInstance()!

const myDrag = ref()
const myDragID = `myDrag${getRandomId()}`

const state: any = reactive({
  elWidth: 0,
  elHeight: 0,
  screenWidth: 0,
  screenHeight: 0,
  startTop: 0,
  startLeft: 0,
  initTop: 0,
  initLeft: 0,
  top: 0,
  left: 0,
  attractTransition: false,
  boundary: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as Record<string, any>,
})

const classes = computed(() => {
  return getMainClass(props, COMPONENT_NAME)
})

const styles = computed(() => {
  return getMainStyle(props, {
    transform: `translate(${state.left}px, ${state.top}px)`,
    transition: state.attractTransition ? 'all ease 0.3s' : 'none',
  })
})

const domElem = uni.getSystemInfoSync()

async function getInfo() {
  const rec = await useRect(myDragID, instance)

  state.elWidth = rec.width
  state.elHeight = rec.height
  state.initTop = rec.top
  state.initLeft = rec.left

  state.screenWidth = domElem.screenWidth
  state.screenHeight = domElem.screenHeight

  attractFn()
}

function touchMove(e: any) {
  e.preventDefault()
  const touch = e.touches[0]

  let left = touch.clientX - state.startLeft
  let top = touch.clientY - state.startTop

  const rightLocation = state.screenWidth - state.elWidth - state.boundary.right
  if (Math.abs(left + state.initLeft) > rightLocation)
    left = rightLocation - state.initLeft
  else if (left + state.initLeft <= state.boundary.left)
    left = state.boundary.left - state.initLeft

  if (top + state.initTop < state.boundary.top)
    top = state.boundary.top - state.initTop
  else if (top + state.initTop > state.screenHeight - state.elHeight - state.boundary.bottom)
    top = state.screenHeight - state.elHeight - state.boundary.bottom - state.initTop

  if (props.direction !== 'y')
    state.left = left
  if (props.direction !== 'x')
    state.top = top
}

function attractFn() {
  if (!props.attract || props.direction === 'y')
    return
  const screenCenterX = (state.screenWidth - state.boundary.right - state.boundary.left) / 2
  const centerX = screenCenterX - state.initLeft - state.elWidth / 2
  if (state.left < centerX)
    state.left = state.boundary.left - state.initLeft
  else
    state.left = state.screenWidth - state.elWidth - state.boundary.right - state.initLeft
  state.attractTransition = true
  setTimeout(() => {
    state.attractTransition = false
  }, 400)
}

function touchEnd() {
  attractFn()
}

function touchStart(e: any) {
  const touch = e.touches[0]
  state.startLeft = touch.clientX - state.left
  state.startTop = touch.clientY - state.top
  state.attractTransition = false
}

onMounted(() => {
  setTimeout(() => {
    getInfo()
  }, 200)

  state.boundary = props.boundary
})
</script>

<template>
  <view
    :id="myDragID"
    ref="myDrag"
    :class="classes"
    :style="styles"
    @touchstart="touchStart"
    @touchmove.stop.prevent="touchMove"
    @touchend="touchEnd"
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
