# Button 按钮

### 介绍

按钮用于触发一个操作，如提交表单。

### 按钮类型

按钮支持 `default`、`primary`、`info`、`warning`、`danger`、`success` 六种类型，默认为 `default`。

```html
<template>
  <nut-button type="primary">主要按钮</nut-button>
  <nut-button type="info">信息按钮</nut-button>
  <nut-button type="default">默认按钮</nut-button>
  <nut-button type="danger">危险按钮</nut-button>
  <nut-button type="warning">警告按钮</nut-button>
  <nut-button type="success">成功按钮</nut-button>
</template>
```

### 朴素按钮

通过 `plain` 属性将按钮设置为朴素按钮，朴素按钮的文字为按钮颜色，背景为白色。

```html
<template>
  <nut-button plain type="primary">朴素按钮</nut-button>
  <nut-button plain type="info">朴素按钮</nut-button>
</template>
```

### 禁用状态

通过 `disabled` 属性来禁用按钮，禁用状态下按钮不可点击。

```html
<template>
  <nut-button disabled type="primary">禁用状态</nut-button>
  <nut-button plain disabled type="info">禁用状态</nut-button>
  <nut-button plain disabled type="primary">禁用状态</nut-button>
</template>
```

### 按钮形状

通过 `shape` 属性设置按钮形状，支持圆形、方形按钮，默认为圆形。

```html
<template>
  <nut-button shape="square" type="primary">方形按钮</nut-button>
  <nut-button type="info">圆形按钮</nut-button>
</template>
```

### 加载状态

```html
<template>
  <nut-button loading type="info"></nut-button>
  <nut-button loading type="warning">加载中...</nut-button>
  <nut-button :loading="isLoading" type="success" @click="changeLoading">Click me!</nut-button>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup(props) {
      let isLoading = ref(false);
      const changeLoading = () => {
        isLoading.value = true;
        setTimeout(() => {
          isLoading.value = false;
        }, 3000);
      };
      return {
        isLoading,
        changeLoading
      };
    }
  };
</script>
```

### 图标按钮

```html
<template>
  <nut-button shape="square" plain type="primary">
    <template #icon>
      <nut-icon name="star-fill" />
    </template>
  </nut-button>
  <nut-button shape="square" type="primary">
    <template #icon>
      <nut-icon name="star" />
    </template>
    收藏
  </nut-button>
</template>
```

### 按钮尺寸

支持 `large`、`normal`、`small`、`mini` 四种尺寸，默认为 `normal`。

```html
<template>
  <nut-button size="large" type="primary">大号按钮</nut-button>
  <nut-button type="primary">普通按钮</nut-button>
  <nut-button size="small" type="primary">小型按钮</nut-button>
  <nut-button size="mini" type="primary">迷你按钮</nut-button>
</template>
```

### 块级元素

按钮在默认情况下为行内块级元素，通过 `block` 属性可以将按钮的元素类型设置为块级元素，常用来实现通栏按钮。

```html
<template>
  <nut-button block type="primary">块级元素</nut-button>
</template>
```

### 自定义颜色

通过 customColor 属性可以自定义按钮的颜色。

```html
<template>
  <nut-button custom-color="#7232dd">单色按钮</nut-button>
  <nut-button custom-color="#7232dd" plain>单色按钮</nut-button>
  <nut-button custom-color="linear-gradient(to right, #ff6034, #ee0a24)"> 渐变色按钮 </nut-button>
</template>
```

## API

### Props

