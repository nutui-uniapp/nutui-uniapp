# ActionSheet 动作面板

### 介绍

从底部弹出的动作菜单面板。

### 基础用法

```html
<template>
  <nut-action-sheet
    v-model:visible="visible"
    :menu-items="items"
    @choose="onChoose"
  ></nut-action-sheet>
</template>
```

```ts
import type { ActionSheetOption } from "nutui-uniapp";

const visible = ref(false);

const items = ref([
  { name: "选项一" },
  { name: "选项二" },
  { name: "选项三" }
]);

function onChoose(item: ActionSheetOption, index: number) {
  console.log("choose", item, index);
}
```

### 展示取消按钮

```html {5}
<template>
  <nut-action-sheet
    v-model:visible="visible"
    :menu-items="items"
    cancel-txt="取消"
    @choose="onChoose"
  ></nut-action-sheet>
</template>
```

### 展示描述信息

```html {5}
<template>
  <nut-action-sheet
    v-model:visible="visible"
    :menu-items="items"
    description="这是一段展示信息"
    @choose="onChoose"
  ></nut-action-sheet>
</template>
```

### 选项状态

```html
<template>
  <nut-action-sheet
    v-model:visible="visible"
    :menu-items="items"
    choose-tag-value="着色选项"
    @choose="onChoose"
  ></nut-action-sheet>
</template>
```

```ts
const items = ref([
  { name: "着色选项" },
  { name: "禁用选项", disable: true }
]);
```

### 自定义内容

```html
<template>
  <nut-action-sheet v-model:visible="visible" title="标题">
    <text>自定义内容</text>
  </nut-action-sheet>
</template>
```

## API

### Props

| 参数                              | 说明                                            | 类型            | 可选值 | 默认值     |
|---------------------------------|-----------------------------------------------|---------------|-----|---------|
| v-model:visible                 | 是否展示动作面板                                      | boolean       | -   | `false` |
| menu-items                      | 列表项                                           | Array         | -   | `[]`    |
| option-tag                      | 设置列表项标题展示使用参数                                 | string        | -   | name    |
| option-sub-tag                  | 设置列表项二级标题展示使用参数                               | string        | -   | subname |
| choose-tag-value                | 设置选中项的值，和 `option-tag` 的值对应                   | string        | -   | -       |
| custom-color                    | 选中项颜色，当 `choose-tag-value === option-tag` 时生效 | string        | -   | #ee0a24 |
| title                           | 设置列表项标题                                       | string        | -   | -       |
| description                     | 设置列表项副标题 / 描述                                 | string        | -   | -       |
| cancel-txt                      | 取消文案                                          | string        | -   | 取消      |
| close-abled                     | 遮罩层是否可关闭                                      | boolean       | -   | `true`  |
| round `1.7.11`                  | 是否显示圆角                                        | boolean       | -   | `true`  |
| overlay `1.7.11`                | 是否显示遮罩                                        | boolean       | -   | `true`  |
| pop-class                       | 自定义弹框类名                                       | string        | -   | -       |
| pop-style `1.7.11`              | 自定义弹框样式                                       | CSSProperties | -   | -       |
| overlay-class                   | 自定义遮罩层类名                                      | string        | -   | -       |
| overlay-style                   | 自定义遮罩层样式                                      | string        | -   | -       |
| lock-scroll `H5` `1.7.11`       | 遮罩显示时的背景是否锁定                                  | boolean       | -   | `true`  |
| safe-area-inset-bottom `1.7.11` | 是否开启 iphone 系列全面屏底部安全区适配                      | boolean       | -   | `true`  |

#### MenuItems 数据结构

| 参数      | 说明                       | 类型      |
|---------|--------------------------|---------|
| name    | 标题                       | string  |
| subname | 二级标题                     | string  |
| color   | 选项字体颜色（选中项颜色层级 > 选项字体颜色） | string  |
| loading | 是否为 loading 状态           | boolean |
| disable | 是否为禁用状态                  | boolean |

### Events

| 事件名    | 说明        | 类型                                                 |
|--------|-----------|----------------------------------------------------|
| choose | 选择之后触发    | `(item: ActionSheetOption, index: number) => void` |
| cancel | 点击取消文案时触发 | `() => void`                                       |
| close  | 点击遮罩层时触发  | `() => void`                                       |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                       | 默认值                                          |
|------------------------------------------|----------------------------------------------|
| --nut-actionsheet-light-color            | #f6f6f6                                      |
| --nut-actionsheet-item-border-bottom     | none                                         |
| --nut-actionsheet-item-font-size         | var(--nut-font-size-2)                       |
| --nut-actionsheet-item-subdesc-font-size | var(--nut-font-size-1)                       |
| --nut-actionsheet-item-cancel-border-top | 1px solid var(--nut-actionsheet-light-color) |
| --nut-actionsheet-item-line-height       | 24px                                         |
| --nut-actionsheet-item-font-color        | var(--nut-title-color)                       |
