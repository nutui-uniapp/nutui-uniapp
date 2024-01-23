# GiftBox 神秘大礼盒

### 介绍

用于礼盒抽奖，可配置图片、开始结束回调等。

### 基础用法

```html
<template>
  <nut-giftbox
    ref="refChild"
    @start-turns="startTurns"
    @end-turns="endTurns"
  >
  </nut-giftbox>
  <div @click="initBox">再来一次</div>
</template>
<script lang="ts">
  import { ref } from "vue";
  export default {
    setup() {
      const refChild = ref();
      const initBox = () => {
        refChild.value.init();
      };
      const startTurns = () => {
        console.log("开始");
      };
      const endTurns = () => {
        console.log("结束");
      };
      return {
        refChild,
        initBox,
        startTurns,
        endTurns,
      };
    },
  };
</script>
```

### Events

| 事件名        | 说明                   | 回调参数 |
| ----------- | ---------------------- | -------- |
| init        | 礼盒初始化             | -        |
| start-turns | 礼盒打开时候的回调函数 | -        |
| end-turns   | 礼盒打开后的回调函数   | -        |
