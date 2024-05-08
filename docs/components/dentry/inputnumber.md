# InputNumber 数字输入框

### 介绍

通过点击按钮控制数字增减。

### 基础用法

初始化一个默认值

``` html
<template>
  <nut-input-number v-model="value" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(1);
      return { value };
    },
  };
</script>
```

### 步长设置

设置步长 `step` 5

```html
<template>
  <nut-input-number v-model="value" step="5" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(1);
      return { value };
    },
  };
</script>
```

### 限制输入范围

`min` 和 `max` 属性分别表示最小值和最大值

```html
<template>
  <nut-input-number v-model="value" min="10" max="20" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(10);
      return { value };
    },
  };
</script>
```

### 禁用状态

`disabled` 禁用状态下无法点击按钮或修改输入框。

```html
<template>
  <nut-input-number v-model="value" disabled />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(1);
      return { value };
    },
  };
</script>
```

### 只读禁用输入框

`readonly` 设置只读禁用输入框输入行为

```html
<template>
  <nut-input-number v-model="value" readonly />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(1);
      return { value };
    },
  };
</script>
```

### 支持小数点

设置步长 `step` 0.1  `decimal-places` 小数保留1位

```html
<template>
  <nut-input-number v-model="value" step="0.1" decimal-places="1" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(1);
      return { value };
    },
  };
</script>
```

### 支持异步修改

通过 `change` 事件和 `model-value` 进行异步修改

```html
<template>
  <nut-input-number :model-value="value" @change="onChange" />
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        value: 1
      });
      const onChange = (value: number) => {
        console.log('异步演示 2 秒后更改');
        setTimeout(() => {
          state.value = value;
        }, 2000);
      };
      return { ...toRefs(state), onChange };
    },
  };
</script>
```

### 自定义按钮大小

```html
<template>
  <nut-input-number v-model="value"  button-size="30" input-width="50" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(1);
      return { value };
    },
  };
</script>
```

### 自定义按钮图标

```html
<template>
  <nut-input-number v-model="value">
    <template #leftIcon>
      <nut-icon  name="left"  />
    </template>
    <template #rightIcon>
      <nut-icon  name="right"  />
    </template>
  </nut-input-number>
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const value = ref(1);
      return { value };
    },
  };
</script>
```

## API

### Props

| 参数           | 说明                       | 类型             | 默认值  |
| -------------- | -------------------------- | ---------------- | ------- |
| v-model        | 初始值                     | string \| number | -       |
| input-width    | 输入框宽度                 | string           | ``      |
| button-size    | 操作符+、-尺寸             | string           | ``      |
| min            | 最小值限制                 | string \| number | `1`     |
| max            | 最大值限制                 | string \| number | `9999`  |
| step           | 步长                       | string \| number | `1`     |
| decimal-places | 设置保留的小数位           | string \| number | `0`     |
| disabled       | 禁用所有功能               | boolean          | `false` |
| readonly       | 只读状态禁用输入框操作行为 | boolean          | `false` |

### Attrs version

支持透传属性至组件内部的 input 元素, 仅支持H5。

### Slots

| 名称      | 说明           |
| --------- | -------------- |
| leftIcon  | 自定义左侧按钮 |
| rightIcon | 自定义右侧按钮 |

### Events

| 事件名    | 说明                   | 回调参数                                      |
| --------- | ---------------------- | --------------------------------------------- |
| add       | 点击增加按钮时触发     | `(event: Event)`                              |
| reduce    | 点击减少按钮时触发     | `(event: Event)`                              |
| overlimit | 点击不可用的按钮时触发 | `(event: Event,type:string (reduce or add) )` |
| change    | 值改变时触发           | `(value: number , event : Event)`             |
| blur      | 输入框失去焦点时触发   | `(event: Event)`                              |
| focus     | 输入框获得焦点时触发   | `(event: Event )`                             |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                     | 默认值                   |
| ---------------------------------------- | ------------------------ |
| --nut-inputnumber-icon-color             | var(--nut-title-color)   |
| --nut-inputnumber-icon-void-color        | var(--nut-disable-color) |
| --nut-inputnumber-icon-size              | 20px                     |
| --nut-inputnumber-input-width            | 40px                     |
| --nut-inputnumber-input-font-size        | 12px                     |
| --nut-inputnumber-input-font-color       | var(--nut-title-color)   |
| --nut-inputnumber-input-background-color | var(--nut-help-color)    |
| --nut-inputnumber-input-border-radius    | 4px                      |
| --nut-inputnumber-input-margin           | 0 6px                    |
| --nut-inputnumber-input-border           | 0                        |
| --nut-inputnumber-border                 | 0                        |
| --nut-inputnumber-border-radius          | 0                        |
| --nut-inputnumber-height                 | auto                     |
| --nut-inputnumber-line-height            | normal                   |
| --nut-inputnumber-border-box             | content-box              |
| --nut-inputnumber-display                | inline-flex              |
