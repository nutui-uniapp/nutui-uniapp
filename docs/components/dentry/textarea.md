# Textarea 文本域

### 介绍

文本框内输入或编辑文字，支持限制输入数量。

### 基础用法

```html
<template>
  <nut-textarea v-model="value"></nut-textarea>
</template>
```

```ts
const value = ref("");
```

### 显示字数统计

```html
<template>
  <nut-textarea v-model="value" max-length="20" limit-show></nut-textarea>
</template>
```

### 自动高度

```html
<template>
  <nut-textarea v-model="value" autosize></nut-textarea>
</template>
```

### 只读、禁用

```html
<template>
  <nut-textarea model-value="只读状态" readonly></nut-textarea>
  <nut-textarea model-value="禁用状态" disabled></nut-textarea>
</template>
```

## API

### Props

| 参数                        | 说明                                                             | 类型               | 可选值                                       | 默认值                  |
|---------------------------|----------------------------------------------------------------|------------------|-------------------------------------------|----------------------|
| v-model                   | 输入值                                                            | string           | -                                         | -                    |
| textarea-style `1.7.3`    | 文本域自定义样式                                                       | `StyleValue`     | -                                         | -                    |
| textarea-class `1.7.3`    | 文本域自定义类名                                                       | `ClassType`      | -                                         | -                    |
| placeholder               | 设置占位提示文字                                                       | string           | -                                         | 请输入内容                |
| placeholder-style `1.6.9` | 指定 placeholder 的样式                                             | string           | -                                         | -                    |
| placeholder-class `1.6.9` | 指定 placeholder 的样式类                                            | string           | -                                         | textarea-placeholder |
| max-length                | 限制最长输入字符                                                       | string / number  | -                                         | -                    |
| rows `H5`                 | 行数，优先级高于 `autosize` 属性                                         | string / number  | -                                         | -                    |
| limit-show                | 是否展示输入字符，配合 `max-length` 使用                                    | boolean          | -                                         | `false`              |
| autosize                  | 是否自适应内容高度，也可传入对象，如 `{ minHeight: 100, maxHeight: 200 }`（单位：px） | boolean / object | -                                         | `false`              |
| text-align                | 文本位置                                                           | string           | left / center / right                     | -                    |
| readonly                  | 只读属性                                                           | boolean          | -                                         | `false`              |
| disabled                  | 禁用属性                                                           | boolean          | -                                         | `false`              |
| autofocus                 | 自动获取焦点                                                         | boolean          | -                                         | `false`              |
| cursor-spacing            | 指定光标与键盘的距离                                                     | number           | -                                         | `0`                  |
| cursor                    | 指定focus时的光标位置                                                  | number           | -                                         | `-1`                 |
| show-confirm-bar          | 是否显示键盘上方带有“完成”按钮那一栏                                            | boolean          | -                                         | `true`               |
| selection-start           | 光标起始位置，自动聚集时有效，需与 `selection-end` 搭配使用                         | number           | -                                         | `-1`                 |
| selection-end             | 光标结束位置，自动聚集时有效，需与 `selection-start` 搭配使用                       | number           | -                                         | `-1`                 |
| adjust-position           | 键盘弹起时，是否自动上推页面                                                 | boolean          | -                                         | `true`               |
| hold-keyboard             | focus 时，点击页面的时候不收起键盘                                           | boolean          | -                                         | `false`              |
| disable-default-padding   | 是否去掉 iOS 下的默认内边距                                               | boolean          | -                                         | `false`              |
| confirm-type              | 设置键盘右下角按钮的文字                                                   | string           | send / search / next / go / done / return | return               |
| confirm-hold              | 点击键盘右下角按钮时是否保持键盘不收起                                            | boolean          | -                                         | `false`              |
| adjust-keyboard-to        | 键盘对齐位置                                                         | string           | cursor / bottom                           | cursor               |

### Events

| 事件名     | 说明        | 类型                                                   |
|---------|-----------|------------------------------------------------------|
| change  | 输入框值改变时触发 | `(value: string, event: Event) => void`              |
| focus   | 聚焦时触发     | `(event: TextareaOnFocusEvent) => void`              |
| blur    | 失焦时触发     | `(event: TextareaOnBlurEvent) => void`               |
| confirm | 点击完成按钮时触发 | `(event: TextareaOnConfirmEvent) => void`            |
| input   | 键盘输入时触发   | `(value: string, evt: TextareaOnInputEvent) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                            | 默认值                      |
|-------------------------------|--------------------------|
| --nut-textarea-font           | var(--nut-font-size-2)   |
| --nut-textarea-limit-color    | var(--nut-text-color)    |
| --nut-textarea-text-color     | var(--nut-title-color)   |
| --nut-textarea-disabled-color | var(--nut-disable-color) |
