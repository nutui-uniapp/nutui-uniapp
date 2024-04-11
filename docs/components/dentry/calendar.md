# Calendar 日历

### 介绍

日历，可平铺/弹窗展示

### 基础用法

```html
<template>
  <nut-cell
    :showIcon="true"
    title="选择单个日期"
    :desc="date ? `${date} ${dateWeek}` : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible"
    :default-value="date"
    @close="closeSwitch('isVisible')"
    @choose="setChooseValue"
    :start-date="`2022-01-11`"
    :end-date="`2022-11-30`"
  >
  </nut-calendar>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      isVisible: false,
      date: '',
      dateWeek: ''
    });
    const openSwitch = param => {
      state[`${param}`] = true;
    };
    const closeSwitch = param => {
      state[`${param}`] = false;
    };
    const setChooseValue = param => {
      state.date = param[3];
      state.dateWeek = param[4];
    };
    return {
      ...toRefs(state),
      openSwitch,
      closeSwitch,
      setChooseValue
    };
  }
};
</script>
```

### 选择日期区间

```html
<template>
  <nut-cell
    :showIcon="true"
    title="选择日期区间"
    :desc="date && date[0] ? `${date[0]}至${date[1]}` : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible"
    :default-value="date"
    type="range"
    :start-date="`2019-12-22`"
    :end-date="`2021-01-08`"
    @close="closeSwitch('isVisible')"
    @choose="setChooseValue"
    @select="select"
  >
  </nut-calendar>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      date: ['2019-12-23', '2019-12-26'],
      isVisible: false
    });
    const openSwitch = param => {
      state[`${param}`] = true;
    };
    const closeSwitch = param => {
      state[`${param}`] = false;
    };
    const setChooseValue= param => {
      state.date = [...[param[0][3], param[1][3]]];
    };
    const select = (param: string) => {
      console.log(param);
    };
    return {
      ...toRefs(state),
      openSwitch,
      closeSwitch,
      setChooseValue,
      select,
    };
  }  
};
</script>
<style lang="scss">
.nut-cell__value {
  flex: initial;
}
</style>
```

### 选择多个日期

```html
<template>
 <nut-cell
    :show-icon="true"
    title="选择多个日期"
    :desc="date7 && date7.length ? `已选择${date7.length}个日期` : '请选择'"
    @click="openSwitch('isVisible7')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible7"
    :default-value="date7"
    type="multiple"
    :start-date="`2022-01-01`"
    :end-date="`2022-09-10`"
    @close="closeSwitch('isVisible7')"
    @choose="setChooseValue7"
  >
  </nut-calendar>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      date7: [],
      isVisible7: false
    });
    const openSwitch = param => {
      state[`${param}`] = true;
    };
    const closeSwitch = param => {
      state[`${param}`] = false;
    };
     const setChooseValue7 = (chooseData: any) => {
      let dateArr = chooseData.map((item: any) => {
        return item[3];
      });
      state.date7 = [...dateArr];
    };
    const select = (param: string) => {
      console.log(param);
    };
    return {
      ...toRefs(state),
      openSwitch,
      closeSwitch,
      setChooseValue7,
      select,
    };
  }  
};
</script>
```

### 选择周

当设置为周选择时，会根据`first-day-of-week` 判断周的起始与结束日期。如`first-day-of-week`为0时，一周的起始日期为星期日。其他情况时，一周的起始日期为星期一。

```html
<template>
  <nut-cell
    :showIcon="true"
    title="选择周"
    :desc="date && date[0] ? `${date[0]}至${date[1]}` : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible"
    :default-value="date"
    type="week"
    :start-date="`2019-12-22`"
    :end-date="`2021-01-08`"
    @close="closeSwitch('isVisible')"
    @choose="setChooseValue"
    @select="select"
  >
  </nut-calendar>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      date: ['2019-12-23', '2019-12-26'],
      isVisible: false
    });
    const openSwitch = param => {
      state[`${param}`] = true;
    };
    const closeSwitch = param => {
      state[`${param}`] = false;
    };
    const setChooseValue= param => {
      let { weekDate } = param;
      state.date = [weekDate[0].date[3], weekDate[1].date[3]];

    };
    const select = (param: string) => {
      console.log(param);
    };
    return {
      ...toRefs(state),
      openSwitch,
      closeSwitch,
      setChooseValue,
      select,
    };
  }  
};
</script>
<style lang="scss">
.nut-cell__value {
  flex: initial;
}
</style>
```

