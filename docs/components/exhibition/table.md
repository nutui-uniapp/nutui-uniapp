# Table 表格

### 介绍

用于展示基础表格

### 基础用法

```html
<template>
  <nut-table :columns="columns" :data="data"></nut-table>
</template>
<script lang="ts">
  import { reactive, toRefs, h } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        columns: [
          {
            title: '姓名',
            key: 'name',
            stylehead: 'font-size:20px;color:red;font-weight:bolder;',
            stylecolumn: 'font-size:10px;color:blue;'
          },
          {
            title: '性别',
            key: 'sex',
            render: (record) => {
              return h(
                'span',
                {
                  style: {
                    color: record.sex === '女' ? 'blue' : 'green'
                  }
                },
                record.sex
              );
            }
          },
          {
            title: '学历',
            key: 'record'
          }
        ],
        data: [
          {
            name: 'Tom',
            sex: '男',
            record: '小学'
          },
          {
            name: 'Lucy',
            sex: '女',
            record: '本科'
          },
          {
            name: 'Jack',
            sex: '男',
            record: '高中'
          }
        ]
      });
      return {
        ...toRefs(state)
      };
    }
  };
</script>
```

### 是否显示边框，文字对齐

```html
<template>
  <nut-table :columns="columns" :data="data" :bordered="bordered"></nut-table>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        bordered: false,
        columns: [
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '学历',
            key: 'record'
          }
        ],
        data: [
          {
            name: 'Tom',
            sex: '男',
            record: '小学'
          },
          {
            name: 'Lucy',
            sex: '女',
            record: '本科'
          },
          {
            name: 'Jack',
            sex: '男',
            record: '高中'
          }
        ]
      });
      return {
        ...toRefs(state)
      };
    }
  };
</script>
```

### 显示总结栏

```html
<template>
  <nut-table :columns="columns" :data="data" :summary="summary"></nut-table>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        columns: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '学历',
            key: 'record'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        data: [
          {
            name: 'Tom',
            sex: '男',
            record: '小学',
            age: 13,
            address: '北京'
          },
          {
            name: 'Lucy',
            sex: '女',
            record: '本科',
            age: 34,
            address: '上海'
          },
          {
            name: 'Jack',
            sex: '男',
            record: '高中',
            age: 4,
            address: '杭州'
          }
        ],
        summary: () => {
          return {
            value: '这是总结栏',
            colspan: 5
          };
        }
      });
      return {
        ...toRefs(state)
      };
    }
  };
</script>
```

### 条纹、明暗交替

```html
<template>
  <nut-table :columns="columns3" :data="data2" :striped="striped"></nut-table>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        striped: true,
        columns3: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '学历',
            key: 'record'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        data2: [
          {
            name: 'Tom',
            sex: '男',
            record: '小学',
            age: 13,
            address: '北京'
          },
          {
            name: 'Lucy',
            sex: '女',
            record: '本科',
            age: 34,
            address: '上海'
          },
          {
            name: 'Jack',
            sex: '男',
            record: '高中',
            age: 4,
            address: '杭州'
          }
        ]
      });
      return {
        ...toRefs(state)
      };
    }
  };
</script>
```

### 无数据默认展示，支持自定义

```html
<template>
  <nut-table :columns="columns" :data="data"></nut-table>
  <nut-table :columns="columns3" :data="data3">
    <template #nodata>
      <div class="no-data"> 这里是自定义展示 </div>
    </template>
  </nut-table>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        columns: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '学历',
            key: 'record'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        data: [],
        columns3: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '学历',
            key: 'record'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        data3: []
      });
      return {
        ...toRefs(state)
      };
    }
  };
</script>
```

### 自定义单元格 <Badge type="danger" text="不支持小程序" />

```html
<template>
  <nut-table :columns="columns" :data="data"></nut-table>
</template>
<script lang="ts">
  import { reactive, toRefs, h } from 'vue';
  import NutButton from 'nutui-uniapp/components/button/button.vue'、
  import NutIcon from 'nutui-uniapp/components/icon/icon.vue'

  export default {
    setup() {
      const state = reactive({
        columns: [
          {
            title: '姓名',
            key: 'name',
            align: 'center'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '学历',
            key: 'record'
          },
          {
            title: '操作',
            key: 'render'
          }
        ],
        data: [
        {
          name: 'Tom',
          sex: '男',
          record: '小学',
          render: () => {
            return h(NutButton, { size: 'small', type: 'primary' }, () => 'Hello')
          },
        },
        {
          name: 'Lucy',
          sex: '女',
          record: '本科',
          render: () => {
            return h(NutIcon, { size: '14px', name: 'dongdong' })
          },
        },
        {
          name: 'Jack',
          sex: '男',
          record: '高中',
          render: () => {
            return h(NutButton, { type: 'success', size: 'small' }, () => '编辑按钮')
          },
        },
      ],
      });
      return {
        ...toRefs(state)
      };
    }
  };
</script>
```

