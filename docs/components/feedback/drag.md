# Drag 拖拽

### 介绍

实现可拖拽的任意元素。

### 基础用法

```html
<template>
  <nut-drag>
    <text>可拖拽</text>
  </nut-drag>
</template>
```

### 限制拖拽方向

```html
<template>
  <nut-drag direction="x">
    <text>只能在 X 轴拖动</text>
  </nut-drag>

  <nut-drag direction="y">
    <text>只能在 Y 轴拖动</text>
  </nut-drag>
</template>
```

## API

### Props

| 参数        | 说明                              | 类型      | 可选值        | 默认值                                      |
|-----------|---------------------------------|---------|------------|------------------------------------------|
| attract   | 是否开启自动吸边（根据 `screenWidth` 进行吸边） | boolean | -          | `false`                                  |
| direction | 拖拽元素的拖拽方向限制                     | string  | x / y /all | all                                      |
| boundary  | 拖拽元素的拖拽边界                       | object  | -          | `{top: 0, right: 0, bottom: 0, left: 0}` |
