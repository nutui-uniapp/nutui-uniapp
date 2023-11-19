<script setup lang="ts">
import { type CSSProperties, type ComponentInternalInstance, computed, defineComponent, getCurrentInstance, ref } from 'vue'
import { isH5 } from '../_utils'
import { CHANGE_EVENT, PREFIX, UPDATE_MODEL_EVENT, refRandomId } from '../_constants'
import { useRect, useTouch } from '../_hooks'
import { type SliderValue, rangeEmits, rangeProps } from './range'

const props = defineProps(rangeProps)
const emit = defineEmits(rangeEmits)
const instance = getCurrentInstance() as ComponentInternalInstance

const RangeID = computed(() => `root-${refRandomId}`)

const buttonIndex = ref(0)
let startValue: SliderValue
let currentValue: SliderValue

const dragStatus = ref<'start' | 'draging' | ''>()
const touch = useTouch()

const marksList = computed(() => {
  const { marks, max, min } = props
  const marksKeys = Object.keys(marks)
  const list = marksKeys
    .map(Number.parseFloat)
    .sort((a, b) => a - b)
    .filter(point => point >= +min && point <= +max)
  return list
})
const scope = computed(() => Number(props.max) - Number(props.min))

const classes = computed(() => {
  const prefixCls = componentName
  return {
    [prefixCls]: true,
    [`${prefixCls}-disabled`]: props.disabled,
    [`${prefixCls}-vertical`]: props.vertical,
    [`${prefixCls}-show-number`]: !props.hiddenRange,
  }
})
const containerClasses = computed(() => {
  const prefixCls = 'nut-range-container'
  return {
    [prefixCls]: true,
    [`${prefixCls}-vertical`]: props.vertical,
  }
})
const wrapperStyle = computed(() => {
  return {
    background: props.inactiveColor,
  }
})

const buttonStyle = computed(() => {
  return {
    borderColor: props.buttonColor,
  }
})

const isRange = (val: unknown): val is number[] => !!props.range && Array.isArray(val)

function calcMainAxis() {
  const { modelValue, min } = props
  if (isRange(modelValue))
    return `${((modelValue[1] - modelValue[0]) * 100) / scope.value}%`

  return `${((modelValue - Number(min)) * 100) / scope.value}%`
}

function calcOffset() {
  const { modelValue, min } = props
  if (isRange(modelValue))
    return `${((modelValue[0] - Number(min)) * 100) / scope.value}%`

  return '0%'
}

const barStyle = computed<CSSProperties>(() => {
  if (props.vertical) {
    return {
      height: calcMainAxis(),
      top: calcOffset(),
      background: props.activeColor,
      transition: dragStatus.value ? 'none' : undefined,
    }
  }
  else {
    return {
      width: calcMainAxis(),
      left: calcOffset(),
      background: props.activeColor,
      transition: dragStatus.value ? 'none' : undefined,
    }
  }
})
function markClassName(mark: number) {
  const classPrefix = 'nut-range-mark'
  const { modelValue, max, min } = props
  let lowerBound = Number(min)
  let upperBound: number | number[] = Number(max)
  if (props.range) {
    const [left, right] = modelValue as number[]
    lowerBound = left
    upperBound = right
  }
  else {
    upperBound = modelValue
  }
  const isActive = mark <= (upperBound as number) && mark >= lowerBound
  return {
    [`${classPrefix}-text`]: true,
    [`${classPrefix}-text-active`]: isActive,
  }
}
function marksStyle(mark: number) {
  const { min, vertical } = props
  let style: CSSProperties = {
    left: `${((mark - Number(min)) / scope.value) * 100}%`,
  }
  if (vertical) {
    style = {
      top: `${((mark - Number(min)) / scope.value) * 100}%`,
    }
  }
  return style
}
function tickStyle(mark: number) {
  const { modelValue, max, min } = props
  let lowerBound = Number(min)
  let upperBound = Number(max)
  if (props.range) {
    const [left, right] = modelValue as number[]
    lowerBound = left
    upperBound = right
  }
  const isActive = mark <= upperBound && mark >= lowerBound
  const style: CSSProperties = {
    background: !isActive ? props.inactiveColor : props.activeColor,
  }

  return style
}
function format(value: number) {
  const { min, max, step } = props
  value = Math.max(+min, Math.min(value, +max))
  return Math.round(value / +step) * +step
}

function isSameValue(newValue: SliderValue, oldValue: SliderValue) {
  return JSON.stringify(newValue) === JSON.stringify(oldValue)
}

function handleOverlap(value: number[]) {
  if (value[0] > value[1])
    return value.slice(0).reverse()

  return value
}

function updateValue(value: SliderValue, end?: boolean) {
  if (isRange(value))
    value = handleOverlap(value).map(format)
  else
    value = format(value)

  if (!isSameValue(value, props.modelValue))
    emit(UPDATE_MODEL_EVENT, value)

  if (end && !isSameValue(value, startValue))
    emit(CHANGE_EVENT, value)
}

