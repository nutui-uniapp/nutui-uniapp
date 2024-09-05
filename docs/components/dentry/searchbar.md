# Searchbar 搜索栏

### 介绍

搜索栏

### 基础用法

```html
<template>
  <nut-searchbar v-model="searchValue"></nut-searchbar>
</template>
```

```typescript
const searchValue = ref<string>('')
```

### 设置搜索框形状

```html
<template>
  <nut-searchbar shape="square"></nut-searchbar>
</template>
```

### 搜索事件监听

```html
<template>
  <nut-searchbar v-model="searchValue" @search="onSearch"></nut-searchbar>
</template>
```

```typescript
const searchValue = ref<string>('')

function onSearch(value: string) {
  console.log('搜索触发', value)
}
```

### 显示搜索 icon

```html
<template>
  <nut-searchbar v-model="searchValue">
    <template #leftin>
      <nut-icon name="search2" />
    </template>
  </nut-searchbar>
</template>
```

### 右侧添加搜索文字

```html
<template>
  <nut-searchbar v-model="searchValue">
    <template #rightout>搜索</template>
  </nut-searchbar>
</template>
```

### 更改输入框内部及外部的背景样式

```html
<template>
  <nut-searchbar v-model="searchValue"
                 background="linear-gradient(to right, #9866f0, #eb4d50)"
                 input-background="#fff"></nut-searchbar>
</template>
```

### 自定义清除按钮 icon

```html
<template>
  <nut-searchbar v-model="searchValue">
    <template #clear-icon>
      <image style="width: 10px; height: 10px"
             src="https://img10.360buyimg.com/imagetools/jfs/t1/170133/30/22902/10546/61833626E32d7ccde/a7c373ba30de9a89.png"></image>
    </template>
  </nut-searchbar>
</template>
```

### 显示全部 icon

```html
<template>
  <nut-searchbar v-model="searchValue">
    <template #leftout>
      <nut-icon name="left" />
    </template>
    <template #leftin>
      <nut-icon name="search2" />
    </template>
    <template #rightin>
      <nut-icon name="photograph" />
    </template>
    <template #rightout>
      <nut-icon name="message" />
    </template>
  </nut-searchbar>
</template>
```

## API

### Props

| 参数                           | 说明                                                                                                  | 类型            | 默认值         |
| ------------------------------ | ----------------------------------------------------------------------------------------------------- | --------------- | -------------- |
| v-model                        | 当前输入的值                                                                                          | number \ string | `''`           |
| shape                          | 搜索框形状，可选值为 `square` `round`                                                                 | string          | `round`        |
| max-length                     | 最大输入长度
| input-type                     | 输入框类型                                                                                            | string          | `text`         |
| placeholder                    | 输入框默认暗纹                                                                                        | string          | `请输入`       |
| clearable                      | 是否展示清除按钮                                                                                      | boolean         | `true`         |
| clear-icon                     | 自定义清除按钮图标                                                                                    | Object          | `circle-close` |
| background                     | 输入框外部背景                                                                                        | string          | `#fff`         |
| input-background               | 输入框内部背景                                                                                        | string          | `#f7f7f7`      |
| confirm-type                   | 键盘右下角按钮的文字                                                                                  | string          | `done`         |
| autofocus                      | 是否自动聚焦                                                                                          | boolean         | `false`        |
| focus-style                    | 聚焦时搜索框样式                                                                                      | Object          | `-`            |
| disabled                       | 是否禁用输入框                                                                                        | boolean         | `false`        |
| readonly                       | 输入框只读                                                                                            | boolean         | `false`        |
| input-align                    | 对齐方式，可选 `left` `center` `right`                                                                | string          | `left`         |
| safe-area-inset-bottom `1.1.6` | 是否开启 iphone 系列全面屏底部安全区适配                                                              | boolean         | `false`        |
| cursor-spacing `1.2.0`         | 指定光标与键盘的距离，取 input 距离底部的距离和 cursor-spacing 指定的距离的最小值作为光标与键盘的距离 | number          | `0`            |

### Events

| 事件名           | 说明                | 回调参数     |
| ---------------- | ------------------- | ------------ |
| change           | 输入内容时触发      | `val, event` |
| focus            | 聚焦时触发          | `val, event` |
| blur             | 失焦时触发          | `val, event` |
| clear            | 点击清空时触发      | `val`        |
| search           | 按下 ENTER 键时触发 | `val`        |
| click-input      | 点击输入区域时触发  | `val, event` |

### Slots

| 名称     | 说明            |
| -------- | --------------- |
| leftin   | 输入框内 左icon |
| leftout  | 输入框外 左icon |
| rightin  | 输入框内 右icon |
| rightout | 输入框外 右icon |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                        | 默认值                          |
| ------------------------------------------- | ------------------------------- |
| --nut-searchbar-background                  | _var(--nut-white)_              |
| --nut-searchbar-right-out-color             | _var(--nut-black)_              |
| --nut-searchbar-padding                     | _9px 16px_                      |
| --nut-searchbar-width                       | _100%_                          |
| --nut-searchbar-input-background            | _#f7f7f7_                       |
| --nut-searchbar-input-padding               | _0 0 0 13px_                    |
| --nut-searchbar-input-height                | _32px_                          |
| --nut-searchbar-input-border-radius         | _16px_                          |
| --nut-searchbar-input-box-shadow            | _0 0 8px 0 rgba(0, 0, 0, 0.04)_ |
| --nut-searchbar-input-bar-color             | _inherit_                       |
| --nut-searchbar-input-bar-placeholder-color | _inherit_                       |
