# Sticky 粘性布局

### 介绍

效果同 `css` 中的 `position: sticky`,对低端浏览器可使用其做兼容。

> 只支持吸顶效果，也可以使用官方推荐 <https://developers.weixin.qq.com/miniprogram/dev/platform-capabilities/extended/component-plus/sticky.html>

### 基础用法

```html
<template>
    <div class="demo">
       <view class="container">
        <nut-cell title="滚动页面,即可看到下方的按钮会吸顶" />
       </view>
       <nut-sticky>
         <nut-button type="primary" style="margin-left: 50px">
          吸顶按钮
         </nut-button>
       </nut-sticky>
    </div>
</template>
<style lang="scss">
    .demo {
        height: 1500px !important;
    }
</style>
```

### 吸顶距离

```html
<template>
    <div class="demo">
        <nut-sticky offset-top="120">
            <nut-button type="primary">吸顶距离120px</nut-button>
        </nut-sticky>
    </div>
</template>
<style lang="scss">
  .demo {
      height: 1500px !important;
  }
</style>
```

## API

### Props

| 参数         | 说明                             | 类型   | 默认值           |
|--------------|----------------------------------|--------|------------------|
| top         | 吸顶距离               | number | `0`                |
| z-index         | 吸附时的层级               | number | `2000`               |
| customNavHeight         | 导航栏高度，自定义导航栏时，需要传入此值               | number  | `0`               |
| disabled         | 是否禁用吸顶功能               | boolean | `false`               |
| bg-color         | 组件背景颜色               | string | `#ffffff`               |
| index         | 自定义标识，用于区分是哪一个组件             | number |                |