async function onClick(event: any) {
  if (props.disabled)
    return

  const { min, modelValue } = props
  const rect = await useRect(RangeID.value, instance)
  let clientX, clientY
  if (isH5) {
    clientX = event.clientX
    clientY = event.clientY
  }
  else {
    clientX = event.touches[0].clientX
    clientY = event.touches[0].clientY
  }
  let delta = clientX - rect.left!
  let total = rect.width!
  if (props.vertical) {
    delta = clientY - rect.top!
    total = rect.height!
  }
  const value = Number(min) + (delta / total) * scope.value
  if (isRange(modelValue)) {
    const [left, right] = modelValue
    const middle = (left + right) / 2
    if (value <= middle)
      updateValue([value, right], true)
    else
      updateValue([left, value], true)
  }
  else {
    updateValue(value, true)
  }
}

function onTouchStart(event: TouchEvent) {
  if (props.disabled)
    return

  touch.start(event)
  currentValue = props.modelValue

  if (isRange(currentValue))
    startValue = currentValue.map(format)
  else
    startValue = format(currentValue)

  dragStatus.value = 'start'
  event.stopPropagation()
  event.preventDefault()
}

async function onTouchMove(event: TouchEvent) {
  if (props.disabled)
    return

  if (dragStatus.value === 'start')
    emit('dragStart')

  touch.move(event)
  dragStatus.value = 'draging'

  const rect = await useRect(RangeID.value, instance)
  let delta = touch.deltaX.value
  let total = rect.width!
  let diff = (delta / total) * scope.value
  if (props.vertical) {
    delta = touch.deltaY.value
    total = rect.height!
    diff = (delta / total) * scope.value
  }
  if (isRange(startValue))
    (currentValue as number[])[buttonIndex.value] = startValue[buttonIndex.value] + diff
  else
    currentValue = startValue + diff

  updateValue(currentValue)
  event.stopPropagation()
  event.preventDefault()
}

function onTouchEnd(event: TouchEvent) {
  if (props.disabled)
    return

  if (dragStatus.value === 'draging') {
    updateValue(currentValue, true)
    emit('dragEnd')
  }
  dragStatus.value = ''
  event.stopPropagation()
  event.preventDefault()
}
function curValue(idx?: number): number {
  const value
        = Array.isArray(props.modelValue) && typeof idx === 'number'
          ? (props.modelValue as number[])[idx]
          : Number(props.modelValue)
  return value
}
</script>

<script lang="ts">
const componentName = `${PREFIX}-range`

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
  <view :class="[containerClasses, customClass]" :style="customStyle">
    <view v-if="!hiddenRange" class="nut-range-min">
      {{ +min }}
    </view>
    <view :id="RangeID" :style="wrapperStyle" :class="classes" @click.stop="onClick">
      <view class="nut-range-mark">
        <template v-if="marksList.length > 0">
          <view v-for="marks in marksList" :key="marks" :class="markClassName(marks)" :style="marksStyle(marks)">
            {{ marks }}
            <view class="nut-range-tick" :style="tickStyle(marks)" />
          </view>
        </template>
      </view>
      <view class="nut-range-bar" :style="barStyle">
        <template v-if="range">
          <view
            v-for="index of [0, 1]"
            :key="index"
            role="slider"
            :class="{
              'nut-range-button-wrapper-left': index === 0,
              'nut-range-button-wrapper-right': index === 1,
            }"
            :catch-move="true"
            :tabindex="disabled ? -1 : 0"
            :aria-valuemin="+min"
            :aria-valuenow="curValue(index)"
            :aria-valuemax="+max"
            aria-orientation="horizontal"
            @touchstart.stop.prevent="
              (e:any) => {
                if (typeof index === 'number') {
                  // 实时更新当前拖动的按钮索引
                  buttonIndex = index;
                }
                onTouchStart(e);
              }
            "
            @touchmove.stop.prevent="(onTouchMove as any)"
            @touchend.stop.prevent="(onTouchEnd as any)"
            @touchcancel.stop.prevent="(onTouchEnd as any)"
            @click="(e:any) => e.stopPropagation()"
          >
            <slot v-if="$slots.button" name="button" />
            <view v-else class="nut-range-button" :style="buttonStyle">
              <view v-if="!hiddenTag" class="number">
                {{ curValue(index) }}
              </view>
            </view>
          </view>
        </template>
        <template v-else>
          <view
            role="slider"
            class="nut-range-button-wrapper"
            :tabindex="disabled ? -1 : 0"
            :aria-valuemin="+min"
            :aria-valuenow="curValue()"
            :aria-valuemax="+max"
            aria-orientation="horizontal"
            :catch-move="true"
            @touchstart.stop.prevent="
              (e:any) => {
                onTouchStart(e);
              }
            "
            @touchmove.stop.prevent="(onTouchMove as any)"
            @touchend.stop.prevent="(onTouchEnd as any)"
            @touchcancel.stop.prevent="(onTouchEnd as any)"
            @click="(e:any) => e.stopPropagation()"
          >
            <slot v-if="$slots.button" name="button" />
            <view v-else class="nut-range-button" :style="buttonStyle">
              <view v-if="!hiddenTag" class="number">
                {{ curValue() }}
              </view>
            </view>
          </view>
        </template>
      </view>
    </view>
    <view v-if="!hiddenRange" class="nut-range-max">
      {{ +max }}
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
