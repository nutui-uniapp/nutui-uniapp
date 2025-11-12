# Tabs 选项卡切换

### 介绍

常用于平级区域大块内容的的收纳和展现，支持内嵌标签形式和渲染循环数据形式。

### 基础用法

```html
<template>
  <nut-tabs v-model="value">
    <nut-tab-pane title="Tab 1">
      Tab 1
    </nut-tab-pane>

    <nut-tab-pane title="Tab 2">
      Tab 2
    </nut-tab-pane>

    <nut-tab-pane title="Tab 3">
      Tab 3
    </nut-tab-pane>
  </nut-tabs>
</template>
```

```ts
const value = ref(0);
```

### 手势滑动切换

```html
<template>
  <nut-tabs v-model="value" swipeable>
    <nut-tab-pane title="Tab 1">
      Tab 1
    </nut-tab-pane>

    <nut-tab-pane title="Tab 2">
      Tab 2
    </nut-tab-pane>

    <nut-tab-pane title="Tab 3">
      Tab 3
    </nut-tab-pane>
  </nut-tabs>
</template>
```

### 微笑曲线

```html
<template>
  <nut-tabs v-model="value" type="smile">
    <nut-tab-pane title="Tab 1">
      Tab 1
    </nut-tab-pane>

    <nut-tab-pane title="Tab 2">
      Tab 2
    </nut-tab-pane>

    <nut-tab-pane title="Tab 3">
      Tab 3
    </nut-tab-pane>
  </nut-tabs>
</template>
```

### 通过 pane-key 匹配

```html
<template>
  <nut-tabs v-model="value">
    <nut-tab-pane title="Tab 1" pane-key="0">
      Tab 1
    </nut-tab-pane>

    <nut-tab-pane title="Tab 2" pane-key="1" disabled>
      Tab 2
    </nut-tab-pane>

    <nut-tab-pane title="Tab 3" pane-key="2">
      Tab 3
    </nut-tab-pane>
  </nut-tabs>
</template>
```

```ts
const value = ref("0");
```

### 自动高度

`auto-height` 设置为 `true` 时，`nut-tabs` 和 `nut-tabs__content` 会随着当前 `nut-tab-pane` 的高度而发生变化。

```html
<template>
  <nut-tabs v-model="value" auto-height>
    <nut-tab-pane title="Tab 1">
      <view>Tab 1</view>
      <view>Tab 1</view>
      <view>Tab 1</view>
      <view>Tab 1</view>
    </nut-tab-pane>

    <nut-tab-pane title="Tab 2">
      Tab 2
    </nut-tab-pane>

    <nut-tab-pane title="Tab 3">
      Tab 3
    </nut-tab-pane>
  </nut-tabs>
</template>
```

### 数据异步渲染

```html
<template>
  <nut-tabs v-model="value">
    <nut-tab-pane
      v-for="(item) in list"
      :key="item"
      :title="`Tab ${item}`"
    >
      Tab {{ item }}
    </nut-tab-pane>
  </nut-tabs>
</template>
```

```ts
const value = ref(0);

const list = ref(Array.from({ length: 2 }).map((_, index) => index + 1));

setTimeout(() => {
  list.value.push(999);
}, 1000);
```

### 数量多，滚动操作

```html
<template>
  <nut-tabs v-model="value" title-scroll title-gutter="10">
    <nut-tab-pane
      v-for="(item) in list"
      :key="item"
      :title="`Tab ${item}`"
    >
      Tab {{ item }}
    </nut-tab-pane>
  </nut-tabs>
</template>
```

### 左右布局

可通过 `direction` 属性修改标题栏自动滚动方向。

```html
<template>
  <nut-tabs
    v-model="value"
    direction="vertical"
    title-scroll
    title-gutter="10"
  >
    <nut-tab-pane
      v-for="(item) in list"
      :key="item"
      :title="`Tab ${item}`"
    >
      Tab {{ item }}
    </nut-tab-pane>
  </nut-tabs>
</template>
```

### 标签栏字体尺寸

```html
<template>
  <nut-tabs v-model="value" size="small">
    <nut-tab-pane title="Tab 1">Tab 1</nut-tab-pane>
    <nut-tab-pane title="Tab 2">Tab 2</nut-tab-pane>
    <nut-tab-pane title="Tab 3">Tab 3</nut-tab-pane>
  </nut-tabs>

  <nut-tabs v-model="value" size="normal">
    <nut-tab-pane title="Tab 1">Tab 1</nut-tab-pane>
    <nut-tab-pane title="Tab 2">Tab 2</nut-tab-pane>
    <nut-tab-pane title="Tab 3">Tab 3</nut-tab-pane>
  </nut-tabs>

  <nut-tabs v-model="value" size="large">
    <nut-tab-pane title="Tab 1">Tab 1</nut-tab-pane>
    <nut-tab-pane title="Tab 2">Tab 2</nut-tab-pane>
    <nut-tab-pane title="Tab 3">Tab 3</nut-tab-pane>
  </nut-tabs>
</template>
```

### 自定义标签栏

