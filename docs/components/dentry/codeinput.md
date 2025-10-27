# CodeInput 验证码输入框

### 介绍

一般用于验证用户短信验证码的场景，该组件参考了 uview-ui 的 [验证码输入框](https://www.uviewui.com/components/codeInput.html)。

### 基础用法

```html
<template>
  <nut-code-input v-model="value"></nut-code-input>
</template>
```

```ts
const value = ref("");
```

### 横线模式

```html
<template>
  <nut-code-input v-model="value" mode="line"></nut-code-input>
</template>
```

### 设置长度

```html
<template>
  <nut-code-input v-model="value" :maxlength="6"></nut-code-input>
</template>
```

### 横线间距

```html
<template>
  <nut-code-input v-model="value" :space="0"></nut-code-input>
</template>
```

### 调整颜色

```html
<template>
  <nut-code-input
    v-model="value"
    hairline
    custom-color="#f56c6c"
    border-color="#f56c6c"
  ></nut-code-input>
</template>
```

### 事件

```html
<template>
  <nut-code-input
    @change="onChange"
    @finish="onFinish"
  ></nut-code-input>
</template>
```

```ts
function onChange(value: string) {
  console.log("内容改变", value);
}

function onFinish(value: string) {
  console.log("输入结束", value);
}
```

## API

### Props

| 参数                | 说明             | 类型              | 可选值        | 默认值     |
|-------------------|----------------|-----------------|------------|---------|
| v-model           | 输入值            | string          | -          | -       |
| adjust-position   | 键盘弹起时，是否自动上推页面 | boolean         | -          | `true`  |
| maxlength         | 最大输入长度         | number / string | -          | `4`     |
| dot               | 是否用圆点填充        | boolean         | -          | `false` |
| mode              | 选择样式为边框或者横线    | string          | box / line | box     |
| hairline          | 是否细边框          | boolean         | -          | `false` |
| space             | 字符间的距离         | number / string | -          | `10`    |
| focus             | 是否自动获取焦点       | boolean         | -          | `false` |
| bold              | 字体是否加粗         | boolean         | -          | `false` |
| custom-color      | 字体颜色           | string          | -          | #606266 |
| font-size         | 字体大小（单位：px）    | number / string | -          | `18`    |
| size              | 输入框的大小（单位：px）  | number / string | -          | `35`    |
| disabled-keyboard | 禁止点击输入框唤起系统键盘  | boolean         | -          | `false` |
| border-color      | 边框和线条颜色        | string          | -          | #c9cacc |
| disabled-dot      | 是否禁止输入 `.` 符号  | boolean         | -          | `true`  |

### Events

| 事件名    | 说明                       | 类型                        |
|--------|--------------------------|---------------------------|
| change | 输入内容发生改变时触发              | `(value: string) => void` |
| finish | 输入字符个数达到 `maxlength` 时触发 | `(value: string) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                         | 默认值                                 |
|--------------------------------------------|-------------------------------------|
| --nut-code-input-cursor-width              | var(--nut-code-input-cursor-width)  |
| --nut-code-input-cursor-height             | var(--nut-code-input-cursor-height) |
| --nut-code-input-cursor-animation-duration | 1s                                  |
| --nut-code-input-cursor-animation-name     | nut-cursor-flicker                  |
| --nut-code-input-content-color             | var(--nut-code-content-color)       |
