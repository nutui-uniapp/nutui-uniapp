# Input 输入框

### 介绍

用户可以在文本框里输入内容。

### 基础用法

可以通过 `v-model` 双向绑定输入框的值，通过 `placeholder` 设置占位提示文字。

```html
<template>
  <nut-input v-model="value" placeholder="请输入文本"></nut-input>
</template>
```

```ts
const value = ref("");
```

### 自定义类型

根据 `type` 属性定义不同类型的输入框，默认值为 `text`。

```html
<template>
  <nut-input v-model="value" placeholder="请输入文本"></nut-input>
  <nut-input v-model="value" type="password" placeholder="请输入密码"></nut-input>
  <nut-input v-model="value" type="number" placeholder="请输入数字"></nut-input>
  <nut-input v-model="value" type="digit" placeholder="请输入整数"></nut-input>
</template>
```

### 禁用和只读

通过 `readonly` 将输入框设置为只读状态，通过 `disabled` 将输入框设置为禁用状态。

```html {5,11}
<template>
  <nut-input
    v-model="value"
    placeholder="输入框只读"
    readonly
  ></nut-input>

  <nut-input
    v-model="value"
    placeholder="输入框已禁用"
    disabled
  ></nut-input>
</template>
```

### 显示清除图标

通过设置 `clearable` 在输入过程中展示清除图标。清除按钮，在失去焦点后将隐藏，可通过 `show-clear-icon` 设置失去焦点后继续展示清除按钮。

```html
<template>
  <nut-input
    v-model="value"
    placeholder="显示清除图标"
    clearable
    clear-size="14"
  ></nut-input>

  <nut-input
    v-model="value"
    placeholder="自定义清除图标"
    clearable
    clear-size="14"
    show-clear-icon
  >
    <template #clear>
      <nut-icon
        name="close"
        size="12"
        width="12"
        height="12"
        @click="clearValue()"
      ></nut-icon>
    </template>
  </nut-input>
</template>
```

```ts
const value = ref("");

function clearValue() {
  value.value = "";
}
```

### 配合表单使用

结合 `nut-form` 与 `nut-form-item` 使用。

```html
<template>
  <nut-form :model-value="form">
    <nut-form-item label="文本" label-align="center">
      <nut-input v-model="form.text" placeholder="请输入文本" :border="false"></nut-input>
    </nut-form-item>
  </nut-form>
</template>
```

```ts
const form = ref({
  text: ""
});
```

### 格式化输入内容

通过 `formatter` 属性可以对输入的内容进行格式化，通过 `format-trigger` 属性可以指定执行格式化的时机。例如只允许输入非数字的字符：

```html
<template>
  <nut-input
    v-model="value1"
    placeholder="在输入时执行格式化"
    :formatter="formatter"
    format-trigger="onChange"
  ></nut-input>

  <nut-input
    v-model="value2"
    placeholder="在失焦时执行格式化"
    :formatter="formatter"
    format-trigger="onBlur"
  ></nut-input>
</template>
```

```ts
const value1 = ref("");
const value2 = ref("");

function formatter(value: string) {
  return value.replace(/\d/g, "");
}
```

### 显示字数统计

设置 `max-length` 和 `show-word-limit` 属性后会在底部显示字数统计。

```html {5,6}
<template>
  <nut-input
    v-model="value"
    placeholder="请输入留言"
    max-length="50"
    show-word-limit
  ></nut-input>
</template>
```

### 无边框

通过 `border` 属性可以设置输入框的边框。

```html {5}
<template>
  <nut-input
    v-model="value"
    placeholder="输入框无边框"
    :border="false"
  ></nut-input>
</template>
```

### 事件演示

```html
<template>
  <nut-input
    v-model="value"
    placeholder="事件演示"
    clearable
    @clear="onClear"
    @click-input="onInputClick"
  ></nut-input>

  <nut-toast v-model:visible="toast.visible" type="text" :msg="toast.message"></nut-toast>
</template>
```

```ts
const value = ref("");

const toast = reactive({
  visible: false,
  message: ""
});

function showToast(message: string) {
  toast.message = message;
  toast.visible = true;
}

function onClear() {
  showToast("clear");
}

function onInputClick() {
  showToast("clickInput");
}
```

### 插槽演示

```html
<template>
  <nut-input
    v-model="value"
    placeholder="插槽演示"
    clearable
  >
    <template #left>
      <nut-icon name="ask"></nut-icon>
    </template>

    <template #right>
      <nut-button type="primary" size="small">获取验证码</nut-button>
    </template>
  </nut-input>
</template>
```

## API

### Props

