# Signature 签名

### 介绍

基于 Canvas 的签名组件。默认竖屏模式使用，如使用横屏模式，请开发者自行设置旋转角度或者宽高。

### 基础用法

```html
<template>
  <nut-signature @confirm="onConfirm" @clear="onClear"></nut-signature>

  <image v-if="signUrl" :src="signUrl"></image>
</template>
```

```ts
const signUrl = ref("");

function onConfirm(canvas: any, data: string) {
  if (data === "") {
    return;
  }

  signUrl.value = data;

  console.log("图片地址", canvas, data);
}

function onClear() {
  signUrl.value = "";
}
```

### 修改颜色和签字粗细

```html
<template>
  <nut-signature
    :line-width="4"
    stroke-style="green"
    @confirm="onConfirm"
    @clear="onClear"
  ></nut-signature>
</template>
```

## API

### Props

| 参数             | 说明                  | 类型     | 可选值 | 默认值                         |
|----------------|---------------------|--------|-----|-----------------------------|
| line-width     | 线条的宽度               | number | -   | `2`                         |
| stroke-style   | 绘图笔触颜色              | string | -   | #000                        |
| type           | 图片格式                | string | -   | png                         |
| un-support-tpl | 不支持 canvas 情况下的展示文案 | string | -   | 对不起，当前浏览器不支持Canvas，无法使用本控件！ |

### Events

| 事件名     | 说明                  | 类型                                         |
|---------|---------------------|--------------------------------------------|
| start   | 签名开始回调函数（指某次笔画的开始）  | `() => void`                               |
| end     | 签名结束回调函数（指某次笔画的结束）  | `() => void`                               |
| signing | 正在签名的回调函数（指某次笔画进行中） | `(event: Event) => void`                   |
| confirm | 点击确认按钮触发事件回调函数      | `(canvas: any, filePath?: string) => void` |
| clear   | 点击重签按钮触发事件回调函数      | `() => void`                               |
