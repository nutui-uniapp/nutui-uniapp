# Toast 吐司

### 介绍

用于轻提示。

::: warning 关于全局调用
因为uniapp中无法通过JavaScript代码创建节点，所以组件层面无法实现类似于`uni.showToast`之类的全局调用，若有类似需求可参考[这篇回答](https://github.com/nutui-uniapp/nutui-uniapp/issues/251#issuecomment-2005638878)实现
:::

### 最简单的用法

> 自 `1.7.5` 开始支持组合式函数用法，`useToast` 的自动按需导入请参考 [快速上手-API导入](/guide/quick-start#api导入) 部分

```typescript
const toast = useToast();

function showText() {
  toast.text("文字提示");
}
```

```html
<template>
  <nut-toast></nut-toast>

  <nut-cell title="Text 文字提示" is-link @click="showText"></nut-cell>
</template>
```

### 组合式函数用法

```typescript
import { useToast } from "nutui-uniapp/composables";

const toast = useToast();

function showText() {
  toast.text("文字提示");
}

function showSuccess() {
  toast.success("成功提示");
}

function showError() {
  toast.error("错误提示");
}

function showWarning() {
  toast.warning("警告提示");
}

function showLoading() {
  toast.loading("加载提示", {
    duration: 5000
  });
}

function hideLoading() {
  toast.hide();
}
```

```html
<template>
  <nut-toast></nut-toast>

  <nut-cell title="Text 文字提示" is-link @click="showText"></nut-cell>
  <nut-cell title="Success 成功提示" is-link @click="showSuccess"></nut-cell>
  <nut-cell title="Error 错误提示" is-link @click="showError"></nut-cell>
  <nut-cell title="Warning 警告提示" is-link @click="showWarning"></nut-cell>
  <nut-cell title="Loading 加载提示" is-link @click="showLoading"></nut-cell>
  <nut-cell title="手动关闭提示" is-link @click="hideLoading"></nut-cell>
</template>
```

若页面中存在多个`toast`实例，可以使用`selector`改变配置注入的key，以防止同时控制多个实例（注意，`selector`不支持动态修改）

```typescript
const toast = useToast();
const toast2 = useToast("toast2");
```

```html
<template>
  <nut-toast></nut-toast>
  <nut-toast selector="toast2"></nut-toast>
</template>
```

### Ref用法

```typescript
import type { ToastInst } from "nutui-uniapp";

const toast = ref<ToastInst | null>(null);

function showSuccess() {
  toast.value?.success("成功提示");
}

function showError() {
  toast.value?.error("错误提示");
}

function showWarning() {
  toast.value?.warning("警告提示");
}
```

```html
<template>
  <nut-toast ref="toast"></nut-toast>

  <nut-cell title="Success 成功提示" is-link @click="showSuccess"></nut-cell>
  <nut-cell title="Error 错误提示" is-link @click="showError"></nut-cell>
  <nut-cell title="Warning 警告提示" is-link @click="showWarning"></nut-cell>
</template>
```

### Props用法

```typescript
import type { ToastProps } from "nutui-uniapp";

const toastState = ref<Pick<ToastProps, "visible" | "type" | "msg">>({
  visible: false,
  type: "text",
  msg: ""
});

function showSuccess() {
  toastState.value = {
    visible: true,
    type: "success",
    msg: "成功提示"
  };
}

function showError() {
  toastState.value = {
    visible: true,
    type: "error",
    msg: "错误提示"
  };
}

function showWarning() {
  toastState.value = {
    visible: true,
    type: "warning",
    msg: "警告提示"
  };
}
```

```html
<template>
  <nut-toast v-model:visible="toastState.visible"
             :type="toastState.type"
             :msg="toastState.msg"></nut-toast>

  <nut-cell title="Success 成功提示" is-link @click="showSuccess"></nut-cell>
  <nut-cell title="Error 错误提示" is-link @click="showError"></nut-cell>
  <nut-cell title="Warning 警告提示" is-link @click="showWarning"></nut-cell>
</template>
```

### 自定义样式

```typescript
// 带标题的提示
function showSuccessWithTitle() {
  toast.success("成功提示", {
    title: "我是一个有标题的提示"
  });
}

// 不同的图标
function showSuccessOtherIcon() {
  toast.success("成功提示", {
    icon: "dongdong",
    iconSize: "60rpx"
  });
}

// 也可以有遮罩层
function showSuccessWithCover() {
  toast.success("成功提示", {
    duration: 0,
    cover: true,
    coverColor: "rgba(0, 0, 0, 0.5)",
    closeOnClickOverlay: true
  });
}

// 展示在底部
function showSuccessBottom() {
  toast.success("成功提示", {
    center: false
  });
}
```

## API

### Props

| 参数                     | 说明                                        | 类型            | 可选值                                | 默认值     |
|------------------------|-------------------------------------------|---------------|------------------------------------|---------|
| visible                | 是否显示                                      | boolean       | -                                  | `false` |
| selector `1.7.5`       | 配置注入的key                                  | string        | -                                  | -       |
| type                   | 弹框类型                                      | string        | text,success,error,warning,loading | text    |
| title                  | 标题                                        | string        | -                                  | -       |
| msg                    | 消息文本内容，支持传入HTML                           | string        | -                                  | -       |
| duration               | 展示时长（单位：ms）（组合式函数用法/Ref用法中，loading类型默认为0） | number        | -                                  | `2000`  |
| size                   | 文案尺寸                                      | string        | small,base,large                   | base    |
| z-index `1.7.5`        | 组件z-index                                 | number        | -                                  | `50`    |
| icon                   | 自定义图标                                     | string        | -                                  | -       |
| icon-size              | 图标大小                                      | number/string | -                                  | 20px    |
| bg-color               | 背景颜色                                      | string        | -                                  | -       |
| cover                  | 是否显示遮罩层（组合式函数用法/Ref用法中，loading类型默认为true）  | boolean       | -                                  | -       |
| cover-color            | 遮罩层颜色，默认透明                                | string        | -                                  | -       |
| center                 | 是否展示在页面中部（为false时展示在底部）                   | boolean       | -                                  | `true`  |
| bottom                 | 距页面底部的距离（center为false时生效）                 | number/string | -                                  | 30px    |
| text-align-center      | 文案是否居中                                    | boolean       | -                                  | `true`  |
| loading-rotate         | loading图标是否旋转（仅对loading类型生效）              | boolean       | -                                  | `true`  |
| close-on-click-overlay | 是否在点击遮罩层后关闭提示                             | boolean       | -                                  | `false` |
| on-close               | 关闭时触发的事件                                  | Function      | -                                  | -       |
| on-closed `1.7.5`      | 关闭动画完成时触发的事件                              | Function      | -                                  | -       |

### Events

| 事件名            | 说明        |
|----------------|-----------|
| close          | 关闭时触发     |
| closed `1.7.5` | 关闭动画完成时触发 |

### Methods

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Toast 实例并调用实例方法

| 方法名             | 说明                | 参数                                      | 返回值 |
|-----------------|-------------------|-----------------------------------------|-----|
| text `1.7.5`    | 文字提示              | (msg: string, options?: `ToastOptions`) | -   |
| success `1.7.5` | 成功提示              | (msg: string, options?: `ToastOptions`) | -   |
| error `1.7.5`   | 错误提示              | (msg: string, options?: `ToastOptions`) | -   |
| warning `1.7.5` | 警告提示              | (msg: string, options?: `ToastOptions`) | -   |
| loading `1.7.5` | 加载提示              | (msg: string, options?: `ToastOptions`) | -   |
| hide `1.7.5`    | 隐藏提示              | -                                       | -   |
| showToast       | （已废弃，下个主版本移除）显示提示 | -                                       | -   |
| hideToast       | （已废弃，下个主版本移除）隐藏提示 | -                                       | -   |

::: details 类型定义 `1.7.5`

```typescript
export interface ToastOptions {
  /**
   * @description 是否显示
   */
  visible?: boolean
  /**
   * @description 弹框类型，可选值（text、success、error、warning、loading）
   */
  type?: ToastType
  /**
   * @description 标题
   */
  title?: string
  /**
   * @description 消息文本内容，支持传入HTML
   */
  msg?: string
  /**
   * @description 展示时长（单位：ms）
   * - 值为0时toast不会自动关闭
   * - 组合式函数用法/Ref用法中，loading类型默认为0
   */
  duration?: number
  /**
   * @description 文案尺寸，可选值（small、base、large）
   */
  size?: ToastSize
  /**
   * @description 组件z-index
   */
  zIndex?: number
  /**
   * @description 自定义图标
   */
  icon?: string
  /**
   * @description 图标大小
   */
  iconSize?: string | number
  /**
   * @description 背景颜色
   */
  bgColor?: string
  /**
   * @description 是否显示遮罩层
   * - 组合式函数用法/Ref用法中，loading类型默认为true
   */
  cover?: boolean
  /**
   * @description 遮罩层颜色，默认透明
   */
  coverColor?: string
  /**
   * @description 是否展示在页面中部（为false时展示在底部）
   */
  center?: boolean
  /**
   * @description 距页面底部的距离（center为false时生效）
   */
  bottom?: string | number
  /**
   * @description 文案是否居中
   */
  textAlignCenter?: boolean
  /**
   * @description loading图标是否旋转（仅对loading类型生效）
   */
  loadingRotate?: boolean
  /**
   * @description 是否在点击遮罩层后关闭提示
   */
  closeOnClickOverlay?: boolean
  /**
   * @description 关闭时触发的事件
   */
  onClose?: Function
  /**
   * @description 关闭动画完成时触发的事件
   */
  onClosed?: Function
}
```

```typescript
export interface ToastInst {
  /**
   * @deprecated 使用`text`、`success`、`error`、`warning`、`loading`代替
   * @description 显示提示
   */
  showToast: {
    text(msg: string, options?: ToastOptions): void
    success(msg: string, options?: ToastOptions): void
    fail(msg: string, options?: ToastOptions): void
    warn(msg: string, options?: ToastOptions): void
    loading(msg: string, options?: ToastOptions): void
  }
  /**
   * @deprecated 使用`hide`代替
   * @description 隐藏提示
   */
  hideToast: () => void

  /**
   * @description 文字提示
   */
  text(msg: string, options?: ToastOptions): void

  /**
   * @description 成功提示
   */
  success(msg: string, options?: ToastOptions): void

  /**
   * @description 错误提示
   */
  error(msg: string, options?: ToastOptions): void

  /**
   * @description 警告提示
   */
  warning(msg: string, options?: ToastOptions): void

  /**
   * @description 加载提示
   */
  loading(msg: string, options?: ToastOptions): void

  /**
   * @description 隐藏提示
   */
  hide(): void
}
```

:::

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                              | 默认值                  |
|---------------------------------|----------------------|
| --nut-toast-font-color          | _var(--nut-white)_   |
| --nut-toast-inner-padding       | _24px 30px_          |
| --nut-toast-inner-bg-color      | _rgba(0, 0, 0, 0.8)_ |
| --nut-toast-inner-border-radius | _12px_               |
| --nut-toast-cover-bg-color      | _rgba(0, 0, 0, 0)_   |
