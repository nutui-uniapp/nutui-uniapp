# Noticebar 通告栏

### 介绍

用于循环播放展示一组消息通知。

### 基础用法

```html
<template>
  <nut-noticebar
    text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
    background="rgb(251, 248, 220)"
    custom-color="#d9500b"
  ></nut-noticebar>
</template>
```

### 滚动播放

通知栏的内容长度溢出时会自动开启滚动播放，可通过 `scrollable` 属性可以控制该行为。

```html
<template>
  <nut-noticebar
    text="华为畅享9新品即将上市"
    scrollable
    background="rgb(251, 248, 220)"
    custom-color="#d9500b"
  ></nut-noticebar>

  <nut-noticebar
    text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
    :scrollable="false"
  ></nut-noticebar>
</template>
```

### 通告栏模式（可关闭）

```html
<template>
  <nut-noticebar
    close-mode
    background="rgb(251, 248, 220)"
    custom-color="#d9500b"
  >
    NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。
  </nut-noticebar>

  <nut-noticebar
    close-mode
    right-icon="circle-close"
  >
    NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。
  </nut-noticebar>
</template>
```

### 多行展示

文字较长时，可以通过设置 `wrapable` 属性来开启多行展示。

```html
<template>
  <nut-noticebar
    text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
    wrapable
  ></nut-noticebar>
</template>
```

### 纵向滚动

```html
<template>
  <nut-noticebar
    direction="vertical"
    :list="list"
    :speed="10"
    :stand-time="1000"
    close-mode
    @click="onClick">
  </nut-noticebar>
</template>
```

```ts
const list = ref([
  "Noticebar 公告栏",
  "Cascader 级联选择",
  "DatePicker 日期选择器",
  "CheckBox 复选按钮"
]);

function onClick(item: string) {
  console.log("click", item);
}
```

### 复杂滚动动画

```html {7}
<template>
  <nut-noticebar
    direction="vertical"
    :list="list"
    :speed="10"
    :stand-time="2000"
    complex-am
  ></nut-noticebar>
</template>
```

### 自定义滚动内容

传递 `field-name` 属性自定义显示文字字段名，以此可以携带更多数据。

```html
<template>
  <nut-noticebar
    direction="vertical"
    :list="list"
    :height="50"
    :speed="10"
    :stand-time="1000"
    field-name="text"
    background="rgb(251, 248, 220)"
    @click="onClick"
  ></nut-noticebar>
</template>
```

```ts
const list = ref([
  { id: 1, text: "Noticebar 公告栏" },
  { id: 2, text: "Cascader 级联选择" },
  { id: 3, text: "DatePicker 日期选择器" },
  { id: 4, text: "CheckBox 复选按钮" }
]);

function onClick(item: any) {
  console.log("click", item);
}
```

### 纵向自定义右侧图标

```html
<template>
  <nut-noticebar
    direction="vertical"
    :list="list"
    :speed="10"
    :stand-time="1000"
  >
    <template #rightIcon>
      <nut-icon name="fabulous"></nut-icon>
    </template>
  </nut-noticebar>
</template>
```

## API

### Props

| 字段                 | 说明                                      | 类型              | 可选值               | 默认值     |
|--------------------|-----------------------------------------|-----------------|-------------------|---------|
| direction          | 滚动的方向                                   | string          | across / vertical | across  |
| text               | 提示的信息                                   | string          | -                 | -       |
| close-mode         | 是否启用关闭模式                                | boolean         | -                 | `false` |
| left-icon          | 是否展示左侧图标（`direction` 为 `across` 时有效）    | boolean         | -                 | `true`  |
| custom-color       | 导航栏的文字颜色                                | string          | -                 | -       |
| background         | 导航栏的背景颜色                                | string          | -                 | -       |
| delay              | 动画延时（单位：s）                              | string / number | -                 | `1`     |
| scrollable         | 是否可以滚动                                  | boolean         | -                 | `true`  |
| speed              | 滚动速率（单位：px/s）                           | number          | -                 | `50`    |
| wrapable           | 是否开启文本换行（启用后 `scrollable` 会设置为 `false`） | boolean         | -                 | `false` |
| list               | 纵向滚动数据列表                                | Array           | -                 | `[]`    |
| stand-time         | 停留时间（单位：ms）                             | number          | -                 | `1000`  |
| complex-am         | 稍复杂的动画，耗能会高                             | boolean         | -                 | `false` |
| height             | 每一个滚动项的高度（单位：px）                        | number          | -                 | `40`    |
| close-mode         | 是否启用右侧关闭图标                              | boolean         | -                 | `false` |
| field-name `1.5.2` | 如果传递数组对象，显示文字的字段名                       | string          | -                 | -       |

### Events

| 事件名       | 说明       | 类型                     |
|-----------|----------|------------------------|
| click     | 外层点击事件回调 | `(value: any) => void` |
| close     | 关闭通知栏时触发 | `(value: any) => void` |
| acrossEnd | 动画结束     | `() => void`           |

### Slots

| 名称        | 说明      |
|-----------|---------|
| default   | 通知文本的内容 |
| rightIcon | 自定义右侧图标 |
| leftIcon  | 自定义左侧图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                 | 默认值                    |
|------------------------------------|------------------------|
| --nut-noticebar-background         | rgba(251, 248, 220, 1) |
| --nut-noticebar-color              | #d9500b                |
| --nut-noticebar-font-size          | 14px                   |
| --nut-noticebar-across-height      | 40px                   |
| --nut-noticebar-across-line-height | 24px                   |
| --nut-noticebar-box-padding        | 0 16px                 |
| --nut-noticebar-wrapable-padding   | 16px                   |
| --nut-noticebar-lefticon-margin    | 0px 10px               |
| --nut-noticebar-righticon-margin   | 0px 10px               |
