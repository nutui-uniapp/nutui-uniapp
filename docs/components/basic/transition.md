# Transition 过渡动画

### 介绍

过渡动画。

### 基础用法

通过设置 `show` 控制显示 / 隐藏。

```html
<template>
  <nut-transition :show="show">
    <text>内容</text>
  </nut-transition>
</template>
```

```ts
const show = ref(false);
```

### 内置动画

通过 `name` 属性设置内置动画，目前支持 `fade`、`fade-up`、`fade-down`、`fade-left`、`fade-right`、`slide-up`、
`slide-down`、`slide-left`、`slide-right`、`zoom`、`none`。

```html
<template>
  <nut-transition name="fade-up"></nut-transition>
</template>
```

## API

### Props

| 参数                 | 说明                | 类型              | 可选值                                                                                                                  | 默认值     |
|--------------------|-------------------|-----------------|----------------------------------------------------------------------------------------------------------------------|---------|
| show               | 是否展示              | boolean         | -                                                                                                                    | `false` |
| name               | 内置动画名称            | string          | fade / fade-up / fade-down / fade-left / fade-right / slide-up / slide-down / slide-left / slide-right / zoom / none | fade    |
| duration           | 动画时长（单位：`ms`）     | string / number | -                                                                                                                    | `300`   |
| timing-function    | 动画函数              | string          | linear / ease / ease-in / ease-in-out / ease-out / step-start / step-end                                             | ease    |
| destroy-on-close   | 关闭后 `slot` 内容是否销毁 | boolean         | -                                                                                                                    | `false` |
| enter-from-class   | 进入动画前的类名          | string          | -                                                                                                                    | -       |
| enter-active-class | 进入动画时的类名          | string          | -                                                                                                                    | -       |
| enter-to-class     | 进入动画后的类名          | string          | -                                                                                                                    | -       |
| leave-from-class   | 离开动画前的类名          | string          | -                                                                                                                    | -       |
| leave-active-class | 离开动画时的类名          | string          | -                                                                                                                    | -       |
| leave-to-class     | 离开动画后的类名          | string          | -                                                                                                                    | -       |

### Events

| 事件名          | 说明        | 类型 |
|--------------|-----------|----|
| before-enter | 进入过渡动画前触发 | -  |
| enter        | 进入过渡动画时触发 | -  |
| after-enter  | 进入过渡动画后触发 | -  |
| before-leave | 离开过渡动画前触发 | -  |
| leave        | 离开过渡动画时触发 | -  |
| after-leave  | 离开过渡动画后触发 | -  |

### Slots

| 名称      | 说明      |
|---------|---------|
| default | 自定义内嵌内容 |
