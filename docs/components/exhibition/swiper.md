# Swiper 轮播

### 介绍

常用于一组图片或卡片轮播。

### 基础用法

- `init-page` 初始索引值
- `auto-play` 自动轮播的时长
- `pagination-visible` 是否显示分页指示器
- `pagination-color` 指示器颜色自定义

```html
<template>
  <nut-swiper
    :init-page="2"
    auto-play="3000"
    pagination-visible
    pagination-color="#426543"
    pagination-unselected-color="#808080"
  >
    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"></image>
    </nut-swiper-item>
  </nut-swiper>
</template>
```

### 异步加载

```html
<template>
  <nut-swiper
    auto-play="3000"
    pagination-visible
    pagination-color="#426543"
  >
    <nut-swiper-item v-for="(item) in list" :key="item">
      <image :src="item"></image>
    </nut-swiper-item>
  </nut-swiper>
</template>
```

```ts
const list = ref<string[]>([]);

async function fetchList() {
  await sleep(1000);

  list.value = [
    "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
    "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
    "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
    "https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
  ];
}

onMounted(() => {
  fetchList();
});
```

### 动态加载

支持动态增加 / 删除图片。

```html
<template>
  <nut-swiper
    auto-play="3000"
    pagination-visible
    pagination-color="#426543"
  >
    <nut-swiper-item v-for="(item) in list" :key="item">
      <image :src="item"></image>
    </nut-swiper-item>
  </nut-swiper>
</template>
```

```ts
const list = ref([
  "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
  "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
  "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
  "https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
]);

onMounted(() => {
  setTimeout(() => {
    list.value.splice(1, 1);
  }, 3000);
});
```

### 自定义大小

使用 `width` 自定义轮播图大小。

```html
<template>
  <nut-swiper width="300" :loop="false">
    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"></image>
    </nut-swiper-item>
  </nut-swiper>
</template>
```

### 自定义分页指示器

通过 `page` 插槽自定义指示器。

```html
<template>
  <nut-swiper @change="onChange">
    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"></image>
    </nut-swiper-item>

    <template #page>
      <text>{{ current }} / 4</text>
    </template>
  </nut-swiper>
</template>
```

```ts
const current = ref(1);

function onChange(index: number) {
  current.value = index + 1;
}
```

### 垂直方向

`direction` 自定义轮播方向。

```html
<template>
  <nut-swiper height="150" direction="vertical" auto-play="3000">
    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/welcomenutui.jpg"></image>
    </nut-swiper-item>

    <nut-swiper-item>
      <image src="https://storage.360buyimg.com/jdc-article/fristfabu.jpg"></image>
    </nut-swiper-item>
  </nut-swiper>
</template>
```

### 手动切换

可通过 `prev()`、`next()` 进行手动切换。

```html
<template>
  <nut-swiper ref="swiperEl">
    <nut-swiper-item v-for="(item) in list" :key="item">
      <image :src="item"></image>
    </nut-swiper-item>
  </nut-swiper>

  <nut-button @click="prev()">上一张</nut-button>
  <nut-button @click="next()">下一张</nut-button>
</template>
```

```ts
import type { SwiperInst } from "nutui-uniapp";

const swiperEl = ref<SwiperInst>();

const list = ref([
  "https://storage.360buyimg.com/jdc-article/NutUItaro34.jpg",
  "https://storage.360buyimg.com/jdc-article/NutUItaro2.jpg",
  "https://storage.360buyimg.com/jdc-article/welcomenutui.jpg",
  "https://storage.360buyimg.com/jdc-article/fristfabu.jpg"
]);

function prev() {
  swiperEl.value.prev();
}

function next() {
  swiperEl.value.next();
}
```

## API

### Props

| 参数                                  | 说明                   | 类型              | 可选值                   | 默认值        |
|-------------------------------------|----------------------|-----------------|-----------------------|------------|
| width                               | 轮播卡片的宽度              | number / string | -                     | -          |
| height                              | 轮播卡片的高度              | number / string | -                     | -          |
| direction                           | 轮播方向,                | string          | horizontal / vertical | horizontal |
| pagination-visible                  | 分页指示器是否展示            | boolean         | -                     | `false`    |
| pagination-color                    | 分页指示器选中的颜色           | string          | -                     | #fff       |
| pagination-unselected-color `1.6.0` | 分页指示器没有选中的颜色         | string          | -                     | #ddd       |
| loop                                | 是否循环轮播               | boolean         | -                     | `true`     |
| duration                            | 动画时长（单位：ms）          | number / string | -                     | `500`      |
| auto-play                           | 自动轮播时长（`0` 表示不会自动轮播） | number / string | -                     | `0`        |
| init-page                           | 初始化索引值               | number / string | -                     | `0`        |
| touchable                           | 是否可触摸滑动              | boolean         | -                     | `true`     |
| is-prevent-default                  | 滑动过程中是否禁用默认事件        | boolean         | -                     | `true`     |
| is-stop-propagation                 | 滑动过程中是否禁止冒泡          | boolean         | -                     | `true`     |

### Events

| 事件名    | 说明      | 类型                        |
|--------|---------|---------------------------|
| change | 切换之后的回调 | `(index: number) => void` |

### Slots

| 名称   | 说明     |
|------|--------|
| page | 自定义指示器 |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Swiper 实例并调用实例方法。

| 名称   | 说明      | 类型                        |
|------|---------|---------------------------|
| prev | 切换到上一页  | `() => void`              |
| next | 切换到下一页  | `() => void`              |
| to   | 切换到指定轮播 | `(index: number) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                         | 默认值 |
|--------------------------------------------|-----|
| --nut-swiper-pagination-item-width         | 8px |
| --nut-swiper-pagination-item-height        | 3px |
| --nut-swiper-pagination-item-margin-right  | 7px |
| --nut-swiper-pagination-item-border-radius | 2px |
