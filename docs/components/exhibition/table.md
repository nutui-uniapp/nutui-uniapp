# Table 表格

### 介绍

用于展示基础表格。

### 基础用法

```html
<template>
  <nut-table :columns="columns" :data="data"></nut-table>
</template>
```

```ts
const columns = ref([
  {
    title: "姓名",
    key: "name",
    stylehead: "font-size:20px;color:red;font-weight:bolder;",
    stylecolumn: "font-size:10px;color:blue;"
  },
  {
    title: "性别",
    key: "gender"
  },
  {
    title: "学历",
    key: "education"
  }
]);

const data = ref([
  {
    name: "Tom",
    gender: "男",
    education: "小学"
  },
  {
    name: "Lucy",
    gender: "女",
    education: "本科"
  },
  {
    name: "Jack",
    gender: "男",
    education: "高中"
  }
]);
```

### 是否显示边框，文字对齐

```html
<template>
  <nut-table :columns="columns" :data="data" :bordered="false"></nut-table>
</template>
```

```ts
const columns = ref([
  {
    title: "姓名",
    key: "name",
    align: "center"
  },
  {
    title: "性别",
    key: "gender"
  },
  {
    title: "学历",
    key: "education"
  }
]);

const data = ref([
  {
    name: "Tom",
    gender: "男",
    education: "小学"
  },
  {
    name: "Lucy",
    gender: "女",
    education: "本科"
  },
  {
    name: "Jack",
    gender: "男",
    education: "高中"
  }
]);
```

### 显示总结栏

```html
<template>
  <nut-table :columns="columns" :data="data" :summary="summary"></nut-table>
</template>
```

```ts
const columns = ref([
  {
    title: "姓名",
    key: "name"
  },
  {
    title: "性别",
    key: "gender"
  },
  {
    title: "学历",
    key: "education"
  },
  {
    title: "年龄",
    key: "age"
  },
  {
    title: "地址",
    key: "address"
  }
]);

const data = ref([
  {
    name: "Tom",
    gender: "男",
    education: "小学",
    age: 13,
    address: "北京"
  },
  {
    name: "Lucy",
    gender: "女",
    education: "本科",
    age: 34,
    address: "上海"
  },
  {
    name: "Jack",
    gender: "男",
    education: "高中",
    age: 4,
    address: "杭州"
  }
]);

function summary() {
  return {
    value: "这是总结栏",
    colspan: 5
  };
}
```

### 条纹、明暗交替

```html
<template>
  <nut-table :columns="columns" :data="data" striped></nut-table>
</template>
```

### 无数据默认展示，支持自定义

```html
<template>
  <nut-table :columns="columns" :data="data">
    <template #nodata>
      <text>暂无数据</text>
    </template>
  </nut-table>
</template>
```

### 自定义单元格 <Badge type="danger">不支持小程序</Badge>

```html
<template>
  <nut-table :columns="columns" :data="data"></nut-table>
</template>
```

```ts
import NutButton from "nutui-uniapp/components/button/button.vue";
import NutIcon from "nutui-uniapp/components/icon/icon.vue";

const columns = ref([
  {
    title: "姓名",
    key: "name",
    align: "center"
  },
  {
    title: "性别",
    key: "gender"
  },
  {
    title: "学历",
    key: "education"
  },
  {
    title: "操作",
    key: "render"
  }
]);

const data = ref([
  {
    name: "Tom",
    gender: "男",
    education: "小学",
    render: () => {
      return h(NutButton, { size: "small", type: "primary" }, () => "Hello");
    }
  },
  {
    name: "Lucy",
    gender: "女",
    education: "本科",
    render: () => {
      return h(NutIcon, { size: "14px", name: "dongdong" });
    }
  },
  {
    name: "Jack",
    gender: "男",
    education: "高中",
    render: () => {
      return h(NutButton, { type: "success", size: "small" }, () => "编辑按钮");
    }
  }
]);
```

