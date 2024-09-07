<script lang="ts" setup>
import type { ComponentInternalInstance, CSSProperties } from 'vue'
import { computed, defineComponent, getCurrentInstance, nextTick, onMounted, ref, toRef, useSlots } from 'vue'
import { CHANGE_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { useRect, useTouch } from '../_hooks'
import { getRandomId, isEqualValue, preventDefault } from '../_utils'
import { useFormDisabled } from '../form/form'
import { rangeEmits, rangeProps } from './range'
import type { RangeArrayValue, RangeValue } from './types'

const props = defineProps(rangeProps)

const emit = defineEmits(rangeEmits)

const slots = useSlots()

const instance = getCurrentInstance() as ComponentInternalInstance

const disabled = useFormDisabled(toRef(props, 'disabled'))

const touch = useTouch()

const rangeId = computed(() => `root-${getRandomId()}`)

const state = ref({
  width: 0,
  height: 0,
})

const buttonIndex = ref(0)

let startValue: RangeValue
let currentValue: RangeValue

const dragStatus = ref<'start' | 'dragging' | ''>('')

const innerMin = computed(() => Number(props.min))

const innerMax = computed(() => Number(props.max))

const innerStep = computed(() => Number(props.step))

const innerMarks = computed(() => {
  return Object.keys(props.marks)
    .map(it => Number.parseFloat(it))
    .sort((a, b) => a - b)
    .filter(point => point >= innerMin.value && point <= innerMax.value)
})

const scope = computed(() => innerMax.value - innerMin.value)

const classes = computed<Record<string, boolean>>(() => {
  const classPrefix = componentName

  return {
    [classPrefix]: true,
    [`${classPrefix}-disabled`]: disabled.value,
    [`${classPrefix}-vertical`]: props.vertical,
    [`${classPrefix}-show-number`]: !props.hiddenRange,
  }
})

const containerClasses = computed<Record<string, boolean>>(() => {
  const classPrefix = 'nut-range-container'

  return {
    [classPrefix]: true,
    [`${classPrefix}-vertical`]: props.vertical,
  }
})

const wrapperStyles = computed<CSSProperties>(() => {
  return {
    background: props.inactiveColor,
  }
})

const buttonStyles = computed<CSSProperties>(() => {
  return {
    borderColor: props.buttonColor,
  }
})

const isArrayValue = (value: unknown): value is RangeArrayValue => props.range && Array.isArray(value)

function calcMainAxis() {
  const { modelValue } = props

  if (isArrayValue(modelValue))
    return `${((modelValue[1] - modelValue[0]) * 100) / scope.value}%`

  return `${((modelValue - innerMin.value) * 100) / scope.value}%`
}

function calcOffset() {
  const { modelValue } = props

  if (isArrayValue(modelValue))
    return `${((modelValue[0] - innerMin.value) * 100) / scope.value}%`

  return '0%'
}

const barStyles = computed<CSSProperties>(() => {
  const style: CSSProperties = {
    background: props.activeColor,
    transition: dragStatus.value ? 'none' : undefined,
  }

  if (props.vertical) {
    style.top = calcOffset()
    style.height = calcMainAxis()
  }
  else {
    style.left = calcOffset()
    style.width = calcMainAxis()
  }

  return style
})

function getMarkClasses(mark: number) {
  const classPrefix = 'nut-range-mark'

  const { modelValue } = props

  let lowerBound: number
  let upperBound: number

  if (isArrayValue(modelValue)) {
    const [left, right] = modelValue

    lowerBound = left
    upperBound = right
  }
  else {
    lowerBound = innerMin.value
    upperBound = modelValue
  }

  const isActive = mark <= upperBound && mark >= lowerBound

  return {
    [`${classPrefix}-text`]: true,
    [`${classPrefix}-text-active`]: isActive,
  }
}

function getMarkStyles(mark: number) {
  const style: CSSProperties = {}

  if (props.vertical)
    style.top = `${((mark - innerMin.value) / scope.value) * 100}%`
  else
    style.left = `${((mark - innerMin.value) / scope.value) * 100}%`

  return style
}

function getTickStyles(mark: number) {
  const style: CSSProperties = {}

  const { modelValue } = props

  let lowerBound: number
  let upperBound: number

  if (isArrayValue(modelValue)) {
    const [left, right] = modelValue

    lowerBound = left
    upperBound = right
  }
  else {
    lowerBound = innerMin.value
    upperBound = innerMax.value
  }

  const isActive = mark <= upperBound && mark >= lowerBound

  style.background = isActive ? props.activeColor : props.inactiveColor

  return style
}

function formatValue(value: number) {
  const trulyValue = Math.max(innerMin.value, Math.min(value, innerMax.value))

  return Math.round(trulyValue / innerStep.value) * innerStep.value
}

function normalizeArrayValue(value: RangeArrayValue) {
  if (value[0] > value[1])
    return value.slice(0).reverse() as RangeArrayValue

  return value
}

function formatArrayValue(value: RangeArrayValue) {
  return normalizeArrayValue(value).map(it => formatValue(it)) as RangeArrayValue
}

function updateValue(value: RangeValue, end?: boolean) {
  if (isArrayValue(value))
    value = formatArrayValue(value)
  else
    value = formatValue(value)

  if (!isEqualValue(value, props.modelValue))
    emit(UPDATE_MODEL_EVENT, value)

  if (end && !isEqualValue(value, startValue))
    emit(CHANGE_EVENT, value)
}

async function onClick(event: any) {
  if (disabled.value)
    return

  const { modelValue } = props

  const rect = await useRect(rangeId.value, instance)

  state.value.width = rect.width!
  state.value.height = rect.height!

  const clientX = event.touches[0].clientX
  const clientY = event.touches[0].clientY

  let delta: number
  let total: number

  if (props.vertical) {
    delta = clientY - rect.top!
    total = rect.height!
  }
  else {
    delta = clientX - rect.left!
    total = rect.width!
  }

  const value = innerMin.value + (delta / total) * scope.value

  if (isArrayValue(modelValue)) {
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

function init() {
  useRect(rangeId.value, instance).then(
    (rect) => {
      state.value.width = rect.width!
      state.value.height = rect.height!
    },
    () => { },
  )
}

function onTouchStart(event: any) {
  if (disabled.value)
    return

  touch.start(event)

  currentValue = props.modelValue

  if (isArrayValue(currentValue))
    startValue = formatArrayValue(currentValue)
  else
    startValue = formatValue(currentValue)

  dragStatus.value = 'start'

  preventDefault(event, true)
}

async function onTouchMove(event: any) {
  if (disabled.value)
    return

  preventDefault(event, true)

  if (dragStatus.value === 'start')
    emit('dragStart')

  touch.move(event)

  dragStatus.value = 'dragging'

  let delta: number
  let total: number

  if (props.vertical) {
    delta = touch.deltaY.value
    total = state.value.height
  }
  else {
    delta = touch.deltaX.value
    total = state.value.width
  }

  const diff = (delta / total) * scope.value

  if (isArrayValue(startValue))
    (currentValue as RangeArrayValue)[buttonIndex.value] = startValue[buttonIndex.value] + diff
  else
    currentValue = startValue + diff

  updateValue(currentValue)
}

function onTouchEnd(event: any) {
  if (disabled.value)
    return

  if (dragStatus.value === 'dragging') {
    updateValue(currentValue, true)

    emit('dragEnd')
  }

  dragStatus.value = ''

  preventDefault(event, true)
}

function formatCurrentValue(idx?: number): number {
  if (Array.isArray(props.modelValue) && typeof idx === 'number')
    return props.modelValue[idx]

  return Number(props.modelValue)
}

onMounted(() => {
  nextTick(() => {
    init()
  })
})
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
  <view :class="[containerClasses, props.customClass]" :style="props.customStyle">
    <view v-if="!props.hiddenRange" class="nut-range-min">
      {{ innerMin }}
    </view>

    <view
      :id="rangeId"
      :class="classes"
      :style="wrapperStyles"
      @click.stop="onClick"
    >
      <view class="nut-range-mark">
        <template v-if="innerMarks.length > 0">
          <view
            v-for="item in innerMarks"
            :key="item"
            :class="getMarkClasses(item)"
            :style="getMarkStyles(item)"
          >
            {{ item }}
            <view class="nut-range-tick" :style="getTickStyles(item)" />
          </view>
        </template>
      </view>

      <view class="nut-range-bar" :style="barStyles">
        <template v-if="props.range">
          <view
            v-for="index in [0, 1]"
            :key="index"
            :class="[index === 0 ? 'nut-range-button-wrapper-left' : 'nut-range-button-wrapper-right']"
            :catch-move="true"
            :tabindex="disabled ? -1 : 0"
            role="slider"
            :aria-valuenow="formatCurrentValue(index)"
            :aria-valuemin="innerMin"
            :aria-valuemax="innerMax"
            aria-orientation="horizontal"
            @touchstart.stop.prevent="(e: any) => {
              buttonIndex = index;
              onTouchStart(e);
            }"
            @touchmove.stop.prevent="onTouchMove"
            @touchend.stop.prevent="onTouchEnd"
            @touchcancel.stop.prevent="onTouchEnd"
            @click="(e: any) => e.stopPropagation()"
          >
            <slot v-if="slots.button" name="button" />

            <view v-else class="nut-range-button" :style="buttonStyles">
              <view v-if="!props.hiddenTag" class="number">
                {{ formatCurrentValue(index) }}
              </view>
            </view>
          </view>
        </template>

        <template v-else>
          <view
            class="nut-range-button-wrapper"
            :catch-move="true"
            :tabindex="disabled ? -1 : 0"
            role="slider"
            :aria-valuenow="formatCurrentValue()"
            :aria-valuemin="innerMin"
            :aria-valuemax="innerMax"
            aria-orientation="horizontal"
            @touchstart.stop.prevent="onTouchStart"
            @touchmove.stop.prevent="onTouchMove"
            @touchend.stop.prevent="onTouchEnd"
            @touchcancel.stop.prevent="onTouchEnd"
            @click="(e: any) => e.stopPropagation()"
          >
            <slot v-if="slots.button" name="button" />

            <view v-else class="nut-range-button" :style="buttonStyles">
              <view v-if="!props.hiddenTag" class="number">
                {{ formatCurrentValue() }}
              </view>
            </view>
          </view>
        </template>
      </view>
    </view>

    <view v-if="!props.hiddenRange" class="nut-range-max">
      {{ innerMax }}
    </view>
  </view>
</template>

<style lang="scss">
@import "./index";
</style>
