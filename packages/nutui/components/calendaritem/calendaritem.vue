<script setup lang="ts">
import { computed, defineComponent, onMounted, reactive, ref, useSlots, watch } from 'vue'
import type { ScrollViewOnScrollEvent } from '@uni-helper/uni-app-types'
import { compareDate, date2Str, formatResultDate, getDay, getMainClass, getMonthDays, getMonthPreDay, getMonthWeek, getNumTwoBit, getWeekDate, getWhatDay, getYearWeek, isEqual, isH5 } from '../_utils'
import { CHOOSE_EVENT, PREFIX, SELECT_EVENT } from '../_constants'
import { useTranslate } from '../../locale'
import requestAniFrame from '../_utils/raf'
import { calendaritemEmits, calendaritemProps } from './calendaritem'
import type { CalendarTaroState, Day, MonthInfo } from './type'

type StringArr = string[]
interface CalendarDateProp {
  year: string
  month: string
}
const props = defineProps(calendaritemProps)

const emit = defineEmits(calendaritemEmits)

const slots = useSlots()
defineExpose({
  scrollToDate,
  initPosition,
})
const componentName = `${PREFIX}-calendar-item`
const { translate } = useTranslate(componentName)
const classes = computed(() => {
  return getMainClass(props, componentName, {
    'nut-calendar--nopop': !props.poppable,
    'nut-calendar--nofooter': props.isAutoBackFill,
  })
})
// 新增：自定义周起始日
const weekdays = (translate('weekdays') as any).map((day: string, index: number) => ({
  day,
  weekend: index === 0 || index === 6,
}))
const weeks = ref([...weekdays.slice(props.firstDayOfWeek, 7), ...weekdays.slice(0, props.firstDayOfWeek)])
// element refs
const scalePx = ref(2)
const months = ref<null | HTMLElement>(null)
const viewHeight = ref(0)
const compConthsData = computed(() => {
  return state.monthsData.slice(state.defaultRange[0], state.defaultRange[1])
})
const scrollWithAnimation = ref(false)
const showTopBtn = computed(() => {
  return slots.btn
})
const topInfo = computed(() => {
  return slots.topInfo
})
const bottomInfo = computed(() => {
  return slots.bottomInfo
})

const state: CalendarTaroState = reactive({
  yearMonthTitle: '',
  defaultRange: [],
  containerHeight: '100%',
  currDate: '',
  propStartDate: '',
  propEndDate: '',
  unLoadPrev: false,
  touchParams: {
    startY: 0,
    endY: 0,
    startTime: 0,
    endTime: 0,
    lastY: 0,
    lastTime: 0,
  },
  transformY: 0,
  translateY: 0,
  scrollDistance: 0,
  defaultData: [],
  chooseData: [],
  monthsData: [],
  dayPrefix: 'nut-calendar__day',
  startData: '',
  endData: '',
  isRange: props.type === 'range',
  timer: 0,
  currentIndex: 0,
  avgHeight: 0,
  scrollTop: 0,
  monthsNum: 0,
})
// 日期转化成数组
function splitDate(date: string) {
  return date.split('-')
}
// 判断是否为开始时间
function isStart(currDate: string) {
  return isEqual(state.currDate[0], currDate)
}
// 判断是否为结束时间
function isEnd(currDate: string) {
  return isEqual(state.currDate[1], currDate)
}
function isMultiple(currDate: string) {
  if (state.currDate?.length > 0) {
    return (state.currDate as StringArr)?.some((item: string) => {
      return isEqual(item, currDate)
    })
  }
  else {
    return false
  }
}
// 获取当前数据
function getCurrDate(day: Day, month: MonthInfo) {
  return `${month.curData[0]}-${month.curData[1]}-${getNumTwoBit(+day.day)}`
}

