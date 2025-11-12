# Ecard 电子卡

### 介绍

虚拟电子卡选择。

### 基础用法

```html
<template>
  <nut-ecard v-model="money" :list="dataList"></nut-ecard>
</template>
```

`1.7.7` 开始提供 `EcardDataItem` 类型，之前版本使用 `{ price: number | string }`。

```ts
import type { EcardDataItem } from "nutui-uniapp";

const money = ref(0);

const dataList = ref<EcardDataItem[]>([
  { price: 10 },
  { price: 20 },
  { price: 30 },
  { price: 40 }
]);
```

### 相关事件

```html
<template>
  <nut-ecard
    v-model="money"
    :list="dataList"
    @update="onUpdate"
    @change="onChange"
    @input-change="onInputChange"
    @change-step="onStepChange"
    @input-click="onInputClick"
  ></nut-ecard>
</template>
```

`1.7.7` 开始提供 `EcardChangeEvent`、`EcardDataValue` 类型和 `update` 事件。

```ts
import type { EcardChangeEvent, EcardDataValue, EcardDataItem } from "nutui-uniapp";

const money = ref(0);

const dataList = ref<EcardDataItem[]>([
  { price: 10 },
  { price: 20 },
  { price: 30 },
  { price: 40 }
]);

function onUpdate(value: EcardDataValue) {
  console.log("updated", value);
}

function onChange(event: EcardChangeEvent) {
  console.log("changed", event);
}

function onInputChange(value: string) {
  console.log("input changed", value);
}

function onStepChange(count: number, price: EcardDataValue) {
  console.log("step changed", count, price);
}

function onInputClick() {
  console.log("input clicked");
}
```

### 手动更新

`1.7.7` 开始支持通过 `ref` 手动更新。

```html
<template>
  <nut-ecard
    ref="ecardEl"
    v-model="money"
    :list="dataList"
  ></nut-ecard>
</template>
```

```ts
import type { EcardInst, EcardDataItem } from "nutui-uniapp";

const money = ref(0);

const dataList = ref<EcardDataItem[]>([
  { price: 10 },
  { price: 20 },
  { price: 30 },
  { price: 40 }
]);

const ecardEl = ref<EcardInst>();

// 更新选中项
function updateCurrentIndex() {
  ecardEl.value.update({
    index: 1
  });
}

// 更新输入值
function updateInputValue() {
  ecardEl.value.update({
    index: -1,
    input: "123"
  });
}

// 更新数量
function updateCount() {
  ecardEl.value.update({
    index: 1,
    count: 2
  });
}
```

## API

### Props

| 参数                 | 说明           | 类型                | 可选值 | 默认值         |
|--------------------|--------------|-------------------|-----|-------------|
| v-model            | 购买电子卡所需价钱    | number / string   | -   | `0`         |
| list               | 电子卡面值预设列表    | `EcardDataItem[]` | -   | `[]`        |
| choose-text        | 选择面值文案       | string            | -   | 请选择电子卡面值    |
| show-other `1.6.1` | 是否显示其他面值控制   | boolean           | -   | `true`      |
| other-value-text   | 其他面值文案       | string            | -   | 其他面值        |
| placeholder        | 其他面值默认提示语    | string            | -   | 请输入1-5000整数 |
| suffix             | 符号标识         | string            | -   | ¥           |
| card-amount-min    | 其它面值最小值      | number / string   | -   | `1`         |
| card-amount-max    | 其他面值最大值      | number / string   | -   | `9999`      |
| show-step `1.6.1`  | 是否显示是否显示数量步进 | boolean           | -   | `true`      |
| card-buy-min       | 购买数量最小值      | number            | -   | `1`         |
| card-buy-max       | 购买数量最大值      | number            | -   | `9999`      |

### Events

| 事件名            | 说明     | 类型                                               |
|----------------|--------|--------------------------------------------------|
| update `1.7.7` | 合计金额变化 | `(value: EcardDataValue) => void`                |
| change         | 切换预设面值 | `(event: EcardChangeEvent) => void`              |
| input-change   | 输入其他面值 | `(value: string) => void`                        |
| change-step    | 数量变化   | `(count: number, value: EcardDataValue) => void` |
| input-click    | 点击输入框  | `() => void`                                     |

```ts
type EcardDataValue = number | string;

interface EcardDataItem {
  price: EcardDataValue;
}

interface EcardChangeEvent {
  price: EcardDataValue;
}
```

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Ecard 实例并调用实例方法。

| 名称             | 说明   | 类型                                      |
|----------------|------|-----------------------------------------|
| update `1.7.7` | 更新面值 | `(options: EcardUpdateOptions) => void` |

```ts
interface EcardUpdateOptions {
  /**
   * 选中项（从0开始的索引，-1表示选中输入框，null表示不选中）
   */
  index?: number | null;
  /**
   * 其他面值（当index为-1或null时有效）
   */
  input?: string;
  /**
   * 数量
   */
  count?: number;
}
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                   | 默认值     | 描述 |
|----------------------|---------|----|
| --nut-ecard-bg-color | #f0f2f5 | -  |
