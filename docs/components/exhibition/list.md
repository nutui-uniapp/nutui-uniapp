# List 虚拟列表

### 介绍

List 组件为**虚拟列表**组件，它可以只渲染当前可视区域，其他部分在用户滚动到可视区域内之后再渲染。

注意：**在大多数场景下，你并不需要使用虚拟列表**，它可能会出现滑动白屏、计算位置不精确等问题。

### 基础用法

```html
<template>
  <nut-list :list-data="list" :height="50" @scroll-bottom="onScrollBottom">
    <template #default="{ item, index }">
      <view class="item">
        <text>item：{{ item }}</text>
        <text>index：{{ index }}</text>
      </view>
    </template>
  </nut-list>
</template>
```

```ts
const list = ref<number[]>([]);

function getList(start: number) {
  return Array
    .from({ length: 100 })
    .fill(0)
    .map((_, index) => start + index + 1);
}

function onScrollBottom() {
  list.value = list.value.concat(getList(list.value.length));
}

onLoad(() => {
  list.value = getList(0);
});
```

```css
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #ffffff;
  background-color: #fa2c19;
  border-radius: 6px;
}
```

## API

### Props

| 参数               | 说明               | 类型     | 可选值 | 默认值            |
|------------------|------------------|--------|-----|----------------|
| height           | 列表项的高度           | number | -   | `50`           |
| list-data        | 列表数据             | Array  | -   | `[]`           |
| container-height | 容器高度（最大值不能超过可视区） | number | -   | `windowHeight` |

### Events

| 事件名          | 说明       | 类型           |
|--------------|----------|--------------|
| scrollBottom | 滚动到底部时触发 | `() => void` |
| scroll       | 滚动时触发    | `() => void` |

### Slots

| 名称      | 说明    | 类型                             |
|---------|-------|--------------------------------|
| default | 列表项内容 | `{ item: any; index: number }` |
