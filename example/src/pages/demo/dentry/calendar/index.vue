<script lang="ts">
import { reactive, ref, toRefs } from 'vue'
import { date2Str, getDay, getMonthDays } from '@/utils/date'

interface TestCalendarState {
  isVisible: boolean
  date: string
  dateWeek: string
  isVisible1: boolean
  isVisible2: boolean
  isVisible3: boolean
  isVisible4: boolean
  isVisible5: boolean
  isVisible6: boolean
  isVisible7: boolean
  isVisible8: boolean
  isVisible9: boolean
  isVisible10: boolean
  isVisible11: boolean
  date1: string[]
  date2: string
  date3: string
  date4: string[]
  date5: string[]
  date6: string[]
  date7: string[]
  date8: string
  date9: string[]
  date10: string
  disabled10: boolean
}
export default {
  props: {},
  setup() {
    const calendarRef = ref<any>(null)
    const state = reactive<TestCalendarState>({
      isVisible: false,
      date: '2022-02-01',
      dateWeek: '',
      date1: ['2020-01-23', '2020-01-26'],
      date2: '2020-07-08',
      date3: '',
      date4: ['2022-02-23', '2022-04-26'],
      date5: [],
      date6: [],
      date7: [],
      date8: '',
      date9: ['2020-01-23', '2020-01-26'],
      date10: '2023-09-03',
      isVisible1: false,
      isVisible2: false,
      isVisible3: false,
      isVisible4: false,
      isVisible5: false,
      isVisible6: false,
      isVisible7: false,
      isVisible8: false,
      isVisible9: false,
      isVisible10: false,
      isVisible11: false,
      disabled10: false,
    })
    const openSwitch = (param: string) => {
      state[`${param as 'isVisible1'}`] = true
    }

    const closeSwitch = (param: string) => {
      state[`${param as 'isVisible1'}`] = false
    }

    const setChooseValue = (param: string) => {
      state.date = param[3]
      state.dateWeek = param[4]
    }

    const setSelectalue10 = (param: any) => {
      state.disabled10 = param[2] % 2 === 0
    }

    const select = (param: string) => {
      uni.showToast({ title: JSON.stringify(param) })
    }
    const setChooseValue1 = (param: string) => {
      state.date1 = [...[param[0][3], param[1][3]]]
    }

    const setChooseValue2 = (param: string) => {
      state.date2 = param[3]
    }

    const setChooseValue3 = (param: string) => {
      state.date3 = param[3]
    }
    const setChooseValue4 = (param: string) => {
      state.date4 = [...[param[0][3], param[1][3]]]
    }

    const setChooseValue5 = (param: string) => {
      state.date5 = [...[param[0][3], param[1][3]]]
    }
    const setChooseValue6 = (param: string) => {
      state.date6 = [...[param[0][3], param[1][3]]]
    }
    const setChooseValue7 = (chooseData: any) => {
      const dateArr = chooseData.map((item: any) => {
        return item[3]
      })
      state.date7 = [...dateArr]
    }
    const setChooseValue8 = (param: string) => {
      state.date8 = param[3]
    }
    const setChooseValue9 = (param: any) => {
      const { weekDate } = param
      state.date9 = [weekDate[0].date[3], weekDate[1].date[3]]
    }
    const clickBtn = () => {
      const date = [date2Str(new Date()), getDay(6)]
      state.date5 = date
    }
    const clickBtn1 = () => {
      const date = new Date()
      const year = date.getFullYear()
      let month: any = date.getMonth() + 1
      month = month < 10 ? `0${month}` : `${month}`
      const yearMonth = `${year}-${month}`
      const currMonthDays = getMonthDays(`${year}`, `${month}`)
      state.date5 = [`${yearMonth}-01`, `${yearMonth}-${currMonthDays}`]
    }
    const goDate = () => {
      if (calendarRef.value) {
        const date1 = new Date()
        date1.setDate(date1.getDate() + 30)
        calendarRef.value.scrollToDate(date2Str(date1))
      }
    }

    const clickBtn10 = (dateInfo: any) => {
      state.date10 = dateInfo.date[3]
      state.isVisible10 = false
    }
    const disabledDate = (date: any) => {
      const disabledDate: any = {
        '2022-01-05': true,
        '2022-01-06': true,
        '2022-01-10': true,
        '2022-01-11': true,
        '2022-01-12': true,
        '2022-01-13': true,
        '2022-01-14': true,
      }
      return disabledDate[date]
    }

    return {
      ...toRefs(state),
      openSwitch,
      closeSwitch,
      setChooseValue,
      setChooseValue1,
      setChooseValue2,
      setChooseValue3,
      setChooseValue4,
      setChooseValue5,
      setChooseValue6,
      clickBtn,
      clickBtn1,
      setChooseValue7,
      setChooseValue8,
      setChooseValue9,
      setSelectalue10,
      goDate,
      calendarRef,
      select,
      clickBtn10,
      disabledDate,
    }
  },
}
</script>

