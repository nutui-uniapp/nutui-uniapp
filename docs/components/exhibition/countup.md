# Countup 数字滚动

### 介绍

数字滚动组件，用于数字的动态效果展示。

### 基础用法

```html
<template>
  <nut-countup :init-num="0" :end-num="200"></nut-countup>

  <nut-countup
    :init-num="150.00"
    :end-num="0.00"
    :speed="2.62"
    :to-fixed="2"
  ></nut-countup>

  <nut-countup
    :init-num="1000.00"
    :end-num="0.00"
    :speed="50"
    :to-fixed="2"
  ></nut-countup>
</template>
```

### 自定义数字图片展示

```html
<template>
  <nut-countup
    :custom-change-num="number"
    :custom-spac-num="11"
    custom-bg-img="https://img10.360buyimg.com/imagetools/jfs/t1/133024/3/2251/2646/5ee7549aE8dc02d7e/de6901b6c72db396.png"
    :num-width="33"
    :num-height="47"
    :during="5000"
  ></nut-countup>
</template>
```

```ts
const number = ref(618);

let timer: ReturnType<typeof setInterval> | null = null;

function run() {
  timer = setInterval(() => {
    number.value = Math.floor(Math.random() * (700 - 100 + 1) + 100);
  }, 5000);
}

onMounted(() => {
  run();
});

onBeforeUnmount(() => {
  if (timer != null) {
    clearInterval(timer);
    timer = null;
  }
});
```

### 抽奖

```html
<template>
  <nut-countup
    ref="countupEl"
    type="machine"
    :machine-num="number"
    :machine-prize-num="5"
    :machine-prize-level="prizeLevel"
    custom-bg-img="https://img10.360buyimg.com/imagetools/jfs/t1/121466/20/6784/28830/5f06e7f2Edbb8998c/9bdd9e7b24dff9fe.png"
    :num-width="100"
    :num-height="100"
    :during="3000"
    @scroll-end="onScrollEnd"
  ></nut-countup>

  <nut-button :disabled="playing" @click="start1()">中奖</nut-button>
  <nut-button :disabled="playing" @click="start2()">不中奖</nut-button>
</template>
```

```ts
import type { CountUpInst } from "nutui-uniapp";

const countupEl = ref<CountUpInst>();

const number = ref(3);
const prizeLevel = ref(0);

const playing = ref(false);

function start1() {
  prizeLevel.value = Math.floor(Math.random() * 5 + 1);
  playing.value = true;

  countupEl.value.machineLuck();
}

function start2() {
  prizeLevel.value = -1;
  playing.value = true;

  setTimeout(() => {
    countupEl.value.machineLuck();
  }, 500);
}

function onScrollEnd(value: boolean) {
  if (value) {
    console.log("中奖啦！");
  }

  setTimeout(() => {
    playing.value = false;
  }, 300);
}
```

## API

### Props

| 参数                  | 说明                                        | 类型      | 可选值     | 默认值    |
|---------------------|-------------------------------------------|---------|---------|--------|
| init-num            | 初始数字                                      | number  | -       | `0`    |
| end-num             | 结束数字                                      | number  | -       | `0`    |
| speed               | 间隔数字，目前仅支持基础用法                            | number  | -       | `1`    |
| to-fixed            | 保留小数点后几位                                  | number  | -       | `0`    |
| start-flag          | 触发数字滚动的标识                                 | boolean | -       | `true` |
| during              | 滚动一次运行时间                                  | number  | -       | `1000` |
| num-width           | 数字宽度，常用于自定义无缝滚动                           | number  | -       | `20`   |
| num-height          | 数字高度，常用于自定义无缝滚动（抽奖功能必传）                   | number  | -       | `20`   |
| custom-change-num   | 要变化的数字（用于自定义图片，`init-num`、`end-num` 在此无效） | number  | -       | `1`    |
| custom-bg-img       | 自定义图片（建议使用雪碧图实现，使用抽奖功能必须使用雪碧图）            | string  | -       | -      |
| custom-spac-num     | 图片中数字之间可能会存在间距                            | number  | -       | `0`    |
| type                | 抽奖功能传 machine                             | string  | machine | -      |
| machine-prize-num   | 奖品个数，一共多少个奖品，必传                           | number  | -       | `0`    |
| machine-num         | 抽奖位，即滚动几个，必传                              | number  | -       | `3`    |
| machine-prize-level | 中奖图标，图标在雪碧图中的位置                           | number  | -       | `0`    |
| machine-turn-more   | 滚动圈数                                      | number  | -       | `0`    |

说明：抽奖功能需要结合图标位置计算，故需传入雪碧图中单个图标的高度 `num-height`，中奖奖品根据雪碧图中的奖品位数来定位，从
`1` 到 `N`；

### Events

| 事件名        | 说明        | 类型                          |
|------------|-----------|-----------------------------|
| scroll-end | 滚动结束后回调函数 | `(value?: boolean) => void` |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Countup 实例并调用实例方法。

| 名称          | 说明 | 类型           |
|-------------|----|--------------|
| machineLuck | 抽奖 | `() => void` |
