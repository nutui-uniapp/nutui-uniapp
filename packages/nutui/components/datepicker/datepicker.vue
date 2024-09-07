<script setup lang="ts">
import { computed, defineComponent, nextTick, onBeforeMount, reactive, watch } from 'vue'
import { CANCEL_EVENT, CONFIRM_EVENT, PREFIX, UPDATE_MODEL_EVENT } from '../_constants'
import { isDate, isEqualValue, padZero } from '../_utils'
import type { PickerBaseEvent, PickerChangeEvent } from '../picker'
import NutPicker from '../picker/picker.vue'
import type { PickerOption } from '../pickercolumn'
import { datepickerEmits, datepickerProps } from './datepicker'
import type { DateLike, DatePickerBaseEvent, DatePickerColumnType, DatePickerRangeItem } from './type'

const props = defineProps(datepickerProps)

const emit = defineEmits(datepickerEmits)

const ZH_CN_LOCALES: {
  [props: string]: string
} = {
  day: '日',
  year: '年',
  month: '月',
  hour: '时',
  minute: '分',
  seconds: '秒',
}

interface State {
  currentDate: Date
  selectedValue: string[]
}

const state: State = reactive({
  currentDate: new Date(),
  selectedValue: [],
})

function normalizeDate(value?: DateLike) {
  if (value == null)
    return new Date()

  if (isDate(value))
    return value

  return new Date(value)
}

const innerMinDate = computed(() => {
  return normalizeDate(props.minDate)
})

const innerMaxDate = computed(() => {
  return normalizeDate(props.maxDate)
})

function formatValue(value: Date) {
  return new Date(Math.min(Math.max(value.getTime(), innerMinDate.value.getTime()), innerMaxDate.value.getTime()))
}

function getMonthEndDay(year: number, month: number): number {
  return 32 - new Date(year, month - 1, 32).getDate()
}

function getBoundary(type: 'min' | 'max', value: Date) {
  const boundary = type === 'min' ? innerMinDate.value : innerMaxDate.value

  const year = boundary.getFullYear()
  let month = 1
  let date = 1
  let hour = 0
  let minute = 0

  if (type === 'max') {
    month = 12
    date = getMonthEndDay(value.getFullYear(), value.getMonth() + 1)
    hour = 23
    minute = 59
  }

  let seconds = minute
  if (value.getFullYear() === year) {
    month = boundary.getMonth() + 1
    if (value.getMonth() + 1 === month) {
      date = boundary.getDate()
      if (value.getDate() === date) {
        hour = boundary.getHours()
        if (value.getHours() === hour) {
          minute = boundary.getMinutes()
          if (value.getMinutes() === minute)
            seconds = boundary.getSeconds()
        }
      }
    }
  }

  return {
    [`${type}Year`]: year,
    [`${type}Month`]: month,
    [`${type}Date`]: date,
    [`${type}Hour`]: hour,
    [`${type}Minute`]: minute,
    [`${type}Seconds`]: seconds,
  }
}

const ranges = computed<DatePickerRangeItem[]>(() => {
  const { minYear, minDate, minMonth, minHour, minMinute, minSeconds } = getBoundary('min', state.currentDate)

  const { maxYear, maxDate, maxMonth, maxHour, maxMinute, maxSeconds } = getBoundary('max', state.currentDate)

  return generateList([
    {
      type: 'year',
      range: [minYear, maxYear],
    },
    {
      type: 'month',
      range: [minMonth, maxMonth],
    },
    {
      type: 'day',
      range: [minDate, maxDate],
    },
    {
      type: 'hour',
      range: [minHour, maxHour],
    },
    {
      type: 'minute',
      range: [minMinute, maxMinute],
    },
    {
      type: 'seconds',
      range: [minSeconds, maxSeconds],
    },
  ])
})

const columns = computed(() => {
  return ranges.value.map((item, columnIndex) => {
    return generateValue(item.range[0], item.range[1], getDateIndex(item.type), item.type, columnIndex)
  })
})

