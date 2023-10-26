<script setup lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { clamp, preventDefault, pxCheck } from '../_utils'
import { PREFIX } from '../_constants'
import { useTouch } from '../_hooks'
import { pickercolumnEmits, pickercolumnProps } from './pickercolumn'
import type { TouchParams } from './types'

const props = defineProps(pickercolumnProps)
const emit = defineEmits(pickercolumnEmits)
const touch: any = useTouch()

defineExpose({ stopMomentum })

const state = reactive({
  touchParams: {
    startY: 0,
    endY: 0,
    startTime: 0,
    endTime: 0,
    lastY: 0,
    lastTime: 0,
  },

  currIndex: 1,
  transformY: 0,
  scrollDistance: 0,
  rotation: 20,
})

const roller = ref<any>()

const moving = ref(false)
const touchDeg = ref<string | number>(0)
const touchTime = ref(0)

const DEFAULT_DURATION = 200

// 触发惯性滑动条件:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_TIME` 且 move
// 距离大于 `MOMENTUM_DISTANCE` 时，执行惯性滑动
const INERTIA_TIME = 300
const INERTIA_DISTANCE = 15

const touchRollerStyle = computed(() => {
  return {
    transition: `transform ${touchTime.value}ms cubic-bezier(0.17, 0.89, 0.45, 1)`,
    transform: `rotate3d(1, 0, 0, ${touchDeg.value})`,
    top: `calc(50% - ${+props.optionHeight / 2}px)`,
  }
})

const touchTileStyle = computed(() => {
  const { optionHeight } = props
  return {
    transition: `transform ${touchTime.value}ms cubic-bezier(0.17, 0.89, 0.45, 1)`,
    transform: `translate3d(0, ${state.scrollDistance}px, 0)`,
    top: `calc(50% - ${+optionHeight / 2}px)`,
    height: `${optionHeight}px`,
  }
})

function setRollerStyle(index: number) {
  return `transform: rotate3d(1, 0, 0, ${-state.rotation * index}deg) translate3d(0px, 0px, 104px)`
}

const maskStyles = computed(() => {
  return {
    backgroundSize: `100% ${((+props.visibleOptionNum - 1) * +props.optionHeight) / 2}px`,
  }
})

function onTouchStart(event: TouchEvent) {
  touch.start(event)
  if (moving.value && !props.uni) {
    const { transform } = window?.getComputedStyle(roller.value?.$el)

    if (props.threeDimensional) {
      const circle = Math.floor(Number.parseInt(touchDeg.value as string) / 360)
      const cos = +transform.split(', ')[5]
      const sin = +transform.split(', ')[6] < 0 ? 180 : 0
      const endDeg = circle * 360 + (Math.acos(cos) / Math.PI) * 180 + sin

      state.scrollDistance = -Math.abs((endDeg / state.rotation - 1) * +props.optionHeight)
    }
    else {
      state.scrollDistance = +transform.slice(7, transform.length - 1).split(', ')[5]
    }
  }

  preventDefault(event, true)

  state.touchParams.startY = touch.deltaY.value
  state.touchParams.startTime = Date.now()
  state.transformY = state.scrollDistance
}

function onTouchMove(event: TouchEvent) {
  touch.move(event)
  if ((touch as any).isVertical()) {
    moving.value = true
    preventDefault(event, true)
  }
  (state.touchParams as TouchParams).lastY = touch.deltaY.value
  const move = state.touchParams.lastY - state.touchParams.startY
  setMove(move)
}

function onTouchEnd() {
  state.touchParams.lastY = touch.deltaY.value
  state.touchParams.lastTime = Date.now()
  const move = state.touchParams.lastY - state.touchParams.startY

  const moveTime = state.touchParams.lastTime - state.touchParams.startTime

  if (moveTime <= INERTIA_TIME && Math.abs(move) > INERTIA_DISTANCE) {
    // 惯性滚动
    const distance = momentum(move, moveTime)
    setMove(distance, 'end', +props.swipeDuration)
    return
  }
  else {
    setMove(move, 'end')
  }

  setTimeout(() => {
    touch.reset()
    moving.value = false
  }, 0)
}

