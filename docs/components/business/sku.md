# Sku 商品规格选择

### 介绍

常用于进行商品选择。

### 基础用法

```html
<template>
  <nut-sku
    v-model:visible="visible"
    :sku="data.sku"
    :goods="data.goods"
    :btn-options="['cart', 'buy']"
    @selectSku="onSkuSelect"
    @clickBtnOperate="onOperateBtnClick"
    @close="onClose"
  ></nut-sku>
</template>
```

```ts
const visible = ref(false);

const data = reactive({
  sku: [],
  goods: {}
});

function onSkuSelect(event: any) {
  const { sku, skuIndex, parentSku, parentIndex } = event;

  if (sku.disable) {
    return;
  }

  for (const item of data.sku[parentIndex].list) {
    item.active = item.id == sku.id;
  }

  data.goods = {
    skuId: sku.id,
    price: "4599.00",
    imagePath: "//img14.360buyimg.com/n4/jfs/t1/215845/12/3788/221990/618a5c4dEc71cb4c7/7bd6eb8d17830991.jpg"
  };
}

function onOperateBtnClick(op: string) {
  console.log("点击了操作按钮", op);
}

function onClose() {
  console.log("关闭弹框");
}

onMounted(() => {
  uni.request({
    url: "https://storage.360buyimg.com/nutui/3x/data.js",
    success(res) {
      const { Sku, Goods } = res.data;

      data.sku = Sku;
      data.goods = Goods;
    }
  });
});
```

### 不可售

```html
<template>
  <nut-sku
    v-model:visible="visible"
    :sku="data.sku"
    :goods="data.goods"
    :btn-options="['buy', 'cart']"
    btn-extra-text="抱歉，此商品在所选区域暂无存货"
  >
    <template #skuOperate>
      <view>
        <nut-button type="warning">查看相似商品</nut-button>
        <nut-button type="info">到货通知</nut-button>
      </view>
    </template>
  </nut-sku>
</template>
```

### 自定义步进器

可以按照需求配置数字输入框的最大值、最小值、文案等。

```html
<template>
  <nut-sku
    v-model:visible="visible"
    :sku="data.sku"
    :goods="data.goods"
    :btn-options="['buy', 'cart']"
    :stepper-max="7"
    :stepper-min="2"
    :stepper-extra-text="stepperExtraText"
  ></nut-sku>
</template>
```

```ts
function stepperExtraText() {
  return `<div style="width:100%;text-align:right;color:#f00">2 件起售</div>`;
}
```

### sku 数组结构

`sku` 数组中，每一个数组索引代表一个规格类目。其中，`list` 代表该规格类目下的类目值，
每个类目值对象包括：`name`、`id`、`active`（是否选中）、`disable`（是否禁用）。

```ts
const sku = [
  {
    id: 1,
    name: "颜色",
    list: [
      {
        name: "亮黑色",
        id: 100016015112,
        active: true,
        disable: false
      },
      {
        name: "釉白色",
        id: 100016015142,
        active: false,
        disable: false
      }
      // ...
    ]
  }
  // ...
];
```

## API

### Props

| 参数                 | 说明                                           | 类型                 | 可选值 | 默认值         |
|--------------------|----------------------------------------------|--------------------|-----|-------------|
| v-model:visible    | 是否显示商品规格弹框                                   | boolean            | -   | `false`     |
| sku                | 商品 sku 数据                                    | Array              | -   | `[]`        |
| goods              | 商品信息                                         | object             | -   | -           |
| stepper-max        | 设置 inputNumber 最大值                           | string / number    | -   | `99999`     |
| stepper-min        | 设置 inputNumber 最小值                           | string / number    | -   | `1`         |
| btn-options        | 底部按钮设置（`confirm`：确定、`buy`：立即购买、`cart`：加入购物车） | Array              | -   | `[confirm]` |
| btn-extra-text     | 按钮上部添加文案，默认为空，有值时显示                          | string             | -   | -           |
| stepper-title      | 数量选择组件左侧文案                                   | string             | -   | 购买数量        |
| stepper-extra-text | InputNumber 与标题之间的文案                         | Function / boolean | -   | `false`     |
| buy-text           | 立即购买按钮文案                                     | string             | -   | 立即购买        |
| add-cart-text      | 加入购物车按钮文案                                    | string             | -   | 加入购物车       |
| confirm-text       | 确定按钮文案                                       | string             | -   | 确定          |

#### goods 数据结构

