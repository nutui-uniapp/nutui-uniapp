---
title: Toast 轻提示
aside: false
---

# Toast 轻提示

## 基础用法

```html
<script setup lang="ts">
import { ref } from 'vue'
import type { ToastInst, ToastOptions } from 'ano-ui'

const toast = ref<ToastInst>()

function showToast(options: ToastOptions) {
  toast.value?.show(options)
}
</script>

<template>
  <AToast ref="toast" />
  <AButton @click="showToast({ position: 'default', message: '提示内容' })">
      展示轻提示
  </AButton>
</template>
```

## 弹出位置

Toast 默认渲染在屏幕正中位置，通过 `position` 属性可以控制 Toast 展示的位置。

```html
<script setup lang="ts">
import { ref } from 'vue'
import type { ToastInst, ToastOptions } from 'ano-ui'

const toast = ref<ToastInst>()

function showToast(options: ToastOptions) {
  toast.value?.show(options)
}
</script>

<template>
  <AToast ref="toast" />

  <!-- 顶部展示 -->
  <AButton @click="showToast({ position: 'top', message: '这是一个轻提示 2 秒后消失。' })">
    顶部展示
  </AButton>

  <!-- 底部展示 -->
  <AButton @click="showToast({ position: 'bottom', message: '这是一个轻提示 2 秒后消失。' })">
    底部展示
  </AButton>
</template>
```

## 展示图标

Toast 默认无图标，通过 `type` 属性可以设置图标。

```html
<template>
  <AButton @click="showToast({ type: 'loading', message: '加载中' })">
    加载中
  </AButton>
  <AButton @click="showToast({ type: 'success', message: '成功' })">
    成功
  </AButton>
  <AButton @click="showToast({ type: 'danger', message: '危险' })">
    危险
  </AButton>
  <AButton @click="showToast({ type: 'warning', message: '警告' })">
    警告
  </AButton>
</template>
```

## API

### ToastOptions 数据结构

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| message | 文本内容，支持通过 `\n` 换行 | `string` | '' |
| position | 位置，可选值为 `top` `bottom`  | `string` | `default` |
| type | 图标类型，可选值为 `loading` `success` `danger` `warning` | `string` | - |
| duration | 展示时长(ms)，值为 0 时，toast 不会消失 | `number` | `2000` |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容 |
| icon | 自定义图标类名 | `string` | - |
