---
title: Transition 过渡动画
aside: false
---

# Transition 过渡动画

## 基础用法

通过 `:show` 控制过渡动画是否展示。

```html
<script setup lang="ts">
import { ref } from 'vue'
const showValue = ref(false)
</script>

<template>
  <ATransition :show="showValue"></ATransition>
  <ACell title="展示过渡动画" arrow @click="showValue = true" />
</template>
```

## 内置动画

通过 `name` 属性设置内置动画，目前支持 `fade` `fade-up` `fade-down` `fade-left` `fade-right` `slide-up` `slide-down` `slide-left` `slide-right` `zoom`。

```html
<template>
  <ATransition :show="showValue" name="fade"></ATransition>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| show | 是否展示过渡动画 | `boolean` | `false` |
| name | 内置动画名称，可选值为 `fade` `fade-up` `fade-down` `fade-left` `fade-right` `slide-up` `slide-down` `slide-left` `slide-right` `zoom` | `string` | `fade` |
| duration | 动画时长，单位为毫秒 | `number` | `200` |
| timing-function | 动画函数 | `string` | `ease` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| before-enter | 进入过渡动画前触发 | - |
| enter | 进入过渡动画时触发 | - |
| after-enter | 进入过渡动画后触发 | - |
| before-leave | 离开过渡动画前触发 | - |
| leave | 离开过渡动画时触发 | - |
| after-leave | 离开过渡动画后触发 | - |

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义内容 |
