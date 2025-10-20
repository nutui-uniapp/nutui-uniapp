# ShakeDice 组件

### 介绍

摇骰子。

### 基础用法

```html
<template>
  <nut-shakedice ref="diceEl" :id="id"></nut-shakedice>

  <nut-button @click="shake()">摇动</nut-button>
</template>
```

```ts
import type { ShakeDiceInst } from "nutui-uniapp";

const diceEl = ref<ShakeDiceInst>();

const id = ref();

function shake() {
  id.value = 2;
  diceEl.value.shake();
}
```

### Props

| 参数    | 说明                     | 类型     | 可选值 | 默认值    |
|-------|------------------------|--------|-----|--------|
| time  | 旋转时间（单位：s）             | number | -   | `1`    |
| speed | 旋转速度（单位：ms）            | number | -   | `3000` |
| id    | 中奖的 id（`1` 为 1 点，依此类推） | number | -   | `4`    |

### Events

| 事件名 | 说明     | 类型           |
|-----|--------|--------------|
| end | 骰子摇动结束 | `() => void` |

### Exposes

| 名称    | 说明     | 类型           |
|-------|--------|--------------|
| shake | 骰子开始摇动 | `() => void` |
