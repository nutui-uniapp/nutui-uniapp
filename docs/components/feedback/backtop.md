# Backtop 返回顶部

### 介绍

提供较长的页面快捷返回顶部功能。

### 基础用法

```html
<template>
  <nut-backtop @click="onClick">
    <template #content>
      <view class="flex flex-col">
        <text>我是测试数据1</text>
        <text>我是测试数据2</text>
        <text>我是测试数据3</text>
        <text>我是测试数据4</text>
        <text>我是测试数据5</text>
        <text>我是测试数据6</text>
        <text>我是测试数据7</text>
        <text>我是测试数据8</text>
        <text>我是测试数据9</text>
        <text>我是测试数据10</text>
        <text>我是测试数据11</text>
        <text>我是测试数据12</text>
        <text>我是测试数据13</text>
        <text>我是测试数据14</text>
        <text>我是测试数据15</text>
        <text>我是测试数据16</text>
        <text>我是测试数据17</text>
        <text>我是测试数据18</text>
        <text>我是测试数据19</text>
        <text>我是测试数据20</text>
        <text>我是测试数据21</text>
        <text>我是测试数据22</text>
        <text>我是测试数据23</text>
        <text>我是测试数据24</text>
      </view>
    </template>
  </nut-backtop>
</view>
```

```ts
function onClick() {
  console.log("click");
}
```

## API

### Props

| 参数           | 说明          | 类型     | 可选值 | 默认值   |
|--------------|-------------|--------|-----|-------|
| height       | 滚动区域的高度     | string | -   | 100vh |
| bottom       | 距离页面底部距离    | number | -   | `20`  |
| right        | 距离页面右侧距离    | number | -   | `10`  |
| distance     | 页面垂直滚动多高后出现 | number | -   | `200` |
| z-index      | 设置组件页面层级    | number | -   | `10`  |
| custom-color | 自定义图标颜色     | string | -   | -     |

### Events

| 事件名   | 说明        | 类型                       |
|-------|-----------|--------------------------|
| click | 按钮点击时触发事件 | `(event: Event) => void` |

### Slots

| 名称      | 说明         |
|---------|------------|
| content | 滚动容器中包含的内容 |
| icon    | 返回到顶部，按钮内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                         | 默认值     |
|----------------------------|---------|
| --nut-backtop-border-color | #e0e0e0 |
