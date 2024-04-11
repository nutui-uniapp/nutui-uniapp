# ellipsis

### 介绍

展示空间不足时，隐去部分内容并用“...”替代。

### 头部省略

```html
<template>
  <nut-ellipsis content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。" direction="start" ></nut-ellipsis>
</template>
```

### 尾部省略

```html
<template>
  <nut-ellipsis content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。" direction="end" ></nut-ellipsis>
</template>
```

### 中间省略

```html
<template>
  <nut-ellipsis content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。" direction="middle" ></nut-ellipsis>
</template>
```

### 多行省略

```html
<template>
  <nut-ellipsis 
    content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。" 
    direction="start" 
    rows="3"></nut-ellipsis>
</template>
```

### 展开收起

```html
<template>
  <nut-ellipsis 
    direction="start" 
    expandText="展开" 
    collapseText="收起"
    content="NutUI3.0上线后我们研发团队也在不断的优化、测试、使用、迭代 Vue3 的相关组件，但是在跨端小程序的开发过程中，发现没有合适的组件库可以支持多端开发。为了填补这一空白，同时为了优化开发者体验，让 NutUI 能够为更多的开发者带来便利，我们决定在 NutUI 中增加小程序多端适配的能力。" ></nut-ellipsis>
</template>
```

## API

### Props

| 参数          | 说明                                          | 类型             | 默认值 |
| ------------- | --------------------------------------------- | ---------------- | ------ |
| content       | 文本内容                                      | string           | -      |
| direction     | 省略位置，可选值 `start` \| `end` \| `middle` | string           | `end`  |
| rows          | 展示几行                                      | number           | `1`    |
| expand-text   | 展开操作的文案                                | string           | `''`   |
| collapse-text | 收起操作的文案                                | string           | `''`   |
| symbol        | 省略的符号                                    | string           | `...`  |
| line-height   | 容器的行高                                    | string \| number | `20`   |

### Events

| 事件名 | 说明               | 回调参数               |
| ------ | ------------------ | ---------------------- |
| click  | 文本点击是触发     | -                      |
| change | 点击展开收起时触发 | `expand` 或 `collapse` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                 | 默认值  |
| ------------------------------------ | ------- |
| --nut-ellipsis-expand-collapse-color | #3460fa |