### 支持异步渲染

```html
<template>
  <nut-table :columns="columns" :data="data"></nut-table>
</template>
```

```ts
const columns = ref([
  {
    title: "姓名",
    key: "name"
  },
  {
    title: "性别",
    key: "gender"
  },
  {
    title: "学历",
    key: "education"
  },
  {
    title: "年龄",
    key: "age"
  },
  {
    title: "地址",
    key: "address"
  }
]);

const data = ref([]);

async function fetchData() {
  await sleep(1000);

  data.value = [
    {
      name: "Tom",
      gender: "男",
      education: "小学",
      age: 13,
      address: "北京"
    },
    {
      name: "Lucy",
      gender: "女",
      education: "本科",
      age: 34,
      address: "上海"
    },
    {
      name: "Jack",
      gender: "男",
      education: "高中",
      age: 4,
      address: "杭州"
    }
  ];
}

onMounted(() => {
  fetchData();
});
```

### 支持排序

```html
<template>
  <nut-table :columns="columns" :data="data" @sorter="onSort"></nut-table>
</template>
```

```ts
import type { TableColumnProps } from "nutui-uniapp";

const columns = ref([
  {
    title: "姓名",
    key: "name",
    align: "center",
    sorter: true
  },
  {
    title: "性别",
    key: "gender"
  },
  {
    title: "学历",
    key: "education"
  },
  {
    title: "年龄",
    key: "age",
    sorter(row1: any, row2: any) {
      return row1.age - row2.age;
    }
  }
]);

const data = ref([
  {
    name: "Tom",
    gender: "男",
    education: "小学",
    age: 10
  },
  {
    name: "Lucy",
    gender: "女",
    education: "本科",
    age: 30
  },
  {
    name: "Jack",
    gender: "男",
    education: "高中",
    age: 4
  }
]);

function onSort(column: TableColumnProps) {
  console.log("sort", column);
}
```

## API

### Props

| 参数       | 说明       | 类型       | 可选值 | 默认值     |
|----------|----------|----------|-----|---------|
| bordered | 是否显示边框   | boolean  | -   | `true`  |
| columns  | 表头数据     | Array    | -   | `[]`    |
| data     | 表格数据     | Array    | -   | `[]`    |
| summary  | 是否显示简介   | Function | -   | -       |
| striped  | 条纹是否明暗交替 | boolean  | -   | `false` |

#### 表头数据结构

| 参数          | 说明                                                                      | 类型                                                                 | 可选值                   | 默认值  |
|-------------|-------------------------------------------------------------------------|--------------------------------------------------------------------|-----------------------|------|
| key         | 列的唯一标识                                                                  | string                                                             | -                     | -    |
| title       | 标题                                                                      | string                                                             | -                     | -    |
| stylehead   | 表头样式                                                                    | string                                                             | -                     | -    |
| stylecolumn | 列样式                                                                     | string                                                             | -                     | -    |
| align       | 列的对齐方式                                                                  | string                                                             | left / center / right | left |
| sorter      | 排序（`true` 表示点击之后可能会依赖接口, `default` 表示采用默认的排序算法, `function` 可以返回具体的排序函数） | boolean / string /  `(row1: any, row2: any) => number`             | -                     |
| render      | 自定义渲染列数据，优先级高                                                           | `(row: object, rowIndex: number) => VNodeChild \| string \| VNode` | -                     | -    |

### Events

| 事件名    | 说明       | 类型                                   |
|--------|----------|--------------------------------------|
| sorter | 点击排序按钮触发 | `(column: TableColumnProps) => void` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                           | 默认值              |
|------------------------------|------------------|
| --nut-table-border-color     | #ececec          |
| --nut-table-cols-padding     | 10px             |
| --nut-table-tr-even-bg-color | #f3f3f3          |
| --nut-table-tr-odd-bg-color  | var(--nut-white) |