function handleChange({
  columnIndex,
  selectedValue,
  selectedOptions,
}: PickerChangeEvent) {
  const formatDate: (number | string)[] = [...selectedValue]

  if (props.type === 'month-day' && formatDate.length < 3)
    formatDate.unshift(new Date(state.currentDate || innerMinDate.value || innerMaxDate.value).getFullYear())

  if (props.type === 'year-month' && formatDate.length < 3)
    formatDate.push(new Date(state.currentDate || innerMinDate.value || innerMaxDate.value).getDate())

  const year = Number(formatDate[0])
  const month = Number(formatDate[1]) - 1
  const day = Math.min(Number(formatDate[2]), getMonthEndDay(Number(formatDate[0]), Number(formatDate[1])))

  let date: Date | null = null
  if (props.type === 'date' || props.type === 'month-day' || props.type === 'year-month') {
    date = new Date(year, month, day)
  }
  else if (props.type === 'datetime') {
    date = new Date(year, month, day, Number(formatDate[3]), Number(formatDate[4]))
  }
  else if (props.type === 'datehour') {
    date = new Date(year, month, day, Number(formatDate[3]))
  }
  else if (props.type === 'hour-minute' || props.type === 'time') {
    date = new Date(state.currentDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDate()
    date = new Date(year, month, day, Number(formatDate[0]), Number(formatDate[1]), Number(formatDate[2] || 0))
  }

  state.currentDate = formatValue(date!)

  emit('change', { date: date!, columnIndex, selectedValue, selectedOptions })
}

function formatterOption(type: DatePickerColumnType, value: string | number) {
  const { formatter, isShowChinese } = props

  const text = padZero(value, 2)

  let option: PickerOption
  if (formatter)
    option = formatter(type, { text, value: text })
  else
    option = { text: `${text}${isShowChinese ? ZH_CN_LOCALES[type] : ''}`, value: text }

  return option
}

/**
 * @param min 最小值
 * @param max 最大值
 * @param value 当前显示的值
 * @param type 类型
 * @param columnIndex
 */
function generateValue(min: number, max: number, value: number | string, type: DatePickerColumnType, columnIndex: number) {
  const options: PickerOption[] = []

  let index = 0
  while (min <= max) {
    options.push(formatterOption(type, min))

    if (type === 'minute')
      min += props.minuteStep
    else
      min += 1

    if (min <= Number(value))
      index += 1
  }

  state.selectedValue[columnIndex] = options[index]?.value as string

  return props.filter ? props.filter(type, options) : options
}

function getDateIndex(type: DatePickerColumnType) {
  if (type === 'year')
    return state.currentDate.getFullYear()

  if (type === 'month')
    return state.currentDate.getMonth() + 1

  if (type === 'day')
    return state.currentDate.getDate()

  if (type === 'hour')
    return state.currentDate.getHours()

  if (type === 'minute')
    return state.currentDate.getMinutes()

  if (type === 'seconds')
    return state.currentDate.getSeconds()

  return 0
}

function convertEvent({ selectedValue, selectedOptions }: PickerBaseEvent): DatePickerBaseEvent {
  let date: Date | null = null

  switch (props.type) {
    case 'date':
    case 'datehour':
    case 'datetime':
    case 'year-month': {
      const [
        year = 0,
        month = 0,
        day = 0,
        hour = 0,
        minute = 0,
        seconds = 0,
      ] = selectedValue
      date = new Date(Number(year), Number(month) - 1, Number(day), Number(hour), Number(minute), Number(seconds))
      break
    }
    case 'time':
    case 'hour-minute': {
      const [
        hour = 0,
        minute = 0,
        seconds = 0,
      ] = selectedValue
      date = new Date(0, 0, 0, Number(hour), Number(minute), Number(seconds))
      break
    }
    case 'month-day': {
      const [
        month = 0,
        day = 0,
      ] = selectedValue
      date = new Date(0, Number(month) - 1, Number(day))
      break
    }
  }

  if (date == null)
    date = new Date()

  return {
    date,
    selectedValue,
    selectedOptions,
  }
}

function handleCancel(event: PickerBaseEvent) {
  emit(CANCEL_EVENT, convertEvent(event))
}

function handleConfirm(event: PickerBaseEvent) {
  emit(CONFIRM_EVENT, convertEvent(event))
}

function generateList<T>(list: T[]) {
  switch (props.type) {
    case 'date':
      return list.slice(0, 3)
    case 'datetime':
      return list.slice(0, 5)
    case 'time':
      return list.slice(3, 6)
    case 'year-month':
      return list.slice(0, 2)
    case 'month-day':
      return list.slice(1, 3)
    case 'datehour':
      return list.slice(0, 4)
    case 'hour-minute':
      return list.slice(3, 5)
  }

  return list
}

function getSelectedValue(time: Date) {
  return generateList([
    time.getFullYear(),
    time.getMonth() + 1,
    time.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  ].map(it => String(it)))
}

onBeforeMount(() => {
  state.currentDate = formatValue(normalizeDate(props.modelValue))
})

watch(
  () => props.modelValue,
  (value) => {
    const newValue = formatValue(normalizeDate(value))

    if (!isEqualValue(newValue, state.currentDate)) {
      state.currentDate = newValue
      state.selectedValue = getSelectedValue(newValue)
    }
  },
)

watch(
  () => state.currentDate,
  (value) => {
    if (!isEqualValue(value, normalizeDate(props.modelValue))) {
      emit(UPDATE_MODEL_EVENT, value)

      nextTick(() => {
        state.selectedValue = getSelectedValue(value)
      })
    }
  },
)
</script>

<script lang="ts">
const componentName = `${PREFIX}-date-picker`

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
  <NutPicker
    v-model="state.selectedValue"
    :show-toolbar="props.showToolbar"
    :title="props.title"
    :ok-text="props.okText"
    :cancel-text="props.cancelText"
    :columns="columns"
    :three-dimensional="props.threeDimensional"
    :swipe-duration="props.swipeDuration"
    :visible-option-num="props.visibleOptionNum"
    :option-height="props.optionHeight"
    @change="handleChange"
    @confirm="handleConfirm"
    @cancel="handleCancel"
  >
    <template #top>
      <slot name="top" />
    </template>

    <slot />
  </NutPicker>
</template>

<style lang="scss">
@import "./index";
</style>
