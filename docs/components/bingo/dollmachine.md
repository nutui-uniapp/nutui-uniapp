# DollMachine 抓娃娃

### 介绍

模拟娃娃机抽奖，可配置图片、开始结束回调等。

### 基础用法

```html
<template>
  <nut-doll-machine
    ref="lottoRollDom"
    :prize-list="prizeList"
    :prize-index="prizeIndex"
    @start-turns="startTurns"
    @end-turns="endTurns"
  >
  </nut-doll-machine>
</template>

<script lang="ts">
  import { ref, reactive } from "vue";
  export default {
    props: {},
    setup() {
      const lottoRollDom: any = ref(null);
      const prizeList = reactive([
        {
          imagePath:
            "https://img11.360buyimg.com/imagetools/jfs/t1/147182/12/2440/6194/5f06cde6Ead240fe8/31082e30a182a5ce.png",
          text: "大鸡腿",
        },
        {
          imagePath:
            "https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png",
          text: "JOY",
        },
        {
          imagePath:
            "https://img11.360buyimg.com/imagetools/jfs/t1/128607/26/6643/6790/5f06cd27E9b5e15f7/7509bc7ce2da66b8.png",
          text: "VIP",
        },
        {
          imagePath:
            "https://img12.360buyimg.com/imagetools/jfs/t1/221361/4/7410/16458/61c9261eE45802396/27b64caa9e7c9bac.png",
          text: "JOY",
        },
      ]);

      // 中奖的奖品的index(此数据可根据后台返回的值重新赋值)
      const prizeIndex = ref(3);
      const startTurns = () => {
        console.log("开始抽奖");
      };

      const endTurns = () => {
        console.log("抽奖结束");
      };

      return {
        lottoRollDom,
        prizeList,
        prizeIndex,
        startTurns,
        endTurns,
      };
    },
  };
</script>
```

### Props

| 参数         | 说明                     | 类型   | 默认值                |
| ------------ | ------------------------ | ------ | --------------------- |
| prize-list   | 奖品列表                 | Array  | 目前需要至少 4 个奖品 |
| default-claw | 初始化爪子的图片链接     | string | -                     |
| active-claw  | 爪子抓到奖品的图片链接   | string | -                     |
| prize-index  | 中奖奖品在列表的索引位置 | Number | -1（-1 未中奖）       |

### Events

| 事件名        | 说明                             | 回调参数         |
| ----------- | -------------------------------- | ---------------- |
| init        | 游戏初始化                       | dom.value.init() |
| start-turns | 爪子开始下伸，赋值到 prize-index | -                |
| end-turns   | 爪子已经抓到/未抓到奖品触发      | -                |
