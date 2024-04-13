# Cell 单元格

### 介绍

列表项，可组成列表。

### 基础用法

```html
<template>
  <nut-cell title="我是标题" desc="描述文字"></nut-cell>
  <nut-cell title="我是标题" sub-title="副标题描述" desc="描述文字"></nut-cell>
  <nut-cell title="点击测试" @click="testClick"></nut-cell>
  <nut-cell title="圆角设置 0" round-radius="0"></nut-cell>
</template>
<script>
  import { ref } from 'vue';
  export default {
    setup() {
      const switchChecked = ref(true);
      const testClick = (event) => {
        console.log('Click Test');
      };
      return { testClick, switchChecked };
    }
  };
</script>
```

### 尺寸设置 large

```html
<template>
  <nut-cell size="large" title="我是标题" desc="描述文字"></nut-cell>
  <nut-cell size="large" title="我是标题" sub-title="副标题描述" desc="描述文字"></nut-cell>
</template>
```

### 直接使用插槽（slot）

```html
<template>
  <nut-cell>
    <div>自定义内容</div>
  </nut-cell>
</template>
```

### 直接使用插槽（slot title）

```html
<template>
  <nut-cell desc="描述文字">
      <template v-slot:title>
        <span>Title <b style="color: red">1</b></span>
      </template>
  </nut-cell>
</template>
```

### 链接 | 分组用法

```html
<template>
  <nut-cell-group title="链接 | 分组用法" desc="使用 nut-cell-group 支持 title desc slots">
    <nut-cell title="链接" is-link></nut-cell>
    <nut-cell title="URL 跳转" desc="https://m.jd.com" is-link url="https://m.jd.com"></nut-cell>
    <nut-cell title="路由跳转 ’/‘ " to="/"></nut-cell>
  </nut-cell-group>
</template>
```

### 自定义右侧箭头区域

```html
<template>
  <nut-cell-group title="自定义右侧箭头区域">
    <nut-cell title="Switch">
      <template v-slot:link>
        <nut-switch v-model="switchChecked" />
      </template>
    </nut-cell>
  </nut-cell-group>
</template>
<script lang="ts">
  import { ref } from 'vue';
  export default {
    setup() {
      const testClick = (event: Event) => {
        console.log('点击事件');
      };
      const switchChecked = ref(true);
      return { testClick, switchChecked };
    }
  };
</script>
```

### 自定义左侧 Icon 区域

```html
<template>
  <nut-cell-group title="自定义左侧 Icon 区域">
    <nut-cell title="图片">
      <template v-slot:icon>
        <img
          class="nut-icon"
          src="https://img11.360buyimg.com/imagetools/jfs/t1/137646/13/7132/1648/5f4c748bE43da8ddd/a3f06d51dcae7b60.png"
        />
      </template>
    </nut-cell>
  </nut-cell-group>
</template>
```

### 展示图标

```html
<template>
  <nut-cell title="姓名" icon="my" desc="张三"></nut-cell>
</template>
```

### 只展示 desc ，可通过 desc-text-align 调整内容位置

```html
<template>
  <nut-cell desc-text-align="left" desc="张三"></nut-cell>
</template>
```

### 垂直居中

通过 `center` 属性可以让 Cell 的左右内容都垂直居中。

```html
<template>
  <nut-cell center title="我是标题" sub-title="副标题描述" desc="描述文字"></nut-cell>
</template>
```

### 直接使用插槽（slot desc）

```vue
<template>
  <nut-cell title="我是标题">
    <template #desc>
      <span>描述文字 <b style="color: red">2</b></span>
    </template>
  </nut-cell>
</template>
```

## API

### CellGroup Props

| 参数  | 说明     | 类型   | 默认值 |
| ----- | -------- | ------ | ------ |
| title | 分组标题 | string | -      |
| desc  | 分组描述 | string | -      |

### Cell Props

| 参数            | 说明                                                                                         | 类型    | 默认值  |
| --------------- | -------------------------------------------------------------------------------------------- | ------- | ------- |
| title           | 标题名称                                                                                     | string  | -       |
| sub-title       | 左侧副标题                                                                                   | string  | -       |
| desc            | 右侧描述                                                                                     | string  | -       |
| desc-text-align | 右侧描述文本对齐方式 [text-align](https://www.w3school.com.cn/cssref/pr_text_text-align.asp) | string  | `right` |
| is-link         | 是否展示右侧箭头并开启点击反馈                                                               | boolean | `false` |
| to        | 跳转地址                                                               | string | - |
| round-radius    | 圆角半径                                                                                     | number  | `6px`   |
| center          | 是否使内容垂直居中                                                                           | boolean | `false` |
| size            | 单元格大小，可选值为 `large`                                                                 | string  | -       |

### Cell Events

| 事件名 | 说明     | 回调参数      |
| ------ | -------- | ------------- |
| click  | 点击事件 | `event:Event` |

### Cell Slots

| 名称          | 说明                    |
| ------------- | ----------------------- |
| icon          | 自定义左侧 `icon` 区域  |
| default       | 自定义内容              |
| link          | 自定义右侧 `link` 区域  |
| title         | 自定义 `title` 标题区域 |
| desc `v1.1.6` | 自定义 `desc` 描述区域  |

### CellGroup Slots

| 名称  | 说明                    |
| ----- | ----------------------- |
| title | 自定义 `title` 标题区域 |
| desc  | 自定义 `desc` 描述区域  |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                               | 默认值                                 |
| ---------------------------------- | -------------------------------------- |
| --nut-cell-color                   | var(--nut-title-color2)                |
| --nut-cell-title-font              | var(--nut-font-size-2)                 |
| --nut-cell-title-desc-font         | var(--nut-font-size-1)                 |
| --nut-cell-desc-font               | var(--nut-font-size-2)                 |
| --nut-cell-desc-color              | var(--nut-disable-color)               |
| --nut-cell-border-radius           | 6px                                    |
| --nut-cell-padding                 | 13px 16px                              |
| --nut-cell-line-height             | 20px                                   |
| --nut-cell-after-right             | 16px                                   |
| --nut-cell-after-border-bottom     | 1px solid #f5f6f7                      |
| --nut-cell-default-icon-margin     | 0 4px 0 0px                            |
| --nut-cell-large-title-font        | var(--nut-font-size-large)             |
| --nut-cell-large-title-desc-font   | var(--nut-font-size-base)              |
| --nut-cell-large-padding           | 15px 16px                              |
| --nut-cell-background              | var(--nut-white)                       |
| --nut-cell-box-shadow              | 0px 1px 7px 0px rgba(237, 238, 241, 1) |
| --nut-cell-group-title-padding     | 0 10px                                 |
| --nut-cell-group-title-color       | #909ca4                                |
| --nut-cell-group-title-font-size   | var(--nut-font-size-2)                 |
| --nut-cell-group-title-line-height | 20px                                   |
| --nut-cell-group-desc-padding      | 0 10px                                 |
| --nut-cell-group-desc-color        | #909ca4                                |
| --nut-cell-group-desc-font-size    | var(--nut-font-size-1)                 |
| --nut-cell-group-desc-line-height  | 16px                                   |
| --nut-cell-group-background-color  | var(--nut-white)                       |
