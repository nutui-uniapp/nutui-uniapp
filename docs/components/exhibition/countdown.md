# Countdown 倒计时

### 介绍

用于实时展示倒计时数值，支持毫秒精度。

### 基础用法

```html
<template>
  <nut-countdown :end-time="end"></nut-countdown>
</template>
```

```ts
const end = ref(Date.now() + 60 * 1000);
```

### 自定义格式

通过设置 `format` 属性可实现不同的倒计时展示文本。

```html
<template>
  <nut-countdown :end-time="end" format="DD 天 HH 时 mm 分 ss 秒"></nut-countdown>
</template>
```

### 毫秒级渲染

```html
<template>
  <nut-countdown :end-time="end" millisecond format="HH:mm:ss:SS"></nut-countdown>
</template>
```

### 以服务端的时间为准

```html
<template>
  <nut-countdown :start-time="serverTime" :end-time="end"></nut-countdown>
</template>
```

```ts
const serverTime = ref(Date.now() - 20 * 1000);
const end = ref(Date.now() + 60 * 1000);
```

### 异步更新结束时间

```html
<template>
  <nut-countdown :end-time="asyncEnd"></nut-countdown>
</template>
```

```ts
const asyncEnd = ref(0);

// 模拟异步时间
setTimeout(() => {
  asyncEnd.value = Date.now() + 30 * 1000;
}, 3000);
```

### 控制开始和暂停倒计时

通过 `paused` 属性实现倒计时的暂停和重启。

```html
<template>
  <nut-countdown
    :end-time="end"
    :paused="paused"
    @on-paused="onPaused"
    @on-restart="onRestart"
  ></nut-countdown>

  <nut-button @click="toggle()">{{ paused ? "start" : "pause" }}</nut-button>
</template>
```

```ts
const end = ref(Date.now() + 60 * 1000);
const paused = ref(false);

function toggle() {
  paused.value = !paused.value;
}

function onPaused(value) {
  console.log("paused", value);
}

function onRestart(value) {
  console.log("restart", value);
}
```

### 自定义展示样式

```html
<template>
  <nut-countdown v-model="restTime" :end-time="end">
    <text>{{ restTime.d }}天</text>
    <text>{{ restTime.h }}</text>
    <text>:</text>
    <text>{{ restTime.m }}</text>
    <text>:</text>
    <text>{{ restTime.s }}</text>
  </nut-countdown>
</template>
```

```ts
const restTime = ref({
  d: "1",
  h: "00",
  m: "00",
  s: "00"
});

const end = ref(Date.now() + 60 * 1000);
```

### 手动控制

通过 `ref` 获取到组件实例后，可以调用 `start`、`pause`、`reset` 方法。
在使用手动控制时，通过 `time` 属性实现倒计时总时长（单位：ms），`startTime`、`endTime` 属性失效。

```html
<template>
  <nut-countdown
    ref="countdownEl"
    time="20000"
    format="ss:SS"
    :auto-start="false"
  ></nut-countdown>

  <nut-button @click="start()">开始</nut-button>
  <nut-button @click="pause()">暂停</nut-button>
  <nut-button @click="reset()">重置</nut-button>
</template>
```

```ts
import type { CountdownInst } from "nutui-uniapp";

const countdownEl = ref<CountdownInst>();

function start() {
  countdownEl.value.start();
}

function pause() {
  countdownEl.value.pause();
}

function reset() {
  countdownEl.value.reset();
}
```

## API

### Props

| 参数          | 说明                                         | 类型              | 可选值 | 默认值          |
|-------------|--------------------------------------------|-----------------|-----|--------------|
| v-model     | 当前时间，自定义展示内容时有效                            | object          | -   | `{}`         |
| start-time  | 开始时间                                       | string / number | -   | `Date.now()` |
| end-time    | 结束时间                                       | string / number | -   | `Date.now()` |
| format      | 时间格式                                       | string          | -   | HH:mm:ss     |
| millisecond | 是否开启毫秒级渲染                                  | boolean         | -   | `false`      |
| auto-start  | 是否自动开始倒计时                                  | boolean         | -   | `true`       |
| time        | 倒计时显示时间（单位：ms）（`auto-start` 为 `false` 时有效） | string / number | -   | `0`          |
| paused      | 是否暂停                                       | boolean         | -   | `false`      |

#### 时间格式

| 参数  | 说明      |
|-----|---------|
| DD  | 天       |
| HH  | 小时      |
| mm  | 分钟      |
| ss  | 秒       |
| S   | 毫秒（1 位） |
| SS  | 毫秒（2 位） |
| SSS | 毫秒（3 位） |

### Events

| 事件名        | 说明    | 类型                        |
|------------|-------|---------------------------|
| on-end     | 倒计时结束 | `() => void`              |
| on-paused  | 倒计时暂停 | `(value: number) => void` |
| on-restart | 倒计时开始 | `(value: number) => void` |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Countdown 实例并调用实例方法。

| 名称    | 说明                                         | 类型           |
|-------|--------------------------------------------|--------------|
| start | 开始倒计时                                      | `() => void` |
| pause | 暂停倒计时                                      | `() => void` |
| reset | 重置倒计时（若 `auto-start` 为 `true`，重置后会自动开始倒计时） | `() => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                        | 默认值     |
|---------------------------|---------|
| --nut-countdown-display   | flex    |
| --nut-countdown-color     | inherit |
| --nut-countdown-font-size | initial |
