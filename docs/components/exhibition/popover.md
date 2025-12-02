# Popover 气泡弹出框 <Badge type="tip">1.6.8</Badge>

### 介绍

点击或在元素上悬停鼠标，弹出气泡卡片浮层。

### 基础用法

支持明朗和暗黑两种风格，默认为明朗风格，将 `theme` 属性设置为 `dark` 可切换为暗黑风格。

```html
<template>
  <nut-popover
    v-model:visible="visible1"
    :list="list"
    location="bottom-start"
  >
    <template #reference>
      <nut-button>明朗风格</nut-button>
    </template>
  </nut-popover>

  <nut-popover
    v-model:visible="visible2"
    :list="list"
    theme="dark"
    location="bottom-start"
  >
    <template #reference>
      <nut-button>暗黑风格</nut-button>
    </template>
  </nut-popover>
</template>
```

```ts
const visible1 = ref(false);
const visible2 = ref(false);

const list = reactive([
  { name: "选项一" },
  { name: "选项二" },
  { name: "选项三" }
]);
```

### 选项配置

在 `list` 数组中，可以通过 `disabled` 字段来禁用某个选项。

```html
<template>
  <nut-popover v-model:visible="visible1" :list="list1" theme="dark">
    <template #reference>
      <nut-button>展示图标</nut-button>
    </template>
  </nut-popover>

  <nut-popover v-model:visible="visible2" :list="list2" location="right">
    <template #reference>
      <nut-button>禁用选项</nut-button>
    </template>
  </nut-popover>
</template>
```

```ts
const visible1 = ref(false);
const visible2 = ref(false);

const list1 = ref([
  { name: "option1", icon: "my2" },
  { name: "option2", icon: "cart2" },
  { name: "option3", icon: "location" }
]);

const list2 = ref([
  { name: "选项一", disabled: true },
  { name: "选项二", disabled: true },
  { name: "选项三" }
]);
```

### 自定义内容

在 `content` 插槽中自定义内容。

```html
<template>
  <nut-popover v-model:visible="visible" location="bottom-start">
    <template #reference>
      <nut-button>自定义内容</nut-button>
    </template>

    <template #content>
      <view class="list">
        <view
          v-for="(item, index) in list"
          :key="item.id"
          class="item"
        >
          <nut-icon name="service"></nut-icon>
          <text>{{ item.desc }}</text>
        </view>
      </view>
    </template>
  </nut-popover>
</template>
```

```ts
const visible = ref(false);

const list = ref([
  { id: "1", desc: "option1" },
  { id: "2", desc: "option2" },
  { id: "3", desc: "option3" },
  { id: "4", desc: "option4" },
  { id: "5", desc: "option5" },
  { id: "6", desc: "option6" }
]);
```

### 位置自定义

通过 `location` 属性来控制气泡的弹出位置。

```text
top           # 顶部中间位置
left          # 左侧中间位置
right         # 右侧中间位置
bottom        # 底部中间位置
top-start     # 顶部左侧位置
top-end       # 顶部右侧位置
left-start    # 左侧上方位置
left-end      # 左侧下方位置
right-start   # 右侧上方位置
right-end     # 右侧下方位置
bottom-start  # 底部左侧位置
bottom-end    # 底部右侧位置
```

```html
<template>
  <nut-popover
    v-model:visible="visible"
    :list="list"
    location="top"
  >
    <!-- ... -->
  </nut-popover>
</template>
```

### 自定义颜色

Popover 提供了 2 种主题色，同样可以通过 `bg-color` 属性改变背景色。

```html
<template>
  <nut-popover
    v-model:visible="visible"
    :list="list"
    theme="dark"
    bg-color="#ff0000"
  >
    <template #reference>
      <nut-button>自定义颜色</nut-button>
    </template>
  </nut-popover>
</template>
```

## API

### Props

| 参数                     | 说明             | 类型              | 可选值                                                                                                                             | 默认值       |
|------------------------|----------------|-----------------|---------------------------------------------------------------------------------------------------------------------------------|-----------|
| list                   | 选项列表           | Array           | -                                                                                                                               | `[]`      |
| visible                | 是否展示气泡弹出层      | boolean         | -                                                                                                                               | `false`   |
| theme                  | 主题风格           | string          | light / dark                                                                                                                    | light     |
| location               | 弹出位置           | string          | bottom / top / left / right / top-start / top-end / bottom-start / bottom-end / left-start / left-end / right-start / right-end | bottom    |
| offset                 | 出现位置的偏移量       | Array           | -                                                                                                                               | `[0, 12]` |
| show-arrow             | 是否显示小箭头        | boolean         | -                                                                                                                               | `true`    |
| duration               | 动画时长（单位：ms）    | number / string | -                                                                                                                               | `300`     |
| overlay                | 是否显示遮罩层        | boolean         | -                                                                                                                               | `false`   |
| overlay-class          | 自定义遮罩层类名       | string          | -                                                                                                                               | -         |
| overlay-style          | 自定义遮罩层样式       | object          | -                                                                                                                               | -         |
| close-on-click-overlay | 是否在点击遮罩层后关闭菜单  | boolean         | -                                                                                                                               | `true`    |
| close-on-click-action  | 是否在点击选项后关闭     | boolean         | -                                                                                                                               | `true`    |
| close-on-click-outside | 是否在点击外部元素后关闭菜单 | boolean         | -                                                                                                                               | `true`    |
| bg-color               | 自定义背景色         | string          | -                                                                                                                               | -         |
| arrow-offset           | 小箭头的偏移量        | number          | -                                                                                                                               | `0`       |

#### List 数据结构

| 参数        | 说明           | 类型                      | 默认值     |
|-----------|--------------|-------------------------|---------|
| name      | 选项文字         | string                  | -       |
| icon      | 图标           | string                  | -       |
| disabled  | 是否为禁用状态      | boolean                 | `false` |
| className | 为对应选项添加额外的类名 | string / object / Array | -       |

### Events

| 事件名    | 说明      | 类型                                   |
|--------|---------|--------------------------------------|
| choose | 点击选项时触发 | `() => void`                         |
| open   | 打开菜单时触发 | `() => void`                         |
| close  | 关闭菜单时触发 | `(item: any, index: number) => void` |

### Slots

| 名称        | 说明                 |
|-----------|--------------------|
| content   | 自定义气泡组件菜单内容        |
| reference | 触发 Popover 显示的元素内容 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                   | 默认值                    |
|--------------------------------------|------------------------|
| --nut-popover-white-background-color | rgba(255, 255, 255, 1) |
| --nut-popover-dark-background-color  | rgba(75, 76, 77, 1)    |
| --nut-popover-border-bottom-color    | rgba(229, 229, 229, 1) |
| --nut-popover-primary-text-color     | rgba(51, 51, 51, 1)    |
| --nut-popover-disable-color          | rgba(154, 155, 157, 1) |
| --nut-popover-menu-item-padding      | 8px 0                  |
| --nut-popover-menu-item-margin       | 0 8px                  |
| --nut-popover-menu-name-line-height  | normal                 |
