# Notify 消息通知

### 介绍

在页面顶部展示消息提示

### 最简单的用法

> 自 `1.7.16` 开始支持组合式函数用法，`useNotify` 的自动按需导入请参考 [快速上手-API导入](/guide/quick-start#api导入) 部分

```ts
const notify = useNotify();

function showPrimary() {
  notify.primary("主要通知");
}
```

```html
<template>
  <!-- 注意，需要手动在页面中插入一个notify节点 -->
  <nut-notify></nut-notify>

  <nut-cell title="主要通知" is-link @click="showPrimary"></nut-cell>
</template>
```

::: details 进一步简化使用
配合 [@uni-helper/vite-plugin-uni-layouts](https://github.com/uni-helper/vite-plugin-uni-layouts) 插件，
将 `nut-notify` 节点置于 `layout` 中，可以更进一步简化使用

> layouts/default.vue

```html
<template>
  <slot></slot>

  <nut-notify></nut-notify>
</template>
```

:::

### 组合式函数用法

::: warning 注意
目前 `useNotify` 只能在 `setup` 作用域下使用
:::

```ts
import { useNotify } from "nutui-uniapp/composables";

const notify = useNotify();

function showPrimary() {
  notify.primary("主要通知");
}

function showSuccess() {
  notify.success("成功通知");
}

function showDanger() {
  notify.danger("危险通知");
}

function showWarning() {
  notify.warning("警告通知");
}

function hide() {
  notify.hide();
}
```

```html
<template>
  <nut-notify></nut-notify>

  <nut-cell title="主要通知" is-link @click="showPrimary"></nut-cell>
  <nut-cell title="成功通知" is-link @click="showSuccess"></nut-cell>
  <nut-cell title="危险通知" is-link @click="showDanger"></nut-cell>
  <nut-cell title="警告通知" is-link @click="showWarning"></nut-cell>
  <nut-cell title="手动关闭通知" is-link @click="hide"></nut-cell>
</template>
```

若页面中存在多个`notify`实例，可以使用`selector`改变配置注入的key，以防止同时控制多个实例（注意，`selector`不支持动态修改）

```ts
const notify = useNotify();
const notify2 = useNotify("notify2");
```

```html
<template>
  <nut-notify></nut-notify>
  <nut-notify selector="notify2"></nut-notify>
</template>
```

### Ref用法

```ts
import type { NotifyInst } from "nutui-uniapp";

const notify = ref<NotifyInst | null>(null);

function showPrimary() {
  notify.value?.primary("主要通知");
}

function showSuccess() {
  notify.value?.success("成功通知");
}

function showDanger() {
  notify.value?.danger("危险通知");
}

function showWarning() {
  notify.value?.warning("警告通知");
}

// 1.7.15 及之前的版本，使用 `showNotify` 方法
notify.value?.showNotify({
  type: "primary",
  msg: "主要通知"
});
```

```html
<template>
  <nut-notify ref="notify"></nut-notify>

  <nut-cell title="主要通知" is-link @click="showPrimary"></nut-cell>
  <nut-cell title="成功通知" is-link @click="showSuccess"></nut-cell>
  <nut-cell title="危险通知" is-link @click="showDanger"></nut-cell>
  <nut-cell title="警告通知" is-link @click="showWarning"></nut-cell>
</template>
```

### Props用法

```ts
import type { NotifyProps } from "nutui-uniapp";

const notifyState = ref<Pick<NotifyProps, "visible" | "type" | "msg">>({
  visible: false,
  type: "primary",
  msg: ""
});

function showPrimary() {
  notifyState.value = {
    visible: true,
    type: "primary",
    msg: "主要通知"
  };
}

function showSuccess() {
  notifyState.value = {
    visible: true,
    type: "success",
    msg: "成功通知"
  };
}

function showDanger() {
  notifyState.value = {
    visible: true,
    type: "danger",
    msg: "危险通知"
  };
}

function showWarning() {
  notifyState.value = {
    visible: true,
    type: "warning",
    msg: "警告通知"
  };
}
```

```html
<template>
  <nut-notify v-model:visible="notifyState.visible"
              :type="notifyState.type"
              :msg="notifyState.msg"></nut-notify>

  <nut-cell title="主要通知" is-link @click="showPrimary"></nut-cell>
  <nut-cell title="成功通知" is-link @click="showSuccess"></nut-cell>
  <nut-cell title="危险通知" is-link @click="showDanger"></nut-cell>
  <nut-cell title="警告通知" is-link @click="showWarning"></nut-cell>
</template>
```

### 自定义样式

```ts
// 自定义文字颜色和背景颜色
function showCustomStyle() {
  notify.custom("自定义样式", {
    customColor: "#ad0000",
    background: "#ffe1e1"
  });
}

// 自定义时长
function showCustomDuration() {
  notify.primary("自定义时长5s", {
    duration: 5000
  });
}

// 自定义位置
function showCustomPosition() {
  notify.primary("自定义位置", {
    position: "bottom"
  });
}

// 1.7.15 及之前的版本，通过ref调用 `showNotify` 方法使用
notify.showNotify({
  type: "primary",
  msg: "自定义样式",
  customColor: "#ad0000",
  background: "#ffe1e1"
});
```

### Props

| 参数                              | 说明                                                         | 类型               | 默认值      |
|---------------------------------|------------------------------------------------------------|------------------|----------|
| visible                         | 显示与否                                                       | boolean          | `false`  |
| selector `1.7.16`               | 配置注入的key                                                   | string           | -        | -       |
| type                            | 提示的信息类型，可选值为 `base` `primary` `success` `danger` `warning` | string           | `danger` |
| msg                             | 展示文案，支持通过`\n`换行                                            | string           | `''`     |
| position                        | 自定义位置，可选值为 `top` `bottom`                                  | string           | `top`    |
| duration                        | 展示时长(ms)，值为 0 时，notify 不会消失                                | number           | `3000`   |
| class-name                      | 自定义类名                                                      | string \| number | `1`      |
| z-index `1.7.16`                | 组件z-index                                                  | number           | -        | `9999`    |
| custom-color                    | 字体颜色                                                       | string           | -        |
| background                      | 背景颜色                                                       | string           | -        |
| safe-area-inset-top             | 是否留出顶部安全距离（默认为状态栏高度）                                       | boolean          | `false`  |
| safe-area-inset-bottom `1.7.16` | 是否留出底部安全距离（启用后通过 `safeHeight` 指定距离）                        | boolean          | `false`  |
| safe-height                     | 自定义安全距离                                                    | number           | -        |
| on-click                        | 点击时的回调函数                                                   | Function         | -        |
| on-close                        | 关闭时的回调函数                                                   | Function         | -        |
| on-closed `1.7.16`              | 关闭动画完成时回调函数                                                | Function         | -        |

### Events

| 事件名    | 说明        | 回调参数 |
|--------|-----------|------|
| click  | 点击时触发     | `-`  |
| close  | 关闭时触发     | `-`  |
| closed | 关闭动画完成时触发 | `-`  |

### Methods

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Notify 实例并调用实例方法

| 方法名              | 说明                | 参数                                                           | 返回值 |
|------------------|-------------------|--------------------------------------------------------------|-----|
| show `1.7.16`    | 显示通知              | (type: `NotifyType`, msg: string, options?: `NotifyOptions`) | -   |
| primary `1.7.16` | 主要通知              | (msg: string, options?: `NotifyOptions`)                     | -   |
| success `1.7.16` | 成功通知              | (msg: string, options?: `NotifyOptions`)                     | -   |
| danger `1.7.16`  | 危险通知              | (msg: string, options?: `NotifyOptions`)                     | -   |
| warning `1.7.16` | 警告通知              | (msg: string, options?: `NotifyOptions`)                     | -   |
| custom `1.7.16`  | 自定义通知             | (msg: string, options?: `NotifyOptions`)                     | -   |
| hide `1.7.16`    | 隐藏通知              | -                                                            | -   |
| showNotify       | （已废弃，下个主版本移除）显示通知 | (options: `NotifyOptions`)                                   | -   |
| hideNotify       | （已废弃，下个主版本移除）隐藏通知 | -                                                            | -   |

::: details 类型定义 `1.7.16`

```ts
export interface NotifyOptions {
  /**
   * @description 显示与否
   */
  visible?: boolean
  /**
   * @description 提示的信息类型，可选值为`base` `primary` `success` `danger` `warning`
   */
  type?: NotifyType
  /**
   * @description 展示文案，支持通过`\n`换行
   */
  msg?: string
  /**
   * @description 自定义位置，可选值为 `top` `bottom`
   */
  position?: NotifyPosition
  /**
   * @description 展示时长(ms)，值为 0 时，notify 不会消失
   */
  duration?: number
  /**
   * @description 自定义类名
   */
  className?: string
  /**
   * @description 组件z-index
   */
  zIndex?: number
  /**
   * @description 字体颜色
   */
  customColor?: string
  /**
   * @description 背景颜色
   */
  background?: string
  /**
   * @description 是否留出顶部安全距离（默认为状态栏高度）
   */
  safeAreaInsetTop?: boolean
  /**
   * @description 是否留出底部安全距离（启用后通过 `safeHeight` 指定距离）
   */
  safeAreaInsetBottom?: boolean
  /**
   * @description 自定义安全距离
   */
  safeHeight?: number | string
  /**
   * @description 点击时的回调函数
   */
  // eslint-disable-next-line ts/no-unsafe-function-type
  onClick?: Function
  /**
   * @description 关闭时的回调函数
   */
  // eslint-disable-next-line ts/no-unsafe-function-type
  onClose?: Function
  /**
   * @description 关闭动画完成时回调函数
   */
  // eslint-disable-next-line ts/no-unsafe-function-type
  onClosed?: Function
}
```

```ts
export interface NotifyInst {
  /**
   * @deprecated 使用`show`、`primary`、`success`、`danger`、`warning`代替
   * @description 显示通知
   */
  showNotify: (options: NotifyOptions) => void
  /**
   * @deprecated 使用`hide`代替
   * @description 隐藏通知
   */
  hideNotify: () => void

  /**
   * @description 显示通知
   */
  show: (type: NotifyType, msg: string, options?: NotifyOptions) => void
  /**
   * @description 主要通知
   */
  primary: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 成功通知
   */
  success: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 危险通知
   */
  danger: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 警告通知
   */
  warning: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 自定义通知
   */
  custom: (msg: string, options?: NotifyOptions) => void
  /**
   * @description 隐藏通知
   */
  hide: () => void
}
```

:::

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                    | 默认值                                                                                                                         |
|---------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| --nut-notify-text-color               | var(--nut-white)                                                                                                            |
| --nut-notify-padding                  | 12px 0                                                                                                                      |
| --nut-notify-font-size                | 14px                                                                                                                        |
| --nut-notify-height                   | 44px                                                                                                                        |
| --nut-notify-line-height              | 1.25                                                                                                                        |
| --nut-notify-base-background-color    | linear-gradient(135deg,var(--nut-primary-color) 0%,var(--nut-primary-color-end) 100%)                                       |
| --nut-notify-primary-background-color | linear-gradient(315deg, rgba(73, 143, 242, 1) 0%, rgba(73, 101, 242, 1) 100%)                                               |
| --nut-notify-success-background-color | linear-gradient(135deg,rgba(38, 191, 38, 1) 0%,rgba(39, 197, 48, 1) 45%,rgba(40, 207, 63, 1) 83%,rgba(41, 212, 70, 1) 100%) |
| --nut-notify-danger-background-color  | rgba(250, 50, 25, 1)                                                                                                        |
| --nut-notify-warning-background-color | linear-gradient(135deg, rgba(255, 93, 13, 1) 0%, rgba(255, 154, 13, 1) 100%)                                                |