<template>
  <div class="demo calendar_demo">
    <h2 class="title">
      基础用法
    </h2>
    <div>
      <nut-cell
        :show-icon="true"
        title="选择单个日期"
        :desc="date ? `${date} ${dateWeek}` : '请选择'"
        @click="openSwitch('isVisible')"
      />
      <nut-calendar
        v-model:visible="isVisible"
        :default-value="date"
        start-date="2022-01-11"
        end-date="2022-11-30"
        safe-area-inset-bottom
        @close="closeSwitch('isVisible')"
        @choose="setChooseValue"
      />
    </div>

    <div>
      <nut-cell
        :show-icon="true"
        title="选择日期区间"
        :desc="date1 ? `${date1[0]}至${date1[1]}` : '请选择'"
        @click="openSwitch('isVisible1')"
      />
      <nut-calendar
        v-model:visible="isVisible1"
        :default-value="date1"
        type="range"
        start-date="2019-12-22"
        end-date="2021-01-08"
        safe-area-inset-bottom
        @close="closeSwitch('isVisible1')"
        @choose="setChooseValue1"
        @select="select"
      />
    </div>

    <div>
      <nut-cell
        :show-icon="true"
        title="选择多个日期"
        :desc="date7 && date7.length ? `已选择${date7.length}个日期` : '请选择'"
        @click="openSwitch('isVisible7')"
      />
      <nut-calendar
        v-model:visible="isVisible7"
        :default-value="date7"
        type="multiple"
        start-date="2022-01-01"
        safe-area-inset-bottom
        end-date="2022-09-10"
        @close="closeSwitch('isVisible7')"
        @choose="setChooseValue7"
      />
    </div>
    <div>
      <nut-cell
        :show-icon="true"
        title="周选择"
        :desc="date9 ? `${date9[0]}${'至'}${date9[1]}` : '请选择'"
        @click="openSwitch('isVisible9')"
      />
      <nut-calendar
        v-model:visible="isVisible9"
        :default-value="date9"
        type="week"
        start-date="2019-12-22"
        end-date="2021-01-08"
        :first-day-of-week="1"
        @close="closeSwitch('isVisible9')"
        @choose="setChooseValue9"
        @select="select"
      />
    </div>
    <h2 class="title">
      快捷选择
    </h2>
    <div>
      <nut-cell
        :show-icon="true"
        title="选择单个日期"
        :desc="date3 ? date3 : '请选择'"
        @click="openSwitch('isVisible3')"
      />
      <nut-calendar
        v-model:visible="isVisible3"
        :default-value="date3"
        :is-auto-back-fill="true"
        @close="closeSwitch('isVisible3')"
        @choose="setChooseValue3"
      />
    </div>
    <div>
      <nut-cell
        :show-icon="true"
        title="选择日期范围"
        :desc="date4 ? `${date4[0]}至${date4[1]}` : '请选择'"
        @click="openSwitch('isVisible4')"
      />
      <nut-calendar
        v-model:visible="isVisible4"
        :default-value="date4"
        type="range"
        start-date="2022-01-01"
        end-date="2022-12-31"
        safe-area-inset-bottom
        :is-auto-back-fill="true"
        @close="closeSwitch('isVisible4')"
        @choose="setChooseValue4"
      />
    </div>
    <h2 class="title">
      自定义日历
    </h2>
    <div>
      <nut-cell
        :show-icon="true"
        title="自定义按钮"
        :desc="date5 && date5[0] ? `${date5[0]}至${date5[1]}` : '请选择'"
        @click="openSwitch('isVisible5')"
      />
      <nut-calendar
        ref="calendarRef"
        v-model:visible="isVisible5"
        :default-value="date5"
        safe-area-inset-bottom
        type="range"
        @close="closeSwitch('isVisible5')"
        @choose="setChooseValue5"
      >
        <template #btn>
          <view class="wrapper">
            <view class="d_div">
              <view class="d_btn" @click="goDate">
                去某个时间
              </view>
            </view>
            <view class="d_div">
              <view class="d_btn" @click="clickBtn">
                最近七天
              </view>
            </view>
            <view class="d_div">
              <view class="d_btn" @click="clickBtn1">
                当月
              </view>
            </view>
          </view>
        </template>
        <template #day="date">
          <view>{{ (date.date as any).day }}</view>
        </template>
      </nut-calendar>
    </div>
    <div>
      <nut-cell
        :show-icon="true"
        title="自定义底部"
        :desc="date10 ? `${date10}` : '请选择'"
        @click="openSwitch('isVisible10')"
      />
      <nut-calendar
        v-model:visible="isVisible10"
        :default-value="date10"
        :poppable="true"
        :is-auto-back-fill="false"
        @close="closeSwitch('isVisible10')"
        @select="setSelectalue10"
      >
        <template #footerInfo="dateInfo">
          <view class="flex justify-center w-full">
            <nut-button size="large" block round type="primary" :disabled="disabled10" @click="clickBtn10(dateInfo)">
              {{
                disabled10 ? '偶数的日期不能选择' : '奇数的日期可以选择'
              }}
            </nut-button>
          </view>
        </template>
      </nut-calendar>
    </div>
    <div>
      <nut-cell
        :show-icon="true"
        title="自定义时间文案"
        :desc="date6 && date6[0] ? `${date6[0]}至${date6[1]}` : '请选择'"
        @click="openSwitch('isVisible6')"
      />
      <nut-calendar
        v-model:visible="isVisible6"
        :default-value="date6"
        safe-area-inset-bottom
        type="range"
        start-date="2022-01-01"
        end-date="2022-12-31"
        confirm-text="submit"
        start-text="入店"
        end-text="离店"
        title="日期选择"
        @close="closeSwitch('isVisible6')"
        @choose="setChooseValue6"
      >
        <template #day="date">
          <view>{{ (date.date as any).day <= 9 ? `0${(date.date as any).day}` : (date.date as any).day }}</view>
        </template>
        <template #bottomInfo="date">
          <view class="info">
            {{ date.date ? ((date.date as any).day === 10 ? '十' : '') : '' }}
          </view>
        </template>
      </nut-calendar>
    </div>
    <h2 class="title">
      自定义周起始日
    </h2>
    <div>
      <nut-cell
        :show-icon="true"
        title="自定义周起始日"
        :desc="date8 ? `${date8}` : '请选择'"
        @click="openSwitch('isVisible')"
      />
      <nut-calendar
        v-model:visible="isVisible"
        safe-area-inset-bottom
        :default-value="date8"
        :first-day-of-week="2"
        @close="closeSwitch('isVisible8')"
        @choose="setChooseValue8"
      />
    </div>
    <h2 class="title">
      自定义禁用日期
    </h2>
    <div>
      <nut-cell
        :show-icon="true"
        title="自定义禁用日期"
        :desc="date ? `${date}` : '请选择'"
        @click="openSwitch('isVisible11')"
      />
      <nut-calendar
        v-model:visible="isVisible11"
        :default-value="date"
        start-date="2022-01-01"
        end-date="2022-11-30"
        :disabled-date="disabledDate"
        @close="closeSwitch('isVisible11')"
        @choose="setChooseValue"
      />
    </div>
    <h2 class="title">
      平铺展示
    </h2>
    <div class="test-calendar-wrapper">
      <nut-calendar
        :poppable="false"
        :default-value="date2"
        safe-area-inset-bottom
        :is-auto-back-fill="true"
        start-date="2020-02-01"
        end-date="2020-12-30"
        @choose="setChooseValue2"
      />
    </div>
  </div>
</template>

<style lang="scss">
.calendar_demo {
  .nut-cell__value {
    flex: initial;
  }
}
.test-calendar-wrapper {
  display: flex;
  width: 100%;
  height: 560px;
  overflow: hidden;
}
.wrapper {
  display: flex;
  padding: 10px 40px;
  margin-top: 30px;
  justify-content: center;
}
.d_div {
  margin: 0px 5px;
  .d_btn {
    background: #fa3f19;
    color: #fff;
    font-size: 12px;
    padding: 2px 8px;
    border-radius: 4px;
    display: inline-block;
    height: 16px;
  }
}
.info {
  font-size: 12px;
  line-height: 14px;
}
</style>

<route lang="json">
{
"style": {
    "navigationBarTitleText": "Calendar"
  }
}
</route>
