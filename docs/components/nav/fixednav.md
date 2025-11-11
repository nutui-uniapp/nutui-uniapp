# FixedNav 悬浮导航

### 介绍

悬浮收起体验交互，用于快捷导航。

### 基础用法

```html
<template>
  <nut-fixed-nav
    v-model:visible="visible"
    :nav-list="list"
    :position="{ top: '70px' }"
  ></nut-fixed-nav>
</template>
```

```ts
const visible = ref(false);

const list = ref([
  {
    id: 1,
    text: "首页",
    icon: "https://img11.360buyimg.com/imagetools/jfs/t1/117646/2/11112/1297/5ef83e95E81d77f05/daf8e3b1c81e3c98.png"
  },
  {
    id: 2,
    text: "分类",
    icon: "https://img12.360buyimg.com/imagetools/jfs/t1/119490/8/9568/1798/5ef83e95E968c69a6/dd029326f7d5042e.png"
  },
  {
    id: 3,
    text: "购物车",
    num: 2,
    icon: "https://img14.360buyimg.com/imagetools/jfs/t1/130725/4/3157/1704/5ef83e95Eb976644f/b36c6cfc1cc1a99d.png"
  },
  {
    id: 4,
    text: "我的",
    icon: "https://img12.360buyimg.com/imagetools/jfs/t1/147573/29/1603/1721/5ef83e94E1393a678/5ddf1695ec989373.png"
  }
]);
```

### 左侧效果

```html {5}
<template>
  <nut-fixed-nav
    v-model:visible="visible"
    :nav-list="list"
    type="left"
    :position="{ top: '140px' }"
  ></nut-fixed-nav>
</template>
```

### 取消背景遮罩

```html {6}
<template>
  <nut-fixed-nav
    v-model:visible="visible"
    :nav-list="list"
    :position="{ top: '210px' }"
    :overlay="false"
  ></nut-fixed-nav>
</template>
```

### 配合 Drag 支持拖拽，小程序暂不支持

```html
<template>
  <nut-drag :custom-style="{ right: 0, bottom: '240px' }" direction="y">
    <nut-fixed-nav
      v-model:visible="visible"
      :nav-list="list"
      un-active-text="支持拖拽"
    ></nut-fixed-nav>
  </nut-drag>
</template>
```

### 自定义使用

```html
<template>
  <nut-fixed-nav v-model:visible="visible" type="left" :position="{ top: '280px' }">
    <template #list>
      <view class="flex flex-col">
        <text>1</text>
        <text>2</text>
        <text>3</text>
        <text>4</text>
        <text>5</text>
      </view>
    </template>

    <template #btn>
      <nut-icon name="retweet" color="#ffffff"></nut-icon>
      <text>{{ visible ? "自定义开" : "自定义关" }}</text>
    </template>
  </nut-fixed-nav>
</template>
```

## API

### Props

| 参数             | 说明               | 类型      | 可选值          | 默认值                               |
|----------------|------------------|---------|--------------|-----------------------------------|
| visible        | 是否打开             | boolean | -            | `false`                           |
| nav-list       | 悬浮列表内容数据         | Array   | -            | `[]`                              |
| active-color   | 选中按钮文案颜色,默认集成主题色 | string  | -            | #fa2c19                           |
| active-text    | 收起列表按钮文案         | string  | -            | 收起导航                              |
| un-active-text | 展开列表按钮文案         | string  | -            | 快速导航                              |
| type           | 导航方向             | string  | left / right | right                             |
| overlay        | 展开时是否显示遮罩        | boolean | -            | `true`                            |
| position       | fixed 垂直位置       | object  | -            | `{ top: 'auto', bottom: 'auto' }` |

### Events

| 事件名      | 说明     | 类型                                           |
|----------|--------|----------------------------------------------|
| selected | 选择之后触发 | `(evt: { item: any, event: Event }) => void` |

### Slots

| 名称   | 说明        |
|------|-----------|
| btn  | 自定义按钮     |
| list | 自定义展开列表内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                               | 默认值                                                                                     |
|----------------------------------|-----------------------------------------------------------------------------------------|
| --nut-fixednav-bg-color          | var(--nut-white)                                                                        |
| --nut-fixednav-font-color        | var(--nut-black)                                                                        |
| --nut-fixednav-index             | 201                                                                                     |
| --nut-fixednav-btn-bg            | linear-gradient(135deg, var(--nut-primary-color) 0%, var(--nut-primary-color-end) 100%) |
| --nut-fixednav-item-active-color | var(--nut-primary-color)                                                                |
