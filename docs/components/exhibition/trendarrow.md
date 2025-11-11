# TrendArrow 趋势箭头

### 介绍

带有箭头指示的百分比数字，用以展示指标趋势。

### 基础用法

```html
<template>
  <nut-trend-arrow :rate="1" :sync-text-color="false"></nut-trend-arrow>
  <nut-trend-arrow :rate="-0.2535" :sync-text-color="false"></nut-trend-arrow>
</template>
```

### 改变文字颜色

```html
<template>
  <nut-trend-arrow :rate="10.2365"></nut-trend-arrow>
  <nut-trend-arrow :rate="-0.2535"></nut-trend-arrow>
</template>
```

### 指定小数位

```html
<template>
  <nut-trend-arrow :rate="10.2365" :digits="0"></nut-trend-arrow>
  <nut-trend-arrow :rate="-0.2535" :digits="0"></nut-trend-arrow>
</template>
```

### 箭头在前面

```html
<template>
  <nut-trend-arrow :rate="0.2535" arrow-left></nut-trend-arrow>
  <nut-trend-arrow :rate="-0.2535" arrow-left></nut-trend-arrow>
</template>
```

### 显示正负号

```html
<template>
  <nut-trend-arrow :rate="1" show-sign></nut-trend-arrow>
  <nut-trend-arrow :rate="-0.2535" show-sign></nut-trend-arrow>
</template>
```

### 是否展示 0

```html
<template>
  <nut-trend-arrow :rate="0" show-sign></nut-trend-arrow>
  <nut-trend-arrow :rate="0" show-sign show-zero></nut-trend-arrow>
</template>
```

### 自定义颜色

```html
<template>
  <nut-trend-arrow :rate="10.2365" rise-color="rgb(73, 143, 242)"></nut-trend-arrow>
  <nut-trend-arrow :rate="-0.2535" show-sign drop-color="rgb(255, 190, 13)"></nut-trend-arrow>
  <nut-trend-arrow
    :rate="-0.2535"
    show-sign
    :show-text-color="false"
    text-color="rgb(39, 197, 48)"
    drop-color="rgb(255, 190, 13)"
  ></nut-trend-arrow>
</template>
```

### 自定义图标

```html
<template>
  <nut-trend-arrow :rate="10.2365">
    <template #upIcon>
      <nut-icon name="success" size="18px" custom-color="blue"></nut-icon>
    </template>
  </nut-trend-arrow>

  <nut-trend-arrow :rate="-10.2365">
    <template #downIcon>
      <nut-icon name="failure" custom-color="red"></nut-icon>
    </template>
  </nut-trend-arrow>
</template>
```

## API

### Props

| 参数              | 说明                   | 类型      | 可选值 | 默认值     |
|-----------------|----------------------|---------|-----|---------|
| rate            | 数值，大于0时箭头向上，小于0时箭头向下 | number  | -   | `0`     |
| digits          | 小数位精度                | number  | -   | `2`     |
| show-sign       | 是否显示加减号              | boolean | -   | `false` |
| show-zero       | 是否显示 0               | boolean | -   | `false` |
| arrow-left      | 是否在数字左侧显示箭头          | boolean | -   | `false` |
| sync-text-color | 文字颜色是否与箭头同步          | boolean | -   | `true`  |
| text-color      | 文字颜色                 | string  | -   | #333    |
| rise-color      | 向上箭头颜色               | string  | -   | #fa2c19 |
| drop-color      | 向下箭头颜色               | string  | -   | #64b578 |

### Slots

| 名称       | 说明        |
|----------|-----------|
| upIcon   | 自定义向上箭头图标 |
| downIcon | 自定义向下箭头图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                  | 默认值  |
|-------------------------------------|------|
| --nut-trendarrow-font-size          | 14px |
| --nut-trendarrow-before-icon-margin | 4px  |