// 惯性滚动 距离
function momentum(distance: number, duration: number) {
  // 惯性滚动的速度
  const speed = Math.abs(distance / duration)
  // 惯性滚动的距离
  distance = (speed / 0.003) * (distance < 0 ? -1 : 1)
  return distance
}

function isHidden(index: number) {
  if (index >= state.currIndex + 8 || index <= state.currIndex - 8)
    return true
  else
    return false
}

function setTransform(translateY = 0, type: string | null, time = DEFAULT_DURATION, deg: string | number) {
  if (type === 'end')
    touchTime.value = time
  else
    touchTime.value = 0

  touchDeg.value = deg as number
  state.scrollDistance = translateY
}

function setMove(move: number, type?: string, time?: number) {
  const { optionHeight } = props
  let updateMove = move + state.transformY

  if (type === 'end') {
    // 限定滚动距离
    if (updateMove > 0)
      updateMove = 0

    if (updateMove < -(props.column.length - 1) * +optionHeight)
      updateMove = -(props.column.length - 1) * +optionHeight

    // 设置滚动距离为 +optionHeight 的倍数值
    const endMove = Math.round(updateMove / +optionHeight) * +optionHeight
    const deg = `${(Math.abs(Math.round(endMove / +optionHeight)) + 1) * state.rotation}deg`

    setTransform(endMove, type, time, deg)

    state.currIndex = Math.abs(Math.round(endMove / +optionHeight)) + 1
  }
  else {
    let deg = 0
    const currentDeg = (-updateMove / +optionHeight + 1) * state.rotation

    // picker 滚动的最大角度
    const maxDeg = (props.column.length + 1) * state.rotation
    const minDeg = 0

    deg = clamp(currentDeg, minDeg, maxDeg)

    if (minDeg < deg && deg < maxDeg) {
      setTransform(updateMove, null, undefined, `${deg}deg`)
      state.currIndex = Math.abs(Math.round(updateMove / +optionHeight)) + 1
    }
  }
}

function setChooseValue() {
  emit('change', props.column[state.currIndex - 1])
}

function modifyStatus(type: boolean) {
  const { column } = props
  const index = column.findIndex(columnItem => columnItem[props.fieldNames.value] === props.value)

  state.currIndex = index === -1 ? 1 : (index as number) + 1
  const move = index === -1 ? 0 : (index as number) * +props.optionHeight
  type && setChooseValue()
  setMove(-move)
}

// 惯性滚动结束
function stopMomentum() {
  moving.value = false
  touchTime.value = 0
  setChooseValue()
}

watch(
  () => props.column,
  (val) => {
    if (props.column && props.column.length > 0) {
      state.transformY = 0
      modifyStatus(false)
    }
  },
  {
    deep: true,
  },
)

watch(
  () => props.value,
  (val) => {
    state.transformY = 0
    modifyStatus(false)
  },
  {
    deep: true,
  },
)

onMounted(() => {
  modifyStatus(true)
})
</script>

<script lang="ts">
const componentName = `${PREFIX}-picker-column`

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
  <view class="nut-picker__list" @touchstart="(onTouchStart as any)" @touchmove="(onTouchMove as any)" @touchend="onTouchEnd">
    <view
      ref="roller"
      class="nut-picker-roller"
      :style="threeDimensional ? touchRollerStyle : touchTileStyle"
      @transitionend="stopMomentum"
    >
      <template v-for="(item, index) in column" :key="item[fieldNames.value] ? item[fieldNames.value] : index">
        <!-- 3D 效果 -->
        <view
          v-if="item && item[fieldNames.text] && threeDimensional"
          class="nut-picker-roller-item"
          :class="{ 'nut-picker-roller-item-hidden': isHidden(index + 1) }"
          :style="setRollerStyle(index + 1)"
        >
          {{ item[fieldNames.text] }}
        </view>
        <!-- 平铺 -->
        <view
          v-if="item && item[fieldNames.text] && !threeDimensional"
          class="nut-picker-roller-item-tile"
          :style="{ height: pxCheck(optionHeight), lineHeight: pxCheck(optionHeight) }"
        >
          {{ item[fieldNames.text] }}
        </view>
      </template>
    </view>
    <view class="nut-picker-roller-mask" :style="maskStyles" />
  </view>
</template>

<style lang="scss">
@import './index';
</style>
