# Collapse 折叠面板

### 介绍

将内容放置在多个折叠面板中，点击面板标题可展开或收缩内容。

### 基础用法

通过`v-model`控制展开的面板列表，`activeNames`为数组格式

```html
<template>
<nut-collapse v-model="activeNames" @change="onChange">
  <nut-collapse-item :name="1">
    <template v-slot:title>
      {{title1}}
    </template>
    NutUI是一套拥有京东风格的轻量级的 Vue 组件库
  </nut-collapse-item>
  <nut-collapse-item :title="title2" :name="2">
    在产品的功能、体验、易用性和灵活性等各个方面做了全面的升级！
  </nut-collapse-item>
  <nut-collapse-item :title="title3" :name="3" disabled>
  </nut-collapse-item>
</nut-collapse>
</template>
<script>
import { reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const activeNames = ref([1, 2]);
    const title = reactive({
      title1: '标题1',
      title2: '标题2',
      title3: '标题3',
    })
    const onChange = (modelValue, currName, status) => {
      // currName: 当前操作的 collapse-item 的 name
      // status: true 打开 false 关闭
      console.log(modelValue, currName, status);
    }
    return {
      onChange,
      activeNames,
      ...toRefs(title)
    };
  }
}
</script>
```

### 手风琴

通过`accordion`可以设置为手风琴模式，最多展开一个面板，此时`activeName`为字符串格式；`value`可以设置右侧的内容

```html
<template>
  <nut-collapse v-model="activeName" :accordion="true">
    <nut-collapse-item :title="title1" :name="1" :value="subTitle">
      基于京东设计语言体系，构建场景
    </nut-collapse-item>
    <nut-collapse-item :title="title2" :name="2">
      提高界⾯的模块化通用程度
    </nut-collapse-item>
    <nut-collapse-item :title="title3" :name="3">
      采用组合式 API Composition 语法重构，结构清晰，功能模块化
    </nut-collapse-item>
  </nut-collapse>
</template>
<script>
import { reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const activeName = ref(1);
    const subTitle = '副标题';
    const title = reactive({
      title1: '标题1',
      title2: '标题2',
      title3: '标题3',
    })
    return {
      activeName,
      subTitle,
      ...toRefs(title)
    };
  }
}
</script>
```

### 自定义折叠图标

通过icon设置自定义图标

```html
<template>
  <nut-collapse
    v-model="activeName"
    :accordion="true"
  >
    <nut-collapse-item :title="title1" :name="1" icon="notice">
      <template v-slot:value>
        文本测试
      </template>
      NUTUI3.0重新思考其内在的一致性和可组合性
    </nut-collapse-item>
    <nut-collapse-item :title="title2" :name="2" icon="follow">
      提⾼产研输出对接的效率，降低输出工作量
    </nut-collapse-item>
  </nut-collapse>
</template>
<script>
import { reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const activeName = ref(1);
    const title = reactive({
      title1: '标题1',
      title2: '标题2',
    })
    return {
      activeName,
      ...toRefs(title),
    };
  }
}
</script>
```

### 设置固定内容（不折叠）

通过 slot:extra 设置内容

```html
<template>
  <nut-collapse v-model="activeName" :accordion="true">
    <nut-collapse-item :title="title1" :name="1">
      <template v-slot:extra>固定内容</template>
      NutUI是一套拥有京东风格的轻量级的 Vue 组件库
    </nut-collapse-item>
    <nut-collapse-item :title="title2" :name="2">
      在产品的功能、体验、易用性和灵活性等各个方面做了全面的升级！
    </nut-collapse-item>
  </nut-collapse>
</template>
<script>
import { reactive, ref, toRefs } from 'vue';
export default {
  setup() {
    const activeName = ref(1);
    const title = reactive({
      title1: '标题1',
      title2: '标题2',
    })
    return {
      activeName,
      ...toRefs(title)
    };
  }
}
</script>
```

## API

### Collapse Props

| 参数      | 说明                                                                                             | 类型                                   | 可选值 | 默认值  |
|-----------|------------------------------------------------------------------------------------------------|----------------------------------------|--------|---------|
| v-model   | 当前展开面板的 `name`(类型说明，手风琴模式：string \| number<br>非手风琴模式：(string \| number)[]) | string / number / (string \| number)[] | -      | -       |
| accordion | 是否开启手风琴模式                                                                               | boolean                                | -      | `false` |

### CollapseItem Props

| 参数     | 说明                                                  | 类型            | 可选值 | 默认值  |
|----------|-----------------------------------------------------|-----------------|--------|---------|
| name     | 唯一标识符，必填                                       | string / number | -      | `-1`    |
| title    | 标题栏左侧内容，支持插槽传入（`props` 传入的优先级更高） | string          | -      | -       |
| value    | 标题栏右侧内容，支持插槽传入（`props` 传入的优先级更高） | string          | -      | -       |
| icon     | 标题栏左侧图标组件，等同于 `nutui-icon` 组件           | -               | -      | -       |
| label    | 标题栏描述信息                                        | number / string | -      | -       |
| rotate   | 点击折叠和展开的旋转角度,在自定义图标模式下生效       | string / number | -      | `180`   |
| disabled | 标题栏是否禁用                                        | boolean         | -      | `false` |
| border   | 是否显示边框                                          | boolean         | -      | `true`  |

### CollapseItem Slots

| 名称          | 说明                       |
|---------------|--------------------------|
| title         | 标题栏左侧内容插槽         |
| value         | 标题栏右侧内容插槽         |
| extra         | 设置标题下固定内容（不折叠） |
| icon `v1.3.0` | 设置自定义图标             |

### Events

| 事件名 | 说明           | 回调参数                         |
|--------|--------------|----------------------------------|
| change | 切换面板时触发 | `(modelValue, currName, status)` |

## Theming

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| Name                                            | Default Value          |
|-------------------------------------------------|------------------------|
| --nut-collapse-item-padding                     | 13px 36px 13px 26px    |
| --nut-collapse-item-color                       | #666666                |
| --nut-collapse-item-disabled-color              | #c8c9cc                |
| --nut-collapse-item-icon-color                  | #666666                |
| --nut-collapse-item-font-size                   | var(--nut-font-size-2) |
| --nut-collapse-item-line-height                 | 24px                   |
| --nut-collapse-item-sub-title-color             | #666666                |
| --nut-collapse-wrapper-content-padding          | 12px 26px              |
| --nut-collapse-wrapper-empty-content-padding    | 0 26px                 |
| --nut-collapse-wrapper-content-color            | #666666                |
| --nut-collapse-wrapper-content-font-size        | var(--nut-font-size-2) |
| --nut-collapse-wrapper-content-line-height      | 1.5                    |
| --nut-collapse-wrapper-content-background-color | var(--nut-white)       |
