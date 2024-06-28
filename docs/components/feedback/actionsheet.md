# ActionSheet 动作面板

### 介绍

从底部弹出的动作菜单面板。

### 基础用法

``` html
<template>
  <nut-cell
      :show-icon="true"
      :isLink="true"
      @click="switchActionSheet('isVisible1')"
     
    >
      <span><label>基础用法</label></span>
      <div v-html="state.val"></div>
    </nut-cell>
     <!-- demo 基础用法 -->
    <nut-action-sheet
      v-model:visible="state.isVisible1"
      :menu-items="menuItemsOne"
      @choose="chooseItem"
    >
    </nut-action-sheet>
</template>
<script>
import { reactive } from 'vue';
export default {
  setup() {
  const state = reactive({
      isVisible1: false,
      val: '',
    });
     const menuItemsOne = [
      {
        name: '选项一'
      },
      {
        name: '选项二'
      },
      {
        name: '选项三'
      }
    ];
    const switchActionSheet = ( param ) => {
      state.isVisible1 = !state.isVisible1;
    };
      const chooseItem = (itemParams) => {
      state.val = itemParams.name;
    };
    return {
      state,
      switchActionSheet,
      menuItemsOne,
      chooseItem,
    };
  }
}
 </script>
```

### 展示取消按钮

``` html
<template>
  <nut-cell
      :show-icon="true"
      :isLink="true"
      @click="switchActionSheet('isVisible')"
    >
      <span><label>展示取消按钮</label></span>
      <div v-html="state.val"></div>
    </nut-cell>
     <!-- demo 展示取消按钮 -->
    <nut-action-sheet
      v-model:visible="state.isVisible"
      :menu-items="menuItems"
      cancel-txt="取消"
      @choose="chooseItem"
    >
    </nut-action-sheet>
</template>
<script>
import { reactive } from 'vue';
export default {
  setup() {
  const state = reactive({
      isVisible: false,
      val: '',
    });
     const menuItems = [
      {
        name: '选项一'
      },
      {
        name: '选项二'
      },
      {
        name: '选项三'
      }
    ];
    const switchActionSheet = ( param ) => {
      state.isVisible = !state.isVisible;
    };
      const chooseItem = (itemParams) => {
      state.val = itemParams.name;
    };
    return {
      state,
      switchActionSheet,
      menuItems,
      chooseItem,
    };
  }
}
 </script>
```

### 展示描述信息

``` html
<template>
  <nut-cell
      :show-icon="true"
      :isLink="true"
      @click="switchActionSheet('isVisible')"
    >
      <span><label>展示描述信息</label></span>
      <div v-html="state.val"></div>
    </nut-cell>
     <!-- demo 展示描述信息 -->
    <nut-action-sheet
      v-model:visible="state.isVisible"
      cancel-txt="取消"
      description="这是一段展示信息"
      :menu-items="menuItems"
      @choose="chooseItem"
    >
    </nut-action-sheet>
</template>
<script>
import { reactive } from 'vue';
export default {
  setup() {
  const state = reactive({
      isVisible: false,
      val: '',
    });
     const menuItems = [
      {
        name: '选项一'
      },
      {
        name: '选项二'
      },
      {
        name: '选项三',
        subname: '描述信息'
      }
    ];
    const switchActionSheet = ( param ) => {
      state.isVisible = !state.isVisible;
    };
      const chooseItem = (itemParams) => {
      state.val = itemParams.name;
    };
    return {
      state,
      switchActionSheet,
      menuItems,
      chooseItem,
    };
  }
}
 </script>
```

### 选项状态

``` html
<template>
  <nut-cell
      :show-icon="true"
      :isLink="true"
      @click="switchActionSheet('isVisible')"
    >
      <span><label>选项状态</label></span>
      <div v-html="state.val"></div>
    </nut-cell>
     <!-- demo 选项状态 -->
    <nut-action-sheet
      v-model:visible="state.isVisible"
      :menu-items="menuItems"
      choose-tag-value="着色选项"
      @choose="chooseItem"
       cancel-txt="取消"
    >
    </nut-action-sheet>
</template>
<script>
import { reactive } from 'vue';
export default {
  setup() {
  const state = reactive({
      isVisible: false,
      val: '',
    });
     const menuItems = [
      {
        name: '着色选项'
      },
      {
        name: '禁用选项',
        disable: true
      }
    ];
    const switchActionSheet = ( param ) => {
      state.isVisible = !state.isVisible;
    };
      const chooseItem = (itemParams) => {
      state.val = itemParams.name;
    };
    return {
      state,
      switchActionSheet,
      menuItems,
      chooseItem,
    };
  }
}
 </script>
```

