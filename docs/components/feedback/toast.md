# Toast 吐司

### 介绍

用于轻提示。

### ref调用

```html

<template>
  <nut-toast
      ref="toastRef"
      @closed="page.methods.onClosed"
    />
    <nut-cell title="Success 成功提示" is-link @click="refClick('success', '成功提示')" />
    <nut-cell title="Error 失败提示" is-link @click="refClick('fail', '失败提示')" />
    <nut-cell title="Warning 警告提示" is-link @click="refClick('warn', '警告提示')" />
    <nut-cell title="Loading 加载提示" is-link @click="refClick('loading', '加载中')" />
</template>

<script lang="ts" setup>
import type { ToastInst } from 'uniapp-nutui'
const toastRef = ref<ToastInst>()
const refClick = (type: string, msg: string) => {
      toastRef.value?.showToast[type as 'fail' | 'success' | 'warn' | 'loading'](msg,
        {
          title: '使用ref调用更加方便与灵活',
          duration: 0,
        },
      )

      setTimeout(() => {
        toastRef.value?.hideToast()
      }, 1000)
}
</script>

```

### 基础用法

``` html
<nut-toast :msg="page.state.msg" v-model:visible="page.state.show" :type="page.state.type" @closed="page.methods.onClosed" :cover="page.state.cover" />
<nut-cell title="Text 文字提示" is-link @click="page.methods.openToast('text','网络失败，请稍后再试~')"></nut-cell>
<nut-cell title="Title 标题文字" is-link @click="page.methods.openToast('text', '网络失败，请稍后再试~',false,'标题文字')" ></nut-cell>
<nut-cell title="Text 自定义位置" is-link @click="page.methods.openToast('text', '自定义位置',false,'','20%',false)"></nut-cell>
<nut-cell title="Success 成功提示" is-link @click="page.methods.openToast('success','成功提示')"></nut-cell>
<nut-cell title="Error 失败提示" is-link @click="page.methods.openToast('fail','失败提示')"></nut-cell>
<nut-cell title="Warning 警告提示" is-link @click="page.methods.openToast('warn','警告提示')"></nut-cell>
<nut-cell title="Loading 加载提示" is-link @click="page.methods.openToast('loading','加载中')"></nut-cell>
<nut-cell title="Loading 带白色背景遮罩" is-link @click="page.methods.openToast('loading','加载中',true)"></nut-cell>
```

``` javascript
import { reactive } from 'vue';
export default {
  setup() {
    const page = {
      state: reactive({
        msg: 'toast',
        type: 'text',
        show: false,
        cover: false,
        title:'',
        bottom:'',
        center:true,
      }),
      methods: {
        openToast: (type: string, msg: string, cover: boolean = false) => {
          page.state.show = true;
          page.state.msg = msg;
          page.state.type = type;
          page.state.cover = cover;
          page.state.title = title;
          page.state.bottom = bottom;
          page.state.center = center
        },
        onClosed: () => console.log('closed')
      }
    };
    return {
      page
    };
  }
};
```

## API

### Props

| 字段                   | 说明                                                                    | 类型            | 默认值                        |
|------------------------|-------------------------------------------------------------------------|-----------------|-------------------------------|
| msg                    | 消息文本内容,支持传入HTML                                               | string \| VNode | `""`                            |
| duration               | 展示时长（毫秒）<br>值为 0 时，toast 不会自动消失（loading类型默认为0） | number          | `2000`                          |
| title                  | 标题                                                                    | string          | `''`                            |
| center                 | 是否展示在页面中部（为false时展示在底部）                               | boolean         | `true`                          |
| bottom                 | 距页面底部的距离（像素或者百分比），option.center为false时生效          | string          | `"30px"`                       |
| text-align-center      | 多行文案是否居中                                                        | boolean         | `true`                          |
| bg-color               | 背景颜色（透明度）                                                      | string          | "rgba(0, 0, 0, 0.8)"          |
| custom-class           | 自定义类名                                                              | string          | ""                            |
| icon                   | 自定义图标，**直接传入Component 或者 h函数**                            | Component       | -                             |
| size                   | 文案尺寸，**small**/**base**/**large**三选一                            | string          | `"base"`                        |
| cover                  | 是否显示遮罩层，loading类型默认显示                                     | boolean         | loading类型true/`其他类型false` |
| cover-color            | 遮罩层颜色，默认透明                                                    | string          | "rgba(0,0,0,0)"               |
| loading-rotate         | loading图标是否旋转，仅对loading类型生效                                | boolean         | `true`                          |
| on-close               | 关闭时触发的事件                                                        | function        | `null`                          |
| close-on-click-overlay | 是否在点击遮罩层后关闭提示                                              | boolean         | `false`                         |
| toast-style            | 提示框style                                                             | object          | `{}`                            |
| toast-class            | 提示框class                                                             | string          | ""                            |
| type                   | 弹框类型 可选值（text、success、fail、warn、loading）                   | string          | ""                            |

### Methods

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Form 实例并调用实例方法

| 方法名   | 说明                                                               | 参数                                      | 返回值 |
|----------|--------------------------------------------------------------------|-------------------------------------------|--------|
| showToast   | 展示 toast                                             | `ShowToast`                                         | -      |
| hideToast    | 隐藏 toast                                                        | -                                         | -      |

```ts
interface showToast {
  text(msg: string, options?: ToastOptions): void
  success(msg: string, options?: ToastOptions): void
  fail(msg: string, options?: ToastOptions): void
  warn(msg: string, options?: ToastOptions): void
  loading(msg: string, options?: ToastOptions): void
}

interface ToastOptions {
  msg?: string
  duration?: number
  type?: ToastType
  title?: string
  iconSize?: string | number
  icon?: string
  bgColor?: string
  size?: string | number
  bottom?: string
}
```

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                            | 默认值               |
|---------------------------------|----------------------|
| --nut-toast-title-font-size     | _16px_               |
| --nut-toast-text-font-size      | _14px_               |
| --nut-toast-font-color          | _var(--nut-white)_   |
| --nut-toast-inner-padding       | _24px 30px_          |
| --nut-toast-inner-bg-color      | _rgba(0, 0, 0, 0.8)_ |
| --nut-toast-inner-border-radius | _12px_               |
| --nut-toast-cover-bg-color      | _rgba(0, 0, 0, 0)_   |
