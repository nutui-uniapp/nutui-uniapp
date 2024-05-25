# Tabs 选项卡切换

### 介绍

常用于平级区域大块内容的的收纳和展现，支持内嵌标签形式和渲染循环数据形式

### 基础用法

```html
<template>
<nut-tabs v-model="state.tab1value">
  <nut-tab-pane title="Tab 1">
    Tab 1
  </nut-tab-pane>
  <nut-tab-pane title="Tab 2">
    Tab 2
  </nut-tab-pane>
  <nut-tab-pane title="Tab 3">
    Tab 3
  </nut-tab-pane>
</nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab1value: '0',
    });
    return { state };
  }
};
</script>
```

### 手势滑动切换

```html
<template>
<nut-tabs v-model="state.tab1value" swipeable>
  <nut-tab-pane title="Tab 1">
    Tab 1
  </nut-tab-pane>
  <nut-tab-pane title="Tab 2">
    Tab 2
  </nut-tab-pane>
  <nut-tab-pane title="Tab 3">
    Tab 3
  </nut-tab-pane>
</nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab1value: '0',
    });
    return { state };
  }
};
</script>
```

### 基础用法-微笑曲线

```html
<template>
<nut-tabs v-model="state.tab11value" type="smile">
  <nut-tab-pane title="Tab 1">
    Tab 1
  </nut-tab-pane>
  <nut-tab-pane title="Tab 2">
    Tab 2
  </nut-tab-pane>
  <nut-tab-pane title="Tab 3">
    Tab 3
  </nut-tab-pane>
</nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab11value: '0',
    });
    return { state };
  }
};
</script>
```

### 通过 pane-key 匹配

```html
<template>
<nut-tabs v-model="state.tab2value">
  <nut-tab-pane title="Tab 1" pane-key="0">
    Tab 1
  </nut-tab-pane>
  <nut-tab-pane title="Tab 2" pane-key="1" :disabled="true">
    Tab 2
  </nut-tab-pane>
  <nut-tab-pane title="Tab 3" pane-key="2">
    Tab 3
  </nut-tab-pane>
</nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab2value: '0',
    });
    return { state };
  }
};
</script>
```

### TabPane 自动高度

自动高度。设置为 true 时，nut-tabs 和 nut-tabs__content 会随着当前 nut-tab-pane 的高度而发生变化。

```html
<template>
  <nut-tabs v-model="state.tab2value" :auto-height="true">
    <nut-tab-pane title="Tab 1" pane-key="0">
      <p>Tab 1</p>
      <p>Tab 1</p>
      <p>Tab 1</p>
      <p>Tab 1</p>
    </nut-tab-pane>
    <nut-tab-pane title="Tab 2" pane-key="1"> Tab 2 </nut-tab-pane>
    <nut-tab-pane title="Tab 3" pane-key="2"> Tab 3 </nut-tab-pane>
  </nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab2value: '0',
    });
    return { state };
  }
};
</script>
```

### 数据异步渲染 3s

```html
<template>
<nut-tabs v-model="state.tab3value">
  <nut-tab-pane v-for="item in state.list3" :title="'Tab '+ item">
    Tab {{item}}
  </nut-tab-pane>
</nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab3value: '0',
      list3: Array.from(new Array(2).keys()),
    });
    setTimeout(() => {
      state.list3.push(999);
    }, 3000);
    return { state };
  }
};
</script>
```

### 数量多，滚动操作

可通过`direction`属性修改标题栏自动滚动方向。

```html
<template>
<nut-tabs v-model="state.tab4value" title-scroll title-gutter="10">
  <nut-tab-pane v-for="item in state.list4" :title="'Tab '+ item">
    Tab {{item}}
  </nut-tab-pane>
</nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab4value: '0',
      list4: Array.from(new Array(10).keys()),
    });
    return { state };
  }
};
</script>
```

### 左右布局

```html
<template>
<nut-tabs style="height:300px" v-model="state.tab5value" title-scroll direction="vertical">
  <nut-tab-pane v-for="item in state.list5" :pane-key="item" :title="'Tab '+ item">
    Tab {{item}}
  </nut-tab-pane>
</nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab5value: '0',
      list5: Array.from(new Array(2).keys()),
    });
    return { state };
  }
};
</script>
```

