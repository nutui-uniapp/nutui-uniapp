<script lang="ts" setup>
import { computed, defineComponent, onMounted, reactive, ref, watch } from 'vue'
import { CHANGE_EVENT, PREFIX } from '../_constants'
import { useTouch } from '../_hooks'
import { clamp, preventDefault, pxCheck } from '../_utils'
import { pickercolumnEmits, pickercolumnProps } from './pickercolumn'
import type { PickerTouchParams } from './type'
import { useScrollState } from './use-scroll-state'

const props = defineProps(pickercolumnProps)

const emit = defineEmits(pickercolumnEmits)

const DEFAULT_DURATION = 200

// 触发惯性滑动条件:
// 在手指离开屏幕时，如果和上一次 move 时的间隔小于 `MOMENTUM_TIME` 且 move
// 距离大于 `MOMENTUM_DISTANCE` 时，执行惯性滑动
const INERTIA_TIME = 300
const INERTIA_DISTANCE = 15

const innerSwipeDuration = computed(() => {
  return Number(props.swipeDuration)
})

const innerVisibleOptionNum = computed(() => {
  return Number(props.visibleOptionNum)
})

const innerOptionHeight = computed(() => {
  return Number(props.optionHeight)
})

// 使用状态机管理滚动状态
const scrollState = useScrollState()

interface State {
  touchParams: PickerTouchParams
  currIndex: number
  transformY: number
  scrollDistance: number
  rotation: number
}