// 获取样式
function getClass(day: Day, month: MonthInfo, index?: number) {
  const res = []
  if (
    typeof index === 'number'
    && ((index + 1 + props.firstDayOfWeek) % 7 === 0 || (index + props.firstDayOfWeek) % 7 === 0)
  )
    res.push('weekend')

  const currDate = getCurrDate(day, month)
  const { type } = props
  if (day.type === 'curr') {
    if (
      isEqual(state.currDate as string, currDate)
      || ((type === 'range' || type === 'week') && (isStart(currDate) || isEnd(currDate)))
      || (type === 'multiple' && isMultiple(currDate))
    )
      res.push(`${state.dayPrefix}--active`)
    else if (
      (state.propStartDate && compareDate(currDate, state.propStartDate))
      || (state.propEndDate && compareDate(state.propEndDate, currDate))
      || (props.disabledDate && props.disabledDate(currDate))
    )
      res.push(`${state.dayPrefix}--disabled`)
    else if (
      (type === 'range' || type === 'week')
      && Array.isArray(state.currDate)
      && Object.values(state.currDate).length === 2
      && compareDate(state.currDate[0], currDate)
      && compareDate(currDate, state.currDate[1])
    )
      res.push(`${state.dayPrefix}--choose`)
  }
  else {
    res.push(`${state.dayPrefix}--disabled`)
  }
  return res
}
// 确认选择时触发
function confirm() {
  const { type } = props
  if ((type === 'range' && state.chooseData.length === 2) || type !== 'range') {
    let selectData: any = state.chooseData.slice(0)
    if (type === 'week') {
      selectData = {
        weekDate: [handleWeekDate(state.chooseData[0] as string[]), handleWeekDate(state.chooseData[1] as string[])],
      }
    }
    emit(CHOOSE_EVENT, selectData)
    if (props.poppable)
      emit('update')
  }
}

// 选中数据
function chooseDay(day: Day, month: MonthInfo, isFirst = false) {
  if (!getClass(day, month).includes(`${state.dayPrefix}--disabled`)) {
    const { type } = props
    const [y, m] = month.curData
    const days = [...month.curData]
    days[2] = getNumTwoBit(Number(day.day))
    days[3] = `${days[0]}-${days[1]}-${days[2]}`
    days[4] = getWhatDay(+days[0], +days[1], +days[2])
    if (type === 'multiple') {
      if (state.currDate?.length > 0) {
        let hasIndex: number | undefined;
        (state.currDate as StringArr)?.forEach((item: string, index: number) => {
          if (item === days[3])
            hasIndex = index
        })
        if (isFirst) {
          state.chooseData.push([...days])
        }
        else {
          if (hasIndex !== undefined) {
            (state.currDate as StringArr).splice(hasIndex, 1)
            state.chooseData.splice(hasIndex, 1)
          }
          else {
            (state.currDate as StringArr).push(days[3])
            state.chooseData.push([...days])
          }
        }
      }
      else {
        state.currDate = [days[3]]
        state.chooseData = [[...days]]
      }
    }
    else if (type === 'range') {
      const curDataLength = Object.values(state.currDate).length
      if (curDataLength === 2 || curDataLength === 0) {
        state.currDate = [days[3]]
      }
      else {
        if (compareDate(state.currDate[0], days[3]))
          Array.isArray(state.currDate) && state.currDate.push(days[3])
        else
          Array.isArray(state.currDate) && state.currDate.unshift(days[3])
      }

      if (state.chooseData.length === 2 || !state.chooseData.length) {
        state.chooseData = [[...days]]
      }
      else {
        if (compareDate(state.chooseData[0][3], days[3]))
          state.chooseData = [...state.chooseData, [...days]]
        else
          state.chooseData = [[...days], ...state.chooseData]
      }
    }
    else if (type === 'week') {
      const weekArr = getWeekDate(y, m, day.day, props.firstDayOfWeek)
      if (state.propStartDate && compareDate(weekArr[0], state.propStartDate))
        weekArr.splice(0, 1, state.propStartDate)

      if (state.propEndDate && compareDate(state.propEndDate, weekArr[1]))
        weekArr.splice(1, 1, state.propEndDate)

      state.currDate = weekArr
      state.chooseData = [formatResultDate(weekArr[0]), formatResultDate(weekArr[1])]
    }
    else {
      state.currDate = days[3]
      state.chooseData = [...days]
    }

    if (!isFirst) {
      let selectData: any = state.chooseData
      if (type === 'week') {
        selectData = {
          weekDate: [
            handleWeekDate(state.chooseData[0] as string[]),
            handleWeekDate(state.chooseData[1] as string[]),
          ],
        }
      }
      // 点击日期 触发
      emit(SELECT_EVENT, selectData)
      if (props.isAutoBackFill || !props.poppable)
        confirm()
    }
  }
}
function handleWeekDate(weekDate: string[]) {
  const [y, m, d] = weekDate
  const obj = {
    date: weekDate,
    monthWeekNum: getMonthWeek(y, m, d, props.firstDayOfWeek),
    yearWeekNum: getYearWeek(y, m, d),
  }
  return obj
}
// 获取当前月数据
function getCurrData(type: string) {
  const monthData = type === 'prev' ? state.monthsData[0] : state.monthsData[state.monthsData.length - 1]
  let year = Number.parseInt(monthData.curData[0])
  let month = Number.parseInt(monthData.curData[1].toString().replace(/^0/, ''))
  switch (type) {
    case 'prev':
      month === 1 && (year -= 1)
      month = month === 1 ? 12 : --month
      break
    case 'next':
      month === 12 && (year += 1)
      month = month === 12 ? 1 : ++month
      break
  }
  return [`${year}`, getNumTwoBit(month), `${getMonthDays(String(year), String(month))}`]
}

