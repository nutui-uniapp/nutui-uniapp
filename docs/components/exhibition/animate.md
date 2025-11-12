# Animate 动画/动效

### 介绍

给子元素添加动画效果。

### 基础用法

```html
<template>
  <nut-animate :show="show1" type="slide-right">
    <nut-button @click="onClick1()">单次动画</nut-button>
  </nut-animate>

  <nut-animate :show="show2" type="slide-right">
    <nut-button @click="onClick2()">多次触发</nut-button>
  </nut-animate>
</template>
```

```ts
const show1 = ref(false);
const show2 = ref(false);

function onClick1() {
  show1.value = true;
}

function onClick2() {
  show2.value = true;

  setTimeout(() => {
    show2.value = false;
  }, 500);
}
```

### 循环动画

```html
<template>
  <nut-animate type="shake" loop>
    <text>Shake 抖动</text>
  </nut-animate>

  <nut-animate type="ripple" loop>
    <text>Ripple 心跳</text>
  </nut-animate>

  <nut-animate type="breath" loop>
    <text>Breath 呼吸</text>
  </nut-animate>

  <nut-animate type="twinkle" loop>
    <text>Twinkle 水波</text>
  </nut-animate>

  <nut-animate type="flicker" loop>
    <text>Flicker 擦亮</text>
  </nut-animate>

  <nut-animate type="jump" loop>
    <text>Jump 跳跃</text>
  </nut-animate>

  <nut-animate type="float" loop>
    <text>Float 漂浮</text>
  </nut-animate>
</template>
```

### 点击触发

```html
<template>
  <nut-animate type="slide-right" action="click">
    <text>由右向左划入</text>
  </nut-animate>

  <nut-animate type="slide-left" action="click">
    <text>由左向右划入</text>
  </nut-animate>

  <nut-animate type="slide-top" action="click">
    <text>由上至下划入</text>
  </nut-animate>

  <nut-animate type="slide-bottom" action="click">
    <text>由下至上划入</text>
  </nut-animate>
</template>
```

## API

### Props

| 参数       | 说明                                                  | 类型              | 可选值                                                                                                              | 默认值       |
|----------|-----------------------------------------------------|-----------------|------------------------------------------------------------------------------------------------------------------|-----------|
| show     | 控制动画，当值从 `false` 变为 `true` 时会触发一次动画                 | boolean         | -                                                                                                                | `false`   |
| type     | 动画类型，见下方动画类型说明                                      | string          | shake / ripple / breath / float / slide-right / slide-left / slide-top / slide-bottom / jump / twinkle / flicker | -         |
| loop     | 是否循环执行                                              | boolean         | -                                                                                                                | `false`   |
| duration | 动画时长（单位：ms）                                         | number / string | -                                                                                                                | `500`     |
| action   | 触发方式（`initial` 初始化执行，`click` 点击执行）（不能与 `show` 同时使用） | string          | -                                                                                                                | `initial` |

#### 动画类型

| 名称           | 说明                    |
|--------------|-----------------------|
| shake        | 抖动，建议 `loop` 为 `true` |
| ripple       | 不循环是放大后缩小，循环则是心跳      |
| breath       | 呼吸，建议 `loop` 为 `true` |
| float        | 漂浮，建议 `loop` 为 `true` |
| slide-right  | 由右向左划入                |
| slide-left   | 由左向右划入                |
| slide-top    | 由上至下划入                |
| slide-bottom | 由下至上划入                |
| jump         | 跳跃，建议 `loop` 为 `true` |
| twinkle      | 水波，建议 `loop` 为 `true` |
| flicker      | 擦亮，建议 `loop` 为 `true` |

### Events

| 事件名     | 说明      | 类型                       |
|---------|---------|--------------------------|
| animate | 动画触发    | `() => void`             |
| click   | 点击元素时触发 | `(event: Event) => void` |

### Slots

| 名称      | 说明 |
|---------|----|
| default | 内容 |
