<script setup lang="ts">
import { computed, defineComponent, onBeforeMount, reactive, watch } from 'vue'
import { isDate as isDateU, padZero } from '../_utils'
import { PREFIX } from '../_constants'
import NutPicker from '../picker/picker.vue'
import type { PickerOption } from '../pickercolumn'
import { datepickerEmits, datepickerProps } from './datepicker'

const props = defineProps(datepickerProps)
const emit = defineEmits(datepickerEmits)

const currentYear = new Date().getFullYear()
function isDate(val: Date): val is Date {
  return isDateU(val) && !Number.isNaN(val.getTime())
}

const zhCNType: {
  [props: string]: string
} = {
  day: '日',
  year: '年',
  month: '月',
  hour: '时',
  minute: '分',
  seconds: '秒',
}

const state = reactive({
  currentDate: new Date(),
  title: props.title,
  selectedValue: [] as Array<any>,
})
function formatValue(value: Date) {
  if (!isDate(value))
    value = props.minDate

  let timestmp = Math.max(value.getTime(), props.minDate.getTime())
  timestmp = Math.min(timestmp, props.maxDate.getTime())

  return new Date(timestmp)
}

function getMonthEndDay(year: number, month: number): number {
  return 32 - new Date(year, month - 1, 32).getDate()
}
function getBoundary(type: string, value: Date) {
  const boundary = type === 'min' ? props.minDate : props.maxDate
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
  const seconds = minute
  if (value.getFullYear() === year) {
    month = boundary.getMonth() + 1
    if (value.getMonth() + 1 === month) {
      date = boundary.getDate()
      if (value.getDate() === date) {
        hour = boundary.getHours()
        if (value.getHours() === hour)
          minute = boundary.getMinutes()
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

const ranges = computed(() => {
  const { maxYear, maxDate, maxMonth, maxHour, maxMinute, maxSeconds } = getBoundary('max', state.currentDate)

  const { minYear, minDate, minMonth, minHour, minMinute, minSeconds } = getBoundary('min', state.currentDate)

  const result = [
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
  ]
  return generateList(result)
})

const columns = computed(() => {
  const val = ranges.value.map((res, columnIndex) => {
    return generateValue(res.range[0], res.range[1], getDateIndex(res.type), res.type, columnIndex)
  })
  return val
})

function changeHandler({
  columnIndex,
  selectedValue,
  selectedOptions,
}: {
  columnIndex: number
  selectedValue: (string | number)[]
  selectedOptions: PickerOption[]
}) {
  if (['date', 'datetime', 'datehour', 'month-day', 'year-month'].includes(props.type)) {
    const formatDate: (number | string)[] = []
    selectedValue.forEach((item) => {
      formatDate.push(item)
    })
    if (props.type === 'month-day' && formatDate.length < 3)
      formatDate.unshift(new Date(state.currentDate || props.minDate || props.maxDate).getFullYear())

    if (props.type === 'year-month' && formatDate.length < 3)
      formatDate.push(new Date(state.currentDate || props.minDate || props.maxDate).getDate())

    const year = Number(formatDate[0])
    const month = Number(formatDate[1]) - 1
    const day = Math.min(Number(formatDate[2]), getMonthEndDay(Number(formatDate[0]), Number(formatDate[1])))
    let date: Date | null = null
    if (props.type === 'date' || props.type === 'month-day' || props.type === 'year-month')
      date = new Date(year, month, day)

    else if (props.type === 'datetime')
      date = new Date(year, month, day, Number(formatDate[3]), Number(formatDate[4]))

    else if (props.type === 'datehour')
      date = new Date(year, month, day, Number(formatDate[3]))

    state.currentDate = formatValue(date as Date)
  }
  emit('change', { columnIndex, selectedValue, selectedOptions })
}

function formatterOption(type: string, value: string | number) {
  const { formatter, isShowChinese } = props
  let fOption: any = null
  if (formatter) {
    fOption = formatter(type, { text: padZero(value, 2), value: padZero(value, 2) })
  }
  else {
    const padMin = padZero(value, 2)
    const fatter = isShowChinese ? zhCNType[type] : ''
    fOption = { text: padMin + fatter, value: padMin }
  }

  return fOption
}

// min 最小值  max 最大值  val  当前显示的值   type 类型（year、month、day、time）
function generateValue(min: number, max: number, val: number | string, type: string, columnIndex: number) {
  const arr: Array<PickerOption> = []
  let index = 0
  while (min <= max) {
    arr.push(formatterOption(type, min))

    if (type === 'minute')
      min += props.minuteStep
    else
      min++

    if (min <= +val)
      index++
  }
  (state.selectedValue as any)[columnIndex] = arr[index]?.value
  return props.filter ? props.filter(type, arr) : arr
}

function getDateIndex(type: string) {
  if (type === 'year')
    return state.currentDate.getFullYear()
  else if (type === 'month')
    return state.currentDate.getMonth() + 1
  else if (type === 'day')
    return state.currentDate.getDate()
  else if (type === 'hour')
    return state.currentDate.getHours()
  else if (type === 'minute')
    return state.currentDate.getMinutes()
  else if (type === 'seconds')
    return state.currentDate.getSeconds()

  return 0
}

function closeHandler(val: any) {
  emit('cancel', val)
}

function confirm(val: any) {
  emit('confirm', val)
}

function generateList(list: Array<any>) {
  switch (props.type) {
    case 'date':
      list = list.slice(0, 3)
      break
    case 'datetime':
      list = list.slice(0, 5)
      break
    case 'time':
      list = list.slice(3, 6)
      break
    case 'year-month':
      list = list.slice(0, 2)
      break
    case 'month-day':
      list = list.slice(1, 3)
      break
    case 'datehour':
      list = list.slice(0, 4)
      break
    case 'hour-minute':
      list = list.slice(3, 5)
      break
  }
  return list
}

function getSelectedValue(time: Date) {
  const res = [
    time.getFullYear(),
    time.getMonth() + 1,
    time.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  ]
  return generateList(res.map(i => String(i)))
}

onBeforeMount(() => {
  state.currentDate = formatValue(props.modelValue as Date)
})

watch(
  () => props.modelValue,
  (value) => {
    const newValues = formatValue(value as Date)
    const isSameValue = JSON.stringify(newValues) === JSON.stringify(state.currentDate)
    if (!isSameValue) {
      state.currentDate = newValues
      state.selectedValue = getSelectedValue(newValues)
    }
  },
)

watch(
  () => state.currentDate,
  (newValues) => {
    const isSameValue = JSON.stringify(newValues) === JSON.stringify(props.modelValue)
    if (!isSameValue)
      emit('update:modelValue', newValues)
  },
)

watch(
  () => props.title,
  (val) => {
    state.title = val
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
    :ok-text="okText"
    :cancel-text="cancelText"
    :columns="columns"
    :title="title"
    :three-dimensional="threeDimensional"
    :swipe-duration="swipeDuration"
    :show-toolbar="showToolbar"
    :visible-option-num="visibleOptionNum"
    :option-height="optionHeight"
    @cancel="closeHandler"
    @change="changeHandler"
    @confirm="confirm"
  >
    <template #top>
      <slot name="top" />
    </template>
    <slot />
  </NutPicker>
</template>

<style lang="scss">
@import './index';
</style>
