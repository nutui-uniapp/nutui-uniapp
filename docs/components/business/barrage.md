# Barrage 弹幕

### 介绍

用于话语和词组的轮播展示，适用于视频中或其他类似需求中。

### 基础用法

```html
<template>
  <nut-barrage ref="danmu" :danmu="list"></nut-barrage>
  <div class="test">
    <button @click="addDanmu" class="add nut-button--primary">随机添加</button>
  </div>
</template>
<script>
import { ref } from 'vue';
export default {
  props: {},
  setup() {
    const inputVal = ref('');
    const danmu = ref();
    let list = ref(['画美不看', '不明觉厉', '喜大普奔', '男默女泪', '累觉不爱', '爷青结-']);
    function addDanmu() {
      let n = Math.random();
      danmu.value.add('随机——' + String(n).substr(2, 10));
    }
    return {
      inputVal,
      danmu,
      list,
      addDanmu
    };
  }
};
</script>
```

## API

### Props

| 参数      | 说明                             | 类型    | 默认值 |
| --------- | -------------------------------- | ------- | ------ |
| danmu     | 弹幕列表数据                     | Array   | `[]`   |
| frequency | 可视区域内每个弹幕出现的时间间隔 | number  | `500`  |
| speeds    | 每个弹幕的滚动时间               | number  | `5000` |
| rows      | 弹幕行数，分几行展示             | number  | `3`    |
| top       | 弹幕垂直距离                     | number  | `10`   |
| loop      | 是否循环播放                     | boolean | `true` |

### Events

| 事件名 | 说明                        | 回调参数 |
| ------ | --------------------------- | -------- |
| add    | 添加数据(通过 ref 实例使用) | -        |
