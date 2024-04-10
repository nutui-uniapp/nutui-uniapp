# Countup 数字滚动

### 介绍

数字滚动组件，用于数字的动态效果展示

### 基础用法

```html
<template>
    <nut-countup :init-num='0' :end-num='200'></nut-countup>
    <nut-countup :init-num='150.00' :end-num='0.00' :speed='2.62' :to-fixed='2'></nut-countup>
    <nut-countup :init-num='1000.00' :end-num='0.00' :speed='50' :to-fixed='2'></nut-countup>
</template>
```

### 自定义数字图片展示

```html
<template>
    <nut-countup
        :custom-change-num="customNumber"
        :custom-bg-img="bgImage"
        :custom-spac-num="11"
        :num-width="33"
        :num-height="47"
        :during="5000"
    >
    </nut-countup>
</template>
<script>
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const customNumber = ref(618);
        const bgImage = ref('https://img10.360buyimg.com/imagetools/jfs/t1/133024/3/2251/2646/5ee7549aE8dc02d7e/de6901b6c72db396.png');
        const run = () => {
            let timer = null;
            timer = setInterval(() => {
                customNumber.value = Math.floor(Math.random() * (700 - 100 + 1) + 100);
            }, 5000)
        };
        onMounted(() => {
            run();
        });
        return {
            customNumber,
            bgImage
        }
    }
};
</script>
```

### 抽奖

```html
<template>
  <nut-countup
    ref="countupMachineDom"
    type="machine"
    :machine-num="machineNum"
    :machine-prize-num="5"
    :machine-prize-level="prizeLevel"
    :custom-bg-img="bgImage"
    :num-width="100"
    :num-height="100"
    :during="3000"
    @scroll-end="scrollAniEnd"
  >
  </nut-countup>
  <div class="btnBtn">
    <nut-button type="danger" @click="startRole" :disabled="startFlag">
      中奖
    </nut-button>
    <nut-button type="danger" @click="startRole2" :disabled="startFlag">
      不中奖
    </nut-button>
  </div>
</template>
<script>
import { ref } from "vue";
export default {
  setup() {
    const countupMachineDom = ref(null);
    const startFlag = ref(false);
    const machineNum = ref(3);
    const bgImage = ref(
      "https://img10.360buyimg.com/imagetools/jfs/t1/121466/20/6784/28830/5f06e7f2Edbb8998c/9bdd9e7b24dff9fe.png"
    );
    const prizeLevel = ref(0);
    const startRole = () => {
      prizeLevel.value = Math.floor(Math.random() * 5 + 1);
      startFlag.value = true;
      countupMachineDom.value.machineLuck();
    };
    const startRole2 = () => {
      prizeLevel.value = -1;
      startFlag.value = true;
      setTimeout(() => {
        countupMachineDom.value.machineLuck();
      }, 500);
    };

    const scrollAniEnd = () => {
      console.log("恭喜中奖！！！");
      setTimeout(() => {
        startFlag.value = false;
      }, 300);
    };

    return {
      countupMachineDom,
      startFlag,
      machineNum,
      bgImage,
      prizeLevel,
      startRole,
      startRole2,
      scrollAniEnd,
    };
  },
};
</script>

<style lang="scss">
.btnBtn {
  text-align: center;
  .nut-button {
    margin-right: 20px;
  }
}
</style>

```

## API

### Props

| 参数                | 说明                                                         | 类型    | 默认值 |
| ------------------- | ------------------------------------------------------------ | ------- | ------ |
| init-num            | 初始数字                                                     | number  | `0`    |
| end-num             | 结束数字                                                     | number  | `0`    |
| speed               | 间隔数字，目前仅支持基础用法                                 | number  | `1`    |
| to-fixed            | 保留小数点后几位                                             | number  | `0`    |
| start-flag          | 触发数字滚动的标识                                           | boolean | `true` |
| during              | 滚动一次运行时间                                             | number  | `1000` |
| num-width           | 数字宽度，常用于自定义无缝滚动                               | number  | `20`   |
| num-height          | 数字高度，常用于自定义无缝滚动（抽奖功能必传）               | number  | `20`   |
| custom-change-num   | 要变化的数字（用于自定义图片，`initNum`、`endNum` 在此无效） | number  | `1`    |
| custom-bg-img       | 自定义图片（建议使用雪碧图实现，使用抽奖功能必须使用雪碧图） | string  | -      |
| custom-spac-num     | 图片中数字之间可能会存在间距                                 | number  | `0`    |
| type                | 抽奖功能传 machine，可选值为 `machine` `' '`                 | string  | `''`   |
| machine-prize-num   | 奖品个数，一共多少个奖品，必传                               | number  | `0`    |
| machine-num         | 抽奖位，即滚动几个，必传                                     | number  | `3`    |
| machine-prize-level | 中奖图标，图标在雪碧图中的位置                               | number  | `0`    |
| machine-turn-more   | 滚动圈数                                                     | number  | `0`    |

> 说明：抽奖功能需要结合图标位置计算，故需传入雪碧图中单个图标的高度 num-height；中奖奖品根据雪碧图中的奖品位数来定位，从 1 到 N；

### Events

| 事件名     | 说明               | 回调参数 |
| ---------- | ------------------ | -------- |
| scroll-end | 滚动结束后回调函数 | -        |
