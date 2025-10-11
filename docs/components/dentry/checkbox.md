# Checkbox 复选按钮

### 介绍

多选按钮用于选择。

### 基础用法

```html
<template>
  <nut-checkbox v-model="value">复选框</nut-checkbox>
  <nut-checkbox v-model="value" text-position="left">复选框</nut-checkbox>
</template>
```

### 半选状态

```html
<template>
  <nut-checkbox v-model="value" :indeterminate="true">复选框
  </nut-checkbox>
</template>
```

### 禁用状态

```html
<template>
  <nut-checkbox v-model="value" disabled>禁用状态</nut-checkbox>
</template>
```

### 自定义尺寸

```html
<template>
  <nut-checkbox v-model="value" icon-size="25">自定义尺寸25</nut-checkbox>
  <nut-checkbox v-model="value" icon-size="10">自定义尺寸10</nut-checkbox>
</template>
```

### 自定义图标

通过slot自定义图标，建议同时设置 `icon` 和 `checkedIcon` 两个插槽

```html
<template>
  <nut-checkbox v-model="value">
    <template #icon>
      <nut-icon name="checklist"></nut-icon>
    </template>
    <template #checkedIcon>
      <nut-icon name="loading" color="red"></nut-icon>
    </template>
    自定义图标
  </nut-checkbox>
</template>
```

### change事件

值发生变化时，将触发 `change` 事件

```html
<template>
  <nut-checkbox v-model="value1" @change="onChange">复选框</nut-checkbox>
</template>
```

```typescript
const value1 = ref(true)

function onChange(checked: boolean, value: any) {
  console.log('是否选中', checked)
  console.log('变化后的值', value)
}
```

### checkboxGroup使用

```html
<template>
  <nut-checkbox-group v-model="value">
    <nut-checkbox label="1">组合复选框</nut-checkbox>
    <nut-checkbox label="2">组合复选框</nut-checkbox>
    <nut-checkbox label="3">组合复选框</nut-checkbox>
    <nut-checkbox label="4">组合复选框</nut-checkbox>
  </nut-checkbox-group>

  <nut-cell>
    <text>当前选中值：{{ value }}</text>
  </nut-cell>
</template>
```

```typescript
const value = ref(['2', '3'])
```

### checkboxGroup 全选/取消

```html
<template>
  <nut-checkbox-group ref="group"
                      v-model="value"
                      @change="onChange">
    <nut-checkbox v-for="item in source"
                  :key="item.label"
                  :label="item.label">{{ item.value }}
    </nut-checkbox>
  </nut-checkbox-group>

  <nut-button type="primary" @click="toggleAll(true)">全选</nut-button>
  <nut-button type="info" @click="toggleAll(false)">取消</nut-button>
  <nut-button type="warning" @click="toggleReverse()">反选</nut-button>
</template>
```

```typescript
// 自 1.7.14 开始更名为 CheckboxGroupInst，之前的版本为 CheckBoxInst（2.x版本将会废弃）
import type { CheckboxGroupInst } from 'nutui-uniapp'

const group = ref<CheckboxGroupInst | null>(null)

const value = ref<string[]>([])

const source = ref([
  { label: '1', value: '组合复选框' },
  { label: '2', value: '组合复选框' },
  { label: '3', value: '组合复选框' },
  { label: '4', value: '组合复选框' },
  { label: '5', value: '组合复选框' },
  { label: '6', value: '组合复选框' }
])

function onChange(value: any[]) {
  console.log(toRaw(value))
}

function toggleAll(checked: boolean) {
  group.value?.toggleAll(checked)
}

function toggleReverse() {
  group.value?.toggleReverse()
}
```

### 限制最大可选数

```html
<template>
  <nut-checkbox-group v-model="value" :max="2">
    <nut-checkbox label="1">组合复选框</nut-checkbox>
    <nut-checkbox label="2">组合复选框</nut-checkbox>
    <nut-checkbox label="3">组合复选框</nut-checkbox>
    <nut-checkbox label="4">组合复选框</nut-checkbox>
  </nut-checkbox-group>
</template>
```

### 全选/半选/取消

```html
<template>
  <nut-checkbox v-model="value"
                :indeterminate="indeterminate"
                @change="onChange">全选
  </nut-checkbox>

  <nut-checkbox-group ref="group"
                      v-model="groupValue"
                      @change="onGroupChange">
    <nut-checkbox label="1">组合复选框</nut-checkbox>
    <nut-checkbox label="2">组合复选框</nut-checkbox>
    <nut-checkbox label="3">组合复选框</nut-checkbox>
    <nut-checkbox label="4">组合复选框</nut-checkbox>
  </nut-checkbox-group>
</template>
```

