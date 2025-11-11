# TabBar 标签栏

### 介绍

底部导航常用场景。

### 基础用法

如果需要在现有 Icon 的基础上使用更多图标，请参考下方 [自定义图标](#自定义图标)。

```html
<template>
  <nut-tabbar @tab-switch="onTabSwitch">
    <nut-tabbar-item tab-title="首页" icon="home"></nut-tabbar-item>
    <nut-tabbar-item tab-title="分类" icon="category"></nut-tabbar-item>
    <nut-tabbar-item tab-title="发现" icon="find"></nut-tabbar-item>
    <nut-tabbar-item tab-title="购物车" icon="cart"></nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" icon="my"></nut-tabbar-item>
  </nut-tabbar>
</template>
```

```ts
function onTabSwitch(item: any, index: number) {
  console.log("tab-switch", item, index);
}
```

### 通过名称匹配

```html
<template>
  <nut-tabbar v-model="activeName">
    <nut-tabbar-item
      v-for="(item) in list"
      :key="item.name"
      :name="item.name"
      :tab-title="item.title"
      :icon="item.icon"
    ></nut-tabbar-item>
  </nut-tabbar>
</template>
```

```ts
const activeName = ref("category");

const list = [
  { title: "标签", icon: "home", name: "home" },
  { title: "标签", icon: "category", name: "category" },
  { title: "标签", icon: "find", name: "find" },
  { title: "标签", icon: "cart", name: "cart" },
  { title: "标签", icon: "my", name: "my" }
];
```

### 自定义图标

通过 `icon` 插槽自定义图标，可以通过 `active` 判断标签是否选中。

```html
<template>
  <nut-tabbar>
    <nut-tabbar-item tab-title="首页">
      <template #icon="{ active }">
        <image
          v-if="active"
          src="https://img11.360buyimg.com/imagetools/jfs/t1/70423/4/20553/3652/62e74629E23ba550e/aeeed0e3b9f43ae6.png"
        ></image>
        <image
          v-else
          src="https://img13.360buyimg.com/imagetools/jfs/t1/23319/19/18329/3084/62e7c346E957c54ef/6c3e8a49e52b76f2.png"
        ></image>
      </template>
    </nut-tabbar-item>

    <nut-tabbar-item tab-title="我的">
      <template #icon>
        <nut-icon name="my"></nut-icon>
      </template>
    </nut-tabbar-item>
  </nut-tabbar>
</template>
```

### 通过索引选中

```html
<template>
  <nut-tabbar v-model="active">
    <nut-tabbar-item
      v-for="(item) in list"
      :tab-title="item.title"
      :icon="item.icon"
    ></nut-tabbar-item>
  </nut-tabbar>
</template>
```

```ts
const active = ref(2);

const list = [
  { title: "标签", icon: "home" },
  { title: "标签", icon: "category" },
  { title: "标签", icon: "find" },
  { title: "标签", icon: "cart" },
  { title: "标签", icon: "my" }
];
```

### 徽标提示

设置 `dot` 属性后，会在图标右上角展示一个小红点；设置 `value` 属性后，会在图标右上角展示相应的徽标。

```html
<template>
  <nut-tabbar>
    <nut-tabbar-item tab-title="首页" icon="home" :value="11"></nut-tabbar-item>
    <nut-tabbar-item tab-title="分类" icon="category" dot></nut-tabbar-item>
    <nut-tabbar-item tab-title="发现" icon="find" :value="110"></nut-tabbar-item>
    <nut-tabbar-item tab-title="购物车" icon="cart"></nut-tabbar-item>
    <nut-tabbar-item tab-title="我的" icon="my"></nut-tabbar-item>
  </nut-tabbar>
</template>
```

### 自定义颜色

```html
<template>
  <nut-tabbar unactive-color="#7d7e80" active-color="#1989fa">
    <nut-tabbar-item
      v-for="(item) in list"
      :tab-title="item.title"
      :icon="item.icon"
    ></nut-tabbar-item>
  </nut-tabbar>
</template>
```

### 固定至底部

```html
<template>
  <nut-tabbar bottom safe-area-inset-bottom placeholder>
    <nut-tabbar-item
      v-for="(item) in list"
      :tab-title="item.title"
      :icon="item.icon"
    ></nut-tabbar-item>
  </nut-tabbar>
</template>
```

## API

### Tabbar Props

| 参数                     | 说明                                  | 类型              | 可选值 | 默认值     |
|------------------------|-------------------------------------|-----------------|-----|---------|
| v-model                | 选中标签的索引值或者名称                        | number / string | -   | `0`     |
| bottom                 | 是否固定在页面底部                           | boolean         | -   | `false` |
| unactive-color         | 图标未激活的颜色                            | string          | -   | #7d7e80 |
| active-color           | 图标激活的颜色                             | string          | -   | #1989fa |
| safe-area-inset-bottom | 是否开启 iphone 系列全面屏底部安全区适配            | boolean         | -   | `false` |
| placeholder            | 固定在底部时，是否在标签位置生成一个等高的占位元素           | boolean         | -   | `false` |
| controlled `1.9.1`     | 是否启用受控模式，启用后选中项始终受 `model-value` 控制 | boolean         | -   | `false` |

### Tabbar Events

| 事件名        | 说明        | 类型                                   |
|------------|-----------|--------------------------------------|
| tab-switch | 切换页签时触发事件 | `(item: any, index: number) => void` |

### TabbarItem Props

| 参数        | 说明            | 类型     | 可选值 | 默认值 |
|-----------|---------------|--------|-----|-----|
| tab-title | 标签页的标题        | string | -   | -   |
| name      | 标签名称，作为匹配的标识符 | string | -   | -   |
| icon      | 图标名称          | string | -   | -   |

### TabbarItem Slots

| 名称   | 说明    | 类型                    |
|------|-------|-----------------------|
| icon | 自定义图标 | `{ active: boolean }` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                 | 默认值                      |
|------------------------------------|--------------------------|
| --nut-tabbar-active-color          | var(--nut-primary-color) |
| --nut-tabbar-unactive-color        | var(--nut-primary-color) |
| --nut-tabbar-border-top            | 1px solid #eee           |
| --nut-tabbar-border-bottom         | 1px solid #eee           |
| --nut-tabbar-box-shadow            | none                     |
| --nut-tabbar-item-text-font-size   | var(--nut-font-size-0)   |
| --nut-tabbar-item-text-line-height | initial                  |
| --nut-tabbar-height                | 50px                     |
| --nut-tabbar-word-margin-top       | auto                     |