### 自定义内容

``` html
<template>
  <nut-cell
      :show-icon="true"
      :isLink="true"
      @click="switchActionSheet('isVisible')"
    >
      <span><label>自定义内容</label></span>
    </nut-cell>
     <nut-action-sheet v-model:visible="state.isVisible" title="标题">
      <div class="custom-content">自定义内容</div>
    </nut-action-sheet>
</template>
<script>
import { reactive } from 'vue';
export default {
  setup() {
  const state = reactive({
      isVisible: false,
      val: '',
    });
    const switchActionSheet = ( param ) => {
      state.isVisible = !state.isVisible;
    };
    return {
      state,
      switchActionSheet,
    };
  }
}
 </script>
 <style lang="scss">
.custom-content {
  padding: 10px 10px 160px;
}
</style>

```

## API

### Props

| 参数                              | 说明                                             | 类型            | 默认值         |
|---------------------------------|------------------------------------------------|---------------|-------------|
| v-model:visible                 | 是否展示动作面板                                       | boolean       | `false`     |
| menu-items                      | 列表项                                            | MenuItems[]   | `[]`        |
| option-tag                      | 设置列表项标题展示使用参数                                  | string        | `'name'`    |
| option-sub-tag                  | 设置列表项二级标题展示使用参数                                | string        | `'subname'` |
| choose-tag-value                | 设置选中项的值，和 `'option-tag'` 的值对应                  | string        | ''          |
| custom-color                    | 选中项颜色，当 `choose-tag-value == option-tag` 的值 生效 | string        | `'#ee0a24'` |
| title                           | 设置列表项标题                                        | string        | `''`        |
| description                     | 设置列表项副标题/描述                                    | string        | `''`        |
| cancel-txt                      | 取消文案                                           | string        | `'取消'`      |
| close-abled                     | 遮罩层是否可关闭                                       | boolean       | `true`      |
| round `1.7.11`                  | 是否显示圆角                                         | boolean       | `true`      |
| overlay `1.7.11`                | 是否显示遮罩                                         | boolean       | `true`      |
| pop-class                       | 自定义弹框类名                                        | string        | -           |
| pop-style `1.7.11`              | 自定义弹框样式                                        | CSSProperties | -           |
| overlay-class                   | 自定义遮罩层类名                                       | string        | ''          |
| overlay-style                   | 自定义遮罩层样式                                       | string        | ''          |
| lock-scroll `H5` `1.7.11`       | 遮罩显示时的背景是否锁定                                   | boolean       | `true`      |
| safe-area-inset-bottom `1.7.11` | 是否开启 iphone 系列全面屏底部安全区适配                       | boolean       | `true`      |

### MenuItems 数据结构

| 键名      | 说明                     | 类型      |
|---------|------------------------|---------|
| name    | 标题                     | string  |
| subname | 二级标题                   | string  |
| color   | 选项字体颜色（选中项颜色层级>选项字体颜色） | string  |
| loading | 是否为 `loading` 状态       | boolean |
| disable | 是否为禁用状态                | boolean |

### Events

| 事件名    | 说明        | 回调参数                         |
|--------|-----------|------------------------------|
| choose | 选择之后触发    | 选中列表项 `item`, 选中的索引值 `index` |
| cancel | 点击取消文案时触发 | -                            |
| close  | 点击遮罩层时触发  | event: Event                 |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                       | 默认值                                          |
|------------------------------------------|----------------------------------------------|
| --nut-actionsheet-light-color            | #f6f6f6                                      |
| --nut-actionsheet-item-border-bottom     | none                                         |
| --nut-actionsheet-item-font-size         | var(--nut-font-size-2)                       |
| --nut-actionsheet-item-subdesc-font-size | var(--nut-font-size-1)                       |
| --nut-actionsheet-item-cancel-border-top | 1px solid var(--nut-actionsheet-light-color) |
| --nut-actionsheet-item-line-height       | 24px                                         |
| --nut-actionsheet-item-font-color        | var(--nut-title-color)                       |
