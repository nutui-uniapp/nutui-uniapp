# CircleProgress 环形进度条

### 介绍

圆环形的进度条组件

### 基础用法

```html
<template>
    <nut-cell>
     <nut-circle-progress :progress="20"> </nut-circle-progress>
   </nut-cell>
</template>
```

### 环形进度条自定义宽度

```html
<template>
    <nut-cell>
     <nut-circle-progress :progress="50" strokeWidth="10"> </nut-circle-progress>
   </nut-cell>
</template>
```

### 环形进度条自定义颜色(支持渐变色)

```html
<template>
    <nut-cell>
    <nut-circle-progress :progress="50" custom-color="red" />
      <nut-circle-progress :progress="100" :custom-color="gradientColor" />
   </nut-cell>
</template>
<script>
import { ref } from 'vue';
export default{
  setup() {
     const gradientColor = {
      '0%': '#FF5E5E',
      '100%': '#FFA062'
    };
    return {
      gradientColor
    };
  }
}
</script>
```

### 环形进度条自定义大小

```html
<template>
    <nut-cell>
     <nut-circle-progress :progress="50" radius="60"></nut-circle-progress>
    </nut-cell>
</template>
```

### 环形进度条自定义内容

```html
<template>
    <nut-cell>
     <nut-circle-progress :progress="50" radius="60">自定义</nut-circle-progress>
    </nut-cell>
</template>
```

### 动态改变环形进度条的进度

```html
<template>
  <div>
     <nut-circle-progress :progress="percent"></nut-circle-progress>
  </div>
  <div>
    <nut-button type="primary" @click="setReduceVal">减少</nut-button>
    <nut-button type="primary" @click="setAddVal">增加</nut-button>
  </div>
</template>
<script>
import { reactive, ref } from 'vue';
export default {
  setup() {
    const percent = ref(30);
    const setAddVal = () => {
      if (percent.value >= 100) {
        return;
      }
      percent.value += 10;
    };
    const setReduceVal = () => {
      if (percent.value - 10 <= 0) {
        percent.value = 0;
        return;
      }
      percent.value -= 10;
    };
    return {
      setAddVal,
      setReduceVal,
      percent
    };
  }
}
</script>
```

## API

### Props

| 参数           | 说明                                       | 类型              | 可选值        | 默认值      |
|----------------|------------------------------------------|-----------------|---------------|-------------|
| progress       | 百分比                                     | number / string | -             | `0`         |
| stroke-width   | 圆弧的宽度                                 | number / string | -             | `5`         |
| radius         | 半径                                       | number / string | -             | `50`        |
| custom-color   | 圆环进度条颜色                             | object / string | -             | `'#fa2c19'` |
| path-color     | 圆环轨道颜色                               | string          | -             | '#d9d9d9'   |
| stroke-linecap | 圆环进度条端点形状可选值为 `square` `butt` | 圆环进度条端点形状       | square / butt | `round`     |
| clockwise      | 是否顺时针展示                             | boolean         | -             | `true`      |

### Slots

| 名称    | 说明           |
|---------|--------------|
| default | 自定义文字内容 |
