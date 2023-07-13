# CodeInput 验证码输入框

### 介绍

一般用于验证用户短信验证码的场景，该组件参考了 uview-ui 的 [验证码输入框](https://www.uviewui.com/components/codeInput.html)。

### 基础用法

```html
<template>
  <nut-code-input v-model="state.val1" />
</template>
```

### 横线模式

```html
<template>
  <nut-code-input v-model="state.val1" mode="line" />
</template>
```

### 设置长度

```html
<template>
  <nut-code-input v-model="state.val2" :maxlength="6" />
</template>
```

### 横线间距

```html
<template>
  <nut-code-input v-model="state.val2" :space="0" />
</template>
```

### 调整颜色

```html
<template>
    <nut-code-input v-model="state.val3" hairline custom-color="#f56c6c" border-color="#f56c6c" />
</template>
```

### 快捷选择-范围选择

```html
<template>
  <nut-code-input @change="change" @finish="finish" />
</template>
<script lang="ts">
import { reactive, toRefs } from 'vue';
export default {
  setup() {
    function change(e: any) {
     console.log(`内容改变，当前值为：${e}`)
    }
    function finish(e: any) {
     console.log(`输入结束，当前值为：${e}`)
    }
    return {
      change
      finish
    };
  }
}
</script>
```

## API

### Props

| 参数              | 说明                                              | 类型            | 默认值          |
|-------------------|---------------------------------------------------|-----------------|-----------------|
| v-model   | 输入值，双向绑定                                          | string         | -           |
| adjustPosition            | 键盘弹起时，是否自动上推页面     | Boolean       | `false`           |
| maxlength          |输入字符个数                                | `String \| Number`         | `4`            |
| dot | 是否用圆点填充                                       | boolean         | `false`           |
| mode             | 选择样式为边框或者横线                                          |    `box \| line`      | `box`      |
| hairline     | 是否细边框  | Boolean            | `false`
| space        | 字符间的距离         | `String \| Number`          | `10`            |
| focus          | 是否自动获取焦点              | Boolean          | `false` |
| custom-color          | 字体颜色               | String          | `#606266` |
| font-size         | 字体大小，单位rpx               | `String \| Number`          | `18` |
| size         | 输入框的大小，宽等于高               | `String \| Number`          | `35` |
| disabledKeyboard          | 禁止点击输入框唤起系统键盘               | Boolean          | `false` |
| border-color          | 边框和线条颜色               | String          | `#c9cacc` |
| disabledDot          | 是否禁止输入"."符号              | boolean          | `true` |

### Events

| 事件名 | 说明                         | 回调参数                     |
|--------|------------------------------|------------------------------|
| change | 输入内容发生改变时触发，具体见上方说明 | `string` |
| finish  | 输入字符个数达maxlength值时触发，见上方说明              |  `string`                          |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                    | 默认值                     |
| --------------------------------------- | -------------------------- |
| --nut-code-input-cursor-width | _var(--nut-code-input-cursor-width)_   |
| --nut-code-input-cursor-height| _var(--nut-code-input-cursor-height)_   |
| --nut-code-input-cursor-animation-duration| _1s_   |
| --nut-code-input-cursor-animation-name| _nut-cursor-flicker_   |
| --nut-code-input-content-color| _var(--nut-code-content-color)_   |

