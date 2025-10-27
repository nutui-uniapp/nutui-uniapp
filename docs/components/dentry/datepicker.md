# DatePicker 日期选择器

### 介绍

时间选择器，支持日期、年月、时分等维度，通常与弹出层组件配合使用。

### 选择年月日

```html
<template>
  <nut-date-picker
    v-model="currentDate"
    :min-date="minDate"
    :max-date="maxDate"
    three-dimensional
    is-show-chinese
    @confirm="onConfirm"
  ></nut-date-picker>
</template>
```

```ts
import type { DatePickerBaseEvent } from "nutui-uniapp";

const currentDate = ref(new Date(2022, 4, 10));

const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 10, 1);

function onConfirm({ date, selectedValue, selectedOptions }: DatePickerBaseEvent) {
  console.log(date, selectedValue, selectedOptions);
}
```

### 搭配 Popup 使用

```html
<template>
  <nut-popup
    v-model:visible="visible"
    position="bottom"
    safe-area-inset-bottom
  >
    <nut-date-picker
      v-model="currentDate"
      :min-date="minDate"
      :max-date="maxDate"
      is-show-chinese
      @confirm="onConfirm"
      @cancel="onCancel"
    >
      <nut-button
        type="primary"
        block
        @click="onButtonClick()"
      >永远有效
      </nut-button>
    </nut-date-picker>
  </nut-popup>
</template>
```

```ts
const visible = ref(false);

const currentDate = ref(new Date(2022, 4, 10, 10, 10));

const minDate = new Date(2020, 0, 1);
const maxDate = new Date(2025, 10, 1);

const text = ref("");

function onConfirm({ date, selectedValue, selectedOptions }: DatePickerBaseEvent) {
  console.log(date, selectedValue, selectedOptions);

  text.value = selectedOptions.map((item) => item.text).join("-");
  visible.value = false;
}

function onCancel() {
  visible.value = false;
}

function onButtonClick() {
  text.value = "永远有效";
  visible.value = false;
}
```

### 选择年月

将 `type` 设置为 `year-month` 即可选择年份和月份。

````html {4}
<template>
  <nut-date-picker
    v-model="currentDate"
    type="year-month"
    @confirm="onConfirm"
  ></nut-date-picker>
</template>
````

### 选择月日

将 `type` 设置为 `month-day` 即可选择月份和日期。

```html {4}
<template>
  <nut-date-picker
    v-model="currentDate"
    type="month-day"
    @confirm="onConfirm"
  ></nut-date-picker>
</template>
```

### 选择年月日时分

将 `type` 设置为 `datetime` 即可选择完整的时间。

```html {4}
<template>
  <nut-date-picker
    v-model="currentDate"
    type="datetime"
    @confirm="onConfirm"
  ></nut-date-picker>
</template>
```

### 选择时分秒

将 `type` 设置为 `time` 即可选择时分秒。

```html {4}
<template>
  <nut-date-picker
    v-model="currentDate"
    type="time"
    @confirm="onConfirm"
  ></nut-date-picker>
</template>
```

### 选择时分

将 `type` 设置为 `hour-minute` 即可选择时分。

```html {4}
<template>
  <nut-date-picker
    v-model="currentDate"
    type="hour-minute"
    @confirm="onConfirm"
  ></nut-date-picker>
</template>
```

### 格式化选项

通过传入 `formatter` 函数可以对选项文字进行格式化处理，`is-show-chinese` 属性同样是也为选项后面添加文案，
但 `formatter` 函数的优先级高于 `is-show-chinese` 属性。

```html {5}
<template>
  <nut-date-picker
    v-model="currentDate"
    type="datetime"
    :formatter="formatter"
    @confirm="onConfirm"
  ></nut-date-picker>
</template>
```

```ts
import type { DatePickerColumnType, PickerOption } from "nutui-uniapp";

function formatter(type: DatePickerColumnType, option: PickerOption) {
  switch (type) {
    case "year":
      option.text += "";
      break;
    case "month":
      option.text += "月";
      break;
    case "day":
      option.text += "日";
      break;
    case "hour":
      option.text += "时";
      break;
    case "minute":
      option.text += "分";
      break;
    default:
      option.text += "";
  }
  return option;
}
```

### 分钟数递增步长设置

```html {5}
<template>
  <nut-date-picker
    v-model="currentDate"
    type="time"
    :minute-step="5"
    @confirm="onConfirm"
  ></nut-date-picker>
</template>
```

### 过滤选项

通过 `filter` 函数可以对选项数组进行过滤，实现自定义时间间隔。

