# SideNavbar 侧边栏导航

### 介绍

用于内容选择和切换

### 基础用法

可以通过设置 `position` 来控制左右展示

```html
<template>
  <nut-cell @click="handleClick1">
    <span><label>右侧</label></span>
  </nut-cell>
  <nut-popup position="right" v-model:visible="show1" :style="{ width, height }">
    <nut-side-navbar>
      <nut-subside-navbar title="智能城市AI" ikey="6">
        <nut-subside-navbar title="人体识别1" ikey="9">
          <nut-side-navbaritem ikey="10" title="人体检测1"></nut-side-navbaritem>
          <nut-side-navbaritem ikey="11" title="细粒度人像分割1"></nut-side-navbaritem>
        </nut-subside-navbar>
        <nut-subside-navbar title="人体识别2" ikey="12">
          <nut-side-navbaritem ikey="13" title="人体检测2"></nut-side-navbaritem>
          <nut-side-navbaritem ikey="14" title="细粒度人像分割2"></nut-side-navbaritem>
        </nut-subside-navbar>
      </nut-subside-navbar>
    </nut-side-navbar>
  </nut-popup>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        show1: false,
        width: '80%',
        height: '100%',
      });

      const handleClick1 = () => {
        state.show1 = true;
      };

      return {
        ...toRefs(state),
        handleClick1
      };
    }
  }
</script>
```

### 嵌套（建议最多三层）

该组件在小程序环境下不支持异步加载数据，建议在获取到完整数据后再进行组件的渲染。

```html
<template>
  <nut-cell @click="handleClick3">
    <span><label>显示</label></span>
  </nut-cell>
  <nut-popup position="right" v-model:visible="show3" :custom-style="{ width, height }">
    <nut-side-navbar :show="show3">
      <nut-side-navbaritem ikey="1" title="人脸识别" @click="handleClick4('人脸识别')"></nut-side-navbaritem>
      <nut-side-navbaritem ikey="2" title="自然语言处理"></nut-side-navbaritem>
      <nut-subside-navbar title="图像理解" ikey="3" :open="false">
        <nut-side-navbaritem ikey="4" title="菜品识别"></nut-side-navbaritem>
        <nut-side-navbaritem ikey="5" title="拍照购"></nut-side-navbaritem>
      </nut-subside-navbar>
      <nut-subside-navbar title="智能城市AI" ikey="6">
        <nut-side-navbaritem ikey="7" title="企业风险预警模型"></nut-side-navbaritem>
        <nut-side-navbaritem ikey="8" title="水质量检测"></nut-side-navbaritem>
        <nut-subside-navbar title="人体识别" ikey="9">
          <nut-side-navbaritem ikey="10" title="人体检测"></nut-side-navbaritem>
          <nut-side-navbaritem ikey="11" title="细粒度人像分割"></nut-side-navbaritem>
        </nut-subside-navbar>
      </nut-subside-navbar>
      <nut-subside-navbar title="自然语言处理" ikey="12">
        <nut-side-navbaritem ikey="13" title="词法分析"></nut-side-navbaritem>
        <nut-side-navbaritem ikey="14" title="句法分析"></nut-side-navbaritem>
      </nut-subside-navbar>
    </nut-side-navbar>
  </nut-popup>
</template>
<script lang="ts">
  import { reactive, toRefs } from 'vue';
  export default {
    setup() {
      const state = reactive({
        show3: false,
        width: '80%',
        height: '100%',
        navs: [] as any[]
      });

      const handleClick3 = () => {
        state.show3 = true;
      };

      const handleClick4 = (msg: string) => {
        console.log(msg)
      }

      return {
        ...toRefs(state),
        handleClick3,
        handleClick4
      };
    }
  }
</script>
```

## API

### SideNavbar Props

| 参数   | 说明         | 类型            | 可选值 | 默认值 |
|--------|------------|-----------------|--------|--------|
| offset | 导航缩进宽度 | number / string | -      | `15`   |

### SubSideNavbar Props

| 参数  | 说明             | 类型            | 可选值 | 默认值 |
|-------|----------------|-----------------|--------|--------|
| title | 导航标题         | string          | -      | -      |
| ikey  | 导航唯一标识     | number / string | -      | -      |
| open  | 导航是否默认展开 | boolean         | -      | `true` |

### SideNavbarItem Props

| 参数  | 说明         | 类型            | 可选值 | 默认值 |
|-------|------------|-----------------|--------|--------|
| title | 导航标题     | string          | -      | -      |
| ikey  | 导航唯一标识 | number / string | -      | -      |

### SubSideNavbar Events

| 事件名      | 说明     | 回调参数 |
|-------------|--------|----------|
| title-click | 导航点击 | -        |

### SideNavbarItem Events

| 事件名 | 说明     | 回调参数 |
|--------|--------|----------|
| click  | 导航点击 | -        |

## 主题定制

### 样式变量

组件提供了下列 CSS 变量，可用于自定义样式，使用方法请参考 [ConfigProvider 组件](/components/basic/configprovider)。

| 名称                                        | 默认值                     | 描述 |
|---------------------------------------------|----------------------------|------|
| --nut-sidenavbar-content-bg-color           | var(--nut-white)           | -    |
| --nut-sidenavbar-sub-title-border-color     | #f6f6f6                    | -    |
| --nut-sidenavbar-sub-title-bg-color         | #f6f6f6                    | -    |
| --nut-sidenavbar-sub-title-font-size        | var(--nut-font-size-large) | -    |
| --nut-sidenavbar-sub-title-radius           | 0                          | -    |
| --nut-sidenavbar-sub-title-border           | 0                          | -    |
| --nut-sidenavbar-sub-title-width            | 100%                       | -    |
| --nut-sidenavbar-sub-title-height           | 40px                       | -    |
| --nut-sidenavbar-sub-title-text-line-height | 40px                       | -    |
| --nut-sidenavbar-sub-title-text-color       | var(--nut-title-color)     | -    |
| --nut-sidenavbar-item-title-color           | #333                       | -    |
| --nut-sidenavbar-item-title-bg-color        | var(--nut-white)           | -    |
| --nut-sidenavbar-item-height                | 40px                       | -    |
| --nut-sidenavbar-item-line-height           | 40px                       | -    |
| --nut-sidenavbar-item-font-size             | 16px                       | -    |
