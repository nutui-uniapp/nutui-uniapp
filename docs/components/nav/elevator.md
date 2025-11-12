# Elevator 电梯楼层

### 介绍

用于列表快速定位以及索引的显示。

### 基础用法

```html
<template>
  <nut-elevator
    :index-list="list"
    :height="260"
    @click-item="onItemClick"
    @click-index="onIndexClick"
  ></nut-elevator>
</template>
```

```ts
const list = ref([
  {
    title: "A",
    list: [
      { id: 1, name: "安徽" }
    ]
  },
  {
    title: "B",
    list: [
      { id: 2, name: "北京" }
    ]
  },
  {
    title: "G",
    list: [
      { id: 3, name: "广西" },
      { id: 4, name: "广东" }
    ]
  },
  {
    title: "H",
    list: [
      { id: 5, name: "湖南" },
      { id: 6, name: "湖北" }
    ]
  }
]);

function onItemClick(key: string, item: any) {
  console.log("item-click", key, item);
}

function onIndexClick(key: string) {
  console.log("index-click", key);
}
```

### 自定义索引

```html
<template>
  <nut-elevator
    :index-list="list"
    :height="260"
    accept-key="num"
  ></nut-elevator>
</template>
```

```ts
const list = ref([
  {
    num: "一",
    list: [
      { id: 1, name: "北京" },
      { id: 2, name: "上海" },
      { id: 3, name: "深圳" },
      { id: 4, name: "广州" },
      { id: 5, name: "杭州" }
    ]
  },
  {
    num: "二",
    list: [
      { id: 6, name: "成都" },
      { id: 7, name: "西安" },
      { id: 8, name: "天津" },
      { id: 9, name: "武汉" },
      { id: 10, name: "长沙" },
      { id: 11, name: "重庆" },
      { id: 12, name: "苏州" },
      { id: 13, name: "南京" }
    ]
  },
  {
    num: "三",
    list: [
      { id: 14, name: "西宁" },
      { id: 15, name: "兰州" },
      { id: 16, name: "石家庄" },
      { id: 17, name: "秦皇岛" },
      { id: 18, name: "大连" },
      { id: 19, name: "哈尔滨" },
      { id: 20, name: "长春" },
      { id: 21, name: "太原" }
    ]
  }
]);
```

### 索引吸顶

```html
<template>
  <nut-elevator
    :index-list="list"
    :height="260"
    is-sticky
  ></nut-elevator>
</template>
```

### 自定义内容

```html
<template>
  <nut-elevator :index-list="list" :height="260">
    <template #default="{ item }">
      <nut-icon name="jd"></nut-icon>
      <text>{{ item.name }}</text>
    </template>
  </nut-elevator>
</template>
```

## API

### Props

| 参数           | 说明        | 类型              | 可选值 | 默认值     |
|--------------|-----------|-----------------|-----|---------|
| height       | 电梯区域的高度   | number / string | -   | 200px   |
| accept-key   | 索引字段      | string          | -   | title   |
| index-list   | 索引列表      | Array           | -   | `[]`    |
| is-sticky    | 索引是否吸顶    | boolean         | -   | `false` |
| space-height | 右侧锚点的上下间距 | number          | -   | `23`    |
| title-height | 左侧索引的高度   | number          | -   | `35`    |

### Events

| 事件名         | 说明      | 类型                                 |
|-------------|---------|------------------------------------|
| click-item  | 点击内容时触发 | `(key: string, item: any) => void` |
| click-index | 点击索引时触发 | `(key: string) => void`            |
| change      | 索引改变时触发 | `(index: number) => void`          |

### Slots

| 名称      | 说明              | 类型              |
|---------|-----------------|-----------------|
| default | 自定义左侧索引下每条数据的内容 | `{ item: any }` |

### Exposes

通过 [ref](https://vuejs.org/guide/essentials/template-refs.html#template-refs) 可以获取到 Elevator 实例并调用实例方法。

| 名称       | 说明         | 类型                        |
|----------|------------|---------------------------|
| scrollTo | 滚动到对应索引的位置 | `(index: number) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                                    | 默认值                                  |
|-------------------------------------------------------|--------------------------------------|
| --nut-elevator-list-item-highcolor                    | var(--nut-primary-color)             |
| --nut-elevator-list-item-font-size                    | 12px                                 |
| --nut-elevator-list-item-font-color                   | #333333                              |
| --nut-elevator-list-item-name-padding                 | 0 20px                               |
| --nut-elevator-list-item-name-height                  | 30px                                 |
| --nut-elevator-list-item-name-line-height             | 30px                                 |
| --nut-elevator-list-item-code-font-size               | 14px                                 |
| --nut-elevator-list-item-code-font-color              | #1a1a1a                              |
| --nut-elevator-list-item-code-font-weight             | 500                                  |
| --nut-elevator-list-item-code-padding                 | 0 20px                               |
| --nut-elevator-list-item-code-height                  | 35px                                 |
| --nut-elevator-list-item-code-line-height             | 35px                                 |
| --nut-elevator-list-item-code-after-width             | 100%                                 |
| --nut-elevator-list-item-code-after-height            | 1px                                  |
| --nut-elevator-list-item-code-after-bg-color          | #f5f5f5                              |
| --nut-elevator-list-item-code-current-box-shadow      | 0 3px 3px 1px rgba(240, 240, 240, 1) |
| --nut-elevator-list-item-code-current-bg-color        | #fff                                 |
| --nut-elevator-list-item-code-current-border-radius   | 50%                                  |
| --nut-elevator-list-item-code-current-width           | 45px                                 |
| --nut-elevator-list-item-code-current-height          | 45px                                 |
| --nut-elevator-list-item-code-current-line-height     | 45px                                 |
| --nut-elevator-list-item-code-current-position        | absolute                             |
| --nut-elevator-list-item-code-current-right           | 60px                                 |
| --nut-elevator-list-item-code-current-top             | 50%                                  |
| --nut-elevator-list-item-code-current-transform       | translateY(-50%)                     |
| --nut-elevator-list-item-code-current-text-align      | center                               |
| --nut-elevator-list-item-bars-position                | absolute                             |
| --nut-elevator-list-item-bars-right                   | 8px                                  |
| --nut-elevator-list-item-bars-top                     | 50%                                  |
| --nut-elevator-list-item-bars-transform               | translateY(-50%)                     |
| --nut-elevator-list-item-bars-padding                 | 15px 0                               |
| --nut-elevator-list-item-bars-background-color        | #eeeff2                              |
| --nut-elevator-list-item-bars-border-radius           | 6px                                  |
| --nut-elevator-list-item-bars-text-align              | center                               |
| --nut-elevator-list-item-bars-z-index                 | 1                                    |
| --nut-elevator-list-item-bars-inner-item-padding      | 3px                                  |
| --nut-elevator-list-item-bars-inner-item-font-size    | 10px                                 |
| --nut-elevator-list-fixed-color                       | var(--nut-primary-color)             |
| --nut-elevator-list-fixed-bg-color                    | var(--nut-white)                     |
| --nut-elevator-list-fixed-box-shadow                  | 0 0 10px #eee                        |
| --nut-elevator-list-item-bars-inner-item-active-color | var(--nut-primary-color)             |
