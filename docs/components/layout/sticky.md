# Sticky 粘性布局

### 介绍

与 CSS 中 `position: sticky` 实现的效果一致，当组件在屏幕范围内时会按照正常的布局排列，当组件滚出屏幕范围时始终会固定在屏幕顶部。

### 基础用法

```html
<template>
  <nut-sticky>
    <nut-button type="primary">吸顶按钮</nut-button>
  </nut-sticky>
</template>
```

### 吸顶距离

```html
<template>
  <nut-sticky offset-top="100">
    <nut-button type="primary">吸顶距离 100px</nut-button>
  </nut-sticky>
</template>
```

## API

### Props

| 参数                | 说明                             | 类型              | 可选值 | 默认值         |
|-------------------|--------------------------------|-----------------|-----|-------------|
| offset-top        | 吸顶距离                           | number / string | -   | `0`         |
| z-index           | 吸附时的层级                         | number / string | -   | `2000`      |
| custom-nav-height | 导航栏高度，自定义导航栏时使用（H5 端默认值为 `44`） | number / string | -   | `0`         |
| disabled          | 是否禁用吸顶功能                       | boolean         | -   | `false`     |
| bg-color          | 组件背景颜色                         | string          | -   | transparent |
