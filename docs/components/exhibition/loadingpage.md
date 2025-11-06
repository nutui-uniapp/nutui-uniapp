# LoadingPage 加载页

### 介绍

加载页，该组件参考了 uview-ui 的 [加载页](https://uviewui.com/components/loadingPage.html)。

### 基础用法

```html
<template>
  <nut-loading-page loading></nut-loading-page>
</template>
```

### 自定义图片

```html
<template>
  <nut-loading-page loading image="https://xxx.xx"></nut-loading-page>
</template>
```

### 自定义加载动画

```html
<template>
  <nut-loading-page
    loading
    custom-color="skyblue"
    loading-color="skyblue"
    bg-color="#e8e8e8"
  ></nut-loading-page>
</template>
```

## API

### Props

| 参数            | 说明         | 类型              | 可选值 | 默认值     |
|---------------|------------|-----------------|-----|---------|
| loading       | 是否加载中      | boolean         | -   | `false` |
| loading-text  | 提示内容       | string          | -   | 正在加载    |
| image         | 加载中图片      | string          | -   | -       |
| bg-color      | 背景颜色       | string          | -   | #ffffff |
| custom-color  | 字体颜色       | string          | -   | #C8C8C8 |
| font-size     | 字体大小，单位rpx | string / number | -   | `19`    |
| icon-size     | 加载中图标的颜色   | string          | -   | `28`    |
| loading-color | 边框和线条颜色    | string          | -   | #C8C8C8 |
| z-index       | 层级         | number          | -   | `9999`  |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                   | 默认值                                       |
|--------------------------------------|-------------------------------------------|
| --nut-loadingpage-icon-margin-bottom | var(--nut-loadingpage-icon-margin-bottom) |
