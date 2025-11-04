# Collapse 折叠面板

### 介绍

将内容放置在多个折叠面板中，点击面板标题可展开或收缩内容。

### 基础用法

通过 `v-model` 控制展开的面板列表，绑定值为数组。

```html
<template>
  <nut-collapse v-model="activeNames" @change="onChange">
    <nut-collapse-item :name="1">
      <template #title>
        标题 1
      </template>
      NutUI 是一套拥有京东风格的轻量级的 Vue 组件库
    </nut-collapse-item>

    <nut-collapse-item title="标题 2" :name="2">
      在产品的功能、体验、易用性和灵活性等各个方面做了全面的升级！
    </nut-collapse-item>

    <nut-collapse-item title="标题 3" :name="3" disabled></nut-collapse-item>
  </nut-collapse>
</template>
```

```ts
const activeNames = ref([1, 2]);

function onChange(value: string | number | (string | number)[], name: string | number, status: boolean) {
  // value：v-model 绑定值
  // name：当前操作 collapse-item 的 name
  // status：开启状态
}
```

### 手风琴

通过 `accordion` 可以设置为手风琴模式，最多展开一个面板，此时绑定值为字符串或数字，`value` 可以设置右侧的内容。

```html
<template>
  <nut-collapse v-model="activeName" accordion>
    <nut-collapse-item title="标题 1" :name="1" value="副标题">
      基于京东设计语言体系，构建场景
    </nut-collapse-item>

    <nut-collapse-item title="标题 2" :name="2">
      提高界⾯的模块化通用程度
    </nut-collapse-item>

    <nut-collapse-item title="标题 3" :name="3">
      采用组合式 API Composition 语法重构，结构清晰，功能模块化
    </nut-collapse-item>
  </nut-collapse>
</template>
```

```ts
const activeName = ref(1);
```

### 自定义折叠图标

通过 `icon` 设置自定义图标。

```html
<template>
  <nut-collapse v-model="activeName" accordion>
    <nut-collapse-item title="标题 1" :name="1" icon="notice">
      <template #value>
        文本测试
      </template>
      NUTUI3.0重新思考其内在的一致性和可组合性
    </nut-collapse-item>

    <nut-collapse-item title="标题 2" :name="2" icon="follow">
      提⾼产研输出对接的效率，降低输出工作量
    </nut-collapse-item>
  </nut-collapse>
</template>
```

### 设置固定内容（不折叠）

通过 `extra` 插槽设置内容。

```html
<template>
  <nut-collapse v-model="activeName" accordion>
    <nut-collapse-item title="标题 1" :name="1">
      <template #extra>固定内容</template>
      NutUI是一套拥有京东风格的轻量级的 Vue 组件库
    </nut-collapse-item>

    <nut-collapse-item title="标题 2" :name="2">
      在产品的功能、体验、易用性和灵活性等各个方面做了全面的升级！
    </nut-collapse-item>
  </nut-collapse>
</template>
```

## API

### Collapse Props

| 参数        | 说明                                                                     | 类型                      | 可选值 | 默认值     |
|-----------|------------------------------------------------------------------------|-------------------------|-----|---------|
| v-model   | 当前展开面板的 `name`（手风琴模式：`string \| number`，非手风琴模式：`(string \| number)[]`） | string / number / Array | -   | -       |
| accordion | 是否开启手风琴模式                                                              | boolean                 | -   | `false` |

### Collapse Events

| 事件名    | 说明      | 类型                                                                                                   |
|--------|---------|------------------------------------------------------------------------------------------------------|
| change | 切换面板时触发 | `(value: string \| number \| (string \| number)[], name: string \| number, status: boolean) => void` |

### CollapseItem Props

| 参数       | 说明           | 类型              | 可选值 | 默认值        |
|----------|--------------|-----------------|-----|------------|
| name     | 唯一标识符，必填     | string / number | -   | `-1`       |
| title    | 标题栏左侧内容      | string          | -   | -          |
| value    | 标题栏右侧内容      | string          | -   | -          |
| icon     | 标题栏左侧图标      | string          | -   | down-arrow |
| label    | 标题栏描述信息      | string          | -   | -          |
| rotate   | 点击折叠和展开的旋转角度 | string / number | -   | `180`      |
| disabled | 标题栏是否禁用      | boolean         | -   | `false`    |
| border   | 是否显示边框       | boolean         | -   | `true`     |

### CollapseItem Slots

| 名称           | 说明             |
|--------------|----------------|
| title        | 标题栏左侧内容插槽      |
| value        | 标题栏右侧内容插槽      |
| extra        | 设置标题下固定内容（不折叠） |
| icon `1.3.0` | 设置自定义图标        |

## 主题定制

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