```ts
const goods = {
  // 商品信息展示区，商品编号
  skuId: "",
  // 商品信息展示区，商品价格
  price: "0",
  // 商品信息展示区，商品图
  imagePath: ""
};
```

### Events

| 事件名               | 说明                      | 类型                                                                                     |
|-------------------|-------------------------|----------------------------------------------------------------------------------------|
| select-sku        | 切换规格类目时触发               | `(event: { sku: any; skuIndex: number; parentSku: any; parentIndex: number }) => void` |
| add               | InputNumber 点击增加按钮时触发   | `(value: number \| object) => void`                                                    |
| reduce            | InputNumber 点击减少按钮时触发   | `(value: number \| object) => void`                                                    |
| over-limit        | InputNumber 点击不可用的按钮时触发 | `(value: object) => void`                                                              |
| change-stepper    | 购买变化时触发                 | `(value: number) => void`                                                              |
| click-btn-operate | 点击底部按钮时触发               | `(value: { type: string; value: string \| number }) => void`                           |
| click-close-icon  | 点击左上角关闭 icon 时触发        | `() => void`                                                                           |
| click-overlay     | 点击遮罩时触发                 | `() => void`                                                                           |
| close             | 关闭弹层时触发                 | `() => void`                                                                           |

### Slots

Sku 组件默认划分为若干区域，这些区域都定义成了插槽，可以按照需求进行替换。

| 名称               | 说明                            |
|------------------|-------------------------------|
| skuHeader        | 商品信息展示区，包含商品图片、价格、编号          |
| skuHeaderPrice   | 商品信息展示区，价格区域展示                |
| skuHeaderExtra   | 商品信息展示区，编号区域展示                |
| skuSelectTop     | Sku 展示区上方与商品信息展示区下方区域，无默认展示内容 |
| skuSelect        | Sku 展示区                       |
| skuStepper       | 数量选择区                         |
| skuStepperBottom | 数量选择区下方区域                     |
| skuOperate       | 底部按钮操作区域                      |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Sku 实例并调用实例方法。

| 名称         | 说明     | 类型           |
|------------|--------|--------------|
| resetCount | 重置商品数量 | `() => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                     | 默认值                                                                                                   |
|----------------------------------------|-------------------------------------------------------------------------------------------------------|
| --nut-sku-item-border                  | 1px solid var(--nut-primary-color)                                                                    |
| --nut-sku-item-disable-line            | line-through                                                                                          |
| --nut-sku-opetate-bg-default           | linear-gradient(90deg, var(--nut-primary-color), var(--nut-primary-color-end) 100%)                   |
| --nut-sku-item-active-bg               | var(--nut-primary-color)                                                                              |
| --nut-sku-opetate-bg-buy               | linear-gradient(135deg,rgba(255, 186, 13, 1) 0%,rgba(255, 195, 13, 1) 69%,rgba(255, 207, 13, 1) 100%) |
| --nut-sku-spec-height                  | 30px                                                                                                  |
| --nut-sku-spec-line-height             | var(--nut-sku-spec-height)                                                                            |
| --nut-sku-spec-font-size               | 11px                                                                                                  |
| --nut-sku-spec-background              | rgba(242, 242, 242, 1)                                                                                |
| --nut-sku-spec-color                   | var(--nut-black)                                                                                      |
| --nut-sku-spec-margin-right            | 12px                                                                                                  |
| --nut-sku-spec-padding                 | 0 18px                                                                                                |
| --nut-sku-spec-title-font-weight       | bold                                                                                                  |
| --nut-sku-spec-title-font-size         | 13px                                                                                                  |
| --nut-sku-spec-title-color             | var(--nut-black)                                                                                      |
| --nut-sku-spec-title-margin-bottom     | 18px                                                                                                  |
| --nut-sku-operate-btn-height           | 54px                                                                                                  |
| --nut-sku-operate-btn-border-top       | 0                                                                                                     |
| --nut-sku-operate-btn-item-height      | 40px                                                                                                  |
| --nut-sku-operate-btn-item-line-height | var(--nut-sku-operate-btn-item-height)                                                                |
| --nut-sku-operate-btn-item-font-size   | 15px                                                                                                  |
| --nut-sku-operate-btn-item-font-weight | normal                                                                                                |
| --nut-sku-product-img-width            | 100px                                                                                                 |
| --nut-sku-product-img-height           | var(--nut-sku-product-img-width)                                                                      |
| --nut-sku-product-img-border-radius    | 0                                                                                                     |
