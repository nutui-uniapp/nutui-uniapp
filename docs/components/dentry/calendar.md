# Calendar 日历

### 介绍

日历，可平铺 / 弹窗展示。

### 基础用法

```html
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    start-date="2022-01-11"
    end-date="2022-11-30"
    @choose="onChoose"
  ></nut-calendar>
</template>
```

```ts
const visible = ref(false);

const date = ref("");

function onChoose(event: any) {
  console.log(event);
}
```

### 选择日期区间

```html {5}
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    type="range"
    start-date="2022-01-11"
    end-date="2022-11-30"
  ></nut-calendar>
</template>
```

```ts
const date = ref(["2019-12-23", "2019-12-26"]);
```

### 选择多个日期

```html {5}
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    type="multiple"
    start-date="2022-01-11"
    end-date="2022-11-30"
  ></nut-calendar>
</template>
```

```ts
const date = ref([]);
```

### 选择周

当设置为周选择时，会根据 `first-day-of-week` 判断周的起始与结束日期，`0` 表示星期日。

```html {5}
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    type="week"
    start-date="2022-01-11"
    end-date="2022-11-30"
  ></nut-calendar>
</template>
```

```ts
const date = ref(["2019-12-23", "2019-12-26"]);
```

### 快捷选择-单选

```html {5}
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    is-auto-back-fill
  ></nut-calendar>
</template>
```

### 快捷选择-范围选择

```html {5,6}
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    type="range"
    is-auto-back-fill
  ></nut-calendar>
</template>
```

### 自定义日历按钮

```html
<template>
  <nut-calendar
    ref="calendarEl"
    v-model:visible="visible"
    :default-value="date"
    type="range"
    btn-slot
  >
    <template #btn>
      <view>
        <nut-button @click="go()">去某个时间</nut-button>
        <nut-button @click="day7()">最近七天</nut-button>
        <nut-button @click="month()">当月</nut-button>
      </view>
    </template>

    <template #day="{ date }">
      <text>{{ date.day }}</text>
    </template>
  </nut-calendar>
</template>
```

```ts
import dayjs from "dayjs";

const calendarEl = ref();

const date = ref([]);

function go() {
  calendarEl.value.scrollToDate("2025-10-01");
}

const pattern = "YYYY-MM-DD";

function day7() {
  const today = dayjs();

  date.value = [
    today.subtract(7, "day").format(pattern),
    today.format(pattern)
  ];
}

function month() {
  const today = dayjs();

  date.value = [
    today.startOf("month").format(pattern),
    today.format(pattern)
  ];
}
```

### 自定义时间文案

```html
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    type="range"
    title="日期选择"
    start-text="入店"
    end-text="离店"
    confirm-text="提交"
  >
    <template #day="{ date }">
      <text>{{ date.day <= 9 ? `0${date.day}` : date.day }}</text>
    </template>

    <template #bottom-info="{ date }">
      <text>{{ date ? (date.day === 10 ? "十" : "") : "" }}</text>
    </template>
  </nut-calendar>
</template>
```

### 自定义底部区域

```html
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    footer-slot
  >
    <template #footer-info="{ date }">
      <nut-button>自定义</nut-button>
    </template>
  </nut-calendar>
</template>
```

### 自定义周起始日

```html {5}
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    :first-day-of-week="2"
  ></nut-calendar>
</template>
```

### 平铺展示

```html {3}
<template>
  <nut-calendar
    :poppable="false"
    :default-value="date"
  ></nut-calendar>
</template>
```

### 自定义禁用日期

通过配置 `disabled-date` 函数回调可实现自定义禁用某些日期为不可选中状态。
当 `type` 类型为 `range`（日期区间）时，若是设置了该函数，则需要在选中结果后自行过滤掉禁用的日期。

```html
<template>
  <nut-calendar
    v-model:visible="visible"
    :default-value="date"
    :disabled-date="disabledDate"
  ></nut-calendar>
</template>
```

```ts
const disabledDates = {
  "2022-01-05": true,
  "2022-01-06": true,
  "2022-01-10": true,
  "2022-01-11": true,
  "2022-01-12": true,
  "2022-01-13": true,
  "2022-01-14": true
};

function disabledDate(date: string) {
  return disabledDates[date];
}
```

## API

### Props

