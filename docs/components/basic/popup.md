# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示。

### 基础用法

通过设置 `visible` 控制显示 / 隐藏。

```html
<template>
  <nut-popup v-model:visible="visible"></nut-popup>
</template>
```

```ts
const visible = ref(false);
```

### 弹出位置

通过设置 `position` 来控制弹出位置。

```html
<template>
  <nut-popup v-model:visible="visible" position="center"></nut-popup>
  <nut-popup v-model:visible="visible" position="top"></nut-popup>
  <nut-popup v-model:visible="visible" position="right"></nut-popup>
  <nut-popup v-model:visible="visible" position="bottom"></nut-popup>
  <nut-popup v-model:visible="visible" position="left"></nut-popup>
</template>
```

### 图标

通过 `closeable` 控制图标是否可关闭，`close-icon-position` 设置图标的位置，`close-icon` 自定义显示图标，
参考 [图标](/components/basic/icon)。

```html
<template>
  <nut-popup v-model:visible="visible" closeable></nut-popup>

  <nut-popup v-model:visible="visible" closeable close-icon-position="top-left"></nut-popup>

  <nut-popup v-model:visible="visible" closeable>
    <template #close-icon>
      <nut-icon name="heart"></nut-icon>
    </template>
  </nut-popup>
</template>
```

### 圆角弹框

通过设置 `round` 来控制是否显示圆角。

```html
<template>
  <nut-popup v-model:visible="visible" round></nut-popup>
</template>
```

### 多层堆叠

```html
<template>
  <nut-popup v-model:visible="visible1">
    <text @tap="visible2 = true">打开第 2 层</text>
  </nut-popup>

  <nut-popup v-model:visible="visible2">正文</nut-popup>
</template>
```

## API

### Props

| 参数                     | 说明                                                    | 类型              | 可选值                                               | 默认值       |
|------------------------|-------------------------------------------------------|-----------------|---------------------------------------------------|-----------|
| v-model:visible        | 控制当前组件显示 / 隐藏                                         | boolean         | -                                                 | `false`   |
| position               | 弹出位置                                                  | string          | center / top / right / bottom / left              | center    |
| transition             | 动画名                                                   | string          | -                                                 | -         |
| pop-class              | 自定义弹框类名                                               | string          | -                                                 | -         |
| round                  | 是否显示圆角                                                | boolean         | -                                                 | `false`   |
| closeable              | 是否显示关闭按钮                                              | boolean         | -                                                 | `false`   |
| close-icon             | [图标名称](/components/basic/icon) 或图片链接                  | string          | -                                                 | close     |
| close-icon-position    | 关闭按钮位置                                                | string          | top-left / top-right / bottom-left / bottom-right | top-right |
| destroy-on-close       | 弹层关闭后 `slot` 内容是否销毁                                   | boolean         | -                                                 | `true`    |
| overlay                | 是否显示遮罩                                                | boolean         | -                                                 | `true`    |
| safe-area-inset-bottom | 是否开启 iphone 系列全面屏底部安全区适配（仅 `position` 为 `bottom` 时有效） | boolean         | -                                                 | `false`   |
| safe-area-inset-top    | 是否开启 iPhone 顶部安全区适配（仅 `position` 为 `top` 时有效）         | boolean         | -                                                 | `true`    |
| z-index                | 遮罩层级                                                  | number          | -                                                 | `2000+`   |
| duration               | 组件显示 / 隐藏的动画时长（单位：`ms`）                               | string / number | -                                                 | `300`     |
| overlay-class          | 自定义遮罩层类名                                              | string          | -                                                 | -         |
| overlay-style          | 自定义遮罩层样式                                              | `CSSProperties` | -                                                 | -         |
| lock-scroll `H5`       | 背景是否锁定                                                | boolean         | -                                                 | `false`   |
| close-on-click-overlay | 是否点击遮罩关闭                                              | boolean         | -                                                 | `true`    |

### Events

| 事件名              | 说明          | 类型                       |
|------------------|-------------|--------------------------|
| click-pop        | 点击弹出层时触发    | `(event: Event) => void` |
| click-close-icon | 点击关闭图标时触发   | -                        |
| click-overlay    | 点击遮罩触发      | -                        |
| open             | 打开弹框时触发     | -                        |
| opened           | 遮罩打开动画结束时触发 | -                        |
| close            | 关闭弹框时触发     | -                        |
| closed           | 遮罩关闭动画结束时触发 | -                        |

### Slots

| 名称         | 说明         |
|------------|------------|
| default    | 自定义内嵌内容    |
| close-icon | 关闭按钮的自定义图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                            | 默认值  |
|-------------------------------|------|
| --nut-popup-close-icon-margin | 16px |
| --nut-popup-border-radius     | 20px |
