# Dialog 对话框

### 介绍

模态对话框，在浮层中显示，引导用户进行相关操作，常用于消息提示、消息确认，或在当前页面内完成特定的交互操作。

### 使用方式

```html
<template>
  <nut-dialog
    v-model:visible="visible"
    title="基础弹框"
    content="这是基础弹框。"
    @ok="onOk"
    @cancel="onCancel"
  ></nut-dialog>

  <nut-dialog
    v-model:visible="visible"
    content="这是无标题弹框。"
    @ok="onOk"
    @cancel="onCancel"
  ></nut-dialog>

  <nut-dialog
    v-model:visible="visible"
    title="温馨提示"
    content="这是提示弹框。"
    no-cancel-btn
    @ok="onOk"
    @cancel="onCancel"
  ></nut-dialog>

  <nut-dialog
    :visible="visible"
    title="异步关闭"
    content="弹框内容"
    @ok="onAsyncOk"
    @cancel="onCancel"
  ></nut-dialog>

  <nut-dialog ref="dialogEl"></nut-dialog>
</template>
```

```ts
import type { DialogInst } from "nutui-uniapp";

const dialogEl = ref<DialogInst>();

const visible = ref(false);

function onOk() {
  console.log("ok");
}

function onCancel() {
  console.log("cancel");
}

async function onAsyncOk() {
  await sleep(1000);

  visible.value = false;
}

// 也可以使用 Ref 调用
function open() {
  dialogEl.value.showDialog({
    title: "通过 Ref 调用",
    content: "使用 Ref 调用可以只写一个 Dialog 组件",
    noFooter: true
  });

  setTimeout(() => {
    dialogEl.value.onOk();
  }, 2000);
}
```

## API

### Props

| 参数                     | 说明                                        | 类型            | 可选值                   | 默认值        |
|------------------------|-------------------------------------------|---------------|-----------------------|------------|
| title                  | 标题                                        | string        | -                     | -          |
| content                | 内容，支持富文本                                  | string        | -                     | -          |
| close-on-click-overlay | 点击蒙层是否关闭对话框                               | boolean       | -                     | `true`     |
| no-footer              | 是否隐藏底部按钮栏                                 | boolean       | -                     | `false`    |
| no-ok-btn              | 是否隐藏确定按钮                                  | boolean       | -                     | `false`    |
| no-cancel-btn          | 是否隐藏取消按钮                                  | boolean       | -                     | `false`    |
| cancel-text            | 取消按钮文案                                    | string        | -                     | 取消         |
| ok-text                | 确定按钮文案                                    | string        | -                     | 确 定        |
| cancel-auto-close      | 取消按钮是否默认关闭弹窗                              | boolean       | -                     | `true`     |
| text-align             | 文字对齐方向, 可选值同 CSS 的 `text-align`           | string        | -                     | center     |
| close-on-popstate `H5` | 是否在页面回退时自动关闭                              | boolean       | -                     | `false`    |
| lock-scroll `H5`       | 背景是否锁定                                    | boolean       | -                     | `true`     |
| footer-direction       | 使用横纵方向                                    | string        | horizontal / vertical | horizontal |
| overlay-class          | 自定义遮罩类名                                   | string        | -                     | -          |
| overlay-style          | 自定义遮罩样式                                   | CSSProperties | -                     | -          |
| pop-class              | 自定义弹框类名                                   | string        | -                     | -          |
| pop-style              | 自定义弹框样式                                   | CSSProperties | -                     | -          |
| before-close           | 关闭前的回调函数（返回 `false` 可阻止关闭，支持返回 `Promise`） | Function      | -                     | -          |
| ok-auto-close `1.3.0`  | 确认按钮是否默认关闭弹窗                              | boolean       | -                     | `true`     |

### Events

| 事件名    | 说明     | 类型           |
|--------|--------|--------------|
| ok     | 确定按钮回调 | `() => void` |
| cancel | 取消按钮回调 | `() => void` |
| closed | 关闭弹框回调 | `() => void` |
| opened | 打开弹框回调 | `() => void` |

### Slots

| 名称      | 说明        |
|---------|-----------|
| header  | 自定义标题区域   |
| default | 自定义内容     |
| footer  | 自定义底部按钮区域 |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Dialog 实例并调用实例方法。

| 名称         | 说明   | 类型                                 |
|------------|------|------------------------------------|
| showDialog | 打开弹框 | `(options: DialogOptions) => void` |
| onOk       | 确认   | `() => void`                       |
| onCancel   | 取消   | `() => void`                       |

```ts
interface DialogOptions {
  /**
   * @description 标题
   */
  title?: string;
  /**
   * @description 内容，支持富文本
   */
  content?: string;
  /**
   * @description 是否隐藏底部按钮栏
   */
  noFooter?: boolean;
  /**
   * @description 是否隐藏确定按钮
   */
  noOkBtn?: boolean;
  /**
   * @description 是否隐藏取消按钮
   */
  noCancelBtn?: boolean;
  /**
   * @description 取消按钮文案
   */
  cancelText?: string;
  /**
   * @description 确定按钮文案
   */
  okText?: string;
  /**
   * @description 文字对齐方向，可选值同 css 的 text-align
   */
  textAlign?: TextAlign;
  /**
   * @description 使用横纵方向 可选值 horizontal、vertical
   */
  footerDirection?: FooterDirection;
  /**
   * @description 弹出动画类型
   */
  transition?: NutAnimationName;
  /**
   * @description 点击蒙层是否关闭对话框
   */
  closeOnClickOverlay?: boolean;
  /**
   * @description 确认按钮是否默认关闭弹窗
   */
  okAutoClose?: boolean;
}
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                  | 默认值                 |
|-------------------------------------|---------------------|
| --nut-dialog-width                  | 296px               |
| --nut-dialog-header-font-weight     | normal              |
| --nut-dialog-header-color           | rgba(38, 38, 38, 1) |
| --nut-dialog-footer-justify-content | space-around        |
