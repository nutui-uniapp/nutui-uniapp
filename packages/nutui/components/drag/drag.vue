<script setup lang="ts">
import { type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, onActivated, onDeactivated, onMounted, reactive, ref } from 'vue'
import { PREFIX, refRandomId } from '../_constants'
import requestAniFrame from '../_utils/raf'
import { useRect } from '../_hooks'
import { getMainStyle } from '../_utils'
import { dragProps } from './drag'

const props = defineProps(dragProps)
const instance = getCurrentInstance() as ComponentInternalInstance
const myDrag = ref()

const myDragID = `myDrag${refRandomId}`
const state: any = reactive({
  keepAlive: false,
  elWidth: 0,
  elHeight: 0,
  screenWidth: 0,
  screenHeight: 0,
  startTop: 0,
  startLeft: 0,
  initTop: 0,
  initLeft: 0,
  nx: 0,
  ny: 0,
  xPum: 0,
  yPum: 0,
  top: 0,
  left: 0,
  position: { x: 0, y: 0 },
  boundary: {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  } as Record<string, any>,
})

const classes = computed(() => {
  const prefixCls = 'nut-uni-drag'
  return {
    [prefixCls]: true,
    [`${props.customClass}`]: props.customClass,
  }
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
}

function goLeft() {
  if (state.boundary.left) {
    if (+state.left.split('px')[0] > state.boundary.left) {
      state.left = `${+state.left.split('px')[0] - 10}px`
      requestAniFrame(() => {
        goLeft()
      })
    }
    else {
      state.left = `${state.boundary.left}px`
    }
  }
  else {
    if (+state.left.split('px')[0] > 10) {
      state.left = `${+state.left.split('px')[0] - 10}px`
      requestAniFrame(() => {
        goLeft()
      })
    }
    else {
      state.left = '0px'
    }
  }
}
function goRight(rightLocation: number) {
  if (rightLocation - Number.parseInt(state.left.split('px')[0]) > 10) {
    state.left = `${Number.parseInt(state.left.split('px')[0]) + 10}px`
    requestAniFrame(() => {
      goRight(rightLocation)
    })
  }
  else {
    state.left = `${rightLocation}px`
  }
}
function touchMove(e: TouchEvent) {
  e.preventDefault()
  // const target = e.currentTarget as HTMLElement;
  if (e.touches.length === 1) {
    // const touch = e.targetTouches[0];
    const touch = e.touches[0]
    state.nx = touch.clientX - state.position.x
    state.ny = touch.clientY - state.position.y
    state.xPum = state.startLeft + state.nx
    state.yPum = state.startTop + state.ny

    const rightLocation = state.screenWidth - state.elWidth - state.boundary.right
    if (Math.abs(state.xPum + state.initLeft) > rightLocation)
      state.xPum = rightLocation - state.initLeft

    else if (state.xPum + state.initLeft <= state.boundary.left)
      state.xPum = state.boundary.left - state.initLeft

    if (state.yPum + state.initTop < state.boundary.top)
      state.yPum = state.boundary.top - state.initTop

    else if (state.yPum + state.initTop > state.screenHeight - state.elHeight - state.boundary.bottom)
      state.yPum = state.screenHeight - state.elHeight - state.boundary.bottom - state.initTop

    if (props.direction !== 'y')
      state.left = state.xPum

    if (props.direction !== 'x')
      state.top = state.yPum
  }
}
function _touchEnd(e: TouchEvent) {
  // const target = e.currentTarget as HTMLElement;

  const touch = e.changedTouches[0]
  let currX = touch.clientX
  const rightLocation = state.screenWidth - state.elWidth - state.boundary.right
  if (currX > rightLocation)
    currX = rightLocation

  else if (currX < state.boundary.left)
    currX = state.boundary.left

  else
    currX = currX < state.screenWidth / 2 ? state.boundary.left : rightLocation

  if (props.direction !== 'y' && props.attract) {
    if (currX < state.screenWidth / 2) {
      requestAniFrame(() => {
        goLeft()
      })
    }
    else {
      requestAniFrame(() => {
        goRight(rightLocation)
      })
    }
  }
  if (props.direction !== 'x')
    state.top = state.yPum
}
function touchStart(e: TouchEvent) {
  const query = uni.createSelectorQuery().in(instance)
  const id = (e as any)?.mpEvent?.currentTarget.id
  const offsetTop = (e as any)?.currentTarget?.offsetTop
  const offsetLeft = (e as any)?.currentTarget?.offsetLeft
  const touches = e.touches[0]
  const mobileTop = (e.touches[0]?.target as any)?.parentNode?.style.top
  const mobileLeft = (e.touches[0]?.target as any)?.parentNode?.style.left
  query
    .selectAll(myDragID)
    .boundingClientRect((rec: any) => {
      // 判断当前是要拖拽哪个元素
      rec.forEach((element: any) => {
        // 微信环境
        if (id && id === element.id) {
          state.startTop = element.top - offsetTop
          state.startLeft = element.left - offsetLeft
        }
        else if (mobileTop) {
          // h5环境
          state.startTop = Number(mobileTop.slice(0, -2))
          state.startLeft = Number(mobileLeft.slice(0, -2))
        }
      })
    })
    .exec()
  state.position.x = touches.clientX
  state.position.y = touches.clientY
}
onMounted(() => {
  setTimeout(() => {
    getInfo()
  }, 200)

  state.boundary = props.boundary
})
onActivated(() => {
  if (state.keepAlive)
    state.keepAlive = false
})
onDeactivated(() => {
  state.keepAlive = true
  // (myDrag as any).value.removeEventListener('touchstart', touchStart);
  // (myDrag as any).value.removeEventListener('touchmove', touchMove);
  // (myDrag as any).value.removeEventListener('touchend', touchEnd)
})

const getStyle = computed(() => {
  return getMainStyle(props, {
    transform: `translate(${`${state.left}px`}, ${`${state.top}px`})`,
    top: `${state.top}px`,
    left: `${state.left}px`,
  })
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-drag`
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
    :id="myDragID"
    ref="myDrag"
    :class="classes"
    :style="getStyle"
    :catchtouchmove="true"
    @touchstart="(touchStart as any)"
    @touchmove="(touchMove as any)"
  >
    <slot />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
