# 组件文档模板

### 介绍

描述一个组件文档的基本内容和格式。

### 基础用法

简短描述基础用法。

```html
<template>
  <!-- ... -->
</template>
```

```ts

```

## API

### Props

| 参数           | 说明   | 类型      | 可选值                   | 默认值     |
|--------------|------|---------|-----------------------|---------|
| type `1.0.0` | 类型   | string  | default / primary     | default |
| size         | 尺寸   | string  | normal / small / mini | normal  |
| disabled     | 是否禁用 | boolean | -                     | `false` |
| z-index      | 层级   | number  | -                     | `10`    |

### Events

| 事件名   | 说明    | 类型                       |
|-------|-------|--------------------------|
| click | 点击时触发 | `(event: Event) => void` |

### Slots

| 名称      | 说明    |
|---------|-------|
| default | 自定义内容 |

| 名称      | 说明   | 类型                           | 子标签      |
|---------|------|------------------------------|----------|
| default | 组件内容 | `{ attr: number \| string }` | MenuItem |

### Exposes

| 名称     | 说明     | 类型                        |
|--------|--------|---------------------------|
| update | 手动更新数据 | `(value: number) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称        | 默认值  |
|-----------|------|
| --nut-var | 16px |
