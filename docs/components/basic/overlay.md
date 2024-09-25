# Overlay 遮罩层

### 介绍

创建一个遮罩层，通常用于阻止用户进行其他操作

### 基础用法

使用 `visible` 控制遮罩层的显示/隐藏

```html
<template>
  <nut-overlay v-model:visible="visible" :z-index="2000"></nut-overlay>
</template>
```

```ts
const visible = ref(false)
```

### 遮罩样式

通过 `overlay-style` 进行设置遮罩样式

```html {3}
<template>
  <nut-overlay v-model:visible="visible"
               :overlay-style="overlayStyles"
               :z-index="2000"></nut-overlay>
</template>
```

```ts
const overlayStyles = {
  backgroundColor: 'rgba(0, 0, 0, .2)',
}
```

### 设置动画时间

通过 `duration` 设置遮罩显示/隐藏的时间，时间 `s`

```html {4}
<template>
  <nut-overlay v-model:visible="visible"
               :z-index="2000"
               :duration="2500"></nut-overlay>
</template>
```

### 锁定背景滚动

通过 `lock-scroll` 设置遮罩在显示时是否锁定背景，禁止滚动, 这个属性仅支持 H5

```html {4}
<template>
  <nut-overlay v-model:visible="visible"
               :z-index="2000"
               lock-scroll></nut-overlay>
</template>
```

### 锁定背景滚动 (小程序与 APP)

`lock-scroll`属性仅能在 H5生效，因为在 uniapp中没有办法有效的控制，因此我们只能使用官方提供的[方法](https://uniapp.dcloud.net.cn/component/uniui/uni-popup.html#%E7%A6%81%E6%AD%A2%E6%BB%9A%E5%8A%A8%E7%A9%BF%E9%80%8F), 通过`page-meta`标签控制

```html
<template>
  <page-meta :page-style="`overflow: ${visible ? 'hidden' : 'visible'}`"></page-meta>

  <view class="container">
    <!-- 普通弹窗 -->
    <nut-overlay v-model:visible="visible"></nut-overlay>
  </view>
</template>
```

### 嵌套内容

支持默认 `slot`，可嵌套任意内容

```html
<template>
  <nut-overlay v-model:visible="visible" :z-index="2000">
    <view class="wrapper">
      <view class="content">这里是正文</view>
    </view>
  </nut-overlay>
</template>
```

### 点击遮罩不关闭

设置 `close-on-click-overlay` 可控制点击遮罩是否关闭，如果设置为 `true`，那么 `click` 事件也将同时失效

```html {4}
<template>
  <nut-overlay v-model:visible="visible"
               :z-index="2000"
               :close-on-click-overlay="false">
    <view class="wrapper">
      <view class="content" @click.stop="visible = false">close</view>
    </view>
  </nut-overlay>
</template>
```

## API

### Props

| 参数                     | 说明                   | 类型              | 默认值     |
|------------------------|----------------------|-----------------|---------|
| v-model:visible        | 控制遮罩的显示/隐藏           | boolean         | `false` |
| z-index                | 自定义遮罩层级              | number          | -       |
| duration               | 显示/隐藏的动画时长，单位毫秒      | string / number | `300`   |
| overlay-class          | 自定义遮罩类名              | string          | -       |
| overlay-style          | 自定义遮罩样式              | `CSSProperties` | -       |
| lock-scroll `H5`       | 遮罩显示时的背景是否锁定         | boolean         | `false` |
| close-on-click-overlay | 点击遮罩时是否关闭            | boolean         | `true`  |
| destroy-on-close       | 弹层关闭后 `slot` 内容会不会清空 | boolean         | `false` |

### Events

| 事件名   | 说明    | 回调参数              |
|-------|-------|-------------------|
| click | 点击时触发 | event: MouseEvent |

### Slots

| 名称      | 说明        |
|---------|-----------|
| default | 内嵌遮罩内容自定义 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                     | 默认值                |
|------------------------|--------------------|
| --nut-overlay-bg-color | rgba(0, 0, 0, 0.7) |
