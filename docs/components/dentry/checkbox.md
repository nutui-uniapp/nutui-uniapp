# Checkbox 复选按钮

### 介绍

多选按钮用于选择。

### 基础用法

```html
<template>
  <nut-checkbox v-model="checkbox1" label="复选框">复选框</nut-checkbox>
  <nut-checkbox v-model="checkbox2" text-position="left">复选框</nut-checkbox>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox1: false,
        checkbox2: false
      });
      return { ...toRefs(state) };
    }
  };
</script>
<style lang="scss">
  .nut-checkbox {
    display: flex;
    margin-right: 20px;
    .nut-checkbox__label {
      margin-left: 10px;
    }
  }
</style>
```

### 半选状态

```html
<template>
  <nut-cell>
    <nut-checkbox v-model="checkbox9" :indeterminate="true" label="复选框">复选框</nut-checkbox>
  </nut-cell>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox9: true
      });
      return { ...toRefs(state) };
    }
  };
</script>
```

### 禁用状态

```html
<template>
  <nut-checkbox v-model="checkbox3" disabled>未选时禁用状态</nut-checkbox>
  <nut-checkbox v-model="checkbox4" disabled>选中时禁用状态</nut-checkbox>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox3: false,
        checkbox4: true,
      });
      return { ...toRefs(state) };
    }
  };
</script>
```

### 自定义尺寸

```html
<template>
  <nut-checkbox v-model="checkbox5" icon-size="25">自定义尺寸25</nut-checkbox>
  <nut-checkbox v-model="checkbox6" icon-size="10">自定义尺寸10</nut-checkbox>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox5: true,
        checkbox6: true,
      });
      return { ...toRefs(state) };
    }
  };
</script>
```

### 自定义图标

通过slot自定义图标，建议同时设置`icon`和`checkedIcon`两个插槽

```html
<template>
  <nut-checkbox v-model="checkbox7" >
    自定义图标
    <template #icon> <nut-icon  name="check-list" /> </template>
    <template #checkedIcon> <nut-icon  name="check-list" color="red" /> </template>
  </nut-checkbox>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        checkbox7: true,
      });
      return { ...toRefs(state) };
    }
  };
</script>
```

### change事件

值发生变化时，将触发 `change` 事件

```html
<template>
  <nut-checkbox v-model="checkbox" @change="changeBox3">change复选框</nut-checkbox>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkbox: false,
      });
      const changeBox3= (checked: boolean, label: string) => {
        console.log('change事件触发' + checked, label);
      } 
      return { ...toRefs(state), changeBox3 };
    }
  };
</script>
```

### checkboxGroup使用

```html
<template>
  <nut-checkbox-group v-model="checkboxgroup1">
    <nut-checkbox label="1">组合复选框</nut-checkbox>
    <nut-checkbox label="2">组合复选框</nut-checkbox>
    <nut-checkbox label="3">组合复选框</nut-checkbox>
    <nut-checkbox label="4">组合复选框</nut-checkbox>
  </nut-checkbox-group>
  <nut-cell>
    <div class="demo-check">当前选中值</div>
    <div>{{ checkboxgroup1 }}</div>
  </nut-cell>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkboxgroup1: ['2', '3'],
      });

      return { ...toRefs(state) };
    }
  };
</script>
```

### checkboxGroup 全选/取消

```html
<template>
  <nut-checkbox-group v-model="checkboxgroup3" ref="group" @change="changeBox4">
    <nut-checkbox v-for="item in checkboxsource" :key="item.label" :label="item.label">{{item.value}}</nut-checkbox>
  </nut-checkbox-group>
  <span class="btn">
    <nut-button type="primary" @click="toggleAll(true)" style="margin: 0 20px 0 0">全选</nut-button>
    <nut-button type="primary" @click="toggleAll(false)" style="margin: 0 20px 0 0">取消</nut-button>
    <nut-button type="warning" @click="toggleReverse()">反选</nut-button>
  </span>
</template>
<script lang="ts">
  import { reactive, toRefs, ref } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkboxgroup3: ['2'],
        checkboxsource: [
          {label: '1', value: '组合复选框'},
          {label: '2', value: '组合复选框'},
          {label: '3', value: '组合复选框'},
          {label: '4', value: '组合复选框'},
          {label: '5', value: '组合复选框'},
          {label: '6', value: '组合复选框'}
        ]
      });

      const group = ref(null);
      const changeBox4 = (label: any[]) => {
        console.log(`${label.length === state.checkboxsource.length ? '全选' : '取消全选'}`);
      };

      const toggleAll = (f: boolean) => {
        (group.value as any).toggleAll(f);
      };

      const toggleReverse = () => {
        console.log(`反选`);
        group.value.toggleReverse();
      };

      return { ...toRefs(state), group, changeBox4, toggleAll };
    }
  };
</script>
```

### checkboxGroup使用，限制最大可选数（2个）

```html
<template>
  <nut-cell-group title="checkboxGroup使用，限制最大可选数（2个）">
    <nut-cell>
      <nut-checkbox-group v-model="checkboxgroup4" :max="2">
        <nut-checkbox label="1" style="margin: 2px 20px 0 0">组合复选框</nut-checkbox>
        <nut-checkbox label="2">组合复选框</nut-checkbox>
        <nut-checkbox label="3" style="margin: 2px 20px 0 0">组合复选框</nut-checkbox>
        <nut-checkbox label="4">组合复选框</nut-checkbox>
      </nut-checkbox-group>
    </nut-cell>
    <nut-cell>
      <div class="demo-check">选中</div>
      <div>{{ checkboxgroup4 }}</div>
    </nut-cell>
  </nut-cell-group>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    props: {},
    setup() {
      const state = reactive({
        checkboxgroup4: ['2']
      });

      return { ...toRefs(state) };
    }
  };
</script>
```