### 快捷选择-单选

```html
<template>
  <nut-cell
    :showIcon="true"
    title="选择单个日期"
    :desc="date ? date : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible"
    @close="closeSwitch('isVisible')"
    @choose="setChooseValue"
    :default-value="date"
    :start-date="null"
    :end-date="null"
    :is-auto-back-fill="true"
  >
  </nut-calendar>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      date: '',
      isVisible: false
    });
    const openSwitch = param => {
      state[`${param}`] = true;
    };
    const closeSwitch = param => {
      state[`${param}`] = false;
    };
     const setChooseValue = param => {
      state.date= param[3];
    };
    return {
      ...toRefs(state),
      setChooseValue,
      openSwitch,
      closeSwitch
    };
  }
}
</script>
```

### 快捷选择-范围选择

```html
<template>
  <nut-cell
    :showIcon="true"
    title="选择日期范围"
    :desc="date && date[0] ? `${date[0]}至${date[1]}` : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible"
    :default-value="date"
    type="range"
    :start-date="`2022-01-01`"
    :end-date="`2022-12-31`"
    @close="closeSwitch('isVisible')"
    @choose="setChooseValue"
    :is-auto-back-fill="true"
  >
  </nut-calendar>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      date: ['2021-12-23', '2021-12-26'],
      isVisible: false
    });
    const openSwitch = param => {
      state[`${param}`] = true;
    };
    const closeSwitch = param => {
      state[`${param}`] = false;
    };
    const setChooseValue = param => {
      state.date = [...[param[0][3], param[1][3]]];
    };
    return {
      ...toRefs(state),
      setChooseValue,
      openSwitch,
      closeSwitch
    };
  }
}
</script>
<style lang="scss">
.nut-cell__value {
  flex: initial;
}
</style>
```

### 自定义日历按钮