```html {5}
<template>
  <nut-date-picker
    v-model="currentDate"
    type="datehour"
    :filter="filter"
    @confirm="onConfirm"
  ></nut-date-picker>
</template>
```

```ts
import type { DatePickerColumnType, PickerOption } from "nutui-uniapp";

function filter(type: DatePickerColumnType, options: PickerOption[]) {
  if (type === "hour") {
    return options.filter(item => Number(item.value) % 6 === 0);
  }

  return options;
}
```

## API

### Props

| 参数                 | 说明         | 类型                                                                        | 可选值                                                                      | 默认值     |
|--------------------|------------|---------------------------------------------------------------------------|--------------------------------------------------------------------------|---------|
| v-model            | 选中值        | number / string / Date                                                    | -                                                                        | -       |
| type               | 时间类型       | string                                                                    | date / time / year-month / month-day / datehour / hour-minute / datetime | date    |
| show-toolbar       | 是否显示顶部导航   | boolean                                                                   | -                                                                        | `true`  |
| title              | 设置标题       | string                                                                    | -                                                                        | -       |
| ok-text            | 确定按钮文案     | string                                                                    | -                                                                        | 确定      |
| cancel-text        | 取消按钮文案     | string                                                                    | -                                                                        | 取消      |
| is-show-chinese    | 每列是否展示中文   | boolean                                                                   | -                                                                        | `false` |
| minute-step        | 分钟步进值      | number                                                                    | -                                                                        | `1`     |
| min-date           | 开始日期       | number / string / Date                                                    | -                                                                        | 十年前     |
| max-date           | 结束日期       | number / string / Date                                                    | -                                                                        | 十年后     |
| formatter          | 选项格式化函数    | `(type: DatePickerColumnType, option: PickerOption) => PickerOption`      | -                                                                        | -       |
| filter             | 选项过滤函数     | `(type: DatePickerColumnType, options: PickerOption[]) => PickerOption[]` | -                                                                        | -       |
| three-dimensional  | 是否开启 3D 效果 | boolean                                                                   | -                                                                        | `false` |
| swipe-duration     | 惯性滚动时长     | number / string                                                           | -                                                                        | `1000`  |
| visible-option-num | 可见的选项个数    | number / string                                                           | -                                                                        | `7`     |
| option-height      | 选项高度       | number / string                                                           | -                                                                        | `36`    |

#### PickerOption 数据结构

| 参数        | 说明         | 类型               |
|-----------|------------|------------------|
| text      | 选项的文字内容    | number / string  |
| value     | 选项对应的值，且唯一 | number / string  |
| children  | 用于级联选项     | `PickerOption[]` |
| className | 添加额外的类名    | string           |

### Events

| 事件名     | 说明                              | 类型                                       |
|---------|---------------------------------|------------------------------------------|
| change  | 选项改变时触发（`1.7.7` 新增 `date` 参数）   | `(event: DatePickerChangeEvent) => void` |
| confirm | 点击确定按钮时触发（`1.7.7` 新增 `date` 参数） | `(event: DatePickerBaseEvent) => void`   |
| cancel  | 点击取消按钮时触发（`1.7.7` 新增 `date` 参数） | `(event: DatePickerBaseEvent) => void`   |

```ts
interface PickerBaseEvent {
  selectedValue: (string | number)[];
  selectedOptions: PickerOption[];
}

interface PickerChangeEvent extends PickerBaseEvent {
  columnIndex: number;
}

interface DatePickerBaseEvent extends PickerBaseEvent {
  date: Date;
}

interface DatePickerChangeEvent extends DatePickerBaseEvent, PickerChangeEvent {

}
```

### Slots

| 名称      | 说明          |
|---------|-------------|
| default | 自定义滑动数据底部区域 |
| top     | 自定义滑动数据顶部区域 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                   | 默认值                      |
|--------------------------------------|--------------------------|
| --nut-picker-cancel-color            | #808080                  |
| --nut-picker-ok-color                | var(--nut-primary-color) |
| --nut-picker-bar-cancel-font-size    | 14px                     |
| --nut-picker-bar-ok-font-size        | 14px                     |
| --nut-picker-bar-button-padding      | 0 15px                   |
| --nut-picker-bar-title-font-size     | 16px                     |
| --nut-picker-bar-title-color         | var(--nut-title-color)   |
| --nut-picker-bar-title-font-weight   | normal                   |
| --nut-picker-item-height             | 36px                     |
| --nut-picker-item-text-color         | var(--nut-title-color)   |
| --nut-picker-item-text-font-size     | 14px                     |
| --nut-picker-item-active-line-border | 1px solid #d8d8d8        |