### 左右布局-微笑曲线

```html
<template>
<nut-tabs style="height:300px" v-model="state.tab6value" type="smile" title-scroll direction="vertical">
  <nut-tab-pane v-for="item in state.list5" :pane-key="item" :title="'Tab '+ item">
    Tab {{item}}
  </nut-tab-pane>
</nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab6value: '0',
      list5: Array.from(new Array(2).keys()),
    });
    return { state };
  }
};
</script>
```

### 标签栏字体尺寸 large normal small

```html
<template>
<nut-tabs v-model="state.tab1value" size="large">
  <nut-tab-pane title="Tab 1"> Tab 1 </nut-tab-pane>
  <nut-tab-pane title="Tab 2"> Tab 2 </nut-tab-pane>
  <nut-tab-pane title="Tab 3"> Tab 3 </nut-tab-pane>
</nut-tabs>
<nut-tabs v-model="state.tab1value" size="normal">
  <nut-tab-pane title="Tab 1"> Tab 1 </nut-tab-pane>
  <nut-tab-pane title="Tab 2"> Tab 2 </nut-tab-pane>
  <nut-tab-pane title="Tab 3"> Tab 3 </nut-tab-pane>
</nut-tabs>
<nut-tabs v-model="state.tab1value" size="small">
  <nut-tab-pane title="Tab 1"> Tab 1 </nut-tab-pane>
  <nut-tab-pane title="Tab 2"> Tab 2 </nut-tab-pane>
  <nut-tab-pane title="Tab 3"> Tab 3 </nut-tab-pane>
</nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab1value: '0',
    });
    return { state };
  }
};
</script>
```

### 自定义标签栏

```html
<template>
  <nut-tabs v-model="state.tab7value" swipeable>
      <template #titles>
        <div class="title-list">
          <view
            v-for="item in state.list6" :key="item.paneKey" class="title-item"
            :class="{ 'tabs-active': state.tab7value === item.paneKey }" @click="state.tab7value = item.paneKey"
          >
            <nut-icon name="dongdong" />
            <view class="nut-tabs__titles-item__text">
              {{ item.title }}
            </view>
            <view class="item__line" />
          </view>
        </div>
      </template>
      <nut-tab-pane v-for="item in state.list6" :key="item" :pane-key="item.paneKey">
        {{ item.title }}
      </nut-tab-pane>
  </nut-tabs>
</template>
<script lang="ts">
import { reactive } from 'vue';
export default {
  setup() {
    const state = reactive({
      tab7value: 'c1',
       list6: [
        {
          title: '自定义 1',
          paneKey: 'c1'
        },
        {
          title: '自定义 2',
          paneKey: 'c2'
        },
        {
          title: '自定义 3',
          paneKey: 'c3'
        }
      ]
    });
    return { state };
  }
};
</script>
<style lang="scss" scoped>
.title-list {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;

  .title-item {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: relative;
  }

  .tabs-active {
    font-weight: bold;
    color: $tabs-titles-item-active-color;
    opacity: $tabs-titles-item-line-opacity;
    transition: width 0.3s ease;

    .item__line {
      position: absolute;
      bottom: -10%;
      left: 50%;
      overflow: hidden;
      content: ' ';
      border-radius: $tabs-titles-item-line-border-radius;
      opacity: $tabs-titles-item-line-opacity;
      transition: width 0.3s ease;
      transform: translate(-50%, 0);
      width: $tabs-horizontal-titles-item-active-line-width;
      height: 3px;
      content: ' ';
      background: $tabs-horizontal-tab-line-color;
    }
  }
}
</style>
```

## API

### Tabs Props

