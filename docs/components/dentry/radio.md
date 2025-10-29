# Radio 单选按钮

### 介绍

用于在一组备选项中进行单选。

### 基础用法

通过 `v-model` 绑定值当前选项的 `label`，并且 `nut-radio-group` 和 `nut-radio` 需要配合使用。

```html
<template>
  <nut-radio-group v-model="value">
    <nut-radio label="1" shape="button" size="large">选项1</nut-radio>
    <nut-radio label="2" disabled>选项2</nut-radio>
    <nut-radio label="3">选项3</nut-radio>
  </nut-radio-group>

  <nut-radio-group v-model="value" text-position="left">
    <nut-radio label="1">选项1</nut-radio>
    <nut-radio label="2" disabled>选项2</nut-radio>
    <nut-radio label="3">选项3</nut-radio>
  </nut-radio-group>

  <nut-radio-group v-model="value">
    <nut-radio label="1" shape="button">选项1</nut-radio>
    <nut-radio label="2" shape="button" disabled>选项2</nut-radio>
    <nut-radio label="3" shape="button">选项3</nut-radio>
  </nut-radio-group>
</template>
```

```ts
const value = ref("1");
```

### 水平使用

```html
<template>
  <nut-radio-group v-model="value" direction="horizontal">
    <nut-radio label="1">选项1</nut-radio>
    <nut-radio label="2">选项2</nut-radio>
    <nut-radio label="3">选项3</nut-radio>
  </nut-radio-group>

  <nut-radio-group v-model="value" direction="horizontal">
    <nut-radio label="1" shape="button">选项1</nut-radio>
    <nut-radio label="2" shape="button">选项2</nut-radio>
    <nut-radio label="3" shape="button">选项3</nut-radio>
  </nut-radio-group>
</template>
```

### 自定义尺寸

```html
<template>
  <nut-radio-group v-model="value">
    <nut-radio label="1" icon-size="12">选项1</nut-radio>
    <nut-radio label="2" icon-size="12">选项2</nut-radio>
  </nut-radio-group>
</template>
```

### 自定义图标

通过 `slot` 自定义图标，建议同时设置 `icon` 和 `checkedIcon` 两个插槽。

```html
<template>
  <nut-radio-group v-model="value">
    <nut-radio label="1">
      选项1
      <template #icon>
        <nut-icon name="checklist"></nut-icon>
      </template>
      <template #checkedIcon>
        <nut-icon name="checklist" custom-color="red"></nut-icon>
      </template>
    </nut-radio>

    <nut-radio label="2">
      选项2
      <template #icon>
        <nut-icon name="checklist"></nut-icon>
      </template>
      <template #checkedIcon>
        <nut-icon name="checklist" custom-color="red"></nut-icon>
      </template>
    </nut-radio>
  </nut-radio-group>
</template>
```

### 触发 change 事件

```html
<template>
  <nut-radio-group v-model="value" @change="onChange">
    <nut-radio label="1">选项1</nut-radio>
    <nut-radio label="2">选项2</nut-radio>
  </nut-radio-group>
</template>
```

```ts
const value = ref("1");

function onChange(val: any) {
  console.log("change", val);
}
```

## API

### Radio Props

| 参数           | 说明                             | 类型                        | 可选值                           | 默认值     |
|--------------|--------------------------------|---------------------------|-------------------------------|---------|
| disabled     | 是否禁用选择                         | boolean                   | -                             | `false` |
| icon-size    | [图标尺寸](/components/basic/icon) | string / number           | -                             | `18`    |
| label        | 单选框标识                          | string / number / boolean | -                             | -       |
| shape        | 形状                             | string                    | button / round                | round   |
| size `1.5.9` | 尺寸（仅 `shape` 为 `button` 时有效）   | string                    | large / small / mini / normal | normal  |

### Radio Slots

| 名称          | 说明      |
|-------------|---------|
| icon        | 未选中时的图标 |
| checkedIcon | 选中时的图标  |

### RadioGroup Props

| 参数            | 说明                            | 类型                        | 可选值                   | 默认值      |
|---------------|-------------------------------|---------------------------|-----------------------|----------|
| v-model       | 当前选中项的标识符，与 `label` 值一致时呈选中状态 | string / number / boolean | -                     | -        |
| text-position | 文本所在的位置                       | string                    | left / right          | right    |
| direction     | 使用横纵方向                        | string                    | horizontal / vertical | vertical |

### RadioGroup Events

| 事件名    | 说明     | 类型                                             |
|--------|--------|------------------------------------------------|
| change | 值变化时触发 | `(value: string \| number \| boolean) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                    | 默认值                      |
|---------------------------------------|--------------------------|
| --nut-radio-label-font-color          | #1d1e1e                  |
| --nut-radio-label-font-active-color   | var(--nut-primary-color) |
| --nut-radio-label-disable-color       | #999                     |
| --nut-radio-icon-disable-color        | #d6d6d6                  |
| --nut-radio-label-button-border-color | var(--nut-primary-color) |
| --nut-radio-label-button-background   | var(--nut-primary-color) |
| --nut-radio-label-margin-left         | 15px                     |
| --nut-radio-button-border-radius      | 15px                     |
| --nut-radio-label-font-size           | 14px                     |
| --nut-radio-button-font-size          | 12px                     |
| --nut-radio-button-padding            | 5px 18px                 |
| --nut-radio-icon-disable-color2       | var(--nut-help-color)_   |
