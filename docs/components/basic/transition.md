# Transition 过渡动画

### 介绍

过渡动画

### 基础用法

通过设置 `show` 控制显示/隐藏

```html
<template>
 <nut-transition
      :show="showValue" name="fade" :duration="200" 
    >
      <div>
        内容
      </div>
    </nut-transition>
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

### 内置动画

通过 name 属性设置内置动画，目前支持 `fade` `fade-up` `fade-down` `fade-left` `fade-right` `slide-up` `slide-down` `slide-left` `slide-right` `zoom`

```html
<template>
  <nut-transition name="fade-up" />
</template>
```

## API
>
### Props

| 参数           | 说明                                                                                                                                   | 类型                         | 默认值  |
| -------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------- | ------- |
| name           | 内置动画名称，可选值为 `fade` `fade-up` `fade-down` f`ade-left` `fade-right` `slide-up` `slide-down` `slide-left` `slide-right` `zoom` | `NutAnimationName`           | `fade`  |
| show           | 是否展示过渡动画级                                                                                                                     | boolean                      | `false` |
| duration       | 动画时长，单位为毫秒                                                                                                                   | string \| number             | `300`   |
| timingFunction | 动画函数                                                                                                                               | `NutAnimationtimingFunction` | `ease`  |
| customClass    | 自定义class                                                                                                                            | `ClassType`                  |         |
| customStyle    | 自定义style                                                                                                                            | `StyleValue`                 |         |

### Events

| 事件名       | 说明               | 回调参数 |
| ------------ | ------------------ | -------- |
| before-enter | 进入过渡动画前触发 | -        |
| enter        | 进入过渡动画时触发 | -        |
| after-enter  | 进入过渡动画后触发 | -        |
| before-leave | 离开过渡动画前触发 | -        |
| leave        | 离开过渡动画时触发 | -        |
| after-leave  | 离开过渡动画后触发 | -        |

### Slots

| 名称    | 说明           |
| ------- | -------------- |
| default | 自定义内嵌内容 |
