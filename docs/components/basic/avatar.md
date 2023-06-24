---
title: Avatar 头像
aside: false
---

# Avatar 头像

## 基础用法

```html

<script setup lang="ts">
const image = 'https://pic2.imgdb.cn/item/644bf4470d2dde5777abf840.webp'
</script>

<template>
  <AAvatar :src="image" size="mini" />
  <AAvatar :src="image" size="small" />
  <AAvatar src="https://pic2.imgdb.cn/item/644bf3c40d2dde5777ab58cb.png" size="normal" />
  <AAvatar :src="image" size="large" />
  <AAvatar :src="image" cc="h-16 w-16" />
</template>
```

## 圆形

```html
<template>
  <AAvatar :src="image" cc="rounded-full" size="mini" />
  <AAvatar :src="image" cc="rounded-full" size="small" />
  <AAvatar :src="image" cc="rounded-full" size="normal" />
  <AAvatar :src="image" cc="rounded-full" size="large" />
</template>
```

## 自定义

```html
<template>
  <AAvatar cc="rounded-full bg-primary text-white">
    T
  </AAvatar>
  <AAvatar cc="rounded-full bg-primary text-white">
    <div class="i-tabler-loader" />
  </AAvatar>
</template>
```

## 头像组

```html

<script setup lang="ts">
const image = 'https://pic2.imgdb.cn/item/644bf4470d2dde5777abf840.webp'
const options = ref([
  { src: image },
  { src: image },
  { src: image },
  { src: image },
  { src: image },
])
</script>

<template>
  <AAvatarGroup :max="3" :options="options" />
  <AAvatarGroup :max="3" :options="options">
    <template #avatar="{ option: { src } }">
      <AAvatar cc="rounded-full" :src="src" />
    </template>
    <template #reset="{ reset }">
      <AAvatar cc="z-1 rounded-full bg-primary text-white">
        +{{ reset }}
      </AAvatar>
    </template>
  </AAvatarGroup>
</template>
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| size | 可选值为 `mini` `small` `normal'` `large` | `string` | `normal` |
| src | 图片链接 | `string` | `-` |
| fit | 图片填充模式，等同于原生的 object-fit 属性 | `string` | `cover` |

### Events

| 事件名 | 说明 | 回调参数 |
| --- | --- | --- |
| click | 点击头像时触发 | `event: MouseEvent`|

### Slots

| 名称 | 说明 |
| --- | --- |
| default | 自定义头像内容 |