const state: State = reactive({
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

// 记录滚动开始前的索引，用于判断是否有变化
const startIndex = ref(0)

const roller = ref<any | null>(null)

const touchDeg = ref<string>('0')
const touchTime = ref<number>(0)

const rollerStyles = computed(() => {
  return {
    top: `calc(50% - ${innerOptionHeight.value / 2}px)`,
    transform: `rotate3d(1, 0, 0, ${touchDeg.value})`,
    transition: `transform ${touchTime.value}ms cubic-bezier(0.17, 0.89, 0.45, 1)`,
  }
})

const tileStyles = computed(() => {
  return {
    top: `calc(50% - ${innerOptionHeight.value / 2}px)`,
    height: `${innerOptionHeight.value}px`,
    transform: `translate3d(0, ${state.scrollDistance}px, 0)`,
    transition: `transform ${touchTime.value}ms cubic-bezier(0.17, 0.89, 0.45, 1)`,
  }
})

const maskStyles = computed(() => {
  return {
    backgroundSize: `100% ${((innerVisibleOptionNum.value - 1) * innerOptionHeight.value) / 2}px`,
  }
})

function getRollerStyles(index: number) {
  return `transform: rotate3d(1, 0, 0, ${-state.rotation * index}deg) translate3d(0px, 0px, 104px)`
}

const touch = useTouch()

function onTouchStart(event: any) {
  touch.start(event)

  // 记录滚动开始前的索引
  startIndex.value = state.currIndex - 1

  // 如果正在动画中，立即停止并获取当前位置
  if (scrollState.isAnimating.value && !props.uni) {
    const { transform } = window.getComputedStyle(roller.value?.$el)

    if (props.threeDimensional) {
      const circle = Math.floor(Number.parseInt(touchDeg.value) / 360)
      const cos = Number(transform.split(', ')[5])
      const sin = Number(transform.split(', ')[6]) < 0 ? 180 : 0
      const endDeg = circle * 360 + (Math.acos(cos) / Math.PI) * 180 + sin

      state.scrollDistance = -Math.abs((endDeg / state.rotation - 1) * innerOptionHeight.value)
    }
    else {
      state.scrollDistance = Number(transform.slice(7, transform.length - 1).split(', ')[5])
    }
  }

  preventDefault(event, true)

  // 进入 touching 状态
  scrollState.toTouching(state.currIndex - 1)

  state.touchParams.startY = touch.deltaY.value
  state.touchParams.startTime = Date.now()
  state.transformY = state.scrollDistance
}

function onTouchMove(event: any) {
  touch.move(event)

  if (touch.isVertical()) {
    // 首次移动，进入 scrolling 状态
    if (!scrollState.isScrolling.value && !scrollState.isMomentum.value) {
      scrollState.toScrolling()
    }
    preventDefault(event, true)
  }

  state.touchParams.lastY = touch.deltaY.value

  setMove(state.touchParams.lastY - state.touchParams.startY)
}

function onTouchEnd() {
  state.touchParams.lastY = touch.deltaY.value
  state.touchParams.lastTime = Date.now()

  const move = state.touchParams.lastY - state.touchParams.startY
  const moveTime = state.touchParams.lastTime - state.touchParams.startTime

  // 如果还在 touching 状态（没有移动），直接回到 idle
  if (scrollState.isTouching.value) {
    touch.reset()
    scrollState.toIdle()
    return
  }

  if (moveTime <= INERTIA_TIME && Math.abs(move) > INERTIA_DISTANCE) {
    // 惯性滚动
    const distance = momentum(move, moveTime)
    setMove(distance, 'end', innerSwipeDuration.value)
    // 进入 momentum 状态，但立即触发 change
    scrollState.toMomentum(state.currIndex - 1, innerSwipeDuration.value)
    emitChangeIfNeeded()
    return
  }

  // 普通滚动结束
  setMove(move, 'end')
  // 立即触发 change，不等动画
  emitChangeIfNeeded()
  scrollState.toSettling(state.currIndex - 1)
}

/**
 * 立即触发 change（如果索引有变化）
 */
function emitChangeIfNeeded() {
  const finalIndex = state.currIndex - 1
  if (finalIndex !== startIndex.value && props.column[finalIndex]) {
    emit(CHANGE_EVENT, props.column[finalIndex])
    startIndex.value = finalIndex // 更新，避免重复触发
  }
}

/**
 * 计算惯性滚动距离
 */
function momentum(distance: number, duration: number) {
  // 惯性滚动的速度
  const speed = Math.abs(distance / duration)
  // 惯性滚动的距离
  distance = (speed / 0.003) * (distance < 0 ? -1 : 1)
  return distance
}

function isHidden(index: number) {
  return index >= state.currIndex + 8 || index <= state.currIndex - 8
}

function setTransform(translateY = 0, type: string | null, time = DEFAULT_DURATION, deg: string) {
  if (type === 'end')
    touchTime.value = time
  else
    touchTime.value = 0

  touchDeg.value = deg

  state.scrollDistance = translateY
}

function setMove(move: number, type?: string, time?: number) {
  let updateMove = move + state.transformY

  if (type === 'end') {
    // 限定滚动距离
    if (updateMove > 0)
      updateMove = 0

    const maxMove = (props.column.length - 1) * innerOptionHeight.value
    if (updateMove < -maxMove)
      updateMove = -maxMove

    // 设置滚动距离为 optionHeight 的倍数值
    const endMove = Math.round(updateMove / innerOptionHeight.value) * innerOptionHeight.value
    const deg = `${(Math.abs(Math.round(endMove / innerOptionHeight.value)) + 1) * state.rotation}deg`

    setTransform(endMove, type, time, deg)

    state.currIndex = Math.abs(Math.round(endMove / innerOptionHeight.value)) + 1
  }
  else {
    const currentDeg = (-updateMove / innerOptionHeight.value + 1) * state.rotation

    // picker 滚动的最大角度
    const maxDeg = (props.column.length + 1) * state.rotation
    const minDeg = 0

    const deg = clamp(currentDeg, minDeg, maxDeg)

    if (minDeg < deg && deg < maxDeg) {
      setTransform(updateMove, null, undefined, `${deg}deg`)

      state.currIndex = Math.abs(Math.round(updateMove / innerOptionHeight.value)) + 1
    }
  }
}

/**
 * 根据索引滚动到指定位置
 */
function scrollToIndex(index: number, emitChange = false) {
  const targetIndex = Math.max(0, Math.min(index, props.column.length - 1))
  state.currIndex = targetIndex + 1
  state.transformY = 0

  const move = targetIndex * innerOptionHeight.value
  setMove(-move)

  if (emitChange) {
    emit(CHANGE_EVENT, props.column[targetIndex])
  }
}

/**
 * 根据值查找索引并滚动
 */
function scrollToValue(value: string | number | undefined) {
  const index = props.column.findIndex(
    columnItem => columnItem[props.fieldNames.value] === value,
  )
  scrollToIndex(index === -1 ? 0 : index)
}

/**
 * 获取当前索引（从外部传入的 index 或 value 计算）
 */
function getExternalIndex(): number {
  // 优先使用 index prop
  if (props.index >= 0) {
    return props.index
  }
  // 否则从 value 查找
  const index = props.column.findIndex(
    columnItem => columnItem[props.fieldNames.value] === props.value,
  )
  return index === -1 ? 0 : index
}

// 惯性滚动结束（transitionend 触发）或手动停止
function stopMomentum() {
  if (scrollState.isIdle.value) {
    return
  }
  touchTime.value = 0
  scrollState.toIdle()
  touch.reset()
}

// 监听外部 column 变化
// 核心改进：只有 idle 状态才响应
watch(
  () => props.column,
  () => {
    if (props.column && props.column.length > 0) {
      // 关键：只有 idle 状态才响应外部变化
      if (scrollState.isIdle.value) {
        state.transformY = 0
        scrollToIndex(getExternalIndex())
      }
      // 非 idle 状态：忽略，等滚动结束后会自动同步
    }
  },
  {
    deep: true,
  },
)

// 监听外部 value 变化
// 核心改进：只有 idle 状态才响应
watch(
  () => props.value,
  () => {
    // 关键：只有 idle 状态才响应外部变化
    if (scrollState.isIdle.value) {
      state.transformY = 0
      scrollToValue(props.value)
    }
    // 非 idle 状态：忽略
  },
  {
    deep: true,
  },
)

// 监听外部 index 变化
watch(
  () => props.index,
  (newIndex) => {
    // 关键：只有 idle 状态且 index 有效时才响应
    if (newIndex >= 0 && scrollState.isIdle.value) {
      state.transformY = 0
      scrollToIndex(newIndex)
    }
  },
)

onMounted(() => {
  scrollToIndex(getExternalIndex(), true)
})

defineExpose({
  stopMomentum,
  scrollState: scrollState.state,
  isIdle: scrollState.isIdle,
  currentIndex: computed(() => state.currIndex - 1),
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
  <view
    class="nut-picker__list"
    @touchstart="onTouchStart"
    @touchmove="onTouchMove"
    @touchend="onTouchEnd"
  >
    <view
      ref="roller"
      class="nut-picker-roller"
      :style="[props.threeDimensional ? rollerStyles : tileStyles]"
      @transitionend="stopMomentum"
    >
      <template
        v-for="(item, index) in props.column"
        :key="item[props.fieldNames.value] ? item[props.fieldNames.value] : index"
      >
        <!-- 3D 效果 -->
        <view
          v-if="item && item[props.fieldNames.text] && props.threeDimensional"
          class="nut-picker-roller-item"
          :class="{
            'nut-picker-roller-item-hidden': isHidden(index + 1),
            [item[props.fieldNames.className]]: item[props.fieldNames.className],
          }"
          :style="getRollerStyles(index + 1)"
        >
          {{ item[props.fieldNames.text] }}
        </view>

        <!-- 平铺 -->
        <view
          v-if="item && item[props.fieldNames.text] && !props.threeDimensional"
          class="nut-picker-roller-item-tile"
          :class="{ [item[props.fieldNames.className]]: item[props.fieldNames.className] }"
          :style="{ height: pxCheck(innerOptionHeight), lineHeight: pxCheck(innerOptionHeight) }"
        >
          {{ item[props.fieldNames.text] }}
        </view>
      </template>
    </view>

    <view class="nut-picker-roller-mask" :style="maskStyles" />
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
