# Range 区间选择器

### 介绍

滑动输入条，用于在给定的范围内选择一个值。

### 基础用法

```html
<template>
  <nut-range v-model="value" @change="onChange"></nut-range>
</template>
```

```ts
import type { RangeValue } from "nutui-uniapp";

const value = ref(40);

function onChange(val: RangeValue) {
  console.log("change", val);
}
```

### 双滑块

```html
<template>
  <nut-range v-model="value" range @change="onChange"></nut-range>
</template>
```

```ts
import type { RangeValue } from "nutui-uniapp";

const value = ref([20, 80]);

function onChange(val: RangeValue) {
  console.log("change", val);
}
```

### 指定范围

```html {4,5}
<template>
  <nut-range
    v-model="value"
    :min="-10"
    :max="10"
    @change="onChange"
  ></nut-range>
</template>
```

### 设置步长

```html {4}
<template>
  <nut-range
    v-model="value"
    :step="5"
    @change="onChange"
  ></nut-range>
</template>
```

### 隐藏范围

```html {4}
<template>
  <nut-range
    v-model="value"
    hidden-range
    @change="onChange"
  ></nut-range>
</template>
```

### 隐藏标签

```html {4}
<template>
  <nut-range
    v-model="value"
    hidden-tag
    @change="onChange"
  ></nut-range>
</template>
```

### 禁用

```html {4}
<template>
  <nut-range
    v-model="value"
    disabled
    @change="onChange"
  ></nut-range>
</template>
```

### 自定义样式

```html {4,5,6}
<template>
  <nut-range
    v-model="value"
    inactive-color="rgb(163, 184, 255)"
    button-color="rgb(52, 96, 250)"
    active-color="linear-gradient(315deg, rgb(73, 143, 242) 0%, rgb(73, 101, 242) 100%"
    @change="onChange"
  ></nut-range>
</template>
```

### 自定义按钮

```html
<template>
  <nut-range v-model="value" @change="onChange">
    <template #button>
      <text>{{ value }}</text>
    </template>
  </nut-range>
</template>
```

### 垂直方向

```html {4,11}
<template>
  <nut-range
    v-model="value"
    vertical
    @change="onChange"
  ></nut-range>

  <nut-range
    v-model="value"
    range
    vertical
    @change="onChange"
  ></nut-range>
</template>
```

### 刻度标记

```html
<template>
  <nut-range
    v-model="value"
    :marks="marks"
    hidden-range
    @change="onChange"
  ></nut-range>

  <nut-range
    v-model="value"
    vertical
    :marks="marks"
    hidden-range
    @change="onChange"
  ></nut-range>
</template>
```

```ts
const marks = {
  0: 0,
  20: 20,
  40: 40,
  60: 60,
  80: 80,
  100: 100
};
```

## API

### Props

| 参数             | 说明        | 类型              | 可选值 | 默认值                    |
|----------------|-----------|-----------------|-----|------------------------|
| v-model        | 当前进度百分比   | number / Array  | -   | `0`                    |
| range          | 是否开启双滑块模式 | boolean         | -   | `false`                |
| max            | 最大值       | number / string | -   | `100`                  |
| min            | 最小值       | number / string | -   | `0`                    |
| step           | 步长        | number / string | -   | `1`                    |
| disabled       | 是否禁用滑块    | boolean         | -   | `false`                |
| vertical       | 是否竖向展示    | boolean         | -   | `false`                |
| hidden-range   | 是否隐藏范围值   | boolean         | -   | `false`                |
| hidden-tag     | 是否隐藏标签    | boolean         | -   | `false`                |
| active-color   | 进度条激活态颜色  | string          | -   | rgba(250, 44, 25, 1)   |
| inactive-color | 进度条非激活态颜色 | string          | -   | rgba(255, 163, 154, 1) |
| button-color   | 按钮颜色      | string          | -   | rgba(250, 44, 25, 1)   |
| marks          | 刻度标示      | object          | -   | `{}`                   |

### Events

| 事件名        | 说明           | 类型                            |
|------------|--------------|-------------------------------|
| change     | 进度变化且结束拖动后触发 | `(value: RangeValue) => void` |
| drag-start | 开始拖动时触发      | `() => void`                  |
| drag-end   | 结束拖动时触发      | `() => void`                  |

### Slots

| 名称     | 说明      |
|--------|---------|
| button | 自定义滑动按钮 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                           | 默认值                                                                                     |
|------------------------------|-----------------------------------------------------------------------------------------|
| --nut-range-tip-font-color   | #333333                                                                                 |
| --nut-range-bg-color         | var(--nut-primary-color)                                                                |
| --nut-range-bg-color-tick    | #fa958c                                                                                 |
| --nut-range-bar-bg-color     | linear-gradient(135deg, var(--nut-primary-color) 0%, var(--nut-primary-color-end) 100%) |
| --nut-range-bar-btn-bg-color | var(--nut-white)                                                                        |
| --nut-range-bar-btn-width    | 24px                                                                                    |
| --nut-range-bar-btn-height   | 24px                                                                                    |
| --nut-range-bar-btn-border   | 1px solid var(--nut-primary-color)                                                      |
