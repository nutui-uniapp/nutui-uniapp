# Rate 评分

### 介绍

用于快速的评级操作，或对评价进行展示。

### 基础用法

```html
<template>
  <nut-rate v-model="value"></nut-rate>
</template>
```

```ts
const value = ref(3);
```

### 半星

```html
<template>
  <nut-rate v-model="value" allow-half></nut-rate>
</template>
```

```ts
const value = ref(3.5);
```

### 自定义icon

```html
<template>
  <nut-rate v-model="value" custom-icon="heart-fill"></nut-rate>
</template>
```

### 自定义数量

```html
<template>
  <nut-rate v-model="value" :count="6"></nut-rate>
</template>
```

### 自定义颜色

```html
<template>
  <nut-rate v-model="value" active-color="#ffc800"></nut-rate>
</template>
```

### 禁用状态

```html
<template>
  <nut-rate v-model="value" disabled></nut-rate>
</template>
```

### 只读状态

```html
<template>
  <nut-rate v-model="value" readonly></nut-rate>
</template>
```

### 自定义尺寸

```html
<template>
  <nut-rate v-model="value" size="35"></nut-rate>
</template>
```

### 事件演示

```html
<template>
  <nut-rate v-model="value" @change="onChange"></nut-rate>
</template>
```

```ts
const value = ref(3);

function onChange(val: number) {
  console.log("change", val);
}
```

## API

### Props

| 参数           | 说明                          | 类型              | 可选值 | 默认值         |
|--------------|-----------------------------|-----------------|-----|-------------|
| v-model      | 当前 `star` 数                 | number / string | -   | `0`         |
| count        | `star` 总数                   | number / string | -   | `5`         |
| active-color | 图标选中颜色                      | string          | -   | #fa200c     |
| void-color   | 图标未选中颜色                     | string          | -   | #cccccc     |
| allow-half   | 是否半星                        | boolean         | -   | `false`     |
| readonly     | 是否只读                        | boolean         | -   | `false`     |
| disabled     | 是否禁用                        | boolean         | -   | `false`     |
| spacing      | 间距                          | number / string | -   | `14`        |
| size         | 尺寸大小（如 `20px` `2em` `2rem`） | number / string | -   | -           |
| custom-icon  | 自定义图标                       | string          | -   | star-fill-n |

### Events

| 事件名    | 说明            | 类型                        |
|--------|---------------|---------------------------|
| change | 当前分值修改时时触发的事件 | `(value: number) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                         | 默认值                      |
|----------------------------|--------------------------|
| --nut-rate-icon-color      | var(--nut-primary-color) |
| --nut-rate-icon-void-color | var(--nut-disable-color) |
