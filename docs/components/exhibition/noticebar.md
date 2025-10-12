# Noticebar 通告栏

### 介绍

用于循环播放展示一组消息通知。

### 基础用法

```html
<template>
  <nut-noticebar
      text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
      :background="`rgba(251, 248, 220, 1)`"
      :custom-color="`#D9500B`"
    ></nut-noticebar>
</template>

```

### 滚动播放

通知栏的内容长度溢出时会自动开启滚动播放，可通过 scrollable 属性可以控制该行为

```html
<template>
  <nut-noticebar text="华为畅享9新品即将上市" :scrollable="true" :background="`rgba(251, 248, 220, 1)`" :custom-color="`#D9500B`"></nut-noticebar>

  <nut-noticebar
      text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
      :scrollable="false"
    ></nut-noticebar>
</template>

```

### 通告栏模式--关闭模式

```html
<template>
  <nut-noticebar :closeMode="true" :background="`rgba(251, 248, 220, 1)`" :custom-color="`#D9500B`">
    NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。
  </nut-noticebar>

  <nut-noticebar
      :closeMode="true"
      right-icon="circle-close"
      >
      NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。
  </nut-noticebar>
</template>

```

### 通告栏模式--链接模式

```html
<template>
    <nut-noticebar
      :scrollable="false"
    >
      <template v-slot:leftIcon>
        <img
          src="https://img13.360buyimg.com/imagetools/jfs/t1/72082/2/3006/1197/5d130c8dE1c71bcd6/e48a3b60804c9775.png"
          style="width: 20px; height: 20px"
        />
      </template>
      <a href="https://www.jd.com">京东商城</a>
    </nut-noticebar>
</template>
```

### 多行展示

文字较长时，可以通过设置 wrapable 属性来开启多行展示。默认为不滚动，可以通过设置 scrollable 控制为滚动。

```html
<template>
  <nut-noticebar
      text="NutUI 是京东风格的移动端组件库，使用 Vue 语言来编写可以在 H5，小程序平台上的应用，帮助研发人员提升开发效率，改善开发体验。"
      wrapable
       ></nut-noticebar>
</template>
```

### 纵向滚动

```html
<template>
  <nut-noticebar
      direction='vertical'
      :list="horseLamp1"
      :speed='10'
      :standTime='1000'
      @click='go'
      :closeMode="true" >
  </nut-noticebar>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup(props) {
      const horseLamp1 = ref(['Noticebar 公告栏', 'Cascader 级联选择', 'DatePicker 日期选择器', 'CheckBox 复选按钮']);
      const go = (item) => {
        console.log(item)
      }
      return { horseLamp1,go };
    }
  }
</script>
```

### 复杂滚动动画

```html
<template>
  <nut-noticebar direction='vertical' :list="horseLamp2" :speed='10' :standTime='2000' :complexAm='true'></nut-noticebar>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup(props) {
      const horseLamp2 = ref(['Noticebar 公告栏', 'Cascader 级联选择', 'DatePicker 日期选择器', 'CheckBox 复选按钮']);
      return { horseLamp2 };
    }
  }
</script>
```

### 自定义滚动内容
传递`field-name`属性自定义显示文字字段名，以此可以携带更多数据

``` vue
<script lang="ts">
import { ref } from 'vue'

export default {
  setup(props) {
    const data1 = ref([
      { id: 1, text: 'Noticebar 公告栏' },
      { id: 2, text: 'Cascader 级联选择' },
      { id: 3, text: 'DatePicker 日期选择器' },
      { id: 4, text: 'CheckBox 复选按钮' },
    ])
    const go = (item: any) => {
      console.log(item)
    }
    return { data1, go }
  }
}
</script>

<template>
  <nut-noticebar
    direction="vertical"
    :height="50"
    :speed="10"
    :stand-time="1000"
    :list="data1"
    field-name="text"
    background="rgba(251, 248, 220, 1)"
    @close="go"
    @click="go"
  />
</template>
```

### 纵向自定义右侧图标

```html
<template>
    <nut-noticebar direction='vertical' :list="horseLamp1" :speed='10' :standTime='1000' >
      <template #rightIcon>
        <nut-icon  name="fabulous"  />
      </template>
    </nut-noticebar>
</template>

<script>
  import { ref } from 'vue';
  export default {
    setup(props) {
      const horseLamp1 = ref(['Noticebar 公告栏', 'Cascader 级联选择', 'DatePicker 日期选择器', 'CheckBox 复选按钮']);
      return { horseLamp1 };
    }
  }
</script>
```

## API

### Props

| 字段         | 说明                                           | 类型              | 可选值 | 默认值   |
|--------------|----------------------------------------------|-----------------|--------|----------|
| direction    | 滚动的方向，可选 `across`、`vertical`            | string          | -      | `across` |
| text         | 提示的信息                                     | string          | -      | -        |
| close-mode   | 是否启用关闭模式                               | boolean         | -      | `false`  |
| left-icon    | 是否展示左侧图标, 滚动方向为 `across` 生效     | boolean         | -      | `true`   |
| custom-color | 导航栏的文字颜色                               | string          | -      | -        |
| background   | 导航栏的背景颜色                               | string          | -      | -        |
| delay        | 延时多少秒                                     | string / number | -      | `1`      |
| scrollable   | 是否可以滚动                                   | boolean         | -      | `true`   |
| speed        | 滚动速率 (px/s)                                | number          | -      | `50`     |
| wrapable     | 是否开启文本换行,`scrollable` 会设置为 `false` | boolean         | -      | `false`  |

### Props（direction=vertical）

| 参数               | 说明                                                           | 类型    | 可选值 | 默认值  |
|--------------------|--------------------------------------------------------------|---------|--------|---------|
| list               | 纵向滚动数据列表                                               | array   | -      | `[]`    |
| speed              | 滚动的速度                                                     | number  | -      | `50`    |
| stand-time         | 停留时间(毫秒)                                                 | number  | -      | `1000`  |
| complex-am         | 稍复杂的动画，耗能会高                                          | boolean | -      | `false` |
| height             | 每一个滚动列的高度(px)                                         | number  | -      | `40`    |
| close-mode         | 是否启用右侧关闭图标，可以通过 `slot[name=rightIcon]`自定义图标 | boolean | -      | `false` |
| field-name `1.5.2` | 如果传递数组对象，显示文字的字段名                              | string  | -      | -       |

### Slots

| 名称      | 说明                                     |
|-----------|----------------------------------------|
| default   | 通知文本的内容                           |
| rightIcon | 自定义右侧图标                           |
| leftIcon  | 自定义左侧图标, 滚动方向为 `across` 生效 |

### Events

| 事件名 | 说明             | 回调参数     |
|--------|----------------|--------------|
| click  | 外层点击事件回调 | event: Event |
| close  | 关闭通知栏时触发 | event: Event |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                               | 默认值                 |
|------------------------------------|------------------------|
| --nut-noticebar-background         | rgba(251, 248, 220, 1) |
| --nut-noticebar-color              | #d9500b                |
| --nut-noticebar-font-size          | 14px                   |
| --nut-noticebar-across-height      | 40px                   |
| --nut-noticebar-across-line-height | 24px                   |
| --nut-noticebar-box-padding        | 0 16px                 |
| --nut-noticebar-wrapable-padding   | 16px                   |
| --nut-noticebar-lefticon-margin    | 0px 10px               |
| --nut-noticebar-righticon-margin   | 0px 10px               |
