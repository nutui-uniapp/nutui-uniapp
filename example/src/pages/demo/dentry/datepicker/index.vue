<script lang="ts" setup>
import type { DatePickerBaseEvent, DatePickerColumnType, PickerOption } from 'nutui-uniapp'

const show = ref<boolean>(false)
const popupDesc = ref<string>('')

const showToast = ref(false)
const msg = ref<string>('')

const minDate = new Date(2020, 0, 1)
const maxDate = new Date(2025, 10, 1)

const currentDate = ref<Date>(new Date(2022, 4, 10, 10, 10))
const currentDate2 = ref<Date>(new Date(2022, 4, 10, 10, 10))
const currentDate3 = ref<Date>(new Date(2022, 4, 10, 10, 10))
const currentDate4 = ref<Date>(new Date(2022, 4, 10, 10, 10))
const currentDate5 = ref<Date>(new Date(2022, 4, 10, 10, 10))
const currentDate6 = ref<Date>(new Date(2022, 4, 10, 10, 10))
const currentDate7 = ref<Date>(new Date(2022, 4, 10, 10, 10))
const currentDate8 = ref<Date>(new Date(2022, 4, 10, 10, 10))
const currentDate9 = ref<Date>(new Date(2022, 4, 10, 0, 0))

function formatter(type: DatePickerColumnType, option: PickerOption) {
  switch (type) {
    case 'year':
      option.text += ''
      break
    case 'month':
      option.text += '月'
      break
    case 'day':
      option.text += '日'
      break
    case 'hour':
      option.text += '时'
      break
    case 'minute':
      option.text += '分'
      break
    default:
      option.text += ''
  }
  return option
}

function formatter1(type: DatePickerColumnType, option: PickerOption) {
  switch (type) {
    case 'year':
      option.text += '年'
      break
    case 'month':
      option.text += '月'
      break
    case 'day':
      option.text += '日'
      break
    case 'hour':
      option.text += '时'
      break
    default:
      option.text += ''
  }
  return option
}

function filter(type: DatePickerColumnType, options: PickerOption[]) {
  if (type === 'hour')
    return options.filter(item => Number(item.value) % 6 === 0)

  return options
}

function onConfirm({ date, selectedValue, selectedOptions }: DatePickerBaseEvent) {
  // eslint-disable-next-line no-console
  console.log(date, selectedValue, selectedOptions)

  msg.value = selectedOptions.map(item => item.text).join('-')
  showToast.value = true
}

function onConfirmPopup({ date, selectedValue, selectedOptions }: DatePickerBaseEvent) {
  // eslint-disable-next-line no-console
  console.log(date, selectedValue, selectedOptions)

  popupDesc.value = selectedOptions.map(item => item.text).join('-')
  show.value = false
}

function onButtonClick() {
  popupDesc.value = '永远有效'
  show.value = false
}
</script>

<template>
  <div class="demo">
    <h2 class="title">
      选择年月日
    </h2>
    <nut-date-picker
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
      three-dimensional
      is-show-chinese
      @confirm="onConfirm"
    />

    <h2 class="title">
      配合 Popup 使用
    </h2>
    <nut-cell title="选择日期" :desc="popupDesc" @click="show = true" />
    <nut-popup v-model:visible="show" position="bottom" safe-area-inset-bottom>
      <nut-date-picker
        v-model="currentDate"
        :min-date="minDate"
        :max-date="maxDate"
        is-show-chinese
        @confirm="onConfirmPopup"
        @cancel="show = false"
      >
        <nut-button block type="primary" @click="onButtonClick">
          永远有效
        </nut-button>
      </nut-date-picker>
    </nut-popup>

    <h2 class="title">
      选择年月
    </h2>
    <nut-date-picker
      v-model="currentDate2"
      type="year-month"
      title="日期选择"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
    />

    <h2 class="title">
      选择月日
    </h2>
    <nut-date-picker
      v-model="currentDate3"
      type="month-day"
      title="日期选择"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
    />

    <h2 class="title">
      选择年月日时分
    </h2>
    <nut-date-picker
      v-model="currentDate4"
      type="datetime"
      title="日期时间选择"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
    />

    <h2 class="title">
      选择时分秒
    </h2>
    <nut-date-picker
      v-model="currentDate5"
      type="time"
      title="时间选择"
      @confirm="onConfirm"
    />

    <h2 class="title">
      选择时分
    </h2>
    <nut-date-picker
      v-model="currentDate6"
      type="hour-minute"
      title="时间选择"
      @confirm="onConfirm"
    />

    <h2 class="title">
      格式化选项
    </h2>
    <nut-date-picker
      v-model="currentDate7"
      type="datetime"
      title="日期选择"
      :min-date="minDate"
      :max-date="maxDate"
      :formatter="formatter"
      @confirm="onConfirm"
    />

    <h2 class="title">
      分钟数递增步长设置
    </h2>
    <nut-date-picker
      v-model="currentDate8"
      type="time"
      title="时间选择"
      :min-date="minDate"
      :max-date="maxDate"
      :minute-step="5"
      @confirm="onConfirm"
    />

    <h2 class="title">
      过滤选项
    </h2>
    <nut-date-picker
      v-model="currentDate9"
      type="datehour"
      title="时间选择"
      :min-date="minDate"
      :max-date="maxDate"
      :filter="filter"
      :formatter="formatter1"
      @confirm="onConfirm"
    />

    <nut-toast v-model:visible="showToast" :msg="msg" type="text" />
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="json">
{
  "style": {
    "navigationBarTitleText": "DatePicker"
  }
}
</route>