```html
<template>
  <nut-tabs v-model="value" swipeable>
    <template #titles>
      <view class="flex">
        <view
          v-for="(item) in list"
          :key="item.key"
          class="title-item"
          :class="{ 'is-active': item.key === value }"
          @click="value = item.key"
        >
          <nut-icon name="dongdong"></nut-icon>
          <text class="title-item____text">
            {{ item.title }}
          </text>
          <view class="title-item__line"></view>
        </view>
      </view>
    </template>

    <nut-tab-pane
      v-for="(item) in list"
      :key="item"
      :pane-key="item.key"
    >
      {{ item.title }}
    </nut-tab-pane>
  </nut-tabs>
</template>
```

```ts
const value = ref("c1");

const list = ref([
  { key: "c1", title: "自定义 1" },
  { key: "c2", title: "自定义 2" },
  { key: "c3", title: "自定义 3" }
]);
```

## API

### Tabs Props

| 参数            | 说明            | 类型              | 可选值                    | 默认值        |
|---------------|---------------|-----------------|------------------------|------------|
| v-model       | 绑定当前选中标签的标识符  | number / string | -                      | `0`        |
| custom-color  | 标签选中色         | string          | -                      | #1a1a1a    |
| background    | 标签栏背景颜色       | string          | -                      | #f5f5f5    |
| direction     | 使用横纵方向        | string          | horizontal / vertical  | horizontal |
| type          | 选中底部展示样式      | string          | line / smile           | line       |
| swipeable     | 是否开启手势左右滑动切换  | boolean         | -                      | `false`    |
| title-scroll  | 标签栏是否可以滚动     | boolean         | -                      | `false`    |
| ellipsis      | 是否省略过长的标题文字   | boolean         | -                      | `true`     |
| animated-time | 切换动画时长（单位：ms） | number / string | -                      | `300`      |
| title-gutter  | 标签间隙          | number / string | -                      | `0`        |
| size          | 标签栏字体尺寸大小     | string          | small / normal / large | normal     |
| auto-height   | 是否启用自动高度      | boolean         | -                      | `false`    |
| align `1.6.0` | 横轴方向的标题对齐方式   | string          | left / center          | center     |

### Tabs Events

| 事件名    | 说明           | 类型                                              |
|--------|--------------|-------------------------------------------------|
| click  | 点击标签时触发      | `(event: { title, paneKey, disabled }) => void` |
| change | 当前激活的标签改变时触发 | `(event: { title, paneKey, disabled }) => void` |

### Tabs Slots

| 名称      | 说明      |
|---------|---------|
| titles  | 自定义导航区域 |
| default | 自定义内容   |

### TabPane Props

| 参数       | 说明   | 类型              | 可选值 | 默认值     |
|----------|------|-----------------|-----|---------|
| title    | 标题   | string          | -   | -       |
| pane-key | 唯一标识 | number / string | -   | -       |
| disabled | 是否禁用 | boolean         | -   | `false` |

### TabPane Slots

| 名称      | 说明    |
|---------|-------|
| default | 自定义内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                                  | 默认值                                                                          |
|-----------------------------------------------------|------------------------------------------------------------------------------|
| --nut-tabs-tab-smile-color                          | var(--nut-primary-color)                                                     |
| --nut-tabs-titles-border-radius                     | 0                                                                            |
| --nut-tabs-titles-item-large-font-size              | var(--nut-font-size-3)                                                       |
| --nut-tabs-titles-item-font-size                    | var(--nut-font-size-2)                                                       |
| --nut-tabs-titles-item-small-font-size              | var(--nut-font-size-1)                                                       |
| --nut-tabs-titles-item-color                        | var(--nut-title-color)                                                       |
| --nut-tabs-titles-item-active-color                 | var(--nut-title-color)                                                       |
| --nut-tabs-titles-background-color                  | var(--nut-help-color)                                                        |
| --nut-tabs-horizontal-tab-line-color                | linear-gradient(90deg,var(--nut-primary-color) 0%,rgba(#fa2c19, 0.15) 100%)  |
| --nut-tabs-horizontal-titles-height                 | 46px                                                                         |
| --nut-tabs-horizontal-titles-item-min-width         | 50px                                                                         |
| --nut-tabs-horizontal-titles-item-active-line-width | 40px                                                                         |
| --nut-tabs-vertical-tab-line-color                  | linear-gradient(180deg,var(--nut-primary-color) 0%,rgba(#fa2c19, 0.15) 100%) |
| --nut-tabs-vertical-titles-item-height              | 40px                                                                         |
| --nut-tabs-vertical-titles-item-active-line-height  | 14px                                                                         |
| --nut-tabs-vertical-titles-width                    | 100px                                                                        |
| --nut-tabs-titles-item-line-border-radius           | 0                                                                            |
| --nut-tabs-titles-item-line-opacity                 | 1                                                                            |
| --nut-tab-pane-padding `1.7.11`                     | 24px 20px                                                                    |
| --nut-tab-pane-background `1.7.11`                  | #fff                                                                         |
