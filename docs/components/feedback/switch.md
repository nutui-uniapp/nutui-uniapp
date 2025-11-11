# Switch 开关

### 介绍

用来打开或关闭选项。

### 基础用法

```html
<template>
  <nut-switch v-model="checked" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const checked = ref(true);
      return { checked };
    }
  };
</script>
```

### 禁用状态

```html
<template>
  <nut-switch v-model="checked" disabled />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const checked = ref(true);
      return { checked };
    }
  };
</script>
```

### 加载状态

```html
<template>
  <nut-switch v-model="checked" loading />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const checked = ref(true);
      return { checked };
    }
  };
</script>
```

### change事件

```html
<template>
  <nut-switch v-model="checked" @change="change" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const checked = ref(true);
      const change = (value: boolean, event: Event) => {
        console.log(`value：${value}`);
      };
      return {
        checked,
        change
      };
    }
  };
</script>
```

### 异步控制

需要异步控制开关时，可以使用 `modelValue` 属性和 `update:model-value` 事件代替 `v-model`，并在事件回调函数中手动处理开关状态。

```html
<script lang="ts">
import { ref } from 'vue'

export default {
  setup() {
    const checkedAsync = ref(true)
    const changeAsync = (value: boolean) => {
      uni.showModal({
        title: '提示',
        content: '是否切换开关？',
        success: ({ confirm }) => {
          if (confirm)
            checkedAsync.value = value
        },
      })
    }

    return {
      checkedAsync,
      changeAsync
    }
  }
}
</script>

<template>
  <nut-switch :model-value="checkedAsync" @update:model-value="changeAsync" />
</template>
```

### 自定义颜色

```html
<template>
  <nut-switch v-model="checked" active-color="blue" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const checked = ref(true);
      return { checked };
    }
  };
</script>
```

### 支持文字

```html
<template>
  <nut-switch v-model="checked" active-text="开" inactive-text="关" />
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const checked = ref(true);
      return { checked };
    }
  };
</script>
```

### 自定义加载图标

```html
<template>
  <nut-switch v-model="checked" loading>
    <template #icon><nut-icon  name="loading" /></template>
  </nut-switch>
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const checked = ref(true);
      return { checked };
    }
  };
</script>
```

## API

### Props

| 参数           | 说明             | 类型                      | 可选值 | 默认值  |
|----------------|----------------|---------------------------|--------|---------|
| v-model        | 开关状态         | boolean / string / number | -      | `false` |
| disabled       | 禁用状态         | boolean                   | -      | `false` |
| loading        | 加载状态         | boolean                   | -      | `false` |
| active-color   | 打开时的背景颜色 | string                    | -      | #fa2c19 |
| inactive-color | 关闭时的背景颜色 | string                    | -      | #ebebeb |
| active-text    | 打开时文字描述   | string                    | -      | -       |
| inactive-text  | 关闭时文字描述   | string                    | -      | -       |
| active-value   | 打开时组件的值   | boolean / string / number | -      | `true`  |
| inactive-value | 关闭组件的值     | boolean / string / number | -      | `false` |

### Slots

| 名称 | 描述             |
|------|----------------|
| icon | loading 状态图标 |

### Events

| 事件名 | 说明           | 回调参数                      |
|--------|--------------|-------------------------------|
| change | 切换开关时触发 | (value: boolean,event: Event) |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                | 默认值           |
|-------------------------------------|------------------|
| --nut-switch-close-bg-color         | #ebebeb          |
| --nut-switch-close-cline-bg-color   | #f0f0f0          |
| --nut-switch-width                  | 36px             |
| --nut-switch-height                 | 21px             |
| --nut-switch-line-height            | 21px             |
| --nut-switch-border-radius          | 21px             |
| --nut-switch-inside-width           | 13px             |
| --nut-switch-inside-height          | 13px             |
| --nut-switch-inside-open-transform  | translateX(146%) |
| --nut-switch-inside-close-transform | translateX(30%)  |
