# Badge 徽标

### 介绍

出现在图标或文字右上角的红色圆点、数字或者文字，表示有新内容或者待处理的信息。

### 基础用法

```html
<template>
  <nut-badge :value="8">
    <nut-avatar shape="square"></nut-avatar>
  </nut-badge>

  <nut-badge :value="76">
    <nut-avatar shape="square"></nut-avatar>
  </nut-badge>

  <nut-badge value="NEW">
    <nut-avatar shape="square"></nut-avatar>
  </nut-badge>

  <nut-badge dot>
    <nut-avatar shape="square"></nut-avatar>
  </nut-badge>
</template>
```

### 最大值

```html
<template>
  <nut-badge :value="200" :max="9">
    <nut-avatar shape="square"></nut-avatar>
  </nut-badge>
</template>
```

### 自定义颜色

```html
<template>
  <nut-badge
    :value="8"
    custom-color="linear-gradient(315deg, rgb(73, 143, 242) 0%, rgb(73, 101, 242) 100%)"
  >
    <nut-avatar shape="square"></nut-avatar>
  </nut-badge>
</template>
```

### 自定义徽标内容

```html
<template>
  <nut-badge>
    <template #icon>
      <nut-icon name="check" size="12" custom-color="#ffffff"></nut-icon>
    </template>

    <nut-avatar shape="square"></nut-avatar>
  </nut-badge>
</template>
```

### 自定义位置

```html
<template>
  <nut-badge :value="8" top="5" right="5">
    <nut-avatar shape="square"></nut-avatar>
  </nut-badge>
</template>
```

### 独立展示

```html
<template>
  <nut-badge :value="8"></nut-badge>
  <nut-badge :value="76"></nut-badge>
  <nut-badge value="NEW"></nut-badge>
</template>
```

## API

### Props

| 参数           | 说明               | 类型              | 可选值 | 默认值     |
|--------------|------------------|-----------------|-----|---------|
| value        | 显示的内容            | number / string | -   | -       |
| max          | `value` 为数值时的最大值 | number          | -   | `10000` |
| dot          | 是否为小点            | boolean         | -   | `false` |
| bubble       | 是否为气泡形状          | boolean         | -   | `false` |
| hidden       | 是否隐藏             | boolean         | -   | `false` |
| top          | 上下偏移量            | string          | -   | 0       |
| right        | 左右偏移量            | string          | -   | 0       |
| z-index      | 徽标的 `z-index` 值  | number          | -   | `10`    |
| custom-color | 徽标背景颜色           | string          | -   | #fa2c19 |

### Slots

| 名称      | 说明     |
|---------|--------|
| default | 包裹的子元素 |
| icon    | 自定义徽标  |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                            | 默认值                                                                                     |
|-------------------------------|-----------------------------------------------------------------------------------------|
| --nut-badge-background-color  | linear-gradient(135deg, var(--nut-primary-color) 0%, var(--nut-primary-color-end) 100%) |
| --nut-badge-color             | #fff                                                                                    |
| --nut-badge-font-size         | var(--nut-font-size-1)                                                                  |
| --nut-badge-border-radius     | 14px                                                                                    |
| --nut-badge-icon-padding      | 4px                                                                                     |
| --nut-badge-padding           | 0 5px                                                                                   |
| --nut-badge-content-transform | translate(50%, -50%)                                                                    |
| --nut-badge-z-index           | 1                                                                                       |
| --nut-badge-dot-width         | 7px                                                                                     |
| --nut-badge-dot-height        | 7px                                                                                     |
| --nut-badge-dot-border-radius | 7px                                                                                     |
| --nut-badge-dot-padding       | 0px                                                                                     |
