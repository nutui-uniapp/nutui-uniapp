# ShakeDice 组件

### 介绍

摇骰子

### 基础用法

```html
<template>
  <nut-shakedice ref="dice" :id="id"></nut-shakedice>
  <div @click="jump" class="demoBtn">摇动</div>
</template>
<script>
  import { ref } from "vue";
  export default {
    setup() {
      const dice = ref();
      const id = ref();
      const jump = () => {
        id.value = 5;
        dice.value.shake();
      };
      return {
        jump,
        dice,
        id,
      };
    },
  };
</script>

<style lang="scss">
  body {
    width: 100%;
    height: 500px;
    text-align: center;
    background: url("//img12.360buyimg.com/imagetools/jfs/t1/95587/33/21814/218186/61e0015aE05e5fa32/e367632953cc3633.png")
      no-repeat bottom !important;
  }
  .nutbig-shakedice {
    margin: 70px auto;
  }
  .demoBtn {
    margin: 200px auto 0;
    width: 100px;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    background: linear-gradient(
      135deg,
      rgba(240, 22, 14, 1) 0%,
      rgba(240, 37, 15, 0.8) 69.83950099728881%,
      rgba(240, 78, 14, 1) 100%
    );
    border-radius: 20px;
    box-shadow: 0 4px 10px 0 rgba(240, 37, 15, 0.3);
  }
</style>
```

### Props

| 参数  | 说明                           | 类型   | 默认值 |
| ----- | ------------------------------ | ------ | ------ |
| time  | 旋转时间 ms                    | string | 3000   |
| speed | 旋转速度 几秒一圈              | number | 1      |
| id    | 中奖的 id(1 为 1 点，依次类推) | number | 1      |

### Events

| 事件名 | 说明         | 回调参数 |
| ------ | ------------ | -------- |
| shake  | 骰子开始摇动 | -        |
| end    | 骰子摇动结束 | -        |
