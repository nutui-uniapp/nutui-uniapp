# Menu 菜单

### 介绍

向下弹出的菜单列表。

### 基础用法

```html
<template>
  <nut-menu>
    <nut-menu-item v-model="state.value1" :options="options1"></nut-menu-item>
    <nut-menu-item v-model="state.value2" :options="options2" @change="onChange"></nut-menu-item>
  </nut-menu>
</template>
```

```ts
const state = reactive({
  value1: 0,
  value2: "a"
});

const options1 = ref([
  { text: "全部商品", value: 0 },
  { text: "新款商品", value: 1 },
  { text: "活动商品", value: 2 }
]);

const options2 = ref([
  { text: "默认排序", value: "a" },
  { text: "好评排序", value: "b" },
  { text: "销量排序", value: "c" }
]);

function onChange(value: number | string) {
  console.log("change", value);
}
```

### 滚动固定

启用 `scroll-fixed` 属性可以滚动一定距离后变更为 `fixed` 定位。

自 `1.7.13` 开始，必须配合 `scroll-top` 属性使用，需要将 [onPageScroll](https://uniapp.dcloud.net.cn/tutorial/page.html#onpagescroll)
的 scrollTop 传给组件。

对于 `1.7.12` 及以下的版本，由于 uni-app 中组件单独声明 `onPageScroll` 无效，需要手动在页面中声明一次 `onPageScroll` 后组件内部
才能正确获取 scrollTop 的值，参考 [question-136635](https://ask.dcloud.net.cn/question/136635)。

```html
<template>
  <nut-menu scroll-fixed :scroll-top="scrollTop">
    <nut-menu-item v-model="state.value1" :options="options1"></nut-menu-item>
    <nut-menu-item v-model="state.value2" :options="options2"></nut-menu-item>
  </nut-menu>

  <!-- 可以通过 CSS 变量修改 fixed 状态的 top -->
  <nut-menu
    custom-style="--nut-menu-scroll-fixed-top: 44px"
    scroll-fixed
    :scroll-top="scrollTop"
  >
    <!--  ...  -->
  </nut-menu>

  <!-- 也可以传数字类型的值修改固定的阈值（单位：px） -->
  <nut-menu :scroll-fixed="100" :scroll-top="scrollTop">
    <!--  ...  -->
  </nut-menu>
</template>
```

```ts
const scrollTop = ref(0);

onPageScroll((res) => {
  scrollTop.value = res.scrollTop;
});
```

### 自定义菜单内容

使用实例上的 `toggle()` 方法可以手动关闭弹框。

```html
<template>
  <nut-menu>
    <nut-menu-item v-model="state.value1" :options="options1" />
    <nut-menu-item ref="menuItemEl" title="筛选">
      <view class="flex flex-col items-center">
        <text>自定义内容</text>
        <nut-button @click="confirm()">确认</nut-button>
      </view>
    </nut-menu-item>
  </nut-menu>
</template>
```

```ts
import type { MenuItemInst } from "nutui-uniapp";

const menuItemEl = ref<MenuItemInst>();

const state = reactive({
  value1: 0
});

const options1 = ref([
  { text: "全部商品", value: 0 },
  { text: "新款商品", value: 1 },
  { text: "活动商品", value: 2 }
]);

function confirm() {
  menuItemEl.value.toggle();
}
```

### 一行两列

```html {6}
<template>
  <nut-menu>
    <nut-menu-item
      v-model="value"
      :options="options"
      :cols="2"
    ></nut-menu-item>
  </nut-menu>
</template>
```

### 自定义选中态颜色

```html
<template>
  <nut-menu active-color="green">
    <nut-menu-item v-model="state.value1" :options="options1"></nut-menu-item>
    <nut-menu-item v-model="state.value2" :options="options2"></nut-menu-item>
  </nut-menu>
</template>
```

### 自定义图标

```html
<template>
  <nut-menu>
    <template #icon>
      <nut-icon name="triangle-down"></nut-icon>
    </template>

    <nut-menu-item v-model="state.value1" :options="options1"></nut-menu-item>
    <nut-menu-item v-model="state.value2" :options="options2">
      <template #icon>
        <nut-icon name="checked"></nut-icon>
      </template>
    </nut-menu-item>
  </nut-menu>
</template>
```

### 向上展开

```html
<template>
  <nut-menu direction="up">
    <nut-menu-item v-model="state.value1" :options="options1"></nut-menu-item>
    <nut-menu-item v-model="state.value2" :options="options2"></nut-menu-item>
  </nut-menu>
</template>
```

### 禁用菜单

```html
<template>
  <nut-menu>
    <nut-menu-item v-model="state.value1" :options="options1" disabled></nut-menu-item>
    <nut-menu-item v-model="state.value2" :options="options2" disabled></nut-menu-item>
  </nut-menu>
</template>
```

## API

### Props

| 参数                     | 说明            | 类型                        | 可选值       | 默认值       |
|------------------------|---------------|---------------------------|-----------|-----------|
| active-color           | 选项的选中态图标颜色    | string                    | -         | #F2270C   |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单 | boolean                   | -         | `true`    |
| scroll-fixed           | 滚动后是否固定       | boolean / string / number | -         | `false`   |
| scroll-top `1.7.13`    | 页面的滚动距离       | number                    | -         | `0`       |
| title-class            | 自定义标题样式类      | string                    | -         | -         |
| lock-scroll `H5`       | 背景是否锁定        | boolean                   | -         | `true`    |
| title-icon             | 自定义标题图标       | string                    | -         | -         |
| direction              | 展开方向          | string                    | up / down | down      |
| up-icon                | 收起的图标         | string                    | -         | rect-up   |
| down-icon              | 展开的图标         | string                    | -         | rect-down |

### Slots

| 名称   | 说明              |
|------|-----------------|
| icon | 自定义标题图标（不支持小程序） |

### MenuItem Props

| 参数                   | 说明             | 类型              | 可选值 | 默认值     |
|----------------------|----------------|-----------------|-----|---------|
| v-model              | 选中值            | string / number | -   | -       |
| title                | 菜单项标题          | string          | -   | -       |
| options              | 选项数组           | Array           | -   | `[]`    |
| disabled             | 是否禁用菜单         | boolean         | -   | `false` |
| cols                 | 一行展示多少列        | number          | -   | `1`     |
| active-title-class   | 选项选中时自定义标题样式类  | string          | -   | -       |
| inactive-title-class | 选项非选中时自定义标题样式类 | string          | -   | -       |
| option-icon          | 选项选中时选中图标      | string          | -   | -       |

### MenuItem Events

| 事件名                 | 说明       | 类型                                  |
|---------------------|----------|-------------------------------------|
| change              | 选择选项时触发  | `(value: number \| string) => void` |
| open                | 打开菜单栏时触发 | `() => void`                        |
| close               | 关闭菜单栏时触发 | `() => void`                        |
| item-click `1.7.11` | 点击选项时触发  | `(item: MenuItemOption) => void`    |

### MenuItem Slots

| 名称   | 说明              |
|------|-----------------|
| icon | 自定义选项图标（不支持小程序） |

### MenuItem Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 MenuItem 实例并调用实例方法。

| 名称              | 说明                                        | 类型                                   |
|-----------------|-------------------------------------------|--------------------------------------|
| toggle          | 切换菜单展示状态（传 `true` 为显示，`false` 为隐藏，不传参为取反） | `(show?: boolean) => boolean`        |
| change `1.7.11` | 变更选择项                                     | `(value?: number \| string) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                    | 默认值                               |
|---------------------------------------|-----------------------------------|
| --nut-menu-bar-line-height            | 48px                              |
| --nut-menu-item-font-size             | var(--nut-font-size-2)            |
| --nut-menu-item-text-color            | var(--nut-title-color)            |
| --nut-menu-item-active-text-color     | var(--nut-primary-color)          |
| --nut-menu-bar-border-bottom-color    | #eaf0fb                           |
| --nut-menu-bar-opened-z-index         | 2001                              |
| --nut-menu-item-disabled-color        | #969799                           |
| --nut-menu-title-text-padding-left    | 8px                               |
| --nut-menu-title-text-padding-right   | 8px                               |
| --nut-menu-item-content-padding       | 12px 24px                         |
| --nut-menu-item-content-max-height    | 214px                             |
| --nut-menu-item-option-padding-top    | 12px                              |
| --nut-menu-item-option-padding-bottom | 12px                              |
| --nut-menu-item-option-i-margin-right | 6px                               |
| --nut-menu-bar-box-shadow             | 0 2px 12px rgba(89, 89, 89, 0.12) |
| --nut-menu-scroll-fixed-top           | 0                                 |
| --nut-menu-scroll-fixed-z-index       | 1000                              |
| --nut-menu-active-item-font-weight    | 500                               |
