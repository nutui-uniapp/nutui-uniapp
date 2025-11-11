# Indicator 指示器

### 介绍

显示一个任务或流程的进度，常用于开通流程。

### 基础用法

```html
<template>
  <nut-indicator :current="1" :size="3"></nut-indicator>
</template>
```

### block 用法

```html
<template>
  <nut-indicator
    :current="5"
    :size="6"
    block
    align="center"
  ></nut-indicator>

  <nut-indicator
    :current="1"
    :size="6"
    block
    align="left"
  ></nut-indicator>

  <nut-indicator
    :current="5"
    :size="6"
    block
    align="right"
  ></nut-indicator>
</template>
```

### 不补 0

```html
<template>
  <nut-indicator :current="5" :size="6" :fill-zero="false"></nut-indicator>
</template>
```

## API

### Props

| 参数        | 说明                          | 类型      | 可选值                   | 默认值     |
|-----------|-----------------------------|---------|-----------------------|---------|
| current   | 当前步骤                        | number  | -                     | `1`     |
| size      | 步骤长度                        | number  | -                     | `3`     |
| block     | 是否启用块级布局                    | boolean | -                     | `false` |
| align     | 对齐方式，仅 `block` 为 `true` 时有效 | string  | left / center / right | left    |
| fill-zero | 单数前面是否补 0                   | boolean | -                     | `true`  |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                               | 默认值                                  |
|----------------------------------|--------------------------------------|
| --nut-indicator-bg-color         | var(--nut-primary-color)             |
| --nut-indicator-dot-color        | var(--nut-disable-color)             |
| --nut-indicator-color            | var(--nut-white)                     |
| --nut-indicator-size             | 18px                                 |
| --nut-indicator-dot-size         | calc(var(--nut-indicator-size) / 3)_ |
| --nut-indicator-border-size      | calc(var(--nut-indicator-size)+ 2)   |
| --nut-indicator-number-font-size | 10px                                 |
