# Menu 菜单

### 介绍

向下弹出的菜单列表

### 基础用法

```html
<template>
  <nut-menu>
    <nut-menu-item v-model="state.value1" :options="state.options1" />
    <nut-menu-item v-model="state.value2" @change="handleChange" :options="state.options2" />
  </nut-menu>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const state = reactive({
      options1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      options2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      value1: 0,
      value2: 'a'
    });

    const handleChange = val => {
      console.log('val', val);
    }

    return {
      state,
      handleChange
    };
  }
}
</script>
```

### 自定义菜单内容

使用实例上的 toggle 方法可以手动关闭弹框。

```html
<template>
  <nut-menu>
    <nut-menu-item v-model="state.value1" :options="state.options1" />
    <nut-menu-item title="筛选" ref="item">
      <div :style="{display: 'flex', flex: 1, 'justify-content': 'space-between', 'align-items': 'center'}">
        <div :style="{ marginRight: '10px'}">自定义内容</div>
        <nut-button @click="onConfirm">确认</nut-button>
      </div>
    </nut-menu-item>
  </nut-menu>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const state = reactive({
      options1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      value1: 0
    });

    const item = ref('');

    const onConfirm = () => {
      item.value.toggle();
    }

    return {
      state,
      item,
      onConfirm
    };
  }
}
</script>
```

### 一行两列

```html
<template>
  <nut-menu>
    <nut-menu-item v-model="state.value3" :cols="2" :options="state.options3" />
  </nut-menu>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const state = reactive({
      options3: [
        { text: '全部商品', value: 0 },
        { text: '家庭清洁/纸品', value: 1 },
        { text: '个人护理', value: 2 },
        { text: '美妆护肤', value: 3 },
        { text: '食品饮料', value: 4 },
        { text: '家用电器', value: 5 },
        { text: '母婴', value: 6 },
        { text: '数码', value: 7 },
        { text: '电脑、办公', value: 8 },
        { text: '运动户外', value: 9 },
        { text: '厨具', value: 10 },
        { text: '医疗保健', value: 11 },
        { text: '酒类', value: 12 },
        { text: '生鲜', value: 13 },
        { text: '家具', value: 14 },
        { text: '传统滋补', value: 15 },
        { text: '汽车用品', value: 16 },
        { text: '家居日用', value: 17 },
      ],
      value3: 0
    });

    return {
      state
    };
  }
}
</script>
```

### 自定义选中态颜色

```html
<template>
  <nut-menu active-color="green">
    <nut-menu-item v-model="state.value1" :options="state.options1" />
    <nut-menu-item v-model="state.value2" @change="handleChange" :options="state.options2" />
  </nut-menu>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const state = reactive({
      options1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      options2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      value1: 0,
      value2: 'a'
    });

    const handleChange = val => {
      console.log('val', val);
    }

    return {
      state,
      handleChange
    };
  }
}
</script>
```

### 自定义图标

```html
<template>
  <nut-menu>
    <template #icon>
        <nut-icon name="triangle-down" />
    </template>
    <nut-menu-item v-model="state.value1" :options="state.options1" />
    <nut-menu-item v-model="state.value2" @change="handleChange" :options="state.options2">
      <template #icon>
        <nut-icon name="checked" />
      </template>
    </nut-menu-item>
  </nut-menu>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const state = reactive({
      options1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      options2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      value1: 0,
      value2: 'a'
    });

    const handleChange = val => {
      console.log('val', val);
    }

    return {
      state,
      handleChange
    };
  }
}
</script>
```

### 向上展开

```html
<template>
  <div class="blank"></div>
  <nut-menu direction="up">
    <nut-menu-item v-model="state.value1" :options="state.options1" />
    <nut-menu-item v-model="state.value2" @change="handleChange" :options="state.options2" />
  </nut-menu>
</template>

<script>
import { reactive, ref } from 'vue';

export default {
  setup() {
    const state = reactive({
      options1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      options2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      value1: 0,
      value2: 'a'
    });

    const handleChange = val => {
      console.log('val', val);
    }

    return {
      state,
      handleChange
    };
  }
}
</script>
<style>
.blank {
  width: 200px;
  height: 200px;
}
</style>
```