```typescript
import type { CheckboxGroupInst } from 'nutui-uniapp'

const group = ref<CheckboxGroupInst | null>(null)

const value = ref(false)
const indeterminate = ref(false)

const groupValue = ref<string[]>([])

function onChange(checked: boolean) {
  group.value?.toggleAll(checked)
}

function onGroupChange(values: any[]) {
  if (values.length >= 4) {
    indeterminate.value = false
    value.value = true
  }
  else if (values.length > 0) {
    indeterminate.value = true
  }
  else {
    indeterminate.value = false
    value.value = false
  }
}
```

### 自定义选中/未选中状态的值

> 自 `1.7.14` 开始支持通过 `checked-value` 和 `unchecked-value` 自定义选中/未选中状态的值

```html
<template>
  <nut-checkbox v-model="value"
                checked-value="100"
                unchecked-value="200">复选框
  </nut-checkbox>
</template>
```

## API

### Checkbox Props

| 参数                     | 说明                                                       | 类型                        | 可选值                    | 默认值  |
|--------------------------|----------------------------------------------------------|-----------------------------|---------------------------|---------|
| v-model                  | 是否处于选中状态（`1.7.14` 开始支持 `number`、`string` 类型） | boolean \| number \| string | -                         | `false` |
| disabled                 | 是否禁用选择                                               | boolean                     | -                         | `false` |
| text-position            | 文本所在的位置                                             | string                      | ： \| left \| , \| right   | `right` |
| icon-size                | [图标尺寸](/components/basic/icon)                         | string \| number            | -                         | `18`    |
| label                    | 复选框标识（与 `nut-checkbox-group` 配合使用）               | boolean \| number \| string | -                         | -       |
| indeterminate            | 当前是否支持半选状态，一般用在全选操作中                    | boolean                     | -                         | `false` |
| shape                    | 形状                                                       | string                      | ： \| button \| 、 \| round | `round` |
| checked-value `1.7.14`   | 选中状态的值                                               | boolean \| number \| string | -                         | `true`  |
| unchecked-value `1.7.14` | 未选中状态的值                                             | boolean \| number \| string | -                         | `false` |

### Checkbox Events

| 事件名 | 说明         | 回调参数                                                                           |
|--------|------------|--------------------------------------------------------------------------------|
| change | 值变化时触发 | (checked: boolean, value: any) `checked` 代表当前是否选中，`value` 表示当前选中的值 |

### Checkbox Slots

| 名称          | 说明           |
|---------------|--------------|
| default       | 文本内容       |
| icon          | 未选中时的图标 |
| checkedIcon   | 选中时的图标   |
| indeterminate | 半选时的图标   |

### CheckboxGroup Props

| 参数     | 说明                                                             | 类型    | 可选值 | 默认值  |
|----------|----------------------------------------------------------------|---------|--------|---------|
| v-model  | 当前选中项的标识符，和 `label` 相对应                             | Array   | -      | -       |
| disabled | 是否禁用选择，将用于其下的全部复选框                              | boolean | -      | `false` |
| max      | 限制选择的数量，不能和 `全选/取消/反选` 一起使用, `0`表示没有限制 | number  | -      | `0`     |

### CheckboxGroup Events

| 事件名 | 说明         | 回调参数                                  |
|--------|------------|---------------------------------------|
| change | 值变化时触发 | `value` 返回一个数组，表示当前选中项的集合 |

### CheckboxGroup Methods

| 方法名        | 说明      | 参数                                                                                     |
|---------------|---------|------------------------------------------------------------------------------------------|
| toggleAll     | 全选/取消 | 传 `true` 表示全选，传 `false` 表示全部取消（自 `1.7.14` 开始 `disabled` 项会保持原有状态） |
| toggleReverse | 反选      | -                                                                                        |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                      | 默认值                   | 描述 |
|-------------------------------------------|--------------------------|------|
| --nut-checkbox-label-color                | #1d1e1e                  | -    |
| --nut-checkbox-label-disable-color        | #999                     | -    |
| --nut-checkbox-icon-disable-color         | #d6d6d6                  | -    |
| --nut-checkbox-label-margin-left          | 15px                     | -    |
| --nut-checkbox-label-font-size            | 14px                     | -    |
| --nut-checkbox-icon-font-size             | 18px                     | -    |
| --nut-checkbox-icon-disable-color2        | var(--nut-help-color)_   | -    |
| --nut-checkbox-button-padding             | 5px 18px                 | -    |
| --nut-checkbox-button-font-size           | 12px                     | -    |
| --nut-checkbox-button-border-radius       | 15px                     | -    |
| --nut-checkbox-button-border-color        | #f6f7f9                  | -    |
| --nut-checkbox-button-background          | #f6f7f9                  | -    |
| --nut-checkbox-button-font-color-active   | var(--nut-primary-color) | -    |
| --nut-checkbox-button-border-color-active | var(--nut-primary-color) | -    |
| --nut-checkbox-button-background-active   | var(--nut-primary-color) | -    |
| --nut-checkbox-display                    | inline-flex              | -    |
| --nut-checkbox-margin-right               | 20px                     | -    |
