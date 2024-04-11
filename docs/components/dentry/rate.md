# Rate 评分

### 介绍

用于快速的评级操作，或对评价进行展示。

### 基础用法

```html
<template>
    <nut-cell custom-class="cell">
        <nut-rate v-model="value" />
    </nut-cell>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const value = ref(3);
        return { value }
    }
}
</script>
```

### 半星

```html
<template>
    <nut-cell custom-class="cell">
        <nut-rate allow-half v-model="value"></nut-rate>
    </nut-cell>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const value = ref(3.5);
        return { value }
    }
}
</script>
```

### 自定义icon

```html
<template>
    <nut-cell custom-class="cell">
        <nut-rate custom-icon="heart-fill" v-model="value" />
    </nut-cell>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const value = ref(3);
        return { value, HeartFill }
    }
}
</script>
```

### 自定义数量

```html
<template>
    <nut-cell custom-class="cell">
        <nut-rate :count="6" v-model="value" />
    </nut-cell>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const value = ref(3);
        return { value }
    }
}
</script>
```

### 自定义颜色

```html
<template>
    <nut-cell custom-class="cell">
        <nut-rate v-model="value" active-color="#FFC800"/>
    </nut-cell>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const value = ref(3);
        return { value }
    }
}
</script>
```

### 禁用状态

```html
<template>
    <nut-cell custom-class="cell">
        <nut-rate disabled v-model="value" />
    </nut-cell>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const value = ref(3);
        return { value }
    }
}
</script>
```

### 只读状态

```html
<template>
    <nut-cell custom-class="cell">
        <nut-rate v-model="value" readonly />
    </nut-cell>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const value = ref(3);
        return { value }
    }
}
</script>
```

### 绑定事件

```html
<template>
    <nut-cell custom-class="cell">
        <nut-rate v-model="value" @change="onChange" />
    </nut-cell>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const value = ref(3);
        const onChange = (val)=>{
            console.log(val);
        }
    return { value,onChange }
    }
}
</script>
```

### 自定义尺寸 35px

```html
<template>
    <nut-cell custom-class="cell">
        <nut-rate v-model="value" size="35" />
    </nut-cell>
</template>
<script lang="ts">
import { ref } from 'vue';
export default {
    setup() {
        const value = ref(3);
        return { value }
    }
}
</script>
```

## API

### Props

| 参数         | 说明                                          | 类型             | 默认值        |
| ------------ | --------------------------------------------- | ---------------- | ------------- |
| v-model      | 当前 `star` 数，可使用 `v-model` 双向绑定数据 | number \| string | -             |
| count        | `star` 总数                                   | number \| string | `5`           |
| active-color | 图标选中颜色                                  | string           | `#fa200c`     |
| void-color   | 图标未选中颜色                                | string           | `#ccc`        |
| allow-half   | 是否半星                                      | Boolean          | `false`       |
| readonly     | 是否只读                                      | Boolean          | `false`       |
| disabled     | 是否禁用                                      | Boolean          | `false`       |
| spacing      | 间距                                          | number \| string | `20`          |
| size         | `Icon` 尺寸大小，如 `20px` `2em` `2rem`       | number \| string | -             |
| custom-icon  | 自定义 `Icon`                                 | string           | `star-fill-n` |

### Events

| 事件名 | 说明                       | 回调参数 |
| ------ | -------------------------- | -------- |
| change | 当前分值修改时时触发的事件 | 当前值   |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                       | 默认值                   |
| -------------------------- | ------------------------ |
| --nut-rate-icon-color      | var(--nut-primary-color) |
| --nut-rate-icon-void-color | var(--nut-disable-color) |
