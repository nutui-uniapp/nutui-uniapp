# CircleProgress 环形进度条

### 介绍

圆环形的进度条组件。

### 基础用法

```html
<template>
  <nut-circle-progress :progress="20"></nut-circle-progress>
</template>
```

### 环形进度条自定义宽度

```html
<template>
  <nut-circle-progress :progress="50" stroke-width="10"></nut-circle-progress>
</template>
```

### 环形进度条自定义颜色（支持渐变色）

```html
<template>
  <nut-circle-progress :progress="50" custom-color="red"></nut-circle-progress>
  <nut-circle-progress :progress="100" :custom-color="gradientColor"></nut-circle-progress>
</template>
```

```ts
const gradientColor = {
  "0%": "#ff5e5e",
  "100%": "#ffa062"
};
```

### 环形进度条自定义大小

```html
<template>
  <nut-circle-progress :progress="50" radius="60"></nut-circle-progress>
</template>
```

### 环形进度条自定义内容

```html
<template>
  <nut-circle-progress :progress="50">自定义</nut-circle-progress>
</template>
```

### 动态改变环形进度条的进度

```html
<template>
  <nut-circle-progress :progress="progress"></nut-circle-progress>

  <nut-button @click="decrease()">减少</nut-button>
  <nut-button @click="increase()">增加</nut-button>
</template>
```

```ts
const progress = ref(30);

function increase() {
  if (progress.value >= 100) {
    return;
  }

  progress.value = Math.min(100, progress.value + 10);
}

function decrease() {
  if (progress.value <= 0) {
    return;
  }

  progress.value = Math.max(0, progress.value - 10);
}
```

## API

### Props

| 参数             | 说明        | 类型              | 可选值                   | 默认值     |
|----------------|-----------|-----------------|-----------------------|---------|
| progress       | 百分比       | number / string | -                     | `0`     |
| stroke-width   | 圆弧的宽度     | number / string | -                     | `5`     |
| radius         | 半径        | number / string | -                     | `50`    |
| stroke-linecap | 圆环进度条端点形状 | string          | butt / round / square | round   |
| custom-color   | 圆环进度条颜色   | string / object | -                     | #ff673e |
| path-color     | 圆环轨道颜色    | string          | -                     | #d9d9d9 |
| clockwise      | 是否顺时针展示   | boolean         | -                     | `true`  |

### Slots

| 名称      | 说明      |
|---------|---------|
| default | 自定义文字内容 |
