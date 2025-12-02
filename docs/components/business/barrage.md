# Barrage 弹幕

### 介绍

用于话语和词组的轮播展示，适用于视频弹幕或其他类似需求。

### 基础用法

```html
<template>
  <nut-barrage ref="barrageEl" :danmu="list"></nut-barrage>

  <nut-button @click="add()">随机添加</nut-button>
</template>
```

```ts
import type { BarrageInst } from "nutui-uniapp";

const barrageEl = ref<BarrageInst>();

const list = ref([
  "画美不看",
  "不明觉厉",
  "喜大普奔",
  "男默女泪",
  "累觉不爱",
  "爷青结"
]);

function add() {
  barrageEl.value.add(`随机——${String(Math.random()).substr(2, 10)}`);
}
```

## API

### Props

| 参数        | 说明               | 类型      | 可选值 | 默认值    |
|-----------|------------------|---------|-----|--------|
| danmu     | 弹幕列表数据           | Array   | -   | `[]`   |
| frequency | 可视区域内每个弹幕出现的时间间隔 | number  | -   | `500`  |
| speeds    | 每个弹幕的滚动时间        | number  | -   | `5000` |
| rows      | 弹幕行数，分几行展示       | number  | -   | `3`    |
| top       | 弹幕垂直距离           | number  | -   | `10`   |
| loop      | 是否循环播放           | boolean | -   | `true` |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Barrage 实例并调用实例方法。

| 名称  | 说明   | 类型                        |
|-----|------|---------------------------|
| add | 添加数据 | `(value: string) => void` |