```html
<template>
  <nut-cell
    :showIcon="true"
    title="自定义按钮"
    :desc="date && date[0] ? `${date[0]}至${date[1]}` : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    ref="calendarRef"
    v-model:visible="isVisible"
    :default-value="date"
    type="range"
    :start-date="null"
    :end-date="null"
    :btn-slot="true"
    @close="closeSwitch('isVisible')"
    @choose="setChooseValue"
  >
    <template #btn>
      <div class="wrapper">
        <div class="d_div"> <span class="d_btn" @click="goDate">去某个时间</span></div>
        <div class="d_div"> <span class="d_btn" @click="clickBtn">最近七天</span></div>
        <div class="d_div"> <span class="d_btn" @click="clickBtn1">当月</span></div>
      </div>
    </template>
    <template #day="date">
      <span>{{ date.date.day }}</span>
    </template>
  </nut-calendar>
</template>

<script lang="ts">
import { reactive, toRefs, ref } from 'vue';
export default {
  setup() {
    const state = reactive({
      date: [],
      isVisible: false
    });
    const calendarRef = ref(null);
    const getNumTwoBit = function(n: number): string {
      n = Number(n);
      return (n > 9 ? '' : '0') + n;
    };
    const date2Str =  function(date: Date, split?: string): string {
      split = split || '-';
      const y = date.getFullYear();
      const m = getNumTwoBit(date.getMonth() + 1);
      const d = getNumTwoBit(date.getDate());
      return [y, m, d].join(split);
    };
    const getDay = function(i: number): string {
      i = i || 0;
      let date = new Date();
      const diff = i * (1000 * 60 * 60 * 24);
      date = new Date(date.getTime() + diff);
      return date2Str(date);
    };
    const isLeapYear= function(y: number): boolean {
      return (y % 4 == 0 && y % 100 != 0) || y % 400 == 0;
    };
    const getMonthDays= function(year: string, month: string): number {
      if (/^0/.test(month)) {
        month = month.split('')[1];
      }
      return ([
        0,
        31,
        isLeapYear(Number(year)) ? 29 : 28,
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31
      ] as number[])[month as any];
    };
    const openSwitch = param => {
      state[`${param}`] = true;
    };
    const closeSwitch = param => {
      state[`${param}`] = false;
    };
     const setChooseValue = param => {
      state.date= param[3];
    };
    const clickBtn = (param: string) => {
      let date = [date2Str(new Date()), getDay(6)];
      state.date = date;
    };
    const clickBtn1 = (param: string) => {
      let date = new Date();
      let year = date.getFullYear();
      let month: any = date.getMonth() + 1;
      month = month < 10 ? '0' + month : month + '';
      let yearMonth = `${year}-${month}`;
      let currMonthDays = getMonthDays(year + '', month + '');
      state.date = [`${yearMonth}-01`, `${yearMonth}-${currMonthDays}`];
    };
    const goDate = () => {
      if (calendarRef.value) {
        var date1 = new Date();
        date1.setDate(date1.getDate() + 30);
        calendarRef.value.scrollToDate(date2Str(date1));
      }
    };
    return {
      ...toRefs(state),
      setChooseValue,
      openSwitch,
      closeSwitch,
      clickBtn,
      clickBtn1,
      calendarRef,
      goDate
    };
  }
}
</script>
<style lang="scss" >
.nut-cell__value {
  flex: initial;
}
.wrapper {
  display: flex;
  padding: 0 40px;
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
  }
}

</style>
```

### 自定义时间文案

```html
<template>
  <nut-cell
    :showIcon="true"
    title="自定义时间文案"
    :desc="date && date[0] ? `${date[0]}至${date[1]}` : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible"
    :default-value="date"
    type="range"
    @close="closeSwitch('isVisible')"
    @choose="setChooseValue"
    :start-date="`2022-01-01`"
    :end-date="`2022-12-31`"
    confirm-text="提交"
    start-text="入店"
    end-text="离店"
    title="日期选择"
  >
    <template #day="date">
      <span>{{ date.date.day <= 9 ? '0' + date.date.day : date.date.day }}</span>
    </template>
    <template #bottom-info="date">
      <span class="info">{{
        date.date ? (date.date.day == 10 ? '十' :  '') : ''
      }}</span>
    </template>
  </nut-calendar>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      date: [],
      isVisible: false
    });
    const openSwitch = param => {
      state[`${param}`] = true;
    };
    const closeSwitch = param => {
      state[`${param}`] = false;
    };
     const setChooseValue = param => {
      state.date = param[3];
    };
    return {
      ...toRefs(state),
      setChooseValue,
      openSwitch,
      closeSwitch
    };
  }
}
</script>
<style lang="scss">
.nut-cell__value {
  flex: initial;
}
</style>
```

### 自定义底部区域

```html
<template>
  <nut-cell
    :show-icon="true"
    title="自定义底部区域"
    :desc="date ? `${date}` : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible"
    :default-value="date"
    :poppable="true"
    footer-slot
    :is-auto-back-fill="false"
    @close="closeSwitch('isVisible')"
    @select="setSelectalue"
  >
    <template #footer-info="dateInfo">
      <nut-button size="large" block round type="primary" :disabled="disabled" @click="clickBtn(dateInfo)"
        >{{ disabled?'偶数的日期不能选择':'奇数的日期可以选择' }}</nut-button
      >
    </template>
  </nut-calendar>
</template>

<script lang="ts">
  import { reactive, toRefs, ref } from 'vue';
  export default {
    setup() {
      const state = reactive({
        date: '2023-09-03',
        isVisible: false,
        disabled: false
      });
      const openSwitch = (param) => {
        state[`${param}`] = true;
      };
      const closeSwitch = (param) => {
        state[`${param}`] = false;
      };
      const setSelectalue = (param: any) => {
        state.disabled = param[2] % 2 === 0;
      };
      const clickBtn = (dateInfo: any) => {
        state.date = dateInfo.date[3];
        state.isVisible = false;
      };
      return {
        ...toRefs(state),
        setSelectalue,
        openSwitch,
        closeSwitch,
        clickBtn
      };
    }
  };
</script>
```

