# Popup 弹出层

### 介绍

弹出层容器，用于展示弹窗、信息提示等内容，支持多个弹出层叠加展示

### 基础用法

通过设置 `visible` 控制显示/隐藏

```html
<template>
  <nut-cell title="展示弹出层" is-link @click="showBasic = true"></nut-cell>
  <nut-popup :custom-style="{ padding: '30px 50px' }" v-model:visible="showBasic">正文</nut-popup>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showBasic: false
      });
      return { ...toRefs(state) };
    }
  };
</script>
```

### 弹出位置

通过设置 `position` 的值来控制弹出位置

```html
<template>
  <nut-cell title="顶部弹出" is-link @click="showTop = true"></nut-cell>
  <nut-popup position="top" :custom-style="{ height: '20%' }" v-model:visible="showTop"></nut-popup>
  <nut-cell title="底部弹出" is-link @click="showBottom = true"></nut-cell>
  <nut-popup position="bottom" :custom-style="{ height: '20%' }" v-model:visible="showBottom"></nut-popup>
  <nut-cell title="左侧弹出" is-link @click="showLeft = true"></nut-cell>
  <nut-popup position="left" :custom-style="{ width: '20%', height: '100%' }" v-model:visible="showLeft"></nut-popup>
  <nut-cell title="右侧弹出" is-link @click="showRight = true"></nut-cell>
  <nut-popup position="right" :custom-style="{ width: '20%', height: '100%' }" v-model:visible="showRight"></nut-popup>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showTop: false,
        showBottom: false,
        showLeft: false,
        showRight: false,
      });
      return { ...toRefs(state) };
    }
  };
</script>
```

### 图标

通过 `closeable` 控制图标是否可关闭，`close-icon-position` 来设置图标的位置，`close-icon` 来自定义显示图标，详情可参照[图标](/components/basic/icon)

```html
<template>
  <nut-cell title="关闭图标" is-link @click="showIcon = true"></nut-cell>
  <nut-popup position="bottom" closeable :custom-style="{ height: '20%' }" v-model:visible="showIcon"></nut-popup>
  <nut-cell title="图标位置" is-link @click="showIconPosition = true" ></nut-cell>
  <nut-popup position="bottom" closeable close-icon-position="top-left" :custom-style="{ height: '20%' }" v-model:visible="showIconPosition" ></nut-popup>
  <nut-cell title="自定义图标" is-link @click="showCloseIcon = true" ></nut-cell>
  <nut-popup position="bottom" closeable close-icon-position="top-left" :custom-style="{ height: '20%' }" v-model:visible="showCloseIcon">
    <template #close-icon>
      <nut-icon name="heart" />
    </template>
  </nut-popup>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showIcon: false,
        showIconPosition: false,
        showCloseIcon: false,
      });
      return { ...toRefs(state) };
    }
  };
</script>
```

### 圆角弹框

通过设置 `round` 来控制是否显示圆角

```html
<template>
  <nut-cell title="圆角弹框" is-link @click="showRound = true"></nut-cell>
  <nut-popup position="bottom" closeable round :custom-style="{ height: '30%' }" v-model:visible="showRound"></nut-popup>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showRound: false,
      });
      return { ...toRefs(state) };
    }
  };
</script>
```

### 多层堆叠

```html
<template>
  <nut-cell title="多层堆叠" is-link @click="showPop1 = true"></nut-cell>
  <nut-popup :custom-style="{ padding: '30px 50px' }" v-model:visible="showPop1">
    <div @click="showPop2 = true">点击它</div>
  </nut-popup>
  <nut-popup :custom-style="{ padding: '30px 50px' }" v-model:visible="showPop2">正文</nut-popup>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        showPop1: false,
        showPop2: false
      });
      return { ...toRefs(state) };
    }
  };
</script>
```

## API

> 当前组件内部透传了 [Icon组件](/components/basic/icon) 和 [Overlay组件](/components/basic/overlay)
>
### Props

| 参数                   | 说明                                                                        | 类型             | 默认值        |
| ---------------------- | --------------------------------------------------------------------------- | ---------------- | ------------- |
| v-model:visible        | 控制当前组件显示/隐藏                                                       | boolean          | `false`       |
| z-index                | 遮罩层级                                                                    | string \| number | `2000`        |
| duration               | 组件显示/隐藏的动画时长，单位秒                                             | string \| number | `0.3`         |
| lock-scroll  `H5`      | 背景是否锁定                                                                | boolean          | `true`        |
| overlay                | 是否显示遮罩                                                                | boolean          | `true`        |
| close-on-click-overlay | 是否点击遮罩关闭                                                            | boolean          | `true`        |
| position               | 弹出位置（top,bottom,left,right,center）                                    | string           | `"center"`    |
| transition             | 动画名                                                                      | string           | -             |
| custom-style           | 自定义弹框样式                                                              | CSSProperties    | -             |
| pop-class              | 自定义弹框类名                                                              | string           | -             |
| closeable              | 是否显示关闭按钮                                                            | boolean          | `false`       |
| close-icon-position    | 关闭按钮位置（top-left,top-right,bottom-left,bottom-right）                 | string           | `"top-right"` |
| close-icon             | [图标名称](/components/basic/icon) 或图片链接                               | string           | `"close"`     |
| destroy-on-close       | 弹层关闭后 `slot`内容会不会清空                                             | boolean          | `true`        |
| round                  | 是否显示圆角                                                                | boolean          | `false`       |
| overlay-class          | 自定义遮罩层类名                                                            | string           | ''            |
| overlay-style          | 自定义遮罩层样式                                                            | string           | ''            |
| safe-area-inset-bottom | 是否开启 iphone 系列全面屏底部安全区适配,仅当 `position` 为 `bottom` 时有效 | boolean          | `false`       |

### Events

| 事件名           | 说明                   | 回调参数       |
| ---------------- | ---------------------- | -------------- |
| click-pop        | 点击弹出层时触发       | `event: Event` |
| click-close-icon | 点击关闭图标时触发     | `event: Event` |
| open             | 打开弹框时触发         | -              |
| close            | 关闭弹框时触发         | -              |
| opened           | 遮罩打开动画结束时触发 | `event: Event` |
| closed           | 遮罩关闭动画结束时触发 | `event: Event` |
| click-overlay    | 点击遮罩触发           | `event: Event` |

### Slots

| 名称      | 说明                 |
| --------- | -------------------- |
| default   | 自定义内嵌内容       |
| closeIcon | 关闭按钮的自定义图标 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                          | 默认值 |
| ----------------------------- | ------ |
| --nut-popup-close-icon-margin | 16px   |
| --nut-popup-border-radius     | 20px   |
