# Cascader 级联选择

### 介绍

级联选择器，用于多层级数据的选择，典型场景为省市区选择。

### 基础用法

传入`options`列表。

```html
<template>
    <nut-cell title="选择地址" :desc="demo1.value.toString() || '请选择地址'" @click="demo1.visible = true"> </nut-cell>
    <nut-cascader
      title="地址选择"
      v-model:visible="demo1.visible"
      v-model="demo1.value"
      @change="events.change"
      @pathChange="events.pathChange"
      :options="demo1.options"
    ></nut-cascader>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    // 基础用法
    const demo1 = reactive({
      visible: false,
      value: ['湖南'],
      options: [
        {
          value: '浙江',
          text: '浙江',
          children: [
            {
              value: '杭州',
              text: '杭州',
              disabled: true,
              children: [
                { value: '西湖区', text: '西湖区' },
                { value: '余杭区', text: '余杭区' }
              ]
            },
            {
              value: '温州',
              text: '温州',
              children: [
                { value: '鹿城区', text: '鹿城区' },
                { value: '瓯海区', text: '瓯海区' }
              ]
            }
          ]
        },
        {
          value: '湖南',
          text: '湖南',
          disabled: true
        },
        {
          value: '福建',
          text: '福建',
          children: [
            {
              value: '福州',
              text: '福州',
              leaf: false,
              children: []
            },
            {
              value: '厦门',
              text: '厦门',
            },
          ]
        }
      ]
    });
    const events = {
      change(...args: any) {
        console.log('change', ...args);
      },
      pathChange(...args: any) {
        console.log('pathChange', ...args);
      }
    };

    return {
      demo1,
      events
    }
  }
}
</script>
```

### 自定义属性名称

可通过`textKey`、`valueKey`、`childrenKey`指定属性名。

```html
<template>
  <nut-cell title="选择地址" :desc="demo2.value.toString() || '请选择地址'" @click="demo2.visible = true"> </nut-cell>
    <nut-cascader
      title="地址选择"
      v-model:visible="demo2.visible"
      v-model="demo2.value"
      labelKey="text"
      @change="events.change"
      @pathChange="events.pathChange"
      valueKey="text"
      childrenKey="items"
      :options="demo2.options"
    ></nut-cascader>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    // 自定义属性名称
    const demo2 = reactive({
      visible: false,
      value: ['福建', '福州', '台江区'],
      options: [
        {
          text: '浙江',
          items: [
            {
              text: '杭州',
              disabled: true,
              items: [{ text: '西湖区' }, { text: '余杭区' }]
            },
            {
              text: '温州',
              items: [{ text: '鹿城区' }, { text: '瓯海区' }]
            }
          ]
        },
        {
          text: '福建',
          items: [
            {
              text: '福州',
              items: [{ text: '鼓楼区' }, { text: '台江区' }]
            }
          ]
        }
      ]
    });
    const events = {
      change(...args: any) {
        console.log('change', ...args);
      },
      pathChange(...args: any) {
        console.log('pathChange', ...args);
      },
    };

    return { demo2, events };
  }
}
</script>
```

### 动态加载

使用`lazy`标识是否需要动态获取数据，此时不传`options`代表所有数据都需要通过`lazyLoad`加载，首次加载通过`root`属性区分，当遇到非叶子节点时会调用`lazyLoad`方法，参数为当前节点和`resolve`方法，注意`resolve`方法必须调用，不传子节点时会被当做叶子节点处理。

```html
<template>
    <nut-cell title="选择地址" :desc="demo3.value.toString() || '请选择地址'" @click="demo3.visible = true"> </nut-cell>
    <nut-cascader
      title="地址选择"
      v-model:visible="demo3.visible"
      v-model="demo3.value"
      @change="events.change"
      @pathChange="events.pathChange"
      lazy
      :lazyLoad="demo3.lazyLoad"
    ></nut-cascader>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const demo3 = reactive({
      visible: false,
      value: ['A0', 'A12', 'A23', 'A32'],
      lazyLoad(node: any, resolve: (children: any) => void) {
        setTimeout(() => {
          // root表示第一层数据
          if (node.root) {
            resolve([
              { value: 'A0', text: 'A0' },
              { value: 'B0', text: 'B0' },
              { value: 'C0', text: 'C0' }
            ]);
          } else {
            const { value, level } = node;
            const text = value.substring(0, 1);
            const value1 = `${text}${level + 1}1`;
            const value2 = `${text}${level + 1}2`;
            const value3 = `${text}${level + 1}3`;
            resolve([
              { value: value1, text: value1, leaf: level >= 6 },
              { value: value2, text: value2, leaf: level >= 6 },
              { value: value3, text: value3, leaf: level >= 6 }
            ]);
          }
        }, 2000);
      }
    });
    const events = {
      change(...args: any) {
        console.log('change', ...args);
      },
      pathChange(...args: any) {
        console.log('pathChange', ...args);
      },
    };

    return { demo3, events };
  }
}
</script>
```