### 自定义周起始日

```html
<template>
  <nut-cell
    :showIcon="true"
    title="自定义周起始日"
    :desc="date ? `${date}` : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible"
    :default-value="date"
    @close="closeSwitch('isVisible')"
    @choose="setChooseValue"
    :first-day-of-week="2"
  >
  </nut-calendar>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      isVisible: false,
      date: '',
    });
    const openSwitch = param => {
      state[`${param}`] = true;
    };
    const closeSwitch = param => {
      state[`${param}`] = false;
    };
    const setChooseValue = param => {
      state.date = param[3];
    };
    return {
      ...toRefs(state),
      openSwitch,
      closeSwitch,
      setChooseValue
    };
  }
};
</script>
```

### 平铺展示

```html
<template>
  <div class="test-calendar-wrapper" >
    <nut-calendar
        :poppable="false"
        :default-value="date"
        :is-auto-back-fill="true"
        @choose="setChooseValue"
        :start-date="`2020-02-01`"
        :end-date="`2020-12-30`"
    >
    </nut-calendar>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    const state = reactive({
      date: '2020-07-08'
    });
    const setChooseValue = param => {
      state.date = param[3];
    };
    return {
      ...toRefs(state),
      setChooseValue
    };
  }
}
</script>
<style lang="scss" >
.test-calendar-wrapper {
  display: flex;
  width: 100%;
  height: 560px;
  overflow: hidden;
}
</style>

```

### 自定义禁用日期

通过配置`disabled-date`函数回调可实现自定义禁用某些日期为不可选中状态。
当type类型为`日期区间(range)`时，若是设置了该函数，则需要在选中结果后，自行过滤掉禁用的日期

```html
<template>
  <nut-cell
    :showIcon="true"
    title="自定义禁用日期"
    :desc="date ? `${date}` : '请选择'"
    @click="openSwitch('isVisible')"
  >
  </nut-cell>
  <nut-calendar
    v-model:visible="isVisible"
    :default-value="date"
    @close="closeSwitch('isVisible')"
    @choose="setChooseValue"
    :start-date="`2022-01-01`"
    :end-date="`2022-11-30`"
    :disabled-date="disabledDate"
  >
  </nut-calendar>
</template>
<script>
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        isVisible: false,
        date: ''
      });
      const openSwitch = (param) => {
        state[`${param}`] = true;
      };
      const closeSwitch = (param) => {
        state[`${param}`] = false;
      };
      const setChooseValue = (param) => {
        state.date = param[3];
      };
      const disabledDate = (date) => {
        const disabledDate = {
          '2022-01-05': true,
          '2022-01-06': true,
          '2022-01-10': true,
          '2022-01-11': true,
          '2022-01-12': true,
          '2022-01-13': true,
          '2022-01-14': true
        };
        return disabledDate[date];
      };
      return {
        ...toRefs(state),
        openSwitch,
        closeSwitch,
        setChooseValue,
        disabledDate
      };
    }
  };
</script>
```

## API

### Props