### 全选/半选/取消

```html
<template>
  <nut-cell-group title="全选/半选/取消">
    <nut-cell>
      <nut-checkbox :indeterminate="indeterminate" v-model="checkbox10" @change="changeBox5">全选</nut-checkbox>
    </nut-cell>
    <nut-checkbox-group v-model="checkboxgroup5" ref="group2" @change="changeBox6">
      <nut-cell><nut-checkbox label="1" style="margin: 2px 20px 0 0">组合复选框</nut-checkbox></nut-cell>
      <nut-cell><nut-checkbox label="2">组合复选框</nut-checkbox></nut-cell>
      <nut-cell><nut-checkbox label="3">组合复选框</nut-checkbox></nut-cell>
      <nut-cell><nut-checkbox label="4">组合复选框</nut-checkbox></nut-cell>
    </nut-checkbox-group>
  </nut-cell-group>
</template>
<script lang="ts">
  import { reactive, toRefs,ref, Ref } from 'vue';
  export default {
    props: {},
    setup() {
      const group2 = ref(null) as Ref;
      const state = reactive({
        indeterminate: false,
        checkbox10: false,
        checkboxgroup5: [],
      });

      const changeBox5 = (value: boolean) => {
        group2.value.toggleAll(value);
      };

      const changeBox6 = (label: string[]) => {
        if(label.length === 4) {
          state.indeterminate = false;
          state.checkbox10 = true;
        } else if(label.length && label.length < 4){
          state.indeterminate = true;
        } else {
          data.indeterminate = false;
          state.checkbox10 = false;
        }
      };

      return { ...toRefs(state), group2, changeBox5, changeBox6 };
    }
  };
</script>
```

## API

### Checkbox Props

| 参数          | 说明                                     | 类型             | 默认值  |
| ------------- | ---------------------------------------- | ---------------- | ------- |
| v-model       | 是否处于选中状态                         | boolean          | `false` |
| disabled      | 是否禁用选择                             | boolean          | `false` |
| text-position | 文本所在的位置，可选值：`left`,`right`   | string           | `right` |
| icon-size     | [图标尺寸](/components/basic/icon)       | string \| number | `18`    |
| label         | 复选框的文本内容                         | string           | -       |
| indeterminate | 当前是否支持半选状态，一般用在全选操作中 | boolean          | `false` |
| shape         | 形状，可选值：`button`、`round`          | String           | `round` |

### Checkbox Slots

| 名称          | 说明           |
| ------------- | -------------- |
| icon          | 未选中时的图标 |
| checkedIcon   | 选中时的图标   |
| indeterminate | 半选时的图标   |

### CheckboxGroup Props

| 参数     | 说明                                                            | 类型    | 默认值  |
| -------- | --------------------------------------------------------------- | ------- | ------- |
| v-model  | 当前选中项的标识符，和 `label` 相对应                           | Array   | -       |
| disabled | 是否禁用选择,将用于其下的全部复选框                             | boolean | `false` |
| max      | 限制选择的数量，不能和`全选/取消/反选`一起使用, `0`表示没有限制 | number  | `0`     |

### Checkbox Events

| 事件名 | 说明         | 回调参数                                                       |
| ------ | ------------ | -------------------------------------------------------------- |
| change | 值变化时触发 | (state, label), `state` 代表当前状态，`label` 表示当前选中的值 |

### CheckboxGroup Events

| 事件名 | 说明         | 回调参数                                           |
| ------ | ------------ | -------------------------------------------------- |
| change | 值变化时触发 | `label`,`label` 返回一个数组，表示当前选中项的集合 |

### CheckboxGroup Methods

| 方法名        | 说明      | 参数                                        |
| ------------- | --------- | ------------------------------------------- |
| toggleAll     | 全选/取消 | 传 `true`,表示全选，传 `false`,表示取消全选 |
| toggleReverse | 反选      | -                                           |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                      | 默认值                   | 描述 |
| ----------------------------------------- | ------------------------ | ---- |
| --nut-checkbox-label-color                | #1d1e1e                  | -    |
| --nut-checkbox-label-disable-color        | #999                     | -    |
| --nut-checkbox-icon-disable-color         | #d6d6d6                  | -    |
| --nut-checkbox-label-margin-left          | 15px                     | -    |
| --nut-checkbox-label-font-size            | 14px                     | -    |
| --nut-checkbox-icon-font-size             | 18px                     | -    |
| --nut-checkbox-icon-disable-color2        | var(--nut-help-color)_   | -    |
| --nut-checkbox-button-padding             | 5px 18px                 | -    |
| --nut-checkbox-button-font-size           | 12px                     | -    |
| --nut-checkbox-button-border-radius       | 15px                     | -    |
| --nut-checkbox-button-border-color        | #f6f7f9                  | -    |
| --nut-checkbox-button-background          | #f6f7f9                  | -    |
| --nut-checkbox-button-font-color-active   | var(--nut-primary-color) | -    |
| --nut-checkbox-button-border-color-active | var(--nut-primary-color) | -    |
| --nut-checkbox-button-background-active   | var(--nut-primary-color) | -    |
| --nut-checkbox-display                    | inline-flex              | -    |
| --nut-checkbox-margin-right               | 20px                     | -    |