### 部分数据动态加载

```html
<template>
  <nut-cell title="选择地址" :desc="demo4.value.toString() || '请选择地址'" @click="demo4.visible = true"> </nut-cell>
  <nut-cascader
    title="地址选择"
    v-model:visible="demo4.visible"
    v-model="demo4.value"
    @change="events.change"
    @pathChange="events.pathChange"
    :options="demo4.options"
    lazy
    :lazyLoad="demo4.lazyLoad"
  ></nut-cascader>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const demo4 = reactive({
      visible: false,
      value: [],
      options: [
        { value: 'A0', text: 'A0' },
        {
          value: 'B0',
          text: 'B0',
          children: [
            { value: 'B11', text: 'B11', leaf: true },
            { value: 'B12', text: 'B12' }
          ]
        },
        { value: 'C0', text: 'C0' }
      ],
      lazyLoad(node: any, resolve: (children: any) => void) {
        setTimeout(() => {
          const { value, level } = node;
          const text = value.substring(0, 1);
          const value1 = `${text}${level + 1}1`;
          const value2 = `${text}${level + 1}2`;
          resolve([
            { value: value1, text: value1, leaf: level >= 2 },
            { value: value2, text: value2, leaf: level >= 1 }
          ]);
        }, 500);
      }
    });
    const events = {
      change(...args: any) {
        console.log('change', ...args);
      },
      pathChange(...args: any) {
        console.log('pathChange', ...args);
      },
    };

    return { demo4, events };
  }
}
</script>
```

### 自动转换

如果你的数据为可转换为树形结构的扁平结构时，可以通过`convertConfig`告诉组件需要进行自动转换，`convertConfig`接受4个参数，`topId`为顶层节点的父级id，`idKey`为节点唯一id，`pidKey`为指向父节点id的属性名，存在`sortKey`将根据指定字段调用Array.prototype.sort()进行同层排序。

```html
<template>
    <nut-cell title="选择地址" :desc="demo5.value.toString() || '请选择地址'" @click="demo5.visible = true"> </nut-cell>
    <nut-cascader
      title="地址选择"
      v-model:visible="demo5.visible"
      v-model="demo5.value"
      @change="events.change"
      @pathChange="events.pathChange"
      :options="demo5.options"
      :convertConfig="demo5.convertConfig"
    ></nut-cascader>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const demo5 = reactive({
      visible: false,
      value: ['广东省', '广州市'],
      convertConfig: {
        topId: null,
        idKey: 'id',
        pidKey: 'pid',
        sortKey: ''
      },
      options: [
        { value: '北京', text: '北京', id: 1, pid: null },
        { value: '朝阳区', text: '朝阳区', id: 11, pid: 1 },
        { value: '亦庄', text: '亦庄', id: 111, pid: 11 },
        { value: '广东省', text: '广东省', id: 2, pid: null },
        { value: '广州市', text: '广州市', id: 21, pid: 2 }
      ]
    });
    const events = {
      change(...args: any) {
        console.log('change', ...args);
      },
      pathChange(...args: any) {
        console.log('pathChange', ...args);
      },
    };

    return { demo5, events };
  }
}
</script>
```

## API

### Props

