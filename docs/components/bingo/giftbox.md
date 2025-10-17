# GiftBox 神秘大礼盒

### 介绍

用于礼盒抽奖，可配置图片、开始结束回调等。

### 基础用法

```vue
<template>
  <nut-giftbox
    ref="giftboxEl"
    @start-turns="onTurnsStart()"
    @end-turns="onTurnsEnd()"
  ></nut-giftbox>

  <nut-button @click="init()">再来一次</nut-button>
</template>
```

```ts
import type { GiftBoxInst } from "nutui-uniapp";

const giftboxEl = ref<GiftBoxInst>();

function init() {
  giftboxEl.value.init();
}

function onTurnsStart() {
  console.log("抽奖开始");
}

function onTurnsEnd() {
  console.log("抽奖结束");
}
```

### Events

| 事件名         | 说明     | 类型           |
|-------------|--------|--------------|
| start-turns | 开始打开礼盒 | `() => void` |
| end-turns   | 礼盒打开后  | `() => void` |

### Exposes

| 名称   | 说明    | 类型           |
|------|-------|--------------|
| init | 初始化礼盒 | `() => void` |
