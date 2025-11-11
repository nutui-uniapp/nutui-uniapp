# Layout 布局

### 介绍

用于快速进行布局。

### 基础用法

Layout 组件提供 24 列栅格，通过在 Col 上添加 `span` 属性设置列所占的宽度百分比，`offset` 属性可以设置列的偏移宽度，计算方式与 `span` 相同。

```html
<template>
  <nut-row>
    <nut-col :span="24">
      <view>span:24</view>
    </nut-col>
  </nut-row>

  <nut-row>
    <nut-col :span="12">
      <view>span:12</view>
    </nut-col>
    <nut-col :span="12">
      <view>span:12</view>
    </nut-col>
  </nut-row>

  <nut-row>
    <nut-col :span="8">
      <view>span:8</view>
    </nut-col>
    <nut-col :span="8">
      <view>span:8</view>
    </nut-col>
    <nut-col :span="8">
      <view>span:8</view>
    </nut-col>
  </nut-row>

  <nut-row>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
  </nut-row>
</template>
```

### 分栏间隔

```html
<template>
  <nut-row :gutter="10">
    <nut-col :span="8">
      <view>span:8</view>
    </nut-col>
    <nut-col :span="8">
      <view>span:8</view>
    </nut-col>
    <nut-col :span="8">
      <view>span:8</view>
    </nut-col>
  </nut-row>
</template>
```

### Flex 布局

```html
<template>
  <nut-row type="flex" wrap="nowrap">
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
  </nut-row>

  <nut-row type="flex" justify="center">
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
  </nut-row>

  <nut-row type="flex" justify="end">
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
  </nut-row>

  <nut-row type="flex" justify="space-between">
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
  </nut-row>

  <nut-row type="flex" justify="space-around">
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
  </nut-row>

  <nut-row type="flex" justify="space-evenly">
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
    <nut-col :span="6">
      <view>span:6</view>
    </nut-col>
  </nut-row>
</template>
```

## API

### Row Props

| 参数        | 说明              | 类型              | 可选值                                                                | 默认值        |
|-----------|-----------------|-----------------|--------------------------------------------------------------------|------------|
| type      | 布局方式            | string          | flex                                                               | -          |
| gutter    | 列元素之间的间距（单位：px） | string / number | -                                                                  | -          |
| justify   | flex 主轴对齐方式     | string          | start / end / center / space-around / space-between / space-evenly | start      |
| align     | flex 交叉轴对齐方式    | string          | flex-start / center / flex-end                                     | flex-start |
| flex-wrap | flex 是否换行       | string          | nowrap / wrap / reverse                                            | nowrap     |

### Col Props

| 参数     | 说明                                        | 类型              | 可选值 | 默认值  |
|--------|-------------------------------------------|-----------------|-----|------|
| span   | 列元素宽度（共分为 24 份，例如设置一行 3 个，那么 `span` 值为 8） | string / number | -   | `24` |
| offset | 列元素偏移距离                                   | string / number | -   | `0`  |