| 参数             | 说明                                                                                                          | 类型             | 默认值       |
| ---------------- | ------------------------------------------------------------------------------------------------------------- | ---------------- | ------------ |
| v-model          | 绑定当前选中标签的标识符                                                                                      | number \| string | `0`          |
| custom-color     | 标签选中色                                                                                                    | string           | `#1a1a1a`    |
| background       | 标签栏背景颜色                                                                                                | string           | `#f5f5f5`    |
| direction        | 使用横纵方向 可选值 horizontal、vertical                                                                      | string           | `horizontal` |
| type             | 选中底部展示样式 可选值 line、smile                                                                           | string           | `line`       |
| swipeable        | 是否开启手势左右滑动切换                                                                                      | boolean          | `false`      |
| title-scroll     | 标签栏是否可以滚动                                                                                            | boolean          | `false`      |
| ellipsis         | 是否省略过长的标题文字                                                                                        | boolean          | `true`       |
| animated-time    | 切换动画时长，单位 ms。0 代表无动画，此时必须设置 `pane-key`(_小程序场景数据过大建议设置0，解决切换卡顿问题_) | number \| string | `300`        |
| title-gutter     | 标签间隙                                                                                                      | number \| string | `0`          |
| size             | 标签栏字体尺寸大小 可选值  large normal small                                                                 | string           | `normal`     |
| auto-height      | 自动高度。设置为 true 时，nut-tabs 和 nut-tabs__content 会随着当前 nut-tab-pane 的高度而发生变化。            | boolean          | `false`      |
| name `1.6.0废弃` | 在`uni`环境下，必须设置 name 才能开启 title-scroll 功能，版本 >=1.6.0 时不再需要。                            | string           | ''           |
| align `1.6.0`    | 横轴方向的标题对齐方式，可选值 left、center                                                                   | string           | `center`     |

### Tabs Slots

| 名称    | 说明           |
| ------- | -------------- |
| titles  | 自定义导航区域 |
| default | 自定义内容     |

### TabPane Props

| 参数     | 说明                    | 类型    | 默认值           |
| -------- | ----------------------- | ------- | ---------------- |
| title    | 标题                    | string  |                  |
| pane-key | 标签 Key , 匹配的标识符 | string  | 默认索引0,1,2... |
| disabled | 是否禁用标签            | boolean | false            |

### TabPane Slots

| 名称    | 说明       |
| ------- | ---------- |
| default | 自定义内容 |

### Tabs Events

| 事件名 | 说明                     | 回调参数               |
| ------ | ------------------------ | ---------------------- |
| click  | 点击标签时触发           | title,paneKey,disabled |
| change | 当前激活的标签改变时触发 | title,paneKey,disabled |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                                  | 默认值                                                                          |
|-----------------------------------------------------|------------------------------------------------------------------------------|
| --nut-tabs-tab-smile-color                          | var(--nut-primary-color)                                                     |
| --nut-tabs-titles-border-radius                     | 0                                                                            |
| --nut-tabs-titles-item-large-font-size              | var(--nut-font-size-3)                                                       |
| --nut-tabs-titles-item-font-size                    | var(--nut-font-size-2)                                                       |
| --nut-tabs-titles-item-small-font-size              | var(--nut-font-size-1)                                                       |
| --nut-tabs-titles-item-color                        | var(--nut-title-color)                                                       |
| --nut-tabs-titles-item-active-color                 | var(--nut-title-color)                                                       |
| --nut-tabs-titles-background-color                  | var(--nut-help-color)                                                        |
| --nut-tabs-horizontal-tab-line-color                | linear-gradient(90deg,var(--nut-primary-color) 0%,rgba(#fa2c19, 0.15) 100%)  |
| --nut-tabs-horizontal-titles-height                 | 46px                                                                         |
| --nut-tabs-horizontal-titles-item-min-width         | 50px                                                                         |
| --nut-tabs-horizontal-titles-item-active-line-width | 40px                                                                         |
| --nut-tabs-vertical-tab-line-color                  | linear-gradient(180deg,var(--nut-primary-color) 0%,rgba(#fa2c19, 0.15) 100%) |
| --nut-tabs-vertical-titles-item-height              | 40px                                                                         |
| --nut-tabs-vertical-titles-item-active-line-height  | 14px                                                                         |
| --nut-tabs-vertical-titles-width                    | 100px                                                                        |
| --nut-tabs-titles-item-line-border-radius           | 0                                                                            |
| --nut-tabs-titles-item-line-opacity                 | 1                                                                            |
| --nut-tab-pane-padding `1.7.11`                     | 24px 20px                                                                    |
| --nut-tab-pane-background `1.7.11`                  | #fff                                                                         |
