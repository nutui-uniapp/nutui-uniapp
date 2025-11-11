# Tour 引导 <Badge type="warning">H5</Badge>

### 介绍

用于引导用户了解产品功能的气泡组件。

### 基础用法

在每一步中设置 `target` 目标元素的 id，Tour 组件则会根据设置的 id 值进行查找。

```html
<template>
  <nut-cell title="点击试试">
    <template #link>
      <nut-switch id="target1" v-model="value1" @click="visible = true" />
    </template>
  </nut-cell>

  <nut-tour
    v-model="visible"
    :steps="steps"
    type="tile"
    location="bottom-end"
  ></nut-tour>
</template>
```

```ts
const visible = ref(false);

const value1 = ref(false);

const steps = ref([
  {
    content: "70+ 高质量组件，覆盖移动端主流场景",
    target: "target1"
  }
]);
```

### 自定义样式

通过 `mask-width`、`mask-height`、`bg-color` 可配置镂空遮罩的大小、气泡弹层背景色。

```html
<template>
  <nut-tour
    v-model="visible"
    :steps="steps"
    type="tile"
    theme="dark"
    location="bottom-end"
    mask-width="50"
    mask-height="50"
    bg-color="#ff0000"
  ></nut-tour>
</template>
```

### 设置偏移量

`offset` 可设置镂空遮罩层相对于目标元素的距离，`popoverOffset` 可设置气泡层的偏移量。

```html
<template>
  <nut-tour
    v-model="visible"
    :steps="steps"
    type="tile"
    theme="dark"
    location="bottom-end"
    :offset="[8, 8]"
    bg-color="#ff0000"
  ></nut-tour>
</template>
```

```ts
const visible = ref(false);

const steps = ref([
  {
    content: "支持一套代码同时开发多端小程序+H5",
    target: "target1",
    popoverOffset: [40, 12],
    arrowOffset: -36
  }
]);
```

### 自定义内容

通过插槽可自定义气泡层内容。

```html
<template>
  <nut-tour
    v-model="visible"
    :steps="steps"
    type="tile"
    theme="dark"
    location="bottom-end"
    :offset="[8, 8]"
    :close-on-click-overlay="false"
  >
    <view>
      <text>NutUI 2.x 即将发布，敬请期待</text>
      <nut-divider direction="vertical"></nut-divider>
      <nut-button @click="visible = false">知道了</nut-button>
    </view>
  </nut-tour>
</template>
```

### 步骤引导

将 `type` 设置为 `step` 可以进行步骤操作，`steps` 数组中的每一项代表每步的内容。

```html
<template>
  <nut-tabbar bottom>
    <nut-tabbar-item id="target1" tab-title="首页"></nut-tabbar-item>
    <nut-tabbar-item id="target2" tab-title="分类"></nut-tabbar-item>
    <nut-tabbar-item id="target3" tab-title="购物车"></nut-tabbar-item>
    <nut-tabbar-item id="target4" tab-title="我的"></nut-tabbar-item>
  </nut-tabbar>

  <nut-tour
    v-model="visible"
    :steps="steps"
    location="top-start"
    :offset="[0, 0]"
    mask-width="60"
    mask-height="50"
  ></nut-tour>
</template>
```

```ts
const visible = ref(false);

const steps = ref([
  {
    content: "70+ 高质量组件，覆盖移动端主流场景",
    target: "target1"
  },
  {
    content: "支持一套代码同时开发多端小程序+H5",
    target: "target2"
  },
  {
    content: "基于京东APP 10.0 视觉规范",
    target: "target3",
    location: "top-end"
  },
  {
    content: "支持定制主题，内置 700+ 个主题变量",
    target: "target4",
    location: "top-end"
  }
]);
```

## API

### Props

| 参数                     | 说明                        | 类型              | 可选值          | 默认值       |
|------------------------|---------------------------|-----------------|--------------|-----------|
| v-model                | 是否展示引导弹出层                 | boolean         | -            | `false`   |
| type                   | 引导类型                      | string          | tile / step  | step      |
| steps                  | 引导步骤内容                    | Array           | -            | `[]`      |
| offset                 | 镂空遮罩相对于目标元素的偏移量           | Array           | -            | `[8, 10]` |
| current                | `type` 为 `step` 时，默认展示第几步 | number          | -            | `0`       |
| location               | 弹出层位置                     | string          | -            | bottom    |
| next-step-txt          | 下一步按钮文案                   | string          | -            | 下一步       |
| prev-step-txt          | 上一步按钮文案                   | string          | -            | 上一步       |
| complete-txt           | 完成按钮文案                    | string          | -            | 完成        |
| mask                   | 是否显示镂空遮罩                  | boolean         | -            | `true`    |
| bg-color               | 自定义背景色                    | boolean         | -            | -         |
| theme                  | 气泡遮罩层主题                   | string          | light / dark | light     |
| mask-width             | 镂空遮罩层宽度                   | number / string | -            | -         |
| mask-height            | 镂空遮罩层高度                   | number / string | -            | -         |
| close-on-click-overlay | 是否在点击镂空遮罩层后关闭             | Boolean         | -            | `true`    |
| show-prev-step         | 是否展示上一步按钮                 | boolean         | -            | `true`    |
| show-title-bar         | 是否展示标题栏                   | boolean         | -            | `true`    |

#### Step 数据结构

| 参数            | 说明      | 类型     | 默认值       |
|---------------|---------|--------|-----------|
| target        | 目标对象    | string | -         |
| content       | 气泡层内容   | string | -         |
| location      | 弹出层位置   | string | bottom    |
| popoverOffset | 气泡层偏移量  | Array  | `[0, 12]` |
| arrowOffset   | 小箭头的偏移量 | number | `0`       |

### Events

| 事件名    | 说明       | 类型                        |
|--------|----------|---------------------------|
| change | 切换步骤时触发  | `(index: number) => void` |
| close  | 气泡层关闭时触发 | `(index: number) => void` |

### Slots

| 名称        | 说明       |
|-----------|----------|
| default   | 自定义气泡层内容 |
| prev-step | 自定义上一步内容 |
| next-step | 自定义下一步内容 |