| 参数                   | 说明                                                                                       | 类型                | 默认值            |
| ---------------------- | ------------------------------------------------------------------------------------------ | ------------------- | ----------------- |
| v-model:visible        | 是否可见                                                                                   | boolean             | `false`           |
| type                   | 类型，日期单择`one`，区间选择`range`,日期多选`multiple`,周选择`week`                       | string              | '`one`'           |
| poppable               | 是否弹窗状态展示                                                                           | boolean             | `true`            |
| is-auto-back-fill      | 自动回填                                                                                   | boolean             | `false`           |
| title                  | 显示标题                                                                                   | string              | `日期选择`        |
| default-value          | 默认值，单个日期选择 `string`，其他为 `string[]`                                           | string  \| string[] | `null`            |
| start-date             | 开始日期                                                                                   | string              | `今天`            |
| end-date               | 结束日期                                                                                   | string              | `距离今天 365 天` |
| show-today             | 是否展示今天标记                                                                           | boolean             | `true`            |
| start-text             | 范围选择，开始信息文案                                                                     | string              | `开始`            |
| end-text               | 范围选择，结束信息文案                                                                     | string              | `结束`            |
| confirm-text           | 底部确认按钮文案                                                                           | string              | `确认`            |
| show-title             | 是否在展示日历标题                                                                         | boolean             | `true`            |
| show-sub-title         | 是否展示日期标题                                                                           | boolean             | `true`            |
| to-date-animation      | 是否启动滚动动画                                                                           | boolean             | `true`            |
| first-day-of-week      | 设置周起始日                                                                               | 0-6                 | `0`               |
| disabled-date `v1.4.0` | 一个用来判断该日期是否被禁用的函数，接受一个`年-月-日`作为参数。 应该返回一个 Boolean 值。 | function            | `-`               |
| footer-slot `v1.4.0`   | 是否使用footer插槽，如果使用，此值必须为 true                                              | Boolean             | `false`           |
| btn-slot `v1.5.7`      | 是否使用btn插槽，如果使用，此值必须为 true                                                 | Boolean             | `false`           |

### Events

| 事件名           | 说明                                                      | 回调参数                 |
| ---------------- | --------------------------------------------------------- | ------------------------ |
| choose           | 选择之后或是点击确认按钮触发,日期数组（包含年月日和星期） | `(string \| string[])[]` |
| close            | 关闭时触发                                                | -                        |
| select           | 点击/选择后触发                                           | `(string \| string[])[]` |
| click-close-icon | 点击关闭图标后触发                                        | -                        |
| click-overlay    | 点击遮罩关闭后触发                                        | -                        |

### Slots

| 名称                          | 说明                                     |
| ----------------------------- | ---------------------------------------- |
| btn                           | 自定义日历标题下部，可用以添加自定义操作 |
| day  `不支持微信小程序`       | 日期信息                                 |
| topInfo `不支持微信小程序`    | 日期顶部信息                             |
| bottomInfo `不支持微信小程序` | 日期底部信息                             |
| footer `v1.4.0`               | 日历自定义底部，替代confirm按钮          |
### Methods

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html) 可以获取到 `Calendar` 实例并调用实例方法。

| 方法名                | 说明                                  | 参数     |
| --------------------- | ------------------------------------- | -------- |
| scrollToDate          | 滚动到指定日期所在月,如：'2021-12-30' | `string` |
| initPosition `v4.0.1` | 初始化滚动位置                        | 无       |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                    | 默认值                    |
| --------------------------------------- | ------------------------- |
| --nut-calendar-primary-color            | var(--nut-primary-color)  |
| --nut-calendar-choose-color             | var(--nut-primary-color)  |
| --nut-calendar-choose-font-color        | var(--nut-primary-color)  |
| --nut-calendar-base-color               | #333333                   |
| --nut-calendar-disable-color            | #d1d0d0                   |
| --nut-calendar-base-font                | var(--nut-font-size-3)    |
| --nut-calendar-title-font               | var(--nut-font-size-4)    |
| --nut-calendar-title-font-weight        | 500                       |
| --nut-calendar-sub-title-font           | var(--nut-font-size-2)    |
| --nut-calendar-text-font                | var(--nut-font-size-1)    |
| --nut-calendar-day-font                 | 16px                      |
| --nut-calendar-day-active-border-radius | 0px                       |
| --nut-calendar-day-font-weight          | 500                       |
| --nut-calendar-day67-font-color         | var(--nut-primary-color)_ |
| --nut-calendar-month-title-font-size    | inherit                   |
