# NumberKeyboard 数字键盘

### 介绍

虚拟数字键盘，用于输入支付密码的场景。

### 默认键盘

在线调试请将浏览器变为手机模式

```html
<template>
  <nut-number-keyboard
    v-model="value"
    v-model:visible="visible"
  ></nut-number-keyboard>
</template>
```

```ts
const value = ref("");
const visible = ref(false);
```

### 带右侧栏键盘

```html
<template>
  <nut-number-keyboard
    v-model="value"
    v-model:visible="visible"
    type="rightColumn"
    :custom-key="customKey"
    confirm-text="支付"
    @confirm="onConfirm"
  ></nut-number-keyboard>
</template>
```

```ts
const value = ref("");
const visible = ref(false);
const customKey = reactive(["."]);

function onConfirm() {
  console.log("confirm");
}
```

### 随机键位键盘

```html {5}
<template>
  <nut-number-keyboard
    v-model="value"
    v-model:visible="visible"
    random-keys
  ></nut-number-keyboard>
</template>
```

### 带标题栏键盘

```html {5}
<template>
  <nut-number-keyboard
    v-model="value"
    v-model:visible="visible"
    title="默认键盘"
  ></nut-number-keyboard>
</template>
```

### 身份证键盘

```html
<template>
  <nut-number-keyboard
    v-model="value"
    v-model:visible="visible"
    :custom-key="customKey"
  ></nut-number-keyboard>
</template>
```

```ts
const customKey = reactive(["X"]);
```

## API

### Props

| 参数              | 说明                                      | 类型              | 可选值                   | 默认值     |
|-----------------|-----------------------------------------|-----------------|-----------------------|---------|
| v-model         | 当前输入值                                   | string          | -                     | -       |
| v-model:visible | 是否显示键盘                                  | boolean         | -                     | `false` |
| title           | 键盘标题                                    | string          | -                     | -       |
| type            | 键盘模式（`default`：默认样式，`rightColumn`：带右侧栏） | string          | default / rightColumn | default |
| random-keys     | 随机键位                                    | boolean         | -                     | `false` |
| custom-key      | 自定义键盘额外的键（数组形式，最多支持添加 2 个）              | Array           | -                     | `[]`    |
| overlay         | 是否显示遮罩                                  | boolean         | -                     | false   |
| maxlength       | 输入值最大长度                                 | number / string | -                     | `6`     |
| confirm-text    | 自定义完成按钮文字（如"支付"、"下一步"、"提交"等）            | string          | -                     | -       |
| pop-class       | 自定义弹框类名                                 | string          | -                     | -       |

### Events

| 事件名             | 说明              | 类型                        |
|-----------------|-----------------|---------------------------|
| input           | 点击按键时触发         | `(value: string) => void` |
| delete          | 点击删除键时触发        | `() => void`              |
| close           | 点击关闭按钮或非键盘区域时触发 | `() => void`              |
| confirm `1.7.9` | 点击确认按钮          | `() => void`              |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                                    | 默认值         |
|-------------------------------------------------------|-------------|
| --nut-numberkeyboard-width                            | 100%        |
| --nut-numberkeyboard-padding                          | 0           |
| --nut-numberkeyboard-background-color                 | #f2f3f5     |
| --nut-numberkeyboard-header-height                    | 34px        |
| --nut-numberkeyboard-header-padding                   | 6px 0 0 0   |
| --nut-numberkeyboard-header-color                     | #646566     |
| --nut-numberkeyboard-header-font-size                 | 16px        |
| --nut-numberkeyboard-header-close-padding             | 0 16px      |
| --nut-numberkeyboard-header-close-color               | #576b95     |
| --nut-numberkeyboard-header-close-font-size           | 14px        |
| --nut-numberkeyboard-header-close-background-color    | transparent |
| --nut-numberkeyboard-key-background-color             | #fff        |
| --nut-numberkeyboard-key-active-background-color      | #ebedf0     |
| --nut-numberkeyboard-key-height                       | 48px        |
| --nut-numberkeyboard-key-line-height                  | 1.5         |
| --nut-numberkeyboard-key-border-radius                | 8px         |
| --nut-numberkeyboard-key-font-size                    | 28px        |
| --nut-numberkeyboard-key-font-size-color              | #333        |
| --nut-numberkeyboard-key-finish-font-size             | 16px        |
| --nut-numberkeyboard-key-finish-font-size-color       | #fff        |
| --nut-numberkeyboard-key-finish-background-color      | #1989fa     |
| --nut-numberkeyboard-key-activeFinsh-background-color | #0570db     |
