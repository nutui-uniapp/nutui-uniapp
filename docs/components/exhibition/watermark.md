# Watermark 水印

### 介绍

页面上添加特定的文字或图案，可用于防止信息盗用。

### 基础用法

```html
<template>
  <nut-watermark content="水印内容" :z-index="1"></nut-watermark>

  <nut-watermark
    image="//img11.360buyimg.com/imagetools/jfs/t1/57345/6/20069/8019/62b995cdEd96fef03/51d3302dfeccd1d2.png"
    :image-width="60"
    :image-height="23"
    :z-index="1"
  ></nut-watermark>
</template>
```

### 局部用法

```html
<template>
  <nut-watermark content="NutUI" :full-page="false" font-color="#fa2c19"></nut-watermark>
</template>
```

### 多行水印

`content` 属性传入 string 数组，展示的则是多行水印。

```html
<template>
  <nut-watermark
    :content="['NutUI', 'Watermark']"
    :full-page="false"
    :gap-y="24"
    font-color="#fa2c19"
  ></nut-watermark>
</template>
```

## API

### Props

| 参数           | 说明                    | 类型              | 可选值 | 默认值                |
|--------------|-----------------------|-----------------|-----|--------------------|
| content      | 水印文字内容                | string / Array  | -   | -                  |
| width        | 水印的宽度                 | number          | -   | `120`              |
| height       | 水印的高度                 | number          | -   | `64`               |
| rotate       | 水印绘制时，旋转的角度           | number          | -   | `-22`              |
| image        | 水印图片（优先级高于 `content`） | string          | -   | -                  |
| image-width  | 图片宽度                  | number          | -   | `120`              |
| image-height | 图片高度                  | number          | -   | `64`               |
| z-index      | 水印元素的 `z-index`       | number          | -   | `2000`             |
| font-color   | 水印文字颜色                | string          | -   | rgba(0, 0, 0, .15) |
| font-size    | 文字大小                  | string / number | -   | `14`               |
| font-weight  | 文字字重                  | string          | -   | normal             |
| font-family  | 文字字体                  | string          | -   | PingFang SC        |
| gap-x        | 水印之间的水平间距             | number          | -   | `24`               |
| gap-y        | 水印之间的垂直间距             | number          | -   | `48`               |
| full-page    | 是否覆盖整个页面              | boolean         | -   | `true`             |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                      | 默认值  |
|-------------------------|------|
| --nut-watermark-z-index | 2000 |