// 获取日期状态
function getDaysStatus(days: number, type: string, dateInfo: CalendarDateProp) {
  // 修复：当某个月的1号是周日时，月份下方会空出来一行
  const { year, month } = dateInfo
  if (type === 'prev' && days >= 7)
    days -= 7

  return Array.from(Array(days), (v, k) => {
    return {
      day: String(k + 1),
      type,
      year,
      month,
    }
  })
}
// 获取上一个月的最后一周天数，填充当月空白
function getPreDaysStatus(days: number, type: string, dateInfo: CalendarDateProp, preCurrMonthDays: number) {
  // 新增：自定义周起始日
  days = days - props.firstDayOfWeek
  // 修复：当某个月的1号是周日时，月份下方会空出来一行
  const { year, month } = dateInfo
  if (type === 'prev' && days >= 7)
    days -= 7

  const months = Array.from(Array(preCurrMonthDays), (v, k) => {
    return {
      day: String(k + 1),
      type,
      year,
      month,
    }
  })
  return months.slice(preCurrMonthDays - days)
}
// 获取月数据
function getMonth(curData: string[], type: string) {
  // 一号为周几
  const preMonthDays = getMonthPreDay(+curData[0], +curData[1])

  let preMonth = Number(curData[1]) - 1
  let preYear = Number(curData[0])
  if (preMonth <= 0) {
    preMonth = 12
    preYear += 1
  }
  // 当月天数与上个月天数
  const currMonthDays = getMonthDays(String(curData[0]), String(curData[1]))
  const preCurrMonthDays = getMonthDays(`${preYear}`, `${preMonth}`)

  const title = {
    year: curData[0],
    month: curData[1],
  }
  const monthInfo: MonthInfo = {
    curData,
    title: translate('monthTitle', title.year, title.month),
    monthData: [
      ...(getPreDaysStatus(
        preMonthDays,
        'prev',
        { month: String(preMonth), year: String(preYear) },
        preCurrMonthDays,
      ) as Day[]),
      ...(getDaysStatus(currMonthDays, 'curr', title) as Day[]),
    ],
    cssHeight: 0,
    cssScrollHeight: 0,
  }
  let titleHeight, itemHeight
  if (isH5) {
    titleHeight = 46 * scalePx.value + 16 * scalePx.value * 2
    itemHeight = 128 * scalePx.value
  }
  else {
    titleHeight = Math.floor(46 * scalePx.value) + Math.floor(16 * scalePx.value) * 2
    itemHeight = Math.floor(128 * scalePx.value)
  }
  monthInfo.cssHeight = titleHeight + (monthInfo.monthData.length > 35 ? itemHeight * 6 : itemHeight * 5)

  let cssScrollHeight = 0

  if (state.monthsData.length > 0) {
    cssScrollHeight
      = (state.monthsData[state.monthsData.length - 1] as MonthInfo).cssScrollHeight
      + (state.monthsData[state.monthsData.length - 1] as MonthInfo).cssHeight
  }
  monthInfo.cssScrollHeight = cssScrollHeight
  if (type === 'next') {
    // 判断当前日期 是否大于 最后一天
    if (
      !state.endData
      || !compareDate(
        `${state.endData[0]}-${state.endData[1]}-${getMonthDays(state.endData[0], state.endData[1])}`,
        `${curData[0]}-${curData[1]}-${curData[2]}`,
      )
    )
      state.monthsData.push(monthInfo)
  }
  else {
    // 判断当前日期 是否小于 第一天
    if (
      !state.startData
      || !compareDate(
        `${curData[0]}-${curData[1]}-${curData[2]}`,
        `${state.startData[0]}-${state.startData[1]}-01`,
      )
    )
      state.monthsData.unshift(monthInfo)
    else
      state.unLoadPrev = true
  }
}

