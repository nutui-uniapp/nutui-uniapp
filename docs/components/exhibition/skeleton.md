# Skeleton 骨架屏

### 介绍

在页面上待加载区域填充灰色的占位图，本质上是界面加载过程中的过渡效果。

### 基础用法

```html
<template>
  <nut-skeleton width="250px" height="15px" animated></nut-skeleton>
</template>
```

### 传入多行

```html
<template>
  <nut-skeleton
    width="250px"
    height="15px"
    title
    animated
    row="3"
  ></nut-skeleton>
</template>
```

### 显示头像

```html
<template>
  <nut-skeleton
    width="250px"
    height="15px"
    title
    animated
    avatar
    avatar-size="60px"
    row="3"
  ></nut-skeleton>
</template>
```

### 标题段落圆角风格

```html
<template>
  <nut-skeleton
    width="250px"
    height="15px"
    animated
    round
  ></nut-skeleton>
</template>
```

### 组合

```html
<template>
  <view>
    <nut-skeleton
      width="250px"
      height="15px"
      title
      animated
      row="3"
    ></nut-skeleton>

    <nut-skeleton
      width="250px"
      height="15px"
      title
      animated
      row="3"
    ></nut-skeleton>
  </view>
</template>
```

### 显示子组件

```html
<template>
  <nut-switch v-model="loading"></nut-switch>

  <nut-skeleton
    width="250px"
    height="15px"
    title
    animated
    avatar
    row="3"
    :loading="loading"
  >
    <view class="flex flex-col">
      <nut-avatar size="50">
        <image src="https://xxx.xx"></image>
      </nut-avatar>
      <text>NutUI</text>
      <text>一套京东风格的轻量级移动端Vue组库，提供丰富的基础组件和业务组件，帮助开发者快速搭建移动应用。</text>
    </view>
  </nut-skeleton>
</template>
```

## API

### Props

| 参数           | 说明              | 类型      | 可选值            | 默认值     |
|--------------|-----------------|---------|----------------|---------|
| loading      | 是否显示骨架屏         | boolean | -              | `true`  |
| width        | 每行宽度            | string  | -              | 100px   |
| height       | 每行高度            | string  | -              | 15px    |
| animated     | 是否开启骨架屏动画       | boolean | -              | `false` |
| avatar       | 是否显示头像          | boolean | -              | `false` |
| avatar-shape | 头像形状            | string  | round / square | round   |
| avatar-size  | 头像大小            | string  | -              | 50px    |
| round        | 标题 / 段落是否采用圆角风格 | boolean | -              | `false` |
| row          | 设置段落行数          | string  | -              | 1       |
| title        | 是否显示段落标题        | boolean | -              | `true`  |

### Slots

| 名称      | 说明      |
|---------|---------|
| default | 骨架屏显示内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                             | 默认值                                                                                              |
|------------------------------------------------|--------------------------------------------------------------------------------------------------|
| --nut-skeleton-content-avatar-background-color | #efefef                                                                                          |
| --nut-skeleton-content-line-background-color   | #efefef                                                                                          |
| --nut-skeleton-animation-background-color      | linear-gradient(90deg,hsla(0, 0%, 100%, 0),hsla(0, 0%, 100%, 0.5) 50%, hsla(0, 0%, 100%, 0) 80%) |