### 禁用菜单

```html
<template>
  <nut-menu>
    <nut-menu-item disabled v-model="state.value1" :options="state.options1" />
    <nut-menu-item disabled v-model="state.value2" :options="state.options2" />
  </nut-menu>
</template>

<script>
import { reactive } from 'vue';

export default {
  setup() {
    const state = reactive({
      options1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 }
      ],
      options2: [
        { text: '默认排序', value: 'a' },
        { text: '好评排序', value: 'b' },
        { text: '销量排序', value: 'c' },
      ],
      options3: [
        { text: '全部商品', value: 0 },
        { text: '家庭清洁/纸品', value: 1 },
        { text: '个人护理', value: 2 },
        { text: '美妆护肤', value: 3 },
        { text: '食品饮料', value: 4 },
        { text: '家用电器', value: 5 },
        { text: '母婴', value: 6 },
        { text: '数码', value: 7 },
        { text: '电脑、办公', value: 8 },
        { text: '运动户外', value: 9 },
        { text: '厨具', value: 10 },
        { text: '医疗保健', value: 11 },
        { text: '酒类', value: 12 },
        { text: '生鲜', value: 13 },
        { text: '家具', value: 14 },
        { text: '传统滋补', value: 15 },
        { text: '汽车用品', value: 16 },
        { text: '家居日用', value: 17 },
      ],
      value1: 0,
      value2: 'a',
      value3: 0
    });

    return {
      state
    };
  }
}
</script>
```

## API

### Menu Props

| 参数                     | 说明                   | 类型                        | 默认值         |
|------------------------|----------------------|---------------------------|-------------|
| active-color           | 选项的选中态图标颜色           | string                    | `#F2270C`   |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单        | boolean                   | `true`      |
| scroll-fixed           | 滚动后是否固定，可设置固定位置      | boolean \ string \ number | `false`     |
| title-class            | 自定义标题样式类             | string                    | -           |
| lock-scroll `H5`       | 背景是否锁定               | boolean                   | `true`      |
| title-icon             | 自定义标题图标              | string                    | -           |
| direction              | 展开方向，可选值为`up` `down` | string                    | -           |
| up-icon                | 收起的图标                | string                    | `rect-up`   |
| down-icon              | 展开的图标                | string                    | `rect-down` |

### Menu Slots

| 名称   | 说明                                    |
|------|---------------------------------------|
| icon | 自定义标题图标 (不支持小程序，小程序建议使用 props 传递图标名称) |

### MenuItem Props

| 参数                   | 说明                    | 类型      | 默认值       |
|----------------------|-----------------------|---------|-----------|
| title                | 菜单项标题                 | string  | `当前选中项文字` |
| options              | 选项数组                  | Array   | -         |
| disabled             | 是否禁用菜单                | boolean | `false`   |
| cols                 | 可以设置一行展示多少列 `options` | number  | `1`       |
| direction            | 菜单展开方向，可选值为 `up`      | string  | `down`    |
| active-title-class   | 选项选中时自定义标题样式类         | string  | -         |
| inactive-title-class | 选项非选中时自定义标题样式类        | string  | -         |

### MenuItem Slots

| 名称   | 说明               |
|------|------------------|
| icon | 自定义选项图标 (不支持小程序) |

### MenuItem Events

| 事件名                 | 说明       | 回调参数                      |
|---------------------|----------|---------------------------|
| change              | 选择选项时触发  | value: `number \| string` |
| open                | 打开菜单栏时触发 | -                         |
| close               | 关闭菜单栏时触发 | -                         |
| item-click `1.7.11` | 点击选项时触发  | item: `MenuItemOption`    |

### MenuItem Methods

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 MenuItem 实例并调用实例方法

| 方法名             | 说明                                       | 参数                        | 返回值 |
|-----------------|------------------------------------------|---------------------------|-----|
| toggle          | 切换菜单展示状态，传 `true` 为显示，`false` 为隐藏，不传参为取反 | show?: `boolean`          | -   |
| change `1.7.11` | 变更选择项                                    | value: `number \| string` | -   |

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
