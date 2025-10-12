# Textarea 文本域

### 介绍

文本框内输入或编辑文字，支持限制输入数量。

### 基础用法

```html
<template>
  <nut-textarea v-model="value" />
</template>
<script>
import { ref } from 'vue';
export default {
  setup() {
    const value = ref('');
    return { value };
  },
};
</script>
```

### 显示字数统计

```html
<template>
  <nut-textarea v-model="value" limit-show max-length="20" />
</template>
```

### 高度自定义，拉伸

```html
<template>
  <nut-textarea v-model="value" autosize />
</template>
```

### 只读、禁用

```html
<template>
  <nut-textarea readonly model-value="textarea 只读状态" />
  <nut-textarea disabled model-value="textarea 禁用状态" />
</template>
```

## API

### Props

| 参数                      | 说明                                                                                                | 类型                                                   | 可选值                                       | 默认值                 |
|---------------------------|---------------------------------------------------------------------------------------------------|------------------------------------------------------|-------------------------------------------|----------------------|
| v-model                   | 输入值，支持双向绑定                                                                                 | string                                               | -                                         | -                    |
| textarea-style `1.7.3`    | 文本域自定义样式                                                                                    | `StyleValue`                                         | -                                         | -                    |
| textarea-class `1.7.3`    | 文本域自定义类名                                                                                    | `ClassType`                                          | -                                         | -                    |
| placeholder               | 设置占位提示文字                                                                                    | string                                               | -                                         | `请输入内容`           |
| placeholder-style `1.6.9` | 指定 placeholder 的样式                                                                             | string                                               | -                                         | -                    |
| placeholder-class `1.6.9` | 指定 placeholder 的样式类                                                                           | string                                               | -                                         | `textarea-placeholder` |
| max-length                | 限制最长输入字符                                                                                    | string / number                                      | -                                         | -                    |
| rows                      | textarea的高度，优先级高于autosize属性 `仅支持 H5`                                                   | string / number                                      | -                                         | `2`                  |
| limit-show                | textarea是否展示输入字符。须配合`max-length`使用                                                     | boolean                                              | -                                         | `false`              |
| autosize                  | 是否自适应内容高度，也可传入对象, <br/> 如 `{ maxHeight: 200, minHeight: 100 }`，单位为`px`           | boolean / `{maxHeight?: number; minHeight?: number}` | -                                         | `false`              |
| text-align                | 文本位置,                                                                                           | string                                               | left / center / right                     | -                    |
| readonly                  | 只读属性                                                                                            | boolean                                              | -                                         | `false`              |
| disabled                  | 禁用属性                                                                                            | boolean                                              | -                                         | `false`              |
| autofocus                 | 自动获取焦点                                                                                        | boolean                                              | -                                         | `false`              |
| cursor-spacing            | 指定光标与键盘的距离。取textarea距离底部的距离和cursor-spacing指定的距离的最小值作为光标与键盘的距离 | number                                               | -                                         | `0`                  |
| cursor                    | 指定focus时的光标位置                                                                               | number                                               | -                                         | `-1`                 |
| show-confirm-bar          | 是否显示键盘上方带有”完成“按钮那一栏                                                                | boolean                                              | -                                         | `false`              |
| selection-start           | 光标起始位置，自动聚集时有效，需与selection-end搭配使用                                               | number                                               | -                                         | `-1`                 |
| selection-end             | 光标结束位置，自动聚集时有效，需与selection-start搭配使用                                             | number                                               | -                                         | `-1`                 |
| adjust-position           | 键盘弹起时，是否自动上推页面                                                                         | boolean                                              | -                                         | `false`              |
| hold-keyboard             | focus时，点击页面的时候不收起键盘                                                                    | boolean                                              | -                                         | `false`              |
| disable-default-padding   | 是否去掉 iOS 下的默认内边距                                                                         | boolean                                              | -                                         | `false`              |
| confirm-type              | 设置键盘右下角按钮的文字                                                                            | string                                               | send / search / next / go / done / return | return               |
| confirm-hold              | 点击键盘右下角按钮时是否保持键盘不收起                                                              | boolean                                              | -                                         | `false`              |
| adjust-keyboard-to        | 键盘对齐位置                                                                                        | string                                               | cursor / bottom                           | `cursor`             |

### Events

| 事件名  | 说明               | 回调参数      |
|---------|------------------|---------------|
| change  | 输入框值改变时触发 | `value`       |
| focus   | 聚焦时触发         | `event`       |
| blur    | 失焦时触发         | `value,event` |
| confirm | 点击完成按钮时触发 | `event`       |
| input   | 键盘输入时触发     | `value,event` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                          | 默认值                   |
|-------------------------------|--------------------------|
| --nut-textarea-font           | var(--nut-font-size-2)   |
| --nut-textarea-limit-color    | var(--nut-text-color)    |
| --nut-textarea-text-color     | var(--nut-title-color)   |
| --nut-textarea-disabled-color | var(--nut-disable-color) |
