# Tag 标签

### 介绍

用于标记和分类的标签。

### 基础用法

```html
<template>
 <nut-cell-group title="基础用法">
    <nut-cell title="primary 类型">
      <template v-slot:link>
        <nut-tag type="primary">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="success 类型">
      <template v-slot:link>
        <nut-tag type="success">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="danger 类型">
      <template v-slot:link>
        <nut-tag type="danger">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="warning 类型">
      <template v-slot:link>
        <nut-tag type="warning">标签</nut-tag>
      </template>
    </nut-cell>
  </nut-cell-group>
</template>
```

### 样式风格

```html
<template>
  <nut-cell-group title="样式风格">
    <nut-cell title="空心样式">
      <template v-slot:link>
        <nut-tag plain>标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="圆角样式">
      <template v-slot:link>
        <nut-tag round type="primary">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="标记样式">
      <template v-slot:link>
        <nut-tag mark type="primary">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="可关闭标签">
      <template v-slot:link>
        <nut-tag v-if="show" closeable @close="close" type="primary">标签</nut-tag>
      </template>
    </nut-cell>
  </nut-cell-group>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const show = ref(true);
    const close = () => {
      show.value = false;
    };

    return {
      close,
      show
    };
  }
};
</script>
```

### 颜色自定义

```html
<template>
  <nut-cell-group title="颜色自定义">
    <nut-cell title="背景颜色">
      <template v-slot:link>
        <nut-tag custom-color="#FA685D">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="文字颜色">
      <template v-slot:link>
        <nut-tag custom-color="#E9E9E9" textColor="#999999">标签</nut-tag>
      </template>
    </nut-cell>
    <nut-cell title="空心颜色">
      <template v-slot:link>
        <nut-tag custom-color="#FA2400" plain>标签</nut-tag>
      </template>
    </nut-cell>
  </nut-cell-group>
</template>
```

## API

### Props

| 参数         | 说明                                                         | 类型    | 默认值    |
| ------------ | ------------------------------------------------------------ | ------- | --------- |
| type         | 标签类型，可选值为 `primary`、`success`、`danger`、`warning` | string  | `default` |
| custom-color | 标签颜色                                                     | string  | `-`       |
| text-color   | 文本颜色，优先级高于 `color` 属性                            | string  | `white`   |
| plain        | 是否为空心样式                                               | boolean | `false`   |
| round        | 是否为圆角样式                                               | boolean | `false`   |
| mark         | 是否为标记样式                                               | boolean | `false`   |
| closeable    | 是否为可关闭标签                                             | boolean | `false`   |

### Slots

| 名称    | 说明         |
| ------- | ------------ |
| default | 标签显示内容 |

### Events

| 事件名 | 说明     | 回调参数 |
| ------ | -------- | -------- |
| click  | 点击事件 | `event`  |
| close  | 关闭事件 | `event`  |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                    | 默认值                                                                                             |
| --------------------------------------- | -------------------------------------------------------------------------------------------------- |
| --nut-tag-font-size                     | 12px                                                                                               |
| --nut-tag-default-border-radius         | 4px                                                                                                |
| --nut-tag-round-border-radius           | 8px                                                                                                |
| --nut-tag-default-background-color      | #000000                                                                                            |
| --nut-tag-primary-background-color      | #3460fa                                                                                            |
| --nut-tag-success-background-color      | #4fc08d                                                                                            |
| --nut-tag-danger-background-color       | linear-gradient(135deg,rgba(242, 20, 12, 1) 0%,rgba(232, 34, 14, 1) 70%,rgba(242, 77, 12, 1) 100%) |
| --nut-tag-danger-background-color-plain | #df3526                                                                                            |
| --nut-tag-warning-background-color      | #f3812e                                                                                            |
| --nut-tag-default-color                 | #ffffff                                                                                            |
| --nut-tag-border-width                  | 1px                                                                                                |
| --nut-tag-plain-background-color        | #fff                                                                                               |
| --nut-tag-height                        | auto                                                                                               |