| 参数                    | 说明                                      | 类型              | 可选值                           | 默认值        |
|-----------------------|-----------------------------------------|-----------------|-------------------------------|------------|
| v-model:visible       | 是否可见                                    | boolean         | -                             | `false`    |
| type                  | 类型                                      | string          | one / range / multiple / week | one        |
| poppable              | 是否弹窗状态展示                                | boolean         | -                             | `true`     |
| is-auto-back-fill     | 自动回填                                    | boolean         | -                             | `false`    |
| title                 | 显示标题                                    | string          | -                             | 日期选择       |
| default-value         | 默认值（单个日期选择 `string`，其他为 `string[]`）     | string / Array  | -                             | -          |
| start-date            | 开始日期                                    | string          | -                             | 今天         |
| end-date              | 结束日期                                    | string          | -                             | 距离今天 365 天 |
| start-text            | 范围选择，开始信息文案                             | string          | -                             | 开始         |
| end-text              | 范围选择，结束信息文案                             | string          | -                             | 结束         |
| confirm-text          | 底部确认按钮文案                                | string          | -                             | 确认         |
| show-today            | 是否展示今天标记                                | boolean         | -                             | `true`     |
| show-title            | 是否在展示日历标题                               | boolean         | -                             | `true`     |
| show-sub-title        | 是否展示日期标题                                | boolean         | -                             | `true`     |
| to-date-animation     | 是否启动滚动动画                                | boolean         | -                             | `true`     |
| first-day-of-week     | 设置周起始日                                  | number          | 0 / 1 / 2 / 3 / 4 / 5 / 6     | `0`        |
| disabled-date `1.4.0` | 一个用来判断该日期是否被禁用的函数，应该返回 `boolean` 表示是否禁用 | Function        | -                             | -          |
| footer-slot `1.4.0`   | 是否使用 `footer` 插槽                        | boolean         | -                             | `false`    |
| btn-slot `1.5.7`      | 是否使用 `btn` 插槽                           | boolean         | -                             | `false`    |
| pop-style `1.8.0`     | 自定义弹窗样式                                 | `CSSProperties` | -                             | -          |
| lock-scroll `H5`      | 背景是否锁定                                  | boolean         | -                             | `true`     |

### Events

| 事件名              | 说明                            | 类型                                    |
|------------------|-------------------------------|---------------------------------------|
| choose           | 选择之后或是点击确认按钮触发,日期数组（包含年月日和星期） | `(value: string \| string[]) => void` |
| select           | 点击/选择后触发                      | `(value: string \| string[]) => void` |
| click-close-icon | 点击关闭图标后触发                     | `() => void`                          |
| click-overlay    | 点击遮罩关闭后触发                     | `() => void`                          |
| open `1.8.0`     | 打开弹窗时触发                       | `() => void`                          |
| opened `1.8.0`   | 打开弹窗动画结束时触发                   | `() => void`                          |
| close            | 关闭弹窗时触发                       | `() => void`                          |
| closed `1.8.0`   | 关闭弹窗动画结束时触发                   | `() => void`                          |

### Slots

| 名称                  | 说明                    |
|---------------------|-----------------------|
| btn                 | 自定义日历标题下部，可用以添加自定义操作  |
| day `不支持小程序`        | 日期信息                  |
| topInfo `不支持小程序`    | 日期顶部信息                |
| bottomInfo `不支持小程序` | 日期底部信息                |
| footer `1.4.0`      | 日历自定义底部，替代 confirm 按钮 |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html) 可以获取到 Calendar 实例并调用实例方法。

| 名称           | 说明                      | 类型                       |
|--------------|-------------------------|--------------------------|
| scrollToDate | 滚动到指定日期所在月，如：2021-12-30 | `(date: string) => void` |
| initPosition | 初始化滚动位置                 | `() => void`             |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                      | 默认值                      |
|-----------------------------------------|--------------------------|
| --nut-calendar-primary-color            | var(--nut-primary-color) |
| --nut-calendar-choose-color             | var(--nut-primary-color) |
| --nut-calendar-choose-font-color        | var(--nut-primary-color) |
| --nut-calendar-base-color               | #333333                  |
| --nut-calendar-disable-color            | #d1d0d0                  |
| --nut-calendar-base-font                | var(--nut-font-size-3)   |
| --nut-calendar-title-font               | var(--nut-font-size-4)   |
| --nut-calendar-title-font-weight        | 500                      |
| --nut-calendar-sub-title-font           | var(--nut-font-size-2)   |
| --nut-calendar-text-font                | var(--nut-font-size-1)   |
| --nut-calendar-day-font                 | 16px                     |
| --nut-calendar-day-active-border-radius | 0px                      |
| --nut-calendar-day-font-weight          | 500                      |
| --nut-calendar-day67-font-color         | var(--nut-primary-color) |
| --nut-calendar-month-title-font-size    | inherit                  |