// 初始化数据
function initData() {
  // 初始化开始结束数据
  const propStartDate = props.startDate ? props.startDate : getDay(0)
  const propEndDate = props.endDate ? props.endDate : getDay(365)
  state.propStartDate = propStartDate
  state.propEndDate = propEndDate
  state.startData = splitDate(propStartDate)
  state.endData = splitDate(propEndDate)

  // 根据是否存在默认时间，初始化当前日期,
  if (props.defaultValue || (Array.isArray(props.defaultValue) && (props.defaultValue as any[]).length > 0)) {
    state.currDate
      = props.type !== 'one' ? ([...props.defaultValue] as StringArr) : (props.defaultValue as string | StringArr)
  }

  // 判断时间范围内存在多少个月
  const startDate = {
    year: Number(state.startData[0]),
    month: Number(state.startData[1]),
  }
  const endDate = {
    year: Number(state.endData[0]),
    month: Number(state.endData[1]),
  }
  let monthsNum = endDate.month - startDate.month
  if (endDate.year - startDate.year > 0)
    monthsNum = monthsNum + 12 * (endDate.year - startDate.year)

  if (monthsNum <= 0)
    monthsNum = 1

  // 设置月份数据
  getMonth(state.startData, 'next')

  let i = 1
  do
    getMonth(getCurrData('next'), 'next')
  while (i++ < monthsNum)
  state.monthsNum = monthsNum

  // 日期转化为数组，限制初始日期。判断时间范围
  if (props.type === 'range' && Array.isArray(state.currDate)) {
    if (state.currDate.length > 0) {
      if (propStartDate && compareDate(state.currDate[0], propStartDate))
        state.currDate.splice(0, 1, propStartDate)

      if (propEndDate && compareDate(propEndDate, state.currDate[1]))
        state.currDate.splice(1, 1, propEndDate)

      state.defaultData = [...splitDate(state.currDate[0]), ...splitDate(state.currDate[1])]
    }
  }
  else if (props.type === 'multiple' && Array.isArray(state.currDate)) {
    if (state.currDate.length > 0) {
      const defaultArr: string[] = []
      const obj: any = {}
      state.currDate.forEach((item: string) => {
        if (
          propStartDate
          && !compareDate(item, propStartDate)
          && propEndDate
          && !compareDate(propEndDate, item)
        ) {
          if (!Object.hasOwnProperty.call(obj, item)) {
            defaultArr.push(item)
            obj[item] = item
          }
        }
      })
      state.currDate = [...defaultArr]
      state.defaultData = [...splitDate(defaultArr[0])]
    }
  }
  else if (props.type === 'week' && Array.isArray(state.currDate)) {
    if (state.currDate.length > 0) {
      const [y, m, d] = splitDate(state.currDate[0])
      const weekArr = getWeekDate(y, m, d, props.firstDayOfWeek)
      state.currDate = weekArr
      if (propStartDate && compareDate(state.currDate[0], propStartDate))
        state.currDate.splice(0, 1, propStartDate)

      if (propEndDate && compareDate(propEndDate, state.currDate[1]))
        state.currDate.splice(1, 1, propEndDate)

      state.defaultData = [...splitDate(state.currDate[0]), ...splitDate(state.currDate[1])]
    }
  }
  else {
    if (state.currDate) {
      if (propStartDate && compareDate(state.currDate as string, propStartDate))
        state.currDate = propStartDate
      else if (propEndDate && !compareDate(state.currDate as string, propEndDate))
        state.currDate = propEndDate

      state.defaultData = [...splitDate(state.currDate as string)]
    }
  }
  // 设置默认可见区域
  let current = 0
  let lastCurrent = 0
  if (state.defaultData.length > 0) {
    state.monthsData.forEach((item, index) => {
      if (item.title === translate('monthTitle', state.defaultData[0], state.defaultData[1]))
        current = index

      if (props.type === 'range' || props.type === 'week') {
        if (item.title === translate('monthTitle', state.defaultData[3], state.defaultData[4]))
          lastCurrent = index
      }
    })
  }
  setDefaultRange(monthsNum, current)
  state.currentIndex = current
  state.yearMonthTitle = state.monthsData[state.currentIndex].title
  if (state.defaultData.length > 0) {
    // 设置当前选中日期
    if (state.isRange) {
      chooseDay({ day: state.defaultData[2], type: 'curr' }, state.monthsData[state.currentIndex], true)
      chooseDay({ day: state.defaultData[5], type: 'curr' }, state.monthsData[lastCurrent], true)
    }
    else if (props.type === 'week') {
      chooseDay({ day: state.defaultData[2], type: 'curr' }, state.monthsData[state.currentIndex], true)
    }
    else if (props.type === 'multiple') {
      [...state.currDate].forEach((item: string) => {
        const dateArr = splitDate(item)
        let current = state.currentIndex
        state.monthsData.forEach((item, index) => {
          if (item.title === translate('monthTitle', dateArr[0], dateArr[1]))
            current = index
        })
        chooseDay({ day: dateArr[2], type: 'curr' }, state.monthsData[current], true)
      })
    }
    else {
      chooseDay({ day: state.defaultData[2], type: 'curr' }, state.monthsData[state.currentIndex], true)
    }
  }

  const lastItem = state.monthsData[state.monthsData.length - 1]
  const containerHeight = lastItem.cssHeight + lastItem.cssScrollHeight

  state.containerHeight = `${containerHeight}px`
  state.scrollTop = Math.ceil(state.monthsData[state.currentIndex].cssScrollHeight)
  state.avgHeight = Math.floor(containerHeight / (monthsNum + 1))

  if (months?.value)
    viewHeight.value = months.value.clientHeight
}
function scrollToDate(date: string) {
  if (compareDate(date, state.propStartDate))
    date = state.propStartDate
  else if (!compareDate(date, state.propEndDate))
    date = state.propEndDate

  const dateArr = splitDate(date)
  state.monthsData.forEach((item, index) => {
    if (item.title === translate('monthTitle', dateArr[0], dateArr[1])) {
      // scrollTop 不会实时变更。当再次赋值时，scrollTop无变化时，不会触发滚动
      state.scrollTop += 1
      scrollWithAnimation.value = props.toDateAnimation
      requestAniFrame(() => {
        setTimeout(() => {
          state.scrollTop = state.monthsData[index].cssScrollHeight
          setTimeout(() => {
            scrollWithAnimation.value = false
          }, 200)
        }, 10)
      })
    }
  })
}
function initPosition() {
  state.scrollTop = Math.ceil(state.monthsData[state.currentIndex].cssScrollHeight)
}
// 设置当前可见月份
function setDefaultRange(monthsNum: number, current: number) {
  if (monthsNum >= 3) {
    if (current > 0 && current < monthsNum)
      state.defaultRange = [current - 1, current + 3]

    else if (current === 0)
      state.defaultRange = [current, current + 4]

    else if (current === monthsNum)
      state.defaultRange = [current - 2, current + 2]
  }
  else {
    state.defaultRange = [0, monthsNum + 2]
  }
  const defaultScrollTop = state.monthsData[state.defaultRange[0]].cssScrollHeight
  state.translateY = defaultScrollTop
}
// 区间选择&&当前月&&选中态
function isActive(day: Day, month: MonthInfo) {
  return (
    (props.type === 'range' || props.type === 'week')
    && day.type === 'curr'
    && getClass(day, month).includes('nut-calendar__day--active')
  )
}