| 参数                       | 说 明                                                                                                                                                         | 类型    | 默认值         |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | -------------- |
| type                       | 类型，可选值为 `primary` `info` `warning` `danger``success``default`                                                                                          | string  | `default`      |
| form-type                  | 表单类型，可选值`button``submit``reset`                                                                                                                       | string  | `button`       |
| size                       | 尺寸，可选值为`large``small``mini``normal`                                                                                                                    | string  | `normal`       |
| shape                      | 形状，可选值为`square``round`                                                                                                                                 | string  | `round`        |
| custom-color               | 按钮颜色，支持传入`linear-gradient`渐变色                                                                                                                     | string  | -              |
| plain                      | 是否为朴素按钮                                                                                                                                                | boolean | `false`        |
| disabled                   | 是否禁用按钮                                                                                                                                                  | boolean | `false`        |
| block                      | 是否为块级元素                                                                                                                                                | boolean | `false`        |
| loading                    | 按钮`loading`状态                                                                                                                                             | boolean | `false`        |
| open-type`v1.1.5`          | 小程序开放能力[查看uniapp文档](https://uniapp.dcloud.net.cn/component/button.html#open-type-%E6%9C%89%E6%95%88%E5%80%BC)                                      | string  | -              |
| lang`v1.1.5`               | 指定返回用户信息的语言，zh_CN简体中文，zh_TW繁体中文，en英文。                                                                                                | string  | `en`           |
| session-from`v1.1.5`       | 会话来源，open-type="contact"时有效                                                                                                                           | string  | -              |
| send-message-title`v1.1.5` | 会话内消息卡片标题，open-type="contact"时有效                                                                                                                 | string  | -              |
| send-message-path`v1.1.5`  | 会话内消息卡片点击跳转小程序路径，open-type="contact"时有效                                                                                                   | string  | -              |
| send-message-img`v1.1.5`   | 会话内消息卡片图片，open-type="contact"时有效                                                                                                                 | string  | -              |
| show-message-card`v1.1.5`  | 是否显示会话内消息卡片，设置此参数为true，用户进入客服会话会在右下角显示"可能要发送的小程序"提示，用户点击后可以快速发送小程序消息，open-type="contact"时有效 | string  | -              |
| hover-class`v1.6.7`        | 指定按钮按下去的样式类。当hover-class="none"时，没有点击态效果                                                                                                | string  | `button-hover` |
| hover-start-time`v1.6.7`   | 按住后多久出现点击态，单位毫秒                                                                                                                                | number  | `20`           |
| hover-stay-time`v1.6.7`    | 手指松开后点击态保留时间，单位毫秒                                                                                                                            | number  | `70`           |

>`nut-button`继承了uni-appbutton的绝大部分属性，部分小程序特殊属性请查看[button](https://uniapp.dcloud.net.cn/component/button.html)

### Slots

| 名称    | 说明     |
| ------- | -------- |
| default | 按钮内容 |
| icon    | 按钮图标 |

### Events

| 事件名                             | 说明                                                             | 回调参数            |
| ---------------------------------- | ---------------------------------------------------------------- | ------------------- |
| click                              | 点击按钮时触发                                                   | `event: MouseEvent` |
| getphonenumber `v1.1.5`            | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| getuserinfo `v1.1.5`               | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| error `v1.1.5`                     | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| opensetting `v1.1.5`               | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| launchapp `v1.1.5`                 | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| contact `v1.1.5`                   | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| chooseavatar `v1.1.5`              | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| agreeprivacyauthorization `v1.1.5` | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| addgroupapp `v1.1.5`               | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| chooseaddress `v1.1.5`             | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| chooseinvoicetitle `v1.1.5`        | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| subscribe `v1.1.5`                 | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| login `v1.1.5`                     | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |
| im `v1.1.5`                        | 查看[button](https://uniapp.dcloud.net.cn/component/button.html) |                     |

> `nut-button`继承了 uni-app button的open-type回调事件，请查看[button](https://uniapp.dcloud.net.cn/component/button.html)

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                   | 默认值                                                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- |
| --nut-button-border-radius             | 25px                                                                                                                            |
| --nut-button-border-width              | 1px                                                                                                                             |
| --nut-button-icon-width                | 16px                                                                                                                            |
| --nut-button-default-bg-color          | var(--nut-white)                                                                                                                |
| --nut-button-default-border-color      | rgba(204, 204, 204, 1)                                                                                                          |
| --nut-button-default-color             | rgba(102, 102, 102, 1)                                                                                                          |
| --nut-button-default-padding           | 0 18px                                                                                                                          |
| --nut-button-mini-padding              | 0 12px                                                                                                                          |
| --nut-button-small-padding             | 0 12px                                                                                                                          |
| --nut-button-small-height              | 28px                                                                                                                            |
| --nut-button-mini-height               | 24px                                                                                                                            |
| --nut-button-default-height            | 38px                                                                                                                            |
| --nut-button-large-height              | 48px                                                                                                                            |
| --nut-button-large-line-height         | 46px                                                                                                                            |
| --nut-button-small-line-height         | 26px                                                                                                                            |
| --nut-button-block-height              | 48px                                                                                                                            |
| --nut-button-default-line-height       | 36px                                                                                                                            |
| --nut-button-block-line-height         | 46px                                                                                                                            |
| --nut-button-default-font-size         | var(--nut-font-size-2)                                                                                                          |
| --nut-button-large-font-size           | var(--nut-button-default-font-size)                                                                                             |
| --nut-button-small-font-size           | var(--nut-font-size-1)                                                                                                          |
| --nut-button-mini-font-size            | var(--nut-font-size-1)                                                                                                          |
| --nut-button-mini-line-height          | 1.2                                                                                                                             |
| --nut-button-disabled-opacity          | 0.68                                                                                                                            |
| --nut-button-primary-color             | var(--nut-white)                                                                                                                |
| --nut-button-primary-border-color      | var(--nut-primary-color)                                                                                                        |
| --nut-button-primary-background-color  | linear-gradient(135deg,var(--nut-primary-color) 0%,var(--nut-primary-color-end) 100%)                                           |
| --nut-button-info-color                | var(--nut-white)                                                                                                                |
| --nut-button-info-border-color         | rgba(73, 106, 242, 1)                                                                                                           |
| --nut-button-info-background-color     | linear-gradient(315deg, rgba(73, 143, 242, 1) 0%, rgba(73, 101, 242, 1) 100%)                                                   |
| --nut-button-success-color             | var(--nut-white)                                                                                                                |
| --nut-button-success-border-color      | rgba(38, 191, 38, 1)                                                                                                            |
| --nut-button-success-background-color  | linear-gradient(135deg,rgba(38, 191, 38, 1) 0%,rgba(39, 197, 48, 1) 45%,rgba(40, 207, 63, 1) 83%,rgba(41, 212, 70, 1) 100%)     |
| --nut-button-danger-color              | var(--nut-white)                                                                                                                |
| --nut-button-danger-border-color       | rgba(250, 44, 25, 1)                                                                                                            |
| --nut-button-danger-background-color   | rgba(250, 44, 25, 1)                                                                                                            |
| --nut-button-warning-color             | var(--nut-white)                                                                                                                |
| --nut-button-warning-border-color      | rgba(255, 158, 13, 1)                                                                                                           |
| --nut-button-warning-background-color  | linear-gradient(135deg,rgba(255, 158, 13, 1) 0%,rgba(255, 167, 13, 1) 45%,rgba(255, 182, 13, 1) 83%,rgba(255, 190, 13, 1) 100%) |
| --nut-button-plain-background-color    | var(--nut-white)                                                                                                                |
| --nut-button-small-round-border-radius | var(--nut-button-border-radius)                                                                                                 |
