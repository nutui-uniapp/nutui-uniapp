# Searchbar 搜索栏

### 介绍

搜索栏。

### 基础用法

```html
<template>
  <nut-searchbar v-model="value"></nut-searchbar>
</template>
```

```ts
const value = ref("");
```

### 搜索框形状

```html
<template>
  <nut-searchbar v-model="value" shape="square"></nut-searchbar>
</template>
```

### 搜索事件

```html
<template>
  <nut-searchbar v-model="value" @search="onSearch"></nut-searchbar>
</template>
```

```ts
const value = ref("");

function onSearch(val: string) {
  console.log("search", val);
}
```

### 显示搜索图标

```html
<template>
  <nut-searchbar v-model="value">
    <template #leftin>
      <nut-icon name="search2"></nut-icon>
    </template>
  </nut-searchbar>
</template>
```

### 右侧添加文字

```html
<template>
  <nut-searchbar v-model="value">
    <template #rightout>搜索</template>
  </nut-searchbar>
</template>
```

### 更改输入框内部及外部的背景样式

```html
<template>
  <nut-searchbar
    v-model="value"
    background="linear-gradient(to right, #9866f0, #eb4d50)"
    input-background="#ffffff"
  ></nut-searchbar>
</template>
```

### 自定义清除按钮

```html
<template>
  <nut-searchbar v-model="value">
    <template #clear-icon>
      <nut-icon name="close"></nut-icon>
    </template>
  </nut-searchbar>
</template>
```

### 显示全部图标

```html
<template>
  <nut-searchbar v-model="value">
    <template #leftout>
      <nut-icon name="left"></nut-icon>
    </template>

    <template #leftin>
      <nut-icon name="search2"></nut-icon>
    </template>

    <template #rightin>
      <nut-icon name="photograph"></nut-icon>
    </template>

    <template #rightout>
      <nut-icon name="message"></nut-icon>
    </template>
  </nut-searchbar>
</template>
```

## API

### Props

| 参数                             | 说明                       | 类型              | 可选值                   | 默认值          |
|--------------------------------|--------------------------|-----------------|-----------------------|--------------|
| v-model                        | 当前输入的值                   | number / string | -                     | -            |
| shape                          | 搜索框形状                    | string          | square / round        | round        |
| max-length                     | 最大输入长度                   | number / string | -                     | -            |
| input-type                     | 输入框类型                    | string          | -                     | text         |
| placeholder                    | 输入框占位提示文本                | string          | -                     | 请输入          |
| clearable                      | 是否展示清除按钮                 | boolean         | -                     | `true`       |
| clear-icon                     | 自定义清除按钮图标                | string          | -                     | circle-close |
| background                     | 输入框外部背景                  | string          | -                     | #ffffff      |
| input-background               | 输入框内部背景                  | string          | -                     | #f7f7f7      |
| confirm-type                   | 键盘右下角按钮的文字               | string          | -                     | done         |
| autofocus                      | 是否自动聚焦                   | boolean         | -                     | `false`      |
| focus-style                    | 聚焦时搜索框样式                 | object          | -                     | -            |
| disabled                       | 是否禁用输入框                  | boolean         | -                     | `false`      |
| readonly                       | 输入框只读                    | boolean         | -                     | `false`      |
| input-align                    | 对齐方式                     | string          | left / center / right | left         |
| safe-area-inset-bottom `1.1.6` | 是否开启 iphone 系列全面屏底部安全区适配 | boolean         | -                     | `false`      |
| cursor-spacing `1.2.0`         | 指定光标与键盘的距离               | number          | -                     | `0`          |

### Events

| 事件名              | 说明            | 类型                                                  |
|------------------|---------------|-----------------------------------------------------|
| change           | 输入内容时触发       | `(value: string, event: InputOnInputEvent) => void` |
| focus            | 聚焦时触发         | `(value: string, event: InputOnFocusEvent) => void` |
| blur             | 失焦时触发         | `(value: string, event: InputOnBlurEvent) => void`  |
| clear            | 点击清空时触发       | `(value: string) => void`                           |
| search           | 按下 ENTER 键时触发 | `(value: string) => void`                           |
| click-input      | 点击输入区域时触发     | `(val: string, event: Event) => void`               |
| click-left-icon  | 点击左侧图标时触发     | `(val: string, event: Event) => void`               |
| click-right-icon | 点击右侧图标时触发     | `(val: string, event: Event) => void`               |

### Slots

| 名称       | 说明      |
|----------|---------|
| leftin   | 输入框内左图标 |
| leftout  | 输入框外左图标 |
| rightin  | 输入框内右图标 |
| rightout | 输入框外右图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                          | 默认值                           |
|---------------------------------------------|-------------------------------|
| --nut-searchbar-background                  | var(--nut-white)              |
| --nut-searchbar-right-out-color             | var(--nut-black)              |
| --nut-searchbar-padding                     | 9px 16px                      |
| --nut-searchbar-width                       | 100%                          |
| --nut-searchbar-input-background            | #f7f7f7                       |
| --nut-searchbar-input-padding               | 0 0 0 13px                    |
| --nut-searchbar-input-height                | 32px                          |
| --nut-searchbar-input-border-radius         | 16px                          |
| --nut-searchbar-input-box-shadow            | 0 0 8px 0 rgba(0, 0, 0, 0.04) |
| --nut-searchbar-input-bar-color             | inherit                       |
| --nut-searchbar-input-bar-placeholder-color | inherit                       |