### 支持异步渲染

```html
<template>
  <h2>支持异步渲染(5s之后看效果)</h2>
  <nut-table :columns="columns" :data="data"></nut-table>
</template>
<script lang="ts">
  import { reactive, toRefs, onMounted } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        columns: [
          {
            title: '姓名',
            key: 'name'
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '学历',
            key: 'record'
          },
          {
            title: '年龄',
            key: 'age'
          },
          {
            title: '地址',
            key: 'address'
          }
        ],
        data: [],
        data1: [
          {
            address: '北京',
            name: 'Tom',
            sex: '男',
            record: '小学',
            age: 13
          },
          {
            record: '本科',
            name: 'Lucy',
            sex: '女',
            age: 34,
            address: '上海'
          },
          {
            name: 'Jack',
            sex: '男',
            record: '高中',
            age: 4,
            address: '杭州'
          }
        ]
      });
      onMounted(() => {
        setTimeout(() => {
          state.data = state.data1.slice();
        }, 5000);
      });
      return {
        ...toRefs(state)
      };
    }
  };
</script>
```

### 支持排序

```html
<template>
  <nut-table :columns="columns" :data="data" @sorter="handleSorter"></nut-table>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        columns: [
          {
            title: '姓名',
            key: 'name',
            align: 'center',
            sorter: true
          },
          {
            title: '性别',
            key: 'sex'
          },
          {
            title: '学历',
            key: 'record'
          },
          {
            title: '年龄',
            key: 'age',
            sorter: (row1: any, row2: any) => {
              return row1.age - row2.age;
            }
          }
        ],
        data: [
          {
            name: 'Tom',
            sex: '男',
            record: '小学',
            age: 10
          },
          {
            name: 'Lucy',
            sex: '女',
            record: '本科',
            age: 30
          },
          {
            name: 'Jack',
            sex: '男',
            record: '高中',
            age: 4
          }
        ]
      });

      const handleSorter = (item: TableColumnProps) => {
        console.log(`${JSON.stringify(item)}`);
      };

      return {
        ...toRefs(state),
        handleSorter
      };
    }
  };
</script>
```

## API

### Props

| 参数     | 说明             | 类型               | 默认值  |
| -------- | ---------------- | ------------------ | ------- |
| bordered | 是否显示边框     | boolean            | `true`  |
| columns  | 表头数据         | TableColumnProps[] | `[]`    |
| data     | 表格数据         | object[]           | `[]`    |
| summary  | 是否显示简介     | Function           | -       |
| striped  | 条纹是否明暗交替 | boolean            | `false` |

### TableColumnProps

| 参数        | 说明                                                                                                                                                     | 类型                          | 默认值 |
| ----------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------- | ------ |
| key         | 列的唯一标识                                                                                                                                             | string                        | ``     |
| title       | 表头标题                                                                                                                                                 | string                        | ``     |
| stylehead   | 表头样式                                                                                                                                                 | string                        | ``     |
| stylecolumn | 列样式                                                                                                                                                   | string                        | ``     |
| align       | 列的对齐方式，可选值`left`,`center`,`right`                                                                                                              | string                        | `left` |
| sorter      | 排序，可选值有 `true`,`function`, `default`, 其中 `default`表示点击之后可能会依赖接口, `function`可以返回具体的排序函数, `default`表示采用默认的排序算法 | boolean \| Function \| string | -      |
| render      | 自定义渲染列数据，优先级高                                                                                                                               | Function(record)              | -      |

### Events

| 事件名 | 说明             | 回调参数                   |
| ------ | ---------------- | -------------------------- |
| sorter | 点击排序按钮触发 | item: 当前点击的表头的数据 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                         | 默认值           |
| ---------------------------- | ---------------- |
| --nut-table-border-color     | #ececec          |
| --nut-table-cols-padding     | 10px             |
| --nut-table-tr-even-bg-color | #f3f3f3          |
| --nut-table-tr-odd-bg-color  | var(--nut-white) |