| 参数                    | 说明                                                                              | 类型                          | 可选值                              | 默认值               |
|-----------------------|---------------------------------------------------------------------------------|-----------------------------|----------------------------------|-------------------|
| v-model               | 输入值，双向绑定                                                                        | string / number             | -                                | -                 |
| type                  | 输入框类型 [有效值](https://uniapp.dcloud.net.cn/component/input.html#type)             | string                      | -                                | text              |
| password `1.8.3`      | 是否是密码类型                                                                         | boolean                     | -                                | `false`           |
| input-mode `H5` `App` | 输入框模式 [有效值](https://uniapp.dcloud.net.cn/component/input.html#inputmode)        | string                      | -                                | text              |
| input-style `1.7.3`   | 输入框自定义样式                                                                        | `StyleValue`                | -                                | -                 |
| input-class `1.7.3`   | 输入框自定义类名                                                                        | `ClassType`                 | -                                | -                 |
| placeholder           | 输入框为空时占位符                                                                       | string                      | -                                | -                 |
| placeholder-style     | 指定 placeholder 的样式                                                              | string                      | -                                | -                 |
| placeholder-class     | 指定 placeholder 的样式类                                                             | string                      | -                                | input-placeholder |
| input-align           | 输入框内容对齐方式                                                                       | string                      | left  / center / right           | left              |
| required              | 是否显示必填字段的标签旁边的红色星号                                                              | boolean                     | -                                | `false`           |
| border                | 是否显示下边框                                                                         | boolean                     | -                                | `true`            |
| disabled              | 是否禁用                                                                            | boolean                     | -                                | `false`           |
| readonly              | 是否只读                                                                            | boolean                     | -                                | `false`           |
| autofocus             | 是否自动获得焦点，iOS 系统不支持该属性                                                           | boolean                     | -                                | `false`           |
| max-length            | 限制最长输入字符                                                                        | string / number             | -                                | `140`             |
| clearable             | 展示清除图标                                                                          | boolean                     | -                                | `false`           |
| show-clear-icon       | 是否在失去焦点后，继续展示清除按钮（仅 `clearable` 为 `true` 时有效）                                   | boolean                     | -                                | `false`           |
| clear-size            | 清除图标的大小                                                                         | number / string             | -                                | `14`              |
| show-word-limit       | 是否显示限制最长输入字符，需要设置 `max-length` 属性                                               | boolean                     | -                                | `false`           |
| error                 | 是否标红                                                                            | boolean                     | -                                | `false`           |
| formatter             | 输入内容格式化函数                                                                       | `(value: string) => string` | -                                | -                 |
| format-trigger        | 格式化函数触发的时机                                                                      | string                      | onChange / onBlur                | onChange          |
| confirm-type          | 键盘右下角按钮的文字（仅 `type` 为 `text` 时有效）                                               | string                      | send / search / next / go / done | done              |
| adjust-position       | 键盘弹起时，是否自动上推页面                                                                  | boolean                     | -                                | `true`            |
| always-system         | 是否强制使用系统键盘和 webview 创建的 input 元素（为 `true` 时，`confirm-type`、`confirm-hold` 可能失效） | boolean                     | -                                | `false`           |
| cursor-spacing        | 指定光标与键盘的距离，取 input 距离底部的距离和 `cursor-spacing` 指定的距离的最小值作为光标与键盘的距离                | number                      | -                                | `0`               |
| always-embed          | 强制 input 处于同层状态，默认 focus 时 input 会切到非同层状态 (仅在 iOS 下生效)                          | boolean                     | -                                | `false`           |
| confirm-hold          | 点击键盘右下角按钮时是否保持键盘不收起                                                             | boolean                     | -                                | `false`           |
| cursor                | 指定 focus 时的光标位置                                                                 | number                      | -                                | `-1`              |
| selection-start       | 光标起始位置，自动聚集时有效，需与 `selection-end` 搭配使用                                          | number                      | -                                | `-1`              |
| selection-end         | 光标结束位置，自动聚集时有效，需与 `selection-start` 搭配使用                                        | number                      | -                                | `-1`              |
| hold-keyboard         | focus 时，点击页面的时候不收起键盘                                                            | boolean                     | -                                | `false`           |

### Events

| 事件名                | 说明         | 类型                                                            |
|--------------------|------------|---------------------------------------------------------------|
| update:model-value | 输入框内容变化时触发 | `(value: string \| number, event?: BaseEvent) => void`        |
| focus              | 输入框聚焦时触发   | `(event: InputOnFocusEvent) => void`                          |
| blur               | 输入框失焦时触发   | `(event: InputOnBlurEvent) => void`                           |
| clear              | 点击清除按钮时触发  | `() => void`                                                  |
| click              | 点击组件时触发    | `(event: BaseEvent) => void`                                  |
| click-input        | 点击输入区域时触发  | `(event: BaseEvent) => void`                                  |
| confirm            | 点击完成按钮时触发  | `(event: InputOnConfirmEvent) => void`                        |
| input              | 键盘输入时触发    | `(value: string \| number, event: InputOnInputEvent) => void` |

### Slots

| 名称    | 说明           |
|-------|--------------|
| clear | 自定义输入框尾部清除按钮 |
| left  | 自定义输入框左侧插槽内容 |
| right | 自定义输入框右侧插槽内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                  | 默认值                       |
|-------------------------------------|---------------------------|
| --nut-input-padding `1.7.9`         | 10px 25px                 |
| --nut-input-font-size               | var(--nut-font-size-2)    |
| --nut-input-line-height `1.7.9`     | 20px                      |
| --nut-input-border-bottom           | #eaf0fb                   |
| --nut-input-disabled-color          | #c8c9cc                   |
| --nut-input-required-color          | var(--nut-required-color) |
| --nut-input-limit-font-size `1.7.9` | var(--nut-font-size-1)    |
| --nut-input-limit-color `1.7.9`     | #808080                   |