| 参数                     | 说明                                 | 类型              | 默认值      |
|------------------------|------------------------------------|-----------------|----------|
| v-model                | 选中值，双向绑定                           | Array           | -        |
| v-model:visible        | 显示选择层                              | boolean         | `false`  |
| options                | 级联数据                               | Array           | -        |
| lazy                   | 是否开启动态加载                           | boolean         | `false`  |
| lazy-load              | 动态加载回调，开启动态加载时生效                   | Function        | -        |
| value-key              | 自定义 `options` 结构中 `value` 的字段      | string          | value    |
| text-key               | 自定义 `options` 结构中 `text` 的字段       | string          | text     |
| children-key           | 自定义 `options` 结构中 `children` 的字段   | string          | children |
| convert-config         | 当 `options` 为可转换为树形结构的扁平结构时，配置转换规则 | object          | -        |
| poppable               | 是否需要弹层展示（设置为 `false` 后，`title` 失效） | boolean         | `true`   |
| title                  | 标题                                 | string          | -        |
| title-type `1.1.7`     | 选中底部展示样式 可选值 line、smile            | string          | line     |
| title-size `1.1.7`     | 标签栏字体尺寸大小 可选值  large normal small  | string          | normal   |
| title-gutter `1.1.7`   | 标签间隙                               | number / string | `0`      |
| title-ellipsis `1.1.7` | 是否省略过长的标题文字                        | boolean         | `true`   |
| pop-style `1.8.0`      | 自定义弹窗样式                            | `CSSProperties` | -        |
| lock-scroll  `H5`      | 背景是否锁定                             | boolean         | `true`   |

::: details 弹窗状态属性
当 `poppable` 为 `true` 时，继承了 [Popup](/components/basic/popup) 的以下属性

| 参数                     | 说明                                                  | 类型              | 默认值       |
|------------------------|-----------------------------------------------------|-----------------|-----------|
| pop-class              | 自定义弹框类名                                             | string          | -         |
| closeable              | 是否显示关闭按钮                                            | boolean         | `false`   |
| close-icon             | [图标名称](/components/basic/icon) 或图片链接                | string          | close     |
| close-icon-position    | 关闭按钮位置（top-left,top-right,bottom-left,bottom-right） | string          | top-right |
| overlay                | 是否显示遮罩                                              | boolean         | `true`    |
| z-index                | 遮罩层级                                                | number          | `2000+`   |
| overlay-class          | 自定义遮罩层类名                                            | string          | -         |
| overlay-style          | 自定义遮罩层样式                                            | `CSSProperties` | -         |
| close-on-click-overlay | 是否点击遮罩关闭                                            | boolean         | `true`    |
:::

### Events

| 事件名            | 说明          | 回调参数                 |
|----------------|-------------|----------------------|
| change         | 选中值改变时触发    | `(value, pathNodes)` |
| path-change    | 选中项改变时触发    | `(pathNodes)`        |
| open `1.8.0`   | 打开弹窗时触发     | -                    |
| opened `1.8.0` | 打开弹窗动画结束时触发 | -                    |
| close `1.8.0`  | 关闭弹窗时触发     | -                    |
| closed `1.8.0` | 关闭弹窗动画结束时触发 | -                    |

### Slots

| 名称            | 说明        |
|---------------|-----------|
| title `1.5.4` | 自定义顶部标题部分 |

### options数据结构

| 键名       | 说明                          | 类型                | 默认值                                             |
|----------|-----------------------------|-------------------|-------------------------------------------------|
| text     | 显示名称,可以通过`text-key`更改键名     | `string`          | -                                               |
| value    | 唯一标识,可以通过`value-key`更改键名    | `string` `number` | -                                               |
| children | 子级选项,可以通过`children-key`更改键名 | `array`           | -                                               |
| disabled | 是否禁用                        | `boolean`         | false                                           |
| leaf     | 是否叶子节点                      | `boolean`         | `children`为空时`leaf`等于`true`,不为空时`leaf`等于`false` |
| loading  | 加载状态                        | `boolean`         | false                                           |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                               | 默认值                      |
|----------------------------------|--------------------------|
| --nut-cascader-font-size         | var(--nut-font-size-2)   |
| --nut-cascader-line-height       | 22px                     |
| --nut-cascader-tabs-item-padding | 0 10px                   |
| --nut-cascader-bar-padding       | 24px 20px 17px           |
| --nut-cascader-bar-font-size     | var(--nut-font-size-4)   |
| --nut-cascader-bar-line-height   | 20px                     |
| --nut-cascader-bar-color         | var(--nut-title-color)   |
| --nut-cascader-item-padding      | 10px 20px                |
| --nut-cascader-item-color        | var(--nut-title-color)   |
| --nut-cascader-item-font-size    | var(--nut-font-size-2)   |
| --nut-cascader-item-active-color | var(--nut-primary-color) |