// 是否有开始提示
function isStartTip(day: Day, month: MonthInfo) {
  return isActive(day, month) && isStart(getCurrDate(day, month))
}

// 是否有结束提示
function isEndTip(day: Day, month: MonthInfo) {
  if (state.currDate.length >= 2 && isEnd(getCurrDate(day, month)))
    return isActive(day, month)

  return false
}
// 开始结束时间是否相等
function rangeTip() {
  if (state.currDate.length >= 2)
    return isEqual(state.currDate[0], state.currDate[1])
}
// 是否有 当前日期
function isCurrDay(dateInfo: Day) {
  const date = `${dateInfo.year}-${dateInfo.month}-${Number(dateInfo.day) < 10 ? `0${dateInfo.day}` : dateInfo.day
    }`
  return isEqual(date, date2Str(new Date()))
}
// 滚动处理事件
function mothsViewScroll(e: ScrollViewOnScrollEvent) {
  if (state.monthsData.length <= 1)
    return

  const currentScrollTop = e.detail.scrollTop
  let current = Math.floor(currentScrollTop / state.avgHeight)
  if (current === 0) {
    if (currentScrollTop >= state.monthsData[current + 1].cssScrollHeight)
      current += 1
  }
  else if (current > 0 && current < state.monthsNum - 1) {
    if (currentScrollTop >= state.monthsData[current + 1].cssScrollHeight)
      current += 1

    if (currentScrollTop < state.monthsData[current].cssScrollHeight)
      current -= 1
  }
  if (state.currentIndex !== current) {
    state.currentIndex = current
    setDefaultRange(state.monthsNum, current)
  }
  state.yearMonthTitle = state.monthsData[current].title
}

