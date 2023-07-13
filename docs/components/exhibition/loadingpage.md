# LoadingPage 验证码输入框

### 介绍

加载时展示，该组件参考了uview的 loadingpage 组件

### 基础用法

```html
<template>
  <nut-loading-page :loading="true"  />
</template>
```

### 自定义图片

```html
<template>
  <nut-loading-page :loading="true" image="https://img14.360buyimg.com/imagetools/jfs/t1/167902/2/8762/791358/603742d7E9b4275e3/e09d8f9a8bf4c0ef.png"  />

</template>
```

### 自定义加载动画模式

```html
<template>
  <nut-loading-page custom-color="skyblue" loading-color="skyblue" bg-color="#e8e8e8" :loading="true"  />

</template>
```

## API

### Props

| 参数              | 说明                                              | 类型            | 默认值          |
|-------------------|---------------------------------------------------|-----------------|-----------------|
| loading   | 是否加载中                                          | boolean         |  `false`           |
| loadingText            | 提示内容     | string       | `正在加载`           |
| image          |文字上方用于替换loading动画的图片                                | `String`         | `            |
| bgColor | 背景颜色                                      | string         | `#fff`           |
| custom-color          | 字体颜色               | String          | `#606266` |
| font-size         | 字体大小，单位rpx               | `String \| Number`          | `18` |
| iconSize         | 加载中图标的颜色               | `String`          | `35` |
| loadingColor          | 边框和线条颜色               | String          | `#C8C8C8` |                       |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                    | 默认值                     |
| --------------------------------------- | -------------------------- |
| --nut-loadingpage-icon-margin-bottom | _var(--nut-loadingpage-icon-margin-bottom)_   |
