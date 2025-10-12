# Elevator 电梯楼层

### 介绍

用于列表快速定位以及索引的显示

### 基础用法

``` html
<template>
  <nut-elevator :index-list="dataList" :height="260" @click-item="clickItem" @click-index="clickIndex"></nut-elevator>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        dataList: [
          {
            title: 'A',
            list: [
              {
                name: '安徽',
                id: 1
              }
            ]
          },
          {
            title: 'B',
            list: [
              {
                name: '北京',
                id: 2
              }
            ]
          },
          {
            title: 'G',
            list: [
              {
                name: '广西',
                id: 3
              },
              {
                name: '广东',
                id: 4
              }
            ]
          },
          {
            title: 'H',
            list: [
              {
                name: '湖南',
                id: 5
              },
              {
                name: '湖北',
                id: 6
              }
            ]
          }
        ]
      });

      const clickItem = (key: string, item: any) => {
        console.log(key, JSON.stringify(item));
      };

      const clickIndex = (key: string) => {
        console.log(key);
      };

      return { ...toRefs(state), clickItem, clickIndex };
    }
  };
</script>
```

### 自定义索引

``` html
<template>
  <nut-elevator :index-list="dataList2" :height="220" :acceptKey="acceptKey" @click-item="clickItem" @click-index="clickIndex"></nut-elevator>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        acceptKey: 'num',
        dataList2: [
          {
            num: '一',
            list: [
              {
                name: '北京',
                id: 1
              },
              {
                name: '上海',
                id: 2
              },
              {
                name: '深圳',
                id: 3
              },
              {
                name: '广州',
                id: 4
              },
              {
                name: '杭州',
                id: 5
              }
            ]
          },
          {
            num: '二',
            list: [
              {
                name: '成都',
                id: 6
              },
              {
                name: '西安',
                id: 7
              },
              {
                name: '天津',
                id: 8
              },
              {
                name: '武汉',
                id: 9
              },
              {
                name: '长沙',
                id: 10
              },
              {
                name: '重庆',
                id: 11
              },
              {
                name: '苏州',
                id: 12
              },
              {
                name: '南京',
                id: 13
              }
            ]
          },
          {
            num: '三',
            list: [
              {
                name: '西宁',
                id: 14
              },
              {
                name: '兰州',
                id: 15
              },
              {
                name: '石家庄',
                id: 16
              },
              {
                name: '秦皇岛',
                id: 17
              },
              {
                name: '大连',
                id: 18
              },
              {
                name: '哈尔滨',
                id: 19
              },
              {
                name: '长春',
                id: 20
              },
              {
                name: '太原',
                id: 21
              }
            ]
          }
        ]
      });

      const clickItem = (key: string, item: any) => {
        console.log(key, JSON.stringify(item));
      };

      const clickIndex = (key: string) => {
        console.log(key);
      };

      return { ...toRefs(state), clickItem, clickIndex };
    }
  };
</script>
```

### 索引吸顶

``` html
<template>
  <nut-elevator :index-list="dataList3" :is-sticky="true" :height="220"  @click-item="clickItem" @click-index="clickIndex"></nut-elevator>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        dataList3: [
          {
            title: 'A',
            list: [
              {
                name: '安徽',
                id: 1
              }
            ]
          },
          {
            title: 'B',
            list: [
              {
                name: '北京',
                id: 2
              }
            ]
          },
          {
            title: 'C',
            list: [
              {
                name: '重庆',
                id: 3
              }
            ]
          },
          {
            title: 'F',
            list: [
              {
                name: '福建',
                id: 4
              }
            ]
          },
          {
            title: 'G',
            list: [
              {
                name: '广西',
                id: 5
              },
              {
                name: '广东',
                id: 6
              },
              {
                name: '甘肃',
                id: 7
              },
              {
                name: '贵州',
                id: 8
              }
            ]
          },
          {
            title: 'H',
            list: [
              {
                name: '湖南',
                id: 9
              },
              {
                name: '湖北',
                id: 10
              },
              {
                name: '海南',
                id: 11
              },
              {
                name: '河北',
                id: 12
              },
              {
                name: '河南',
                id: 13
              },
              {
                name: '黑龙江',
                id: 14
              }
            ]
          },
          {
            title: 'J',
            list: [
              {
                name: '吉林',
                id: 15
              },
              {
                name: '江苏',
                id: 16
              },
              {
                name: '江西',
                id: 17
              }
            ]
          },
          {
            title: 'L',
            list: [
              {
                name: '辽宁',
                id: 18
              }
            ]
          }
        ]
      });

      const clickItem = (key: string, item: any) => {
        console.log(key, JSON.stringify(item));
      };

      const clickIndex = (key: string) => {
        console.log(key);
      };

      return { ...toRefs(state), clickItem, clickIndex };
    }
  };
</script>
```

### 自定义内容

```html
<template>
  <nut-elevator :index-list="dataList" :height="260" @click-item="clickItem" @click-index="clickIndex">
      <template v-slot:default="slotProps">
        <nut-icon name="jd" width="12px"></nut-icon>
        <span :style="{marginLeft: '15px'}">{{ slotProps.item.name }}</span>
      </template>
  </nut-elevator>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        dataList: [
          {
            title: 'A',
            list: [
              {
                name: '安徽',
                id: 1
              }
            ]
          },
          {
            title: 'B',
            list: [
              {
                name: '北京',
                id: 2
              }
            ]
          },
          {
            title: 'G',
            list: [
              {
                name: '广西',
                id: 3
              },
              {
                name: '广东',
                id: 4
              }
            ]
          },
          {
            title: 'H',
            list: [
              {
                name: '湖南',
                id: 5
              },
              {
                name: '湖北',
                id: 6
              }
            ]
          }
        ]
      });

      const clickItem = (key: string, item: any) => {
        console.log(key, JSON.stringify(item));
      };

      const clickIndex = (key: string) => {
        console.log(key);
      };

      return { ...toRefs(state), clickItem, clickIndex };
    }
  };
</script>
```

## API

### Props

| 参数         | 说明               | 类型                                                       | 可选值 | 默认值                |
|--------------|------------------|----------------------------------------------------------|--------|-----------------------|
| height       | 电梯区域的高度     | number / string                                          | -      | `200px`               |
| accept-key   | 索引 `key` 值      | string                                                   | -      | `title`               |
| index-list   | 索引列表           | Array（ `item` 需包含 `id`、`name` 属性, `name` 支持传入 `html` 结构） | -      | `[{id: 0, name: ''}]` |
| is-sticky    | 索引是否吸顶       | boolean                                                  | -      | `false`               |
| space-height | 右侧锚点的上下间距 | number                                                   | -      | `23`                  |
| title-height | 左侧索引的高度     | number                                                   | -      | `35`                  |

### Slots

| 名称    | 说明                           |
|---------|------------------------------|
| default | 自定义左侧索引下每条数据的内容 |

### Events

| 事件名      | 说明     | 回调参数                                 |
|-------------|--------|------------------------------------------|
| click-item  | 点击内容 | `key: string, item: { id: 0, name: '' }` |
| click-index | 点击索引 | `key: string`                            |
| change      | 索引改变 | `index: number`                          |

### Methods

| 方法名   | 说明                 | 参数           |
|----------|--------------------|----------------|
| scrollTo | 滚动到对应索引的位置 | `index:number` |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                                  | 默认值                               |
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