// 重新渲染
function resetRender() {
  state.chooseData.splice(0)
  state.monthsData.splice(0)
  initData()
}
onMounted(() => {
  // 初始化数据
  uni.getSystemInfo({
    success(res) {
      let scale = 2
      let toFixed = 3
      if (isH5) {
        toFixed = 5
        const fontSize = document.documentElement.style.fontSize
        scale = Number((Number.parseInt(fontSize) / 40).toFixed(toFixed))
      }
      else {
        const screenWidth = res.screenWidth
        scale = Number((screenWidth / 750).toFixed(toFixed))
      }
      scalePx.value = scale
      initData()
    },
  })
})

// 监听 默认值更改
watch(
  () => props.defaultValue,
  (val) => {
    if (val) {
      if (props.poppable)
        resetRender()
    }
  },
)
</script>

<script lang="ts">
export default defineComponent({
  name: `${PREFIX}-calendar-item`,
  options: {
    virtualHost: true,
    addGlobalClass: true,
    styleIsolation: 'shared',
  },
})
</script>

<template>
  <view
    class="nut-calendar"
    :class="classes"
    :style="customStyle"
  >
    <!-- header -->
    <view class="nut-calendar__header">
      <view v-if="showTitle" class="nut-calendar__header-title">
        {{ title || translate('title') }}
      </view>
      <view v-if="showTopBtn" class="nut-calendar__header-slot">
        <slot name="btn" />
      </view>
      <view v-if="showSubTitle" class="nut-calendar__header-subtitle">
        {{ state.yearMonthTitle }}
      </view>
      <view class="nut-calendar__weekdays">
        <view
          v-for="(item, index) of weeks"
          :key="index"
          class="nut-calendar__weekday"
          :class="{ weekend: item.weekend }"
        >
          {{ item.day }}
        </view>
      </view>
    </view>
    <!-- content -->
    <scroll-view
      ref="months"
      :scroll-top="state.scrollTop"
      :scroll-y="true"
      class="nut-calendar__content"
      :scroll-with-animation="scrollWithAnimation"
      @scroll="mothsViewScroll"
    >
      <view class="nut-calendar__panel" :style="{ height: state.containerHeight }">
        <view class="nut-calendar__body" :style="{ transform: `translateY(${state.translateY}px)` }">
          <view v-for="(month, index) of compConthsData" :key="index" class="nut-calendar__month">
            <view class="nut-calendar__month-title">
              {{ month.title }}
            </view>
            <view class="nut-calendar__days">
              <view class="nut-calendar__days-item" :class="type === 'range' ? 'nut-calendar__days-item--range' : ''">
                <template v-for="(day, i) of month.monthData" :key="i">
                  <view class="nut-calendar__day" :class="getClass(day, month, i)" @click="chooseDay(day, month)">
                    <!-- 日期显示slot -->
                    <view class="nut-calendar__day-value">
                      <!-- #ifdef MP -->
                      {{ day.type === 'curr' ? day.day : '' }}
                      <!-- #endif -->
                      <!-- #ifndef MP -->
                      <slot name="day" :date="day.type === 'curr' ? day : ''">
                        {{ day.type === 'curr' ? day.day : '' }}
                      </slot>
                      <!-- #endif -->
                    </view>
                    <!-- #ifdef H5 -->
                    <view v-if="topInfo" class="nut-calendar__day-tips nut-calendar__day-tips--top">
                      <slot name="topInfo" :date="day.type === 'curr' ? day : ''" />
                    </view>
                    <view v-if="bottomInfo" class="nut-calendar__day-tips nut-calendar__day-tips--bottom">
                      <slot name="bottomInfo" :date="day.type === 'curr' ? day : ''" />
                    </view>
                    <!-- #endif -->
                    <view v-if="!bottomInfo && showToday && isCurrDay(day)" class="nut-calendar__day-tips--curr">
                      {{ translate('today') }}
                    </view>
                    <view
                      v-if="isStartTip(day, month)"
                      class="nut-calendar__day-tip" :class="{ 'nut-calendar__day-tips--top': rangeTip() }"
                    >
                      {{ startText || translate('start') }}
                    </view>
                    <view v-if="isEndTip(day, month)" class="nut-calendar__day-tip">
                      {{
                        endText || translate('end')
                      }}
                    </view>
                  </view>
                </template>
              </view>
            </view>
          </view>
        </view>
      </view>
    </scroll-view>
    <!-- footer -->
    <view v-if="poppable && !isAutoBackFill" class="nut-calendar__footer">
      <slot v-if="footerSlot" name="footer" :date="state.chooseData" />

      <view v-else class="nut-calendar__confirm" @click="confirm">
        {{ confirmText || translate('confirm') }}
      </view>
    </view>
  </view>
</template>

<style lang="scss">
@import './index';
</style>
